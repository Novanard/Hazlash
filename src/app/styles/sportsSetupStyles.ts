import { Colors } from '@/constants/theme';
import { StyleSheet } from 'react-native';

type AppTheme = (typeof Colors)[keyof typeof Colors];

const createSportsSetupStyles = (theme: AppTheme) => StyleSheet.create({
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

  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: theme.text,
    textAlign: 'right',
    marginBottom: 10,
  },

  label: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.textSecondary,
    textAlign: 'right',
    marginTop: 4,
    marginBottom: 10,
  },

  goalGrid: {
    flexDirection: 'row-reverse',
    gap: 10,
    marginTop: 4,
  },

  goalButton: {
    flex: 1,
    backgroundColor: theme.input,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },

  goalButtonActive: {
    backgroundColor: theme.accent,
  },

  goalText: {
    color: theme.textSecondary,
    fontSize: 15,
    fontWeight: '900',
  },

  goalTextActive: {
    color: theme.accentText,
  },

  helperText: {
    marginTop: 14,
    fontSize: 13,
    lineHeight: 19,
    color: theme.textSecondary,
    textAlign: 'right',
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

  turnOffButton: {
    backgroundColor: theme.surface,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: theme.danger,
  },

  turnOffButtonText: {
    color: theme.danger,
    fontWeight: '800',
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

export default createSportsSetupStyles;
