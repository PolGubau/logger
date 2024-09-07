'use client';

import { cn } from 'pol-ui';
import React, { CSSProperties, isValidElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getAsset, Loader } from '../assets';
import { isAction, LogProps } from '../types';

export const Log = (props: LogProps) => {
  const {
    toast,
    removeToast,
    closeButton: closeButtonFromToaster,
    style,
    cancelButtonStyle,
    actionButtonStyle,
    className = '',
    descriptionClassName = '',
    loadingIcon: loadingIconProp,
    classNames,
    icons,
    closeButtonAriaLabel = 'Close toast',
  } = props;

  const toastRef = useRef<HTMLLIElement>(null);
  const toastType = toast.type;
  const dismissible = toast.dismissible !== false;
  const toastClassname = toast.className || '';
  const toastDescriptionClassname = toast.descriptionClassName || '';

  const closeButton = useMemo(
    () => toast.closeButton ?? closeButtonFromToaster,
    [toast.closeButton, closeButtonFromToaster],
  );

  const disabled = toastType === 'loading';

  const deleteToast = useCallback(() => {
    // Save the offset for the exit swipe animation
    removeToast(toast);
  }, [toast, removeToast]);

  function getLoadingIcon() {
    if (icons?.loading) {
      return (
        <div className="logger-loader" data-visible={toastType === 'loading'}>
          {icons.loading}
        </div>
      );
    }

    if (loadingIconProp) {
      return (
        <div className="logger-loader" data-visible={toastType === 'loading'}>
          {loadingIconProp}
        </div>
      );
    }
    return <Loader visible={toastType === 'loading'} />;
  }

  return (
    <li
      aria-live={toast.important ? 'assertive' : 'polite'}
      aria-atomic="true"
      role="status"
      ref={toastRef}
      className={cn(
        'w-full p-3 flex gap-4 items-center',
        className,
        toastClassname,
        classNames?.toast,
        toast?.classNames?.toast,
        classNames?.default,
        classNames?.[toastType],
        toast?.classNames?.[toastType],
        {
          'bg-info-100 dark:bg-info-900': toastType === 'info',
          'bg-error-100 dark:bg-error-900': toastType === 'error',
          'bg-success-100 dark:bg-success-900': toastType === 'success',
          'bg-warning-100 dark:bg-warning-900': toastType === 'warning',
        },
      )}
      style={
        {
          ...style,
          ...toast.style,
        } as CSSProperties
      }
    >
      {toast.jsx || isValidElement(toast.title) ? (
        toast.jsx || toast.title
      ) : (
        <div className="w-full flex gap-3 items-center">
          {toastType || toast.icon || toast.promise ? (
            <div className={cn(classNames?.icon, toast?.classNames?.icon)}>
              {toast.promise || (toast.type === 'loading' && !toast.icon) ? toast.icon || getLoadingIcon() : null}
              {toast.type !== 'loading' ? toast.icon || icons?.[toastType] || getAsset(toastType) : null}
            </div>
          ) : null}

          <div className={cn(classNames?.content, toast?.classNames?.content)}>
            <div className={cn(classNames?.title, toast?.classNames?.title)}>{toast.title}</div>
            {toast.description ? (
              <div
                data-description=""
                className={cn(
                  descriptionClassName,
                  toastDescriptionClassname,
                  classNames?.description,
                  toast?.classNames?.description,
                )}
              >
                {toast.description}
              </div>
            ) : null}
          </div>
          {React.isValidElement(toast.cancel) ? (
            toast.cancel
          ) : toast.cancel && isAction(toast.cancel) ? (
            <button
              data-button
              data-cancel
              style={toast.cancelButtonStyle || cancelButtonStyle}
              onClick={(event) => {
                // We need to check twice because typescript
                if (!isAction(toast.cancel)) return;
                if (!dismissible) return;
                toast.cancel.onClick?.(event);
                deleteToast();
              }}
              className={cn(classNames?.cancelButton, toast?.classNames?.cancelButton)}
            >
              {toast.cancel.label}
            </button>
          ) : null}
          {React.isValidElement(toast.action) ? (
            toast.action
          ) : toast.action && isAction(toast.action) ? (
            <button
              data-button
              data-action
              style={toast.actionButtonStyle || actionButtonStyle}
              onClick={(event) => {
                // We need to check twice because typescript
                if (!isAction(toast.action)) return;
                if (event.defaultPrevented) return;
                toast.action.onClick?.(event);
                deleteToast();
              }}
              className={cn(classNames?.actionButton, toast?.classNames?.actionButton)}
            >
              {toast.action.label}
            </button>
          ) : null}
        </div>
      )}
      {closeButton && !toast.jsx ? (
        <button
          aria-label={closeButtonAriaLabel}
          data-disabled={disabled}
          data-close-button
          onClick={
            disabled || !dismissible
              ? () => {}
              : () => {
                  deleteToast();
                  toast.onDismiss?.(toast);
                }
          }
          className={cn('flex justify-end bg-red-300', classNames?.closeButton, toast?.classNames?.closeButton)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      ) : null}
    </li>
  );
};
