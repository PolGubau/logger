import type { ExternalLog, PromiseData, PromiseT, LogType, LogToDismiss, LogTypes } from './types';

import React from 'react';

let toastsCounter = 1;

class Observer {
  subscribers: Array<(log: ExternalLog | LogToDismiss) => void>;
  logs: Array<LogType | LogToDismiss>;

  constructor() {
    this.subscribers = [];
    this.logs = [];
  }

  // We use arrow functions to maintain the correct `this` reference
  subscribe = (subscriber: (toast: LogType | LogToDismiss) => void) => {
    this.subscribers.push(subscriber);

    return () => {
      const index = this.subscribers.indexOf(subscriber);
      this.subscribers.splice(index, 1);
    };
  };

  publish = (data: LogType) => {
    this.subscribers.forEach((subscriber) => subscriber(data));
  };

  addLog = (data: LogType) => {
    this.publish(data);
    this.logs = [...this.logs, data];
  };

  create = (
    data: ExternalLog & {
      message?: string | React.ReactNode;
      type?: LogTypes;
      promise?: PromiseT;
      jsx?: React.ReactElement;
    },
  ) => {
    const { message, ...rest } = data;
    const id = typeof data?.id === 'number' || data.id?.length > 0 ? data.id : toastsCounter++;
    const alreadyExists = this.logs.find((toast) => {
      return toast.id === id;
    });
    const dismissible = data.dismissible === undefined ? true : data.dismissible;

    if (alreadyExists) {
      this.logs = this.logs.map((toast) => {
        if (toast.id === id) {
          this.publish({ ...toast, ...data, id, title: message });
          return {
            ...toast,
            ...data,
            id,
            dismissible,
            title: message,
          };
        }

        return toast;
      });
    } else {
      this.addLog({ title: message, ...rest, dismissible, id });
    }

    return id;
  };

  dismiss = (id?: number | string) => {
    if (!id) {
      this.logs.forEach((toast) => {
        this.subscribers.forEach((subscriber) => subscriber({ id: toast.id, dismiss: true }));
      });
    }

    this.subscribers.forEach((subscriber) => subscriber({ id, dismiss: true }));
    return id;
  };

  message = (message: string | React.ReactNode, data?: ExternalLog) => {
    return this.create({ ...data, message });
  };

  error = (message: string | React.ReactNode, data?: ExternalLog) => {
    return this.create({ ...data, message, type: 'error' });
  };

  success = (message: string | React.ReactNode, data?: ExternalLog) => {
    return this.create({ ...data, type: 'success', message });
  };

  info = (message: string | React.ReactNode, data?: ExternalLog) => {
    return this.create({ ...data, type: 'info', message });
  };

  warning = (message: string | React.ReactNode, data?: ExternalLog) => {
    return this.create({ ...data, type: 'warning', message });
  };

  loading = (message: string | React.ReactNode, data?: ExternalLog) => {
    return this.create({ ...data, type: 'loading', message });
  };

  promise = <ToastData>(promise: PromiseT<ToastData>, data?: PromiseData<ToastData>) => {
    if (!data) {
      // Nothing to show
      return;
    }

    let id: string | number | undefined = undefined;
    if (data.loading !== undefined) {
      id = this.create({
        ...data,
        promise,
        type: 'loading',
        message: data.loading,
        description: typeof data.description !== 'function' ? data.description : undefined,
      });
    }

    const p = promise instanceof Promise ? promise : promise();

    let shouldDismiss = id !== undefined;

    p.then(async (response) => {
      if (isHttpResponse(response) && !response.ok) {
        shouldDismiss = false;
        const message =
          typeof data.error === 'function' ? await data.error(`HTTP error! status: ${response.status}`) : data.error;
        const description =
          typeof data.description === 'function'
            ? await data.description(`HTTP error! status: ${response.status}`)
            : data.description;
        this.create({ id, type: 'error', message, description });
      } else if (data.success !== undefined) {
        shouldDismiss = false;
        const message = typeof data.success === 'function' ? await data.success(response) : data.success;
        const description =
          typeof data.description === 'function' ? await data.description(response) : data.description;
        this.create({ id, type: 'success', message, description });
      }
    })
      .catch(async (error) => {
        if (data.error !== undefined) {
          shouldDismiss = false;
          const message = typeof data.error === 'function' ? await data.error(error) : data.error;
          const description = typeof data.description === 'function' ? await data.description(error) : data.description;
          this.create({ id, type: 'error', message, description });
        }
      })
      .finally(() => {
        if (shouldDismiss) {
          // Toast is still in load state (and will be indefinitely — dismiss it)
          this.dismiss(id);
          id = undefined;
        }

        data.finally?.();
      });

    return id;
  };

  custom = (jsx: (id: number | string) => React.ReactElement, data?: ExternalLog) => {
    const id = data?.id || toastsCounter++;
    this.create({ jsx: jsx(id), id, ...data });
    return id;
  };
}

export const ToastState = new Observer();

// bind this to the toast function
const toastFunction = (message: string | React.ReactNode, data?: ExternalLog) => {
  const id = data?.id || toastsCounter++;
  ToastState.addLog({
    title: message,
    ...data,
    id,
  });
  return id;
};

const isHttpResponse = (data: any): data is Response => {
  return (
    data &&
    typeof data === 'object' &&
    'ok' in data &&
    typeof data.ok === 'boolean' &&
    'status' in data &&
    typeof data.status === 'number'
  );
};

const basicToast = toastFunction;

const getHistory = () => ToastState.logs;

// We use `Object.assign` to maintain the correct types as we would lose them otherwise
export const log = Object.assign(
  basicToast,
  {
    success: ToastState.success,
    info: ToastState.info,
    warning: ToastState.warning,
    error: ToastState.error,
    custom: ToastState.custom,
    message: ToastState.message,
    promise: ToastState.promise,
    dismiss: ToastState.dismiss,
    loading: ToastState.loading,
  },
  { getHistory },
);
