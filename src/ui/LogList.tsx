'use client';
import React from 'react';
import { useLocalStorage } from 'pol-ui';
import { ToastState } from '../state';
import { LogListProps, LogType } from '../types';
import { Log } from './Log';

const LogList = (props: LogListProps) => {
  const { closeButton = true, className, toastOptions, icons } = props;

  const [logs, setLogs] = useLocalStorage<LogType[]>(props.lsKey ?? 'logs', []);

  const removeToast = React.useCallback((toastToRemove: LogType) => {
    setLogs((toasts) => {
      if (!toasts.find((toast) => toast.id === toastToRemove.id)?.delete) {
        ToastState.dismiss(toastToRemove.id);
      }

      return toasts.filter(({ id }) => id !== toastToRemove.id);
    });
  }, []);

  React.useEffect(() => {
    return ToastState.subscribe((toast) => {
      setLogs((toasts) => [...toasts, toast]);
    });
  }, []);

  return (
    // Remove item from normal navigation flow, only available via hotkey
    <section>
      <h2>Logs List</h2>

      <ul className={className}>
        {logs.map((log) => (
          <Log
            key={log.id}
            icons={icons}
            toast={log}
            className={toastOptions?.className}
            descriptionClassName={toastOptions?.descriptionClassName}
            closeButton={toastOptions?.closeButton ?? closeButton}
            style={toastOptions?.style}
            unstyled={toastOptions?.unstyled}
            classNames={toastOptions?.classNames}
            cancelButtonStyle={toastOptions?.cancelButtonStyle}
            actionButtonStyle={toastOptions?.actionButtonStyle}
            removeToast={removeToast}
          />
        ))}
      </ul>
    </section>
  );
};

export default LogList;
