export type AlertType =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'loading'
  | 'confirm'
  | 'action'
  | 'undo'
  | 'custom';

export type Theme = 'light' | 'dark' | 'nepal' | 'minimal';

export type Language = 'ne' | 'en';

export type Position =
  | 'center'
  | 'top'
  | 'bottom'
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left';

export interface AlertOptions {
  id?: string;
  type?: AlertType;
  title?: string;
  message?: string;
  html?: string;
  duration?: number;
  theme?: Theme;
  position?: Position;
  showClose?: boolean;
  closeOnEscape?: boolean;
  closeOnBackdrop?: boolean;
  confirmText?: string;
  cancelText?: string;
  actionText?: string;
  onAction?: () => void;
  undoText?: string;
  onUndo?: () => void;
  onClose?: (id: string) => void;
  customIcon?: string;
  ariaLabel?: string;
  isToast?: boolean;
}

export interface ConfirmOptions {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  theme?: Theme;
  position?: Position;
  closeOnEscape?: boolean;
  closeOnBackdrop?: boolean;
  showClose?: boolean;
  id?: string;
}

export type PromiseMessage<T> = string | ((data: T) => string | AlertOptions) | AlertOptions;

export interface PromiseOptions<T = unknown> {
  loading: string | AlertOptions;
  success: string | ((data: T) => string) | AlertOptions | ((data: T) => AlertOptions);
  error: string | ((err: unknown) => string) | AlertOptions | ((err: unknown) => AlertOptions);
  theme?: Theme;
  position?: Position;
}

export interface ActionOptions {
  title?: string;
  message?: string;
  actionText: string;
  onAction: () => void;
  theme?: Theme;
  position?: Position;
  showClose?: boolean;
  closeOnEscape?: boolean;
  closeOnBackdrop?: boolean;
  duration?: number;
  id?: string;
}

export interface UndoOptions {
  message: string;
  duration?: number;
  onUndo: () => void;
  undoText?: string;
  theme?: Theme;
  position?: Position;
  id?: string;
}

export type ToastOptions = AlertOptions;

export interface GlobalConfig {
  theme: Theme;
  position: Position;
  toastPosition: Position;
  duration: number;
  toastDuration: number;
  closeOnEscape: boolean;
  closeOnBackdrop: boolean;
  language: Language;
  maxToasts: number;
}

export interface AlertInstance {
  id: string;
  options: AlertOptions;
  element: HTMLElement;
  timerId?: ReturnType<typeof setTimeout> | null;
  resolveConfirm?: (value: boolean) => void;
  isClosing?: boolean;
  undoExecuted?: boolean;
}
