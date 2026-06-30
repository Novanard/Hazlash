# Hazlash

Hazlash is a Hebrew Expo app for easing back into a daily routine through small, realistic actions. The app helps users check in with their current capacity, receive a manageable set of daily tasks, track progress over time, and optionally focus on sleep and physical activity habits.

The product is built as a React Native app with Expo Router and is intended to run on Android, iOS, and web.

## Features

- Daily check-in for sleep, focus, energy, and stress.
- Personalized daily task recommendations based on the check-in state.
- Home dashboard with today's tasks, completion percentage, streak, sleep status, and weekly activity progress.
- Manual task creation, completion, removal, and end-of-day saving.
- Daily history screen with saved progress and completed task details.
- Focus areas for sleep and physical activity.
- Sleep setup with bedtime, wake-up time, and reminder preferences.
- Sleep check-in with a calculated sleep score.
- Sports setup with a weekly workout goal and end-of-day activity tracking.
- Local-first persistence using `@react-native-async-storage/async-storage`.

## Tech Stack

- Expo 54
- React 19
- React Native 0.81
- Expo Router 6
- TypeScript
- React Native SVG
- AsyncStorage

## Project Structure

```text
Hazlash/
  assets/                 App icons, splash assets, and images
  scripts/                Project helper scripts
  src/
    app/                  Expo Router screens
      index.tsx           Home dashboard
      checkin.tsx         Daily check-in
      recommendation.tsx  Daily recommendation flow
      daysHistory.tsx     Saved day history
      focusAreas.tsx      Focus area selection
      sleepSetup.tsx      Sleep settings
      sleepCheckin.tsx    Sleep check-in
      sportsSetup.tsx     Sports settings
    components/           Shared UI components
    constants/            Theme constants
    hooks/                Theme and platform hooks
```

## Requirements

- Node.js 20 or newer is recommended.
- npm.
- Expo Go on a physical Android/iOS device if you want to run the app on your phone.

## Getting Started

Clone the repository:

```bash
git clone <repository-url>
cd Hazlash
```

Install dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npm start
```

Then choose one of the options shown in the terminal:

- For web: open the localhost URL printed by Expo, usually `http://localhost:8081`.
- For phone: press `s` in the Expo terminal to switch to Expo Go mode, then scan the QR code with the Expo Go app.

You can also run platform-specific commands:

```bash
npm run android
npm run ios
npm run web
```

## Available Scripts

```bash
npm start
```

Starts the Expo development server.

```bash
npm run android
```

Starts Expo and opens the app on Android.

```bash
npm run ios
```

Starts Expo and opens the app on iOS.

```bash
npm run web
```

Starts the web version of the app.

```bash
npm run lint
```

Runs Expo lint checks.

## Data Storage

Hazlash currently stores user data locally on the device/browser using AsyncStorage. This includes:

- Today's tasks.
- Saved daily history.
- Focus area settings.
- Sleep settings and sleep check-in history.
- Sports settings and weekly activity progress.

There is no backend server in the current version, so data is not synced between devices.

## Running the App

Hazlash is meant to be run through Expo during development/demo.

1. Open the project in your IDE.
2. Run `npm install`.
3. Run `npx expo start`.
4. To use the web version, open the localhost link shown in the terminal.
5. To use a phone, install Expo Go, press `s` in the Expo terminal to switch to Expo Go, and scan the QR code.

That is all you need for the current version. There is no backend server or production deployment setup required.

## App Configuration

Main Expo configuration lives in `app.json`.

Important fields:

- App name: `hazarash`
- Slug: `hazarash`
- URL scheme: `hazarash`
- Orientation: portrait
- Web output: static
- Splash background: `#208AEF`

Before publishing, confirm the final display name, package/bundle identifiers, icons, and store metadata.

## Notes for Contributors

- The app uses file-based routing through Expo Router.
- Keep screen code inside `src/app`.
- Keep screen styles in `src/app/styles`.
- User-facing state should remain resilient to missing or malformed AsyncStorage values.
- The current product language is Hebrew and the UI is designed around right-to-left content.

## License

This project is licensed under the terms in the `LICENSE` file.
