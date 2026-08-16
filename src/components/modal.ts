import type { AlertOptions, AlertInstance } from '../core/types';
import { state } from '../core/state';
import { getLocaleString } from '../locales';
import { getIcon } from '../utils/icons';
import { escapeHtml, injectStyles, saveFocus, restoreFocus, setupFocusTrap } from '../utils/dom';

/**
 * Creates or updates a modal dialog in the DOM.
 */
export function createModal(
  options: AlertOptions,
  instanceId: string,
  resolveConfirm?: (value: boolean) => void
): AlertInstance {
  if (typeof document === 'undefined') {
    // SSR fallback dummy instance
    return {
      id: instanceId,
      options,
      element: {} as HTMLElement,
      resolveConfirm,
    };
  }

  injectStyles();

  // If a modal is already active and has the same ID, update it
  if (state.activeModal && state.activeModal.id === instanceId) {
    updateModal(state.activeModal, options);
    return state.activeModal;
  }

  // If a different modal is already active, remove it immediately
  if (state.activeModal) {
    const oldModal = state.activeModal;
    if (oldModal.timerId) clearTimeout(oldModal.timerId);
    const cleanup = (oldModal.element as unknown as { _saCleanup?: () => void })._saCleanup;
    if (cleanup) cleanup();
    if (oldModal.element && oldModal.element.parentNode) {
      oldModal.element.parentNode.removeChild(oldModal.element);
    }
    if (oldModal.resolveConfirm) {
      oldModal.resolveConfirm(false);
    }
    state.activeModal = null;
  }

  saveFocus();

  const theme = options.theme || state.config.theme;
  const position = options.position || state.config.position;
  const lang = state.config.language;
  const type = options.type || 'info';
  const closeOnEscape = options.closeOnEscape !== undefined ? options.closeOnEscape : state.config.closeOnEscape;
  const closeOnBackdrop = options.closeOnBackdrop !== undefined ? options.closeOnBackdrop : state.config.closeOnBackdrop;
  const showClose = options.showClose !== undefined ? options.showClose : (type !== 'loading');

  // Determine title and message
  let title = options.title;
  let message = options.message;
  if (!title && !message && !options.html) {
    if (type === 'success') title = getLocaleString(lang, 'success');
    else if (type === 'error') title = getLocaleString(lang, 'error');
    else if (type === 'warning') title = getLocaleString(lang, 'warning');
    else if (type === 'info') title = getLocaleString(lang, 'info');
    else if (type === 'loading') title = getLocaleString(lang, 'loading');
    else if (type === 'confirm') title = getLocaleString(lang, 'confirm');
  }

  // Create backdrop overlay
  const backdrop = document.createElement('div');
  backdrop.id = `sa-backdrop-${instanceId}`;
  backdrop.className = `sa-backdrop sa-pos-${position} sa-theme-${theme}`;

  // Create modal container
  const modal = document.createElement('div');
  modal.id = `sa-modal-${instanceId}`;
  modal.className = 'sa-modal';
  modal.setAttribute('role', type === 'confirm' || type === 'error' ? 'alertdialog' : 'dialog');
  modal.setAttribute('aria-modal', 'true');

  const titleId = `sa-title-${instanceId}`;
  const msgId = `sa-msg-${instanceId}`;

  // Build Icon HTML
  const iconWrapper = document.createElement('div');
  iconWrapper.className = `sa-icon-wrapper sa-icon-type-${type}`;
  iconWrapper.innerHTML = getIcon(type, options.customIcon);
  modal.appendChild(iconWrapper);

  // Build Close Button HTML
  if (showClose) {
    const closeBtn = document.createElement('button');
    closeBtn.className = 'sa-close-btn';
    closeBtn.setAttribute('type', 'button');
    closeBtn.setAttribute('aria-label', getLocaleString(lang, 'close'));
    closeBtn.innerHTML = getIcon('close');
    closeBtn.onclick = (e) => {
      e.stopPropagation();
      closeModal(instanceId, false);
    };
    modal.appendChild(closeBtn);
  }

  // Build Title
  if (title) {
    const titleEl = document.createElement('h2');
    titleEl.id = titleId;
    titleEl.className = 'sa-title';
    titleEl.textContent = title;
    modal.setAttribute('aria-labelledby', titleId);
    modal.appendChild(titleEl);
  }

  // Build Message / Content
  if (options.html) {
    const msgEl = document.createElement('div');
    msgEl.id = msgId;
    msgEl.className = 'sa-message';
    msgEl.innerHTML = options.html;
    modal.setAttribute('aria-describedby', msgId);
    modal.appendChild(msgEl);
  } else if (message) {
    const msgEl = document.createElement('p');
    msgEl.id = msgId;
    msgEl.className = 'sa-message';
    msgEl.textContent = message;
    modal.setAttribute('aria-describedby', msgId);
    modal.appendChild(msgEl);
  }

  // Build Actions
  const actionsEl = document.createElement('div');
  actionsEl.className = 'sa-actions';

  if (type === 'confirm') {
    const confirmBtn = document.createElement('button');
    confirmBtn.className = 'sa-btn sa-btn-primary';
    confirmBtn.type = 'button';
    confirmBtn.textContent = options.confirmText || getLocaleString(lang, 'confirm');
    confirmBtn.onclick = () => {
      closeModal(instanceId, true);
    };

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'sa-btn sa-btn-secondary';
    cancelBtn.type = 'button';
    cancelBtn.textContent = options.cancelText || getLocaleString(lang, 'cancel');
    cancelBtn.onclick = () => {
      closeModal(instanceId, false);
    };

    actionsEl.appendChild(cancelBtn);
    actionsEl.appendChild(confirmBtn);
    modal.appendChild(actionsEl);
  } else if (type === 'action') {
    const actionBtn = document.createElement('button');
    actionBtn.className = 'sa-btn sa-btn-primary';
    actionBtn.type = 'button';
    actionBtn.textContent = options.actionText || getLocaleString(lang, 'action');
    actionBtn.onclick = () => {
      if (typeof options.onAction === 'function') {
        options.onAction();
      }
      closeModal(instanceId, true);
    };

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'sa-btn sa-btn-secondary';
    cancelBtn.type = 'button';
    cancelBtn.textContent = options.cancelText || getLocaleString(lang, 'cancel');
    cancelBtn.onclick = () => {
      closeModal(instanceId, false);
    };

    actionsEl.appendChild(cancelBtn);
    actionsEl.appendChild(actionBtn);
    modal.appendChild(actionsEl);
  } else if (type !== 'loading') {
    // Normal modal OK button
    const okBtn = document.createElement('button');
    okBtn.className = 'sa-btn sa-btn-primary';
    okBtn.type = 'button';
    okBtn.textContent = options.confirmText || getLocaleString(lang, 'close');
    okBtn.onclick = () => {
      closeModal(instanceId, true);
    };
    actionsEl.appendChild(okBtn);
    modal.appendChild(actionsEl);
  }

  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

  // Animate in
  requestAnimationFrame(() => {
    backdrop.classList.add('sa-visible');
  });

  // Focus trap
  const cleanupTrap = setupFocusTrap(modal);

  // Setup Keydown for Escape
  const keydownListener = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && closeOnEscape) {
      e.preventDefault();
      closeModal(instanceId, false);
    }
  };
  document.addEventListener('keydown', keydownListener);

  // Backdrop click listener
  backdrop.onclick = (e) => {
    if (e.target === backdrop && closeOnBackdrop) {
      closeModal(instanceId, false);
    }
  };

  // Timer for auto-close if duration is set
  let timerId: ReturnType<typeof setTimeout> | null = null;
  if (options.duration && options.duration > 0) {
    timerId = setTimeout(() => {
      closeModal(instanceId, false);
    }, options.duration);
  }

  const instance: AlertInstance = {
    id: instanceId,
    options,
    element: backdrop,
    timerId,
    resolveConfirm,
  };

  // Store cleanup data on DOM element for safe detachment
  (backdrop as unknown as { _saCleanup?: () => void })._saCleanup = () => {
    document.removeEventListener('keydown', keydownListener);
    cleanupTrap();
    if (timerId) clearTimeout(timerId);
  };

  state.activeModal = instance;
  return instance;
}

