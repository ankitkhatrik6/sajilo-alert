import type {
  AlertOptions,
  ConfirmOptions,
  PromiseOptions,
  ActionOptions,
  UndoOptions,
  ToastOptions,
  GlobalConfig,
  Language,
  AlertType,
} from './types';
import { state } from './state';
import { generateId } from '../utils/id';
import { createModal, updateModal, closeModal } from '../components/modal';
import { createToast, updateToast, closeToast } from '../components/toast';
import { handleAction, handleUndo } from '../components/actions';

function parseInputOptions(
  input?: string | AlertOptions,
  extraOptions?: AlertOptions,
  defaultType: AlertType = 'info'
): AlertOptions {
  if (typeof input === 'string') {
    return {
      type: defaultType,
      message: input,
      ...extraOptions,
    };
  }
  if (input && typeof input === 'object') {
    return {
      type: defaultType,
      ...input,
      ...extraOptions,
    };
  }
  return {
    type: defaultType,
    ...extraOptions,
  };
}

class ToastAPI {
  public success(message: string | ToastOptions, options?: ToastOptions): string {
    const opts = parseInputOptions(message, options, 'success');
    const id = opts.id || generateId('sa-toast');
    createToast({ ...opts, type: 'success' }, id);
    return id;
  }

  public error(message: string | ToastOptions, options?: ToastOptions): string {
    const opts = parseInputOptions(message, options, 'error');
    const id = opts.id || generateId('sa-toast');
    createToast({ ...opts, type: 'error' }, id);
    return id;
  }

  public warning(message: string | ToastOptions, options?: ToastOptions): string {
    const opts = parseInputOptions(message, options, 'warning');
    const id = opts.id || generateId('sa-toast');
    createToast({ ...opts, type: 'warning' }, id);
    return id;
  }

  public info(message: string | ToastOptions, options?: ToastOptions): string {
    const opts = parseInputOptions(message, options, 'info');
    const id = opts.id || generateId('sa-toast');
    createToast({ ...opts, type: 'info' }, id);
    return id;
  }

  public loading(message?: string | ToastOptions, options?: ToastOptions): string {
    const opts = parseInputOptions(message, options, 'loading');
    const id = opts.id || generateId('sa-toast');
    // Default loading toast is indefinite until updated or closed
    createToast({ ...opts, type: 'loading', duration: opts.duration !== undefined ? opts.duration : 0 }, id);
    return id;
  }

  public custom(options: ToastOptions): string {
    const id = options.id || generateId('sa-toast');
    createToast(options, id);
    return id;
  }

  public action(options: ActionOptions): string {
    return handleAction(options, true);
  }

  public undo(options: UndoOptions): string {
    return handleUndo(options, true);
  }
}

export class SajiloAlertManager {
  public toast = new ToastAPI();

  /**
   * Shows a success alert modal.
   */
  public success(message: string | AlertOptions, options?: AlertOptions): string {
    const opts = parseInputOptions(message, options, 'success');
    const id = opts.id || generateId('sa-alert');
    createModal({ ...opts, type: 'success' }, id);
    return id;
  }

  /**
   * Shows an error alert modal.
   */
  public error(message: string | AlertOptions, options?: AlertOptions): string {
    const opts = parseInputOptions(message, options, 'error');
    const id = opts.id || generateId('sa-alert');
    createModal({ ...opts, type: 'error' }, id);
    return id;
  }

  /**
   * Shows a warning alert modal.
   */
  public warning(message: string | AlertOptions, options?: AlertOptions): string {
    const opts = parseInputOptions(message, options, 'warning');
    const id = opts.id || generateId('sa-alert');
    createModal({ ...opts, type: 'warning' }, id);
    return id;
  }

  /**
   * Shows an info alert modal.
   */
  public info(message: string | AlertOptions, options?: AlertOptions): string {
    const opts = parseInputOptions(message, options, 'info');
    const id = opts.id || generateId('sa-alert');
    createModal({ ...opts, type: 'info' }, id);
    return id;
  }

  /**
   * Shows a loading alert modal.
   */
  public loading(message?: string | AlertOptions, options?: AlertOptions): string {
    const opts = parseInputOptions(message, options, 'loading');
    const id = opts.id || generateId('sa-alert');
    // Default loading modal is indefinite until updated or closed
    createModal({ ...opts, type: 'loading', duration: opts.duration !== undefined ? opts.duration : 0 }, id);
    return id;
  }

