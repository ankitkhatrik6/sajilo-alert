# SajiloAlert

I built SajiloAlert to provide a lightweight, accessible, zero-dependency JavaScript and TypeScript alert, modal, confirmation, loading, and toast notification library. It is inspired by SweetAlert but designed with a clean Nepali visual identity and bilingual support.

[![npm version](https://img.shields.io/badge/npm-v1.0.0-blue.svg)](https://www.npmjs.com/package/sajilo-alert)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-success.svg)](https://bundlephobia.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6.svg)](https://www.typescriptlang.org/)

## Features

- **Nepali and English Support**: Default Nepali system labels with instant language switching.
- **Zero Runtime Dependencies**: Pure TypeScript and standard DOM APIs with embedded CSS.
- **4 Built-in Themes**: Nepal (Himalayan Crimson and Navy), Light, Dark, and Minimal.
- **Dual Mode**: Center dialog modals and stacked toast notifications.
- **Async Promises**: Simple promise pipeline with auto loading, success, and error states.
- **Confirmation Dialog**: Clean confirmation returning a boolean promise.
- **Undo and Action Alerts**: Built-in undo notification with single-execution guarantees.
- **Accessible**: Full ARIA roles, focus trap, Escape key dismiss, and focus restoration.
- **Fully Responsive**: Mobile-first design.

## Installation

```bash
npm install sajilo-alert
```

## Quick Start

```typescript
import { alert } from "sajilo-alert";

// Simple success alert
alert.success("काम सफल भयो!");
```

SajiloAlert works anywhere: Vanilla JS, TypeScript, React, Next.js, Vue, Svelte, and Vite.

## Basic Usage

```typescript
import { alert } from "sajilo-alert";

alert.success("Success message here");
alert.error("Error message here");
alert.warning("Warning message here");
alert.info("Info message here");
alert.loading("Loading message here");
```

## Confirmation Dialog

```typescript
const confirmed = await alert.confirm({
  title: "Delete Account?",
  message: "This action cannot be undone.",
  confirmText: "Delete",
  cancelText: "Cancel"
});

if (confirmed) {
  // User confirmed action
}
```

## Promise Support

Handle async operations seamlessly:

```typescript
await alert.promise(fetchData(), {
  loading: "Loading data...",
  success: (data) => `Data received: ${data.name}!`,
  error: "Failed to load data!"
});
```

## Toast Notifications

Small, non-blocking toast notifications that stack and auto-dismiss:

```typescript
alert.toast.success("Saved successfully!");
alert.toast.error("Network disconnected!");
```

## Configuration and Themes

Configure globally or per-alert. Available themes are nepal, light, dark, and minimal.

```typescript
alert.configure({
  theme: "nepal",
  language: "ne"
});
```

## License

[MIT](LICENSE) (c) 2026 Ankit Khatri KC
