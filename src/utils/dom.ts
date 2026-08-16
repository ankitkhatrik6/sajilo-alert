import { DEFAULT_STYLES } from '../themes/styles';

let stylesInjected = false;
let previousActiveElement: HTMLElement | null = null;

/**
 * Injects SajiloAlert styles into the document head if not already injected.
 */
export function injectStyles(): void {
  if (typeof document === 'undefined' || stylesInjected) return;

  const existing = document.getElementById('sajilo-alert-styles');
  if (existing) {
    stylesInjected = true;
    return;
  }

  try {
    const styleEl = document.createElement('style');
    styleEl.id = 'sajilo-alert-styles';
    styleEl.textContent = DEFAULT_STYLES;
    document.head.appendChild(styleEl);
    stylesInjected = true;
  } catch {
    // Ignore in non-browser or strict CSP environments
  }
}

/**
 * Escapes plain text for safe HTML rendering
 */
export function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Saves currently focused element before opening modal
 */
export function saveFocus(): void {
  if (typeof document !== 'undefined') {
    previousActiveElement = document.activeElement as HTMLElement | null;
  }
}

/**
 * Restores focus to the previously focused element
 */
export function restoreFocus(): void {
  if (typeof document !== 'undefined' && previousActiveElement && typeof previousActiveElement.focus === 'function') {
    try {
      previousActiveElement.focus();
    } catch {
      // Ignore if element is detached
    }
    previousActiveElement = null;
  }
}

/**
 * Traps Tab and Shift+Tab focus inside a container
 */
export function setupFocusTrap(container: HTMLElement): () => void {
  const focusableSelector =
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key !== 'Tab') return;

    const focusableElements = Array.from(
      container.querySelectorAll<HTMLElement>(focusableSelector)
    ).filter((el) => el.offsetParent !== null || el.offsetWidth > 0 || el.offsetHeight > 0);

    if (focusableElements.length === 0) {
      e.preventDefault();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement || !container.contains(document.activeElement)) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement || !container.contains(document.activeElement)) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  container.addEventListener('keydown', handleKeyDown);

  // Auto-focus first meaningful interactive element or container
  setTimeout(() => {
    const focusable = container.querySelectorAll<HTMLElement>(focusableSelector);
    // Prefer primary button or confirm button, otherwise first focusable
    const primaryBtn = container.querySelector<HTMLElement>('.sa-btn-primary') || container.querySelector<HTMLElement>('.sa-btn');
    if (primaryBtn) {
      primaryBtn.focus();
    } else if (focusable.length > 0) {
      focusable[0].focus();
    } else {
      container.setAttribute('tabindex', '-1');
      container.focus();
    }
  }, 30);

  return () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
}
