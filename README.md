<p align="center">
  <a href="https://sajilo-alert.ankitak.com.np/">
    <img alt="SajiloAlert" src="https://sajilo-alert.ankitak.com.np/logo.png" width="150" style="border-radius: 20px;">
  </a>
</p>

<p align="center">
  A beautiful, lightweight, and accessible replacement for JavaScript's "alert".
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/sajilo-alert"><img src="https://img.shields.io/npm/v/sajilo-alert.svg" alt="npm version" height="20"></a>
  <a href="https://bundlephobia.com/package/sajilo-alert"><img src="https://img.shields.io/bundlephobia/minzip/sajilo-alert.svg" alt="Bundle Size" height="20"></a>
  <a href="https://github.com/ankitkhatrik6/sajilo-alert/blob/main/LICENSE"><img src="https://img.shields.io/github/license/ankitkhatrik6/sajilo-alert.svg" alt="License" height="20"></a>
  <img src="https://img.shields.io/badge/dependencies-0-success.svg" alt="Zero Dependencies" height="20">
  <img src="https://img.shields.io/badge/TypeScript-Ready-3178C6.svg" alt="TypeScript" height="20">
</p>


## Installation

```bash
$ npm install sajilo-alert
```

## Usage

```javascript
import { alert } from 'sajilo-alert';

alert.success("काम सफल भयो!");
```

## Documentation

Full documentation, interactive guides, and a live playground are available on the official website:

- [Live Playground & Builder](https://sajilo-alert.ankitak.com.np/#section-playground)
- [Configuration](https://sajilo-alert.ankitak.com.np/#section-customization)
- [Framework Integration (React, Next.js, Vue, Svelte)](https://sajilo-alert.ankitak.com.np/#section-frameworks)

## Examples

### Basic Alerts:
```javascript
alert.success("Operation completed successfully.");
alert.error("An unexpected error occurred.");
alert.warning("Please check your input data.");
alert.info("A new software update is available.");
```

### A confirmation dialog (returns a Promise resolving to a boolean):
  - Using async/await:
  ```javascript
  const isConfirmed = await alert.confirm({
    title: "Delete Account?",
    message: "This action cannot be undone.",
    confirmText: "Delete",
    cancelText: "Cancel"
  });

  if (isConfirmed) {
    alert.success("Account deleted successfully!");
  }
  ```
  - Using promises:
  ```javascript
  alert.confirm({
    title: "Log out?",
    message: "Are you sure you want to log out?"
  })
  .then((isConfirmed) => {
    if (isConfirmed) {
      alert.toast.info("Logged out successfully.");
    }
  });
  ```

### Handling Async Operations with Promises:
```javascript
await alert.promise(fetchData(), {
  loading: "Loading data...",
  success: (data) => `Data received: ${data.name}!`,
  error: "Failed to load data!"
});
```

### Non-blocking Toast Notifications:
```javascript
alert.toast.success("Settings saved successfully.");
alert.toast.error("Network disconnected!");
```

## Theming & Configuration

SajiloAlert comes with 4 built-in themes (`nepal`, `light`, `dark`, `minimal`) and native bilingual support (English and Nepali). 

```javascript
alert.configure({
  theme: "nepal",
  language: "en",       // 'en' or 'ne'
  position: "center",
  duration: 4000,
  closeOnEscape: true
});
```

[Read more about customization and themes](https://sajilo-alert.ankitak.com.np/#section-customization)

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
