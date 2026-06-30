import { Colors } from '@/constants/theme';
import { StyleSheet } from 'react-native';

type AppTheme = (typeof Colors)[keyof typeof Colors];

const createSleepSetupStyles = (theme: AppTheme) => StyleSheet.create({
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
    marginTop: 10,
    marginBottom: 6,
  },

  input: {
    backgroundColor: theme.input,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: '700',
    color: theme.text,
  },

  toggleButton: {
    backgroundColor: theme.input,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },

  toggleButtonActive: {
    backgroundColor: theme.backgroundSelected,
  },

  toggleText: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.textSecondary,
  },

  toggleTextActive: {
    color: theme.accentDark,
  },

  reminderRow: {
    flexDirection: 'row-reverse',
    gap: 10,
    marginTop: 8,
  },

  minuteButton: {
    flex: 1,
    backgroundColor: theme.input,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },

  minuteButtonActive: {
    backgroundColor: theme.accent,
  },

  minuteText: {
    color: theme.textSecondary,
    fontWeight: '800',
    fontSize: 13,
  },

  minuteTextActive: {
    color: theme.accentText,
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
});

export default createSleepSetupStyles;
