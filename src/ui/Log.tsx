'use client';

import { CSSProperties, isValidElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { isAction, ToastProps } from '../types';
import { useIsDocumentHidden } from '../hooks';
import { TIME_BEFORE_UNMOUNT } from '../constants';
import React from 'react';
import { getAsset, Loader } from '../assets';
import { cn } from 'pol-ui';

export const Log = (props: ToastProps) => {
  const {
    toast,
    unstyled,
    index,
    removeToast,
    closeButton: closeButtonFromToaster,
    style,
    cancelButtonStyle,
    actionButtonStyle,
    className = '',
    descriptionClassName = '',
    duration: durationFromToaster,
    loadingIcon: loadingIconProp,
    classNames,
    icons,
    closeButtonAriaLabel = 'Close toast',
  } = props;
  const [mounted, setMounted] = useState(false);
  const [removed, setRemoved] = useState(false);
  const toastRef = useRef<HTMLLIElement>(null);
  const isFront = index === 0;
  const toastType = toast.type;
  const dismissible = toast.dismissible !== false;
  const toastClassname = toast.className || '';
  const toastDescriptionClassname = toast.descriptionClassName || '';

  const closeButton = useMemo(
    () => toast.closeButton ?? closeButtonFromToaster,
    [toast.closeButton, closeButtonFromToaster],
  );
  const duration = useMemo(() => toast.duration || durationFromToaster || 2000, [toast.duration, durationFromToaster]);
  const offset = useRef(0);

  const isDocumentHidden = useIsDocumentHidden();

  const disabled = toastType === 'loading';

  useEffect(() => {
    // Trigger enter animation without using CSS animation
    setMounted(true);
  }, []);

  const deleteToast = useCallback(() => {
    // Save the offset for the exit swipe animation
    setRemoved(true);

    setTimeout(() => {
      removeToast(toast);
    }, TIME_BEFORE_UNMOUNT);
  }, [toast, removeToast, offset]);

  useEffect(() => {
    if ((toast.promise && toastType === 'loading') || toast.duration === Infinity || toast.type === 'loading') return;
    let timeoutId: NodeJS.Timeout;

    return () => clearTimeout(timeoutId);
  }, [toast, duration, deleteToast, toast.promise, toastType, isDocumentHidden]);

  useEffect(() => {
    if (toast.delete) {
      deleteToast();
    }
  }, [deleteToast, toast.delete]);

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
      tabIndex={0}
      ref={toastRef}
      className={cn(
        className,
        toastClassname,
        classNames?.toast,
        toast?.classNames?.toast,
        classNames?.default,
        classNames?.[toastType],
        toast?.classNames?.[toastType],
        'w-full p-2',
        {
          'bg-info-200': toastType === 'info',
          'bg-error-200': toastType === 'error',
        },
      )}
      data-logger-toast=""
      data-styled={!Boolean(toast.jsx || toast.unstyled || unstyled)}
      data-mounted={mounted}
      data-promise={Boolean(toast.promise)}
      data-removed={removed}
      data-index={index}
      data-front={isFront}
      data-dismissible={dismissible}
      data-type={toastType}
      style={
        {
          ...style,
          ...toast.style,
        } as CSSProperties
      }
    >
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
          className={cn(classNames?.closeButton, toast?.classNames?.closeButton)}
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
      {toast.jsx || isValidElement(toast.title) ? (
        toast.jsx || toast.title
      ) : (
        <>
          {toastType || toast.icon || toast.promise ? (
            <div data-icon="" className={cn(classNames?.icon, toast?.classNames?.icon)}>
              {toast.promise || (toast.type === 'loading' && !toast.icon) ? toast.icon || getLoadingIcon() : null}
              {toast.type !== 'loading' ? toast.icon || icons?.[toastType] || getAsset(toastType) : null}
            </div>
          ) : null}

          <div data-content="" className={cn(classNames?.content, toast?.classNames?.content)}>
            <div data-title="" className={cn(classNames?.title, toast?.classNames?.title)}>
              {toast.title}
            </div>
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
        </>
      )}
    </li>
  );
};
