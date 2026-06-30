/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#000000',
    background: '#F4EFE4',
    backgroundElement: '#FFFDF7',
    backgroundSelected: '#E6D8BD',
    textSecondary: '#8A8174',
    surface: '#FFFDF7',
    surfaceMuted: '#EFE8DA',
    accent: '#8EAA8C',
    accentText: '#FFFFFF',
    accentDark: '#6F8F6D',
    border: '#E2D8C8',
    danger: '#7B4F3A',
    shadow: '#000000',
    input: '#F4EFE4',
  },
  dark: {
    text: '#F7F1E8',
    background: '#171A16',
    backgroundElement: '#23281F',
    backgroundSelected: '#3A3326',
    textSecondary: '#B8B0A3',
    surface: '#23281F',
    surfaceMuted: '#2F3529',
    accent: '#8EAA8C',
    accentText: '#11140F',
    accentDark: '#B6C8A8',
    border: '#464032',
    danger: '#E0A38E',
    shadow: '#000000',
    input: '#1D211A',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
