import type { ToastOptions, AlertInstance, Position } from '../core/types';
import { state } from '../core/state';
import { getLocaleString } from '../locales';
import { getIcon } from '../utils/icons';
import { injectStyles } from '../utils/dom';

/**
 * Gets or creates a fixed toast container element for the given position.
 */
function getToastContainer(position: Position): HTMLElement {
  if (state.toastContainers.has(position)) {
    const existing = state.toastContainers.get(position)!;
    if (document.body.contains(existing)) {
      return existing;
    }
  }

  const container = document.createElement('div');
  container.className = `sa-toast-container sa-pos-${position}`;
  container.setAttribute('aria-live', 'polite');
  container.setAttribute('aria-atomic', 'false');
  document.body.appendChild(container);
  state.toastContainers.set(position, container);
  return container;
}

/**
 * Creates or updates a toast notification in the DOM.
 */
export function createToast(options: ToastOptions, instanceId: string): AlertInstance {
  if (typeof document === 'undefined') {
    return {
      id: instanceId,
      options,
      element: {} as HTMLElement,
    };
  }

  injectStyles();

  // If a toast with this ID already exists, update it in place
  if (state.activeToasts.has(instanceId)) {
    const existing = state.activeToasts.get(instanceId)!;
    updateToast(existing, options);
    return existing;
  }

  const position = options.position || state.config.toastPosition || 'top-right';
  const theme = options.theme || state.config.theme;
  const lang = state.config.language;
  const type = options.type || 'info';
  const duration = options.duration !== undefined ? options.duration : state.config.toastDuration;
  const showClose = options.showClose !== undefined ? options.showClose : true;

  const container = getToastContainer(position);

  // Enforce max visible toasts
  const currentCount = container.children.length;
  if (currentCount >= state.config.maxToasts) {
    // Remove oldest toast immediately from container
    const oldestChild = container.firstElementChild as HTMLElement;
    if (oldestChild && oldestChild.id) {
      const oldId = oldestChild.id.replace('sa-toast-', '');
      closeToast(oldId, true);
    }
  }

  // Determine title and message
  let title = options.title;
  let message = options.message;
  if (!title && !message && !options.html) {
    if (type === 'success') message = getLocaleString(lang, 'success');
    else if (type === 'error') message = getLocaleString(lang, 'error');
    else if (type === 'warning') message = getLocaleString(lang, 'warning');
    else if (type === 'info') message = getLocaleString(lang, 'info');
    else if (type === 'loading') message = getLocaleString(lang, 'loading');
    else if (type === 'undo') message = getLocaleString(lang, 'undo');
  }

  const toast = document.createElement('div');
  toast.id = `sa-toast-${instanceId}`;
  toast.className = `sa-toast sa-theme-${theme}`;
  toast.setAttribute('role', type === 'error' ? 'alert' : 'status');

  // Icon
  const iconEl = document.createElement('div');
  iconEl.className = `sa-toast-icon sa-icon-type-${type}`;
  iconEl.innerHTML = getIcon(type, options.customIcon);
  toast.appendChild(iconEl);

  // Content
  const contentEl = document.createElement('div');
  contentEl.className = 'sa-toast-content';

  if (title) {
    const titleEl = document.createElement('div');
    titleEl.className = 'sa-toast-title';
    titleEl.textContent = title;
    contentEl.appendChild(titleEl);
  }

  if (options.html) {
    const msgEl = document.createElement('div');
    msgEl.className = 'sa-toast-message';
    msgEl.innerHTML = options.html;
    contentEl.appendChild(msgEl);
  } else if (message) {
    const msgEl = document.createElement('p');
    msgEl.className = 'sa-toast-message';
    msgEl.textContent = message;
    contentEl.appendChild(msgEl);
  }

  // Action / Undo Buttons in Toast
  if (options.onUndo || options.onAction) {
    const actionsEl = document.createElement('div');
    actionsEl.className = 'sa-toast-actions';

    if (options.onUndo) {
      const undoBtn = document.createElement('button');
      undoBtn.className = 'sa-btn sa-btn-undo';
      undoBtn.type = 'button';
      undoBtn.textContent = options.undoText || getLocaleString(lang, 'undo');
      undoBtn.onclick = (e) => {
        e.stopPropagation();
        if (typeof options.onUndo === 'function') {
          options.onUndo();
        }
        closeToast(instanceId);
      };
      actionsEl.appendChild(undoBtn);
    } else if (options.onAction) {
      const actionBtn = document.createElement('button');
      actionBtn.className = 'sa-btn sa-btn-undo';
      actionBtn.type = 'button';
      actionBtn.textContent = options.actionText || getLocaleString(lang, 'action');
      actionBtn.onclick = (e) => {
        e.stopPropagation();
        if (typeof options.onAction === 'function') {
          options.onAction();
        }
        closeToast(instanceId);
      };
      actionsEl.appendChild(actionBtn);
    }
    contentEl.appendChild(actionsEl);
  }

  toast.appendChild(contentEl);

  // Close Button
  if (showClose) {
    const closeBtn = document.createElement('button');
    closeBtn.className = 'sa-toast-close';
    closeBtn.setAttribute('type', 'button');
    closeBtn.setAttribute('aria-label', getLocaleString(lang, 'close'));
    closeBtn.innerHTML = getIcon('close');
    closeBtn.onclick = (e) => {
      e.stopPropagation();
      closeToast(instanceId);
    };
    toast.appendChild(closeBtn);
  }

  // Timer
  let timerId: ReturnType<typeof setTimeout> | null = null;
  if (duration && duration > 0) {
    timerId = setTimeout(() => {
      closeToast(instanceId);
    }, duration);
  }

  container.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.classList.add('sa-visible');
  });

  const instance: AlertInstance = {
    id: instanceId,
    options: { ...options, isToast: true },
    element: toast,
    timerId,
  };

  state.activeToasts.set(instanceId, instance);
  return instance;
}

