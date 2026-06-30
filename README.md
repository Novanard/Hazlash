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
- Expo Go on a physical Android/iOS device, or Android Studio/Xcode simulators.

For native production builds, you will also need an Expo account and EAS CLI.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npm start
```

Then choose one of the options shown in the terminal:

- Press `a` to open Android.
- Press `i` to open iOS.
- Press `w` to open the web version.
- Scan the QR code with Expo Go on your phone.

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

## Deployment

### Deploy as a Web App

The Expo config is already set to static web output:

```json
"web": {
  "output": "static"
}
```

Create a static web build:

```bash
npx expo export --platform web
```

Expo will generate a `dist/` folder. Deploy that folder to a static hosting provider such as Vercel, Netlify, GitHub Pages, or Firebase Hosting.

Example Netlify setup:

- Build command: `npx expo export --platform web`
- Publish directory: `dist`

Example Vercel setup:

- Framework preset: Other
- Build command: `npx expo export --platform web`
- Output directory: `dist`

### Deploy Native Builds with EAS

Install EAS CLI:

```bash
npm install -g eas-cli
```

Log in to Expo:

```bash
eas login
```

Configure the project:

```bash
eas build:configure
```

Create an Android build:

```bash
eas build --platform android
```

Create an iOS build:

```bash
eas build --platform ios
```

Create builds for both platforms:

```bash
eas build --platform all
```

After the build finishes, Expo will provide a download/install link. For app store releases, follow Expo's EAS Submit flow:

```bash
eas submit --platform android
eas submit --platform ios
```

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