/**
 * Updates an active modal in place with new options.
 */
export function updateModal(instance: AlertInstance, newOptions: Partial<AlertOptions>): void {
  if (!instance.element || !instance.element.parentNode) return;

  const mergedOptions: AlertOptions = { ...instance.options, ...newOptions };
  instance.options = mergedOptions;

  const type = mergedOptions.type || 'info';
  const lang = state.config.language;
  const theme = mergedOptions.theme || state.config.theme;
  const position = mergedOptions.position || state.config.position;

  // Update theme & position classes
  instance.element.className = `sa-backdrop sa-pos-${position} sa-theme-${theme} sa-visible`;

  const modal = instance.element.querySelector<HTMLElement>('.sa-modal');
  if (!modal) return;

  // Update icon
  const iconWrapper = modal.querySelector<HTMLElement>('.sa-icon-wrapper');
  if (iconWrapper) {
    iconWrapper.className = `sa-icon-wrapper sa-icon-type-${type}`;
    iconWrapper.innerHTML = getIcon(type, mergedOptions.customIcon);
  }

  // Update title
  let title = mergedOptions.title;
  let message = mergedOptions.message;
  if (!title && !message && !mergedOptions.html) {
    if (type === 'success') title = getLocaleString(lang, 'success');
    else if (type === 'error') title = getLocaleString(lang, 'error');
    else if (type === 'warning') title = getLocaleString(lang, 'warning');
    else if (type === 'info') title = getLocaleString(lang, 'info');
    else if (type === 'loading') title = getLocaleString(lang, 'loading');
  }

  const titleEl = modal.querySelector<HTMLElement>('.sa-title');
  if (titleEl && title) {
    titleEl.textContent = title;
  } else if (!titleEl && title) {
    const newTitle = document.createElement('h2');
    newTitle.className = 'sa-title';
    newTitle.textContent = title;
    modal.insertBefore(newTitle, modal.querySelector('.sa-message') || modal.querySelector('.sa-actions'));
  }

  // Update message
  const msgEl = modal.querySelector<HTMLElement>('.sa-message');
  if (msgEl) {
    if (mergedOptions.html) {
      msgEl.innerHTML = mergedOptions.html;
    } else if (message) {
      msgEl.textContent = message;
    }
  }

  // If new duration specified or converted from loading to success/error, set timer
  if (instance.timerId) {
    clearTimeout(instance.timerId);
    instance.timerId = null;
  }

  const duration = mergedOptions.duration !== undefined ? mergedOptions.duration : (type === 'loading' ? 0 : state.config.duration);
  if (duration > 0) {
    instance.timerId = setTimeout(() => {
      closeModal(instance.id, false);
    }, duration);
  }
}

/**
 * Closes an active modal and resolves any pending confirmation Promise.
 */
export function closeModal(instanceId?: string, resolvedValue = false): void {
  if (!state.activeModal) return;

  if (instanceId && state.activeModal.id !== instanceId) {
    return;
  }

  const instance = state.activeModal;
  if (instance.isClosing) return;
  instance.isClosing = true;

  if (instance.timerId) {
    clearTimeout(instance.timerId);
    instance.timerId = null;
  }

  // Run cleanup handler
  const cleanup = (instance.element as unknown as { _saCleanup?: () => void })._saCleanup;
  if (cleanup) cleanup();

  // Animate out
  if (instance.element && instance.element.classList) {
    instance.element.classList.remove('sa-visible');
  }

  setTimeout(() => {
    if (instance.element && instance.element.parentNode) {
      instance.element.parentNode.removeChild(instance.element);
    }
    restoreFocus();

    if (typeof instance.options.onClose === 'function') {
      instance.options.onClose(instance.id);
    }

    if (instance.resolveConfirm) {
      instance.resolveConfirm(resolvedValue);
      instance.resolveConfirm = undefined;
    }

    if (state.activeModal && state.activeModal.id === instance.id) {
      state.activeModal = null;
    }
  }, 200);
}
