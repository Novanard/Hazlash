import { Colors } from '@/constants/theme';
import { StyleSheet } from 'react-native';

type AppTheme = (typeof Colors)[keyof typeof Colors];

const createSleepCheckinStyles = (theme: AppTheme) => StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.background,
  },

  content: {
    paddingHorizontal: 22,
    paddingTop: 58,
    paddingBottom: 120,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  backText: {
    color: theme.accentDark,
    fontSize: 16,
    fontWeight: '800',
  },

  logo: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.text,
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.text,
    textAlign: 'right',
    marginTop: 24,
  },

  subtitle: {
    fontSize: 13,
    color: theme.textSecondary,
    textAlign: 'right',
    marginTop: 4,
    marginBottom: 18,
    lineHeight: 20,
  },

  card: {
    backgroundColor: theme.surface,
    borderRadius: 22,
    padding: 16,
    shadowColor: theme.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 16,
  },

  question: {
    fontSize: 17,
    fontWeight: '800',
    color: theme.text,
    textAlign: 'right',
    marginBottom: 12,
  },

  optionsRow: {
    flexDirection: 'row-reverse',
    gap: 10,
  },

  optionButton: {
    flex: 1,
    backgroundColor: theme.input,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },

  optionButtonActive: {
    backgroundColor: theme.accent,
  },

  optionText: {
    color: theme.textSecondary,
    fontSize: 13,
    fontWeight: '800',
  },

  optionTextActive: {
    color: theme.accentText,
  },

  verticalOptions: {
    gap: 10,
  },

  wideOption: {
    backgroundColor: theme.input,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },

  saveButton: {
    backgroundColor: theme.accent,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },

  saveButtonText: {
    color: theme.accentText,
    fontWeight: '700',
    fontSize: 13,
  },

  saveMessage: {
    marginTop: 10,
    color: theme.accentDark,
    fontWeight: '800',
    fontSize: 13,
    textAlign: 'center',
  },
});

export default createSleepCheckinStyles;