/**
 * Updates a toast in place.
 */
export function updateToast(instance: AlertInstance, newOptions: Partial<ToastOptions>): void {
  if (!instance.element || !instance.element.parentNode) return;

  const mergedOptions: ToastOptions = { ...instance.options, ...newOptions };
  instance.options = mergedOptions;

  const type = mergedOptions.type || 'info';
  const theme = mergedOptions.theme || state.config.theme;
  const lang = state.config.language;

  instance.element.className = `sa-toast sa-theme-${theme} sa-visible`;

  // Update Icon
  const iconEl = instance.element.querySelector<HTMLElement>('.sa-toast-icon');
  if (iconEl) {
    iconEl.className = `sa-toast-icon sa-icon-type-${type}`;
    iconEl.innerHTML = getIcon(type, mergedOptions.customIcon);
  }

  // Update Title and Message
  const contentEl = instance.element.querySelector<HTMLElement>('.sa-toast-content');
  if (contentEl) {
    let titleEl = contentEl.querySelector<HTMLElement>('.sa-toast-title');
    if (mergedOptions.title) {
      if (!titleEl) {
        titleEl = document.createElement('div');
        titleEl.className = 'sa-toast-title';
        contentEl.prepend(titleEl);
      }
      titleEl.textContent = mergedOptions.title;
    } else if (titleEl) {
      titleEl.remove();
    }

    let msgEl = contentEl.querySelector<HTMLElement>('.sa-toast-message');
    if (mergedOptions.html) {
      if (!msgEl) {
        msgEl = document.createElement('div');
        msgEl.className = 'sa-toast-message';
        contentEl.appendChild(msgEl);
      }
      msgEl.innerHTML = mergedOptions.html;
    } else if (mergedOptions.message) {
      if (!msgEl) {
        msgEl = document.createElement('p');
        msgEl.className = 'sa-toast-message';
        contentEl.appendChild(msgEl);
      }
      msgEl.textContent = mergedOptions.message;
    }
  }

  // Reset timer
  if (instance.timerId) {
    clearTimeout(instance.timerId);
    instance.timerId = null;
  }

  const duration = mergedOptions.duration !== undefined ? mergedOptions.duration : (type === 'loading' ? 0 : state.config.toastDuration);
  if (duration > 0) {
    instance.timerId = setTimeout(() => {
      closeToast(instance.id);
    }, duration);
  }
}

/**
 * Closes and removes a toast notification.
 */
export function closeToast(instanceId: string, immediate = false): void {
  const instance = state.activeToasts.get(instanceId);
  if (!instance) return;

  if (instance.isClosing && !immediate) return;
  instance.isClosing = true;

  if (instance.timerId) {
    clearTimeout(instance.timerId);
    instance.timerId = null;
  }

  const cleanup = () => {
    if (instance.element && instance.element.parentNode) {
      instance.element.parentNode.removeChild(instance.element);
    }

    if (typeof instance.options.onClose === 'function') {
      instance.options.onClose(instance.id);
    }

    state.activeToasts.delete(instanceId);
  };

  if (immediate) {
    cleanup();
    return;
  }

  if (instance.element && instance.element.classList) {
    instance.element.classList.remove('sa-visible');
  }

  setTimeout(cleanup, 200);
}