  /**
   * Shows a confirmation dialog and returns a Promise<boolean>.
   */
  public confirm(options: ConfirmOptions | string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const opts: AlertOptions = typeof options === 'string'
        ? { message: options, type: 'confirm' }
        : { ...options, type: 'confirm' };

      const id = opts.id || generateId('sa-confirm');
      createModal(opts, id, resolve);
    });
  }

  /**
   * Handles an asynchronous promise with loading, success, and error states.
   */
  public async promise<T>(
    promiseInput: Promise<T> | (() => Promise<T>),
    options: PromiseOptions<T>
  ): Promise<T> {
    const id = generateId('sa-promise');

    // Show initial loading state
    const loadingOpts: AlertOptions = typeof options.loading === 'string'
      ? { message: options.loading, type: 'loading', duration: 0, theme: options.theme, position: options.position }
      : { ...options.loading, type: 'loading', duration: 0, theme: options.theme, position: options.position };

    createModal(loadingOpts, id);

    try {
      const p = typeof promiseInput === 'function' ? promiseInput() : promiseInput;
      const data = await p;

      // Build success options
      let successOpts: AlertOptions;
      if (typeof options.success === 'function') {
        const res = options.success(data);
        successOpts = typeof res === 'string' ? { message: res, type: 'success' } : { ...res, type: 'success' };
      } else if (typeof options.success === 'string') {
        successOpts = { message: options.success, type: 'success' };
      } else {
        successOpts = { ...options.success, type: 'success' };
      }

      this.update(id, {
        duration: state.config.duration,
        ...successOpts,
        theme: options.theme || state.config.theme,
        position: options.position || state.config.position,
      });

      return data;
    } catch (err) {
      // Build error options
      let errorOpts: AlertOptions;
      if (typeof options.error === 'function') {
        const res = options.error(err);
        errorOpts = typeof res === 'string' ? { message: res, type: 'error' } : { ...res, type: 'error' };
      } else if (typeof options.error === 'string') {
        errorOpts = { message: options.error, type: 'error' };
      } else {
        errorOpts = { ...options.error, type: 'error' };
      }

      this.update(id, {
        duration: state.config.duration,
        ...errorOpts,
        theme: options.theme || state.config.theme,
        position: options.position || state.config.position,
      });

      throw err;
    }
  }

  /**
   * Shows an Action alert modal.
   */
  public action(options: ActionOptions): string {
    return handleAction(options, false);
  }

  /**
   * Shows an Undo notification/alert.
   */
  public undo(options: UndoOptions): string {
    return handleUndo(options, true);
  }

  /**
   * Updates an active alert or toast by ID.
   */
  public update(id: string, options: Partial<AlertOptions>): boolean {
    if (state.activeModal && state.activeModal.id === id) {
      updateModal(state.activeModal, options);
      return true;
    }
    if (state.activeToasts.has(id)) {
      const toast = state.activeToasts.get(id)!;
      updateToast(toast, options);
      return true;
    }
    return false;
  }

  /**
   * Closes an alert or toast by ID, or closes active modal if no ID provided.
   */
  public close(id?: string): void {
    if (id) {
      if (state.activeModal && state.activeModal.id === id) {
        closeModal(id, false);
      } else if (state.activeToasts.has(id)) {
        closeToast(id);
      }
    } else {
      closeModal(undefined, false);
    }
  }

  /**
   * Closes all active modals and toast notifications.
   */
  public closeAll(): void {
    if (state.activeModal) {
      closeModal(state.activeModal.id, false);
    }
    for (const [id] of state.activeToasts) {
      closeToast(id);
    }
  }

  /**
   * Configures default language ('ne' or 'en').
   */
  public setLanguage(lang: Language): void {
    state.config.language = lang === 'en' ? 'en' : 'ne';
  }

  /**
   * Gets current language.
   */
  public getLanguage(): Language {
    return state.config.language;
  }

  /**
   * Globally configures SajiloAlert defaults.
   */
  public configure(config: Partial<GlobalConfig>): void {
    state.config = {
      ...state.config,
      ...config,
    };
  }

  /**
   * Gets current global configuration.
   */
  public getConfig(): GlobalConfig {
    return { ...state.config };
  }
}

export const alert = new SajiloAlertManager();
