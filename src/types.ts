import React from 'react';

export type LogTypes = 'normal' | 'action' | 'success' | 'info' | 'warning' | 'error' | 'loading' | 'default';

export type PromiseT<Data = any> = Promise<Data> | (() => Promise<Data>);

export type PromiseTResult<Data = any> =
  | string
  | React.ReactNode
  | ((data: Data) => React.ReactNode | string | Promise<React.ReactNode | string>);

export type PromiseExternalLog = Omit<ExternalToast, 'description'>;

export type PromiseData<LogData = any> = PromiseExternalLog & {
  loading?: string | React.ReactNode;
  success?: PromiseTResult<LogData>;
  error?: PromiseTResult;
  description?: PromiseTResult;
  finally?: () => void | Promise<void>;
};

export interface LogClassnames {
  toast?: string;
  title?: string;
  description?: string;
  loader?: string;
  closeButton?: string;
  cancelButton?: string;
  actionButton?: string;
  success?: string;
  error?: string;
  info?: string;
  warning?: string;
  loading?: string;
  default?: string;
  content?: string;
  icon?: string;
}

export interface LogIcons {
  success?: React.ReactNode;
  info?: React.ReactNode;
  warning?: React.ReactNode;
  error?: React.ReactNode;
  loading?: React.ReactNode;
}

export interface Action {
  label: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  actionButtonStyle?: React.CSSProperties;
}

export interface LogType {
  id: number | string;
  title?: string | React.ReactNode;
  type?: LogTypes;
  icon?: React.ReactNode;
  jsx?: React.ReactNode;
  richColors?: boolean;
  invert?: boolean;
  closeButton?: boolean;
  dismissible?: boolean;
  description?: React.ReactNode;
  duration?: number;
  delete?: boolean;
  important?: boolean;
  action?: Action | React.ReactNode;
  cancel?: Action | React.ReactNode;
  onDismiss?: (toast: LogType) => void;
  onAutoClose?: (toast: LogType) => void;
  promise?: PromiseT;
  cancelButtonStyle?: React.CSSProperties;
  actionButtonStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  unstyled?: boolean;
  className?: string;
  classNames?: LogClassnames;
  descriptionClassName?: string;
}

export function isAction(action: Action | React.ReactNode): action is Action {
  return (action as Action).label !== undefined;
}

export interface HeightT {
  height: number;
  toastId: number | string;
}

interface ToastOptions {
  className?: string;
  closeButton?: boolean;
  descriptionClassName?: string;
  style?: React.CSSProperties;
  cancelButtonStyle?: React.CSSProperties;
  actionButtonStyle?: React.CSSProperties;
  duration?: number;
  unstyled?: boolean;
  classNames?: LogClassnames;
}

type CnFunction = (...classes: Array<string | undefined>) => string;

export interface LogListProps {
  invert?: boolean;
  theme?: 'light' | 'dark' | 'system';
  hotkey?: string[];
  richColors?: boolean;
  expand?: boolean;
  duration?: number;
  gap?: number;
  visibleToasts?: number;
  closeButton?: boolean;
  toastOptions?: ToastOptions;
  className?: string;
  style?: React.CSSProperties;
  offset?: string | number;
  dir?: 'rtl' | 'ltr' | 'auto';
  /**
   * @deprecated Please use the `icons` prop instead:
   * ```jsx
   * <Toaster
   *   icons={{ loading: <LoadingIcon /> }}
   * />
   * ```
   */
  loadingIcon?: React.ReactNode;
  icons?: LogIcons;
  containerAriaLabel?: string;
  pauseWhenPageIsHidden?: boolean;
  cn?: CnFunction;
}

export interface ToastProps {
  toast: LogType;
  toasts: LogType[];
  index: number;
  removeToast: (toast: LogType) => void;
  gap?: number;
  closeButton: boolean;
  style?: React.CSSProperties;
  cancelButtonStyle?: React.CSSProperties;
  actionButtonStyle?: React.CSSProperties;
  duration?: number;
  className?: string;
  unstyled?: boolean;
  descriptionClassName?: string;
  loadingIcon?: React.ReactNode;
  classNames?: LogClassnames;
  icons?: LogIcons;
  closeButtonAriaLabel?: string;
 }

export enum SwipeStateTypes {
  SwipedOut = 'SwipedOut',
  SwipedBack = 'SwipedBack',
  NotSwiped = 'NotSwiped',
}

export type Theme = 'light' | 'dark';

export interface ToastToDismiss {
  id: number | string;
  dismiss: boolean;
}

export type ExternalToast = Omit<LogType, 'id' | 'type' | 'title' | 'jsx' | 'delete' | 'promise'> & {
  id?: number | string;
};
