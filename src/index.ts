import { alert, SajiloAlertManager } from './core/manager';
import { ne } from './locales/ne';
import { en } from './locales/en';
import { locales } from './locales';
import { DEFAULT_STYLES } from './themes/styles';
import { injectStyles } from './utils/dom';

// Export main singleton instance
export { alert, SajiloAlertManager as SajiloAlert, SajiloAlertManager };

// Export locales and utilities
export { ne, en, locales, DEFAULT_STYLES, injectStyles };

// Export all types
export type {
  AlertType,
  Theme,
  Language,
  Position,
  AlertOptions,
  ConfirmOptions,
  PromiseOptions,
  ActionOptions,
  UndoOptions,
  ToastOptions,
  GlobalConfig,
  AlertInstance,
} from './core/types';

export type { LocaleStrings } from './locales/ne';

