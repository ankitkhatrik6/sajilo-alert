<div align="center">

# SajiloAlert

**A lightweight, accessible, zero-dependency JavaScript & TypeScript library for alerts, modals, confirmations, loaders, and toast notifications.**

<p>
  <a href="https://www.npmjs.com/package/sajilo-alert"><img src="https://img.shields.io/npm/v/sajilo-alert?style=for-the-badge&color=D42B2B&label=npm" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/sajilo-alert"><img src="https://img.shields.io/npm/dm/sajilo-alert?style=for-the-badge&color=D42B2B&label=downloads" alt="NPM Downloads" /></a>
  <a href="https://bundlephobia.com/package/sajilo-alert"><img src="https://img.shields.io/bundlephobia/minzip/sajilo-alert?style=for-the-badge&color=D42B2B&label=size" alt="Bundle Size" /></a>
  <a href="https://github.com/ankitkhatrik6/sajilo-alert/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/sajilo-alert?style=for-the-badge&color=D42B2B&label=license" alt="MIT License" /></a>
</p>

<p>
  <img src="https://img.shields.io/badge/types-included-D42B2B?style=for-the-badge&logo=typescript&logoColor=white" alt="Types Included" />
  <img src="https://img.shields.io/badge/dependencies-zero-D42B2B?style=for-the-badge" alt="Zero Dependencies" />
  <img src="https://img.shields.io/github/stars/ankitkhatrik6/sajilo-alert?style=for-the-badge&color=D42B2B&label=stars" alt="GitHub Stars" />
  <img src="https://img.shields.io/badge/PRs-welcome-D42B2B?style=for-the-badge" alt="PRs Welcome" />
</p>

</div>

---

## Overview

SajiloAlert delivers seamless notifications and dialogs without the overhead of heavy dependencies. Inspired by standard alert libraries, it introduces a clean aesthetic, comprehensive accessibility support, and native bilingual labeling in English and Nepali.

It is completely framework-agnostic and works out of the box in **Vanilla JS**, **React**, **Next.js**, **Vue**, **Svelte**, and **Vite** environments.

---

## Core Features

| Feature | Description |
|---|---|
| **Zero Dependencies** | Built entirely with standard DOM APIs and TypeScript. |
| **Dual Display Modes** | Supports centered modal dialogs and stacked toast notifications. |
| **Asynchronous Pipelines** | Native promise support with automatic transitions between loading, success, and error states. |
| **Bilingual Interface** | Default support for English and Nepali system labels with instant language toggling. |
| **Accessibility Standards** | WAI-ARIA compliant, including focus trapping, Escape key dismissal, and focus restoration. |
| **Theming Engine** | Four built-in themes (Nepal, Light, Dark, Minimal) plus full customization via CSS variables. |

---

## Installation

Install the package using your preferred package manager:

```bash
npm install sajilo-alert
```

```bash
yarn add sajilo-alert
```

```bash
pnpm add sajilo-alert
```

---

## Usage Guide

### Basic Alerts

Trigger simple notifications for standard state indications.

```typescript
import { alert } from "sajilo-alert";

alert.success("Operation completed successfully.");
alert.error("An unexpected error occurred.");
alert.warning("Please check your input data.");
alert.info("A new software update is available.");
alert.loading("Processing your request...");
```

### Confirmation Dialogs

Prompt users for confirmation before executing critical actions. Returns a standard boolean promise.

```typescript
const isConfirmed = await alert.confirm({
  title: "Delete Repository?",
  message: "This action is permanent and cannot be undone.",
  confirmText: "Delete",
  cancelText: "Cancel"
});

if (isConfirmed) {
  // Execute deletion logic
}
```

### Promise Integration

Wrap asynchronous functions to automatically handle loading states and resolution/rejection notifications.

```typescript
await alert.promise(fetchUserData(), {
  loading: "Retrieving user data...",
  success: (data) => `Welcome back, ${data.username}!`,
  error: "Failed to authenticate user."
});
```

### Toast Notifications

Use non-blocking toast notifications for secondary feedback. Toasts stack automatically and dismiss after the configured duration.

```typescript
alert.toast.success("Settings saved successfully.");
alert.toast.error("Network connection lost.");
```

---

## Advanced Configuration

Configure SajiloAlert globally, or pass specific options to individual alert instances.

```typescript
alert.configure({
  theme: "nepal",
  language: "en",
  position: "center",
  toastPosition: "top-right",
  duration: 4000,
  toastDuration: 4000,
  closeOnEscape: true,
  closeOnBackdrop: true,
  maxToasts: 5
});
```

### Available Themes

| Theme | Description |
|---|---|
| `nepal` | Default crimson and navy styling. |
| `light` | Clean, neutral interface. |
| `dark` | High-contrast dark mode. |
| `minimal` | Monochromatic, border-focused design. |

### Language Support

Library-generated system labels (such as "Confirm", "Cancel", "Close") automatically translate based on the active language.

```typescript
// Set language to English
alert.setLanguage("en");

// Set language to Nepali
alert.setLanguage("ne");
```

---

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the [issues page](https://github.com/ankitkhatrik6/sajilo-alert/issues) if you'd like to contribute.

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.


