'use client';
import React from 'react';
import ReactDOM from 'react-dom';

import { LogListProps, LogType, ToastToDismiss } from '../types';
import { getDocumentDirection, cn } from 'pol-ui';
import { Log } from './Log';
import { ToastState } from '../state';

const LogList = (props: LogListProps) => {
  const {
    hotkey = ['altKey', 'KeyT'],
    closeButton = true,
    className,
    duration,
    toastOptions,
    dir = getDocumentDirection(),
    loadingIcon,
    icons,
    containerAriaLabel = 'Notifications',
  } = props;
  const [logs, setLogs] = React.useState<LogType[]>([]);

  const listRef = React.useRef<HTMLOListElement>(null);
  const hotkeyLabel = hotkey.join('+').replace(/Key/g, '').replace(/Digit/g, '');
  const lastFocusedElementRef = React.useRef<HTMLElement>(null);
  const isFocusWithinRef = React.useRef(false);

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
      if ((toast as ToastToDismiss).dismiss) {
        setLogs((toasts) => toasts.map((t) => (t.id === toast.id ? { ...t, delete: true } : t)));
        return;
      }

      // Prevent batching, temp solution.
      setTimeout(() => {
        ReactDOM.flushSync(() => {
          setLogs((toasts) => {
            const indexOfExistingToast = toasts.findIndex((t) => t.id === toast.id);

            // Update the toast if it already exists
            if (indexOfExistingToast !== -1) {
              return [
                ...toasts.slice(0, indexOfExistingToast),
                { ...toasts[indexOfExistingToast], ...toast },
                ...toasts.slice(indexOfExistingToast + 1),
              ];
            }

            return [toast, ...toasts];
          });
        });
      });
    });
  }, []);

  React.useEffect(() => {
    if (listRef.current) {
      return () => {
        if (lastFocusedElementRef.current) {
          lastFocusedElementRef.current.focus({ preventScroll: true });
          lastFocusedElementRef.current = null;
          isFocusWithinRef.current = false;
        }
      };
    }
  }, [listRef.current]);

  if (!logs.length) return null;

  return (
    // Remove item from normal navigation flow, only available via hotkey
    <section aria-label={`${containerAriaLabel} ${hotkeyLabel}`} tabIndex={-1}>
      <ol
        dir={dir === 'auto' ? getDocumentDirection() : dir}
        tabIndex={-1}
        ref={listRef}
        className={className}
        data-logger-list
      >
        {logs.map((log, index) => (
          <Log
            key={log.id}
            icons={icons}
            index={index}
            toast={log}
            duration={toastOptions?.duration ?? duration}
            className={toastOptions?.className}
            descriptionClassName={toastOptions?.descriptionClassName}
            closeButton={toastOptions?.closeButton ?? closeButton}
            style={toastOptions?.style}
            unstyled={toastOptions?.unstyled}
            classNames={toastOptions?.classNames}
            cancelButtonStyle={toastOptions?.cancelButtonStyle}
            actionButtonStyle={toastOptions?.actionButtonStyle}
            removeToast={removeToast}
            toasts={[log]}
            loadingIcon={loadingIcon}
          />
        ))}
      </ol>
    </section>
  );
};

export default LogList;
