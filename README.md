# Pintu Mobile App for Technical Assesment

## Penjelasan Tentang App

App ini dibuat menggunakan Boilerplate dari Infinite Red, bernama [Ignite](https://github.com/infinitered/ignite). Beberapa bagian dari boilerplate sudah dihapus karena memang tidak diperlukan semuanya (untuk projek ini).

Library tambahan:

- [Native Base (UI Library)](https://nativebase.io/)
- [React Query (Data Fetching)](https://react-query-v3.tanstack.com/)

## Untuk Menjalankan App

1. Run `yarn` untuk install dependencies menggunakan Yarn
2. Run `yarn android` untuk install debug applikasi di perangkat Android
3. Run `yarn start` untuk menjalankan metro agar dapat menjalankan program

## The latest and greatest boilerplate for Infinite Red opinions

This is the boilerplate that [Infinite Red](https://infinite.red) uses as a way to test bleeding-edge changes to our React Native stack.

Currently includes:

- React Native
- React Navigation
- MobX State Tree
- TypeScript
- And more!

### ./app directory

The inside of the `app` directory looks similar to the following:

```
app
├── components
├── config
├── models (MobX)
├── navigators (React Navigation)
├── screens
├── services
├── utils
├── app.tsx
```

**components**
This is where your reusable components live which help you build your screens.

**models**
This is where your app's models will live. Each model has a directory which will contain the `mobx-state-tree` model file, test file, and any other supporting files like actions, types, etc.

**navigators**
This is where your `react-navigation` navigators will live.

**screens**
This is where your screen components will live. A screen is a React component which will take up the entire screen and be part of the navigation hierarchy. Each screen will have a directory containing the `.tsx` file, along with any assets or other helper files.

**services**
Any services that interface with the outside world will live here (think REST APIs, Push Notifications, etc.).

**utils**
This is a great place to put miscellaneous helpers and utilities. Things like date helpers, formatters, etc. are often found here. However, it should only be used for things that are truly shared across your application. If a helper or utility is only used by a specific component or model, consider co-locating your helper with that component or model.

**app.tsx** This is the entry point to your app. This is where you will find the main App component which renders the rest of the application.

### ./ignite directory

The `ignite` directory stores all things Ignite, including CLI and boilerplate items. Here you will find templates you can customize to help you get started with React Native.

### ./test directory

This directory will hold your Jest configs and mocks.

## Running Detox end-to-end tests

Read [Detox setup instructions](./detox/README.md).
