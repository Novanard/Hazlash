import { Colors } from '@/constants/theme';
import { StyleSheet} from 'react-native';

type AppTheme = (typeof Colors)[keyof typeof Colors];

const createCheckinStyles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  content: {
    padding: 24,
    paddingTop: 64,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  badge: {
    backgroundColor: theme.surfaceMuted,
    color: theme.accentDark,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    fontWeight: '800',
    marginBottom: 14,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: theme.text,
    textAlign: 'right',
    lineHeight: 38,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    color: theme.textSecondary,
    textAlign: 'right',
    lineHeight: 24,
  },
  card: {
    backgroundColor: theme.surface,
    borderRadius: 22,
    padding: 18,
    marginTop: 14,
    borderWidth: 1,
    borderColor: theme.border,
  },
  questionTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: theme.text,
    textAlign: 'right',
  },
  questionSubtitle: {
    marginTop: 5,
    fontSize: 14,
    color: theme.textSecondary,
    textAlign: 'right',
  },
  optionsRow: {
    flexDirection: 'row-reverse',
    gap: 10,
    marginTop: 14,
  },
  option: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 15,
    backgroundColor: theme.input,
    borderWidth: 1,
    borderColor: theme.border,
    alignItems: 'center',
  },
  optionSelected: {
    backgroundColor: theme.accent,
    borderColor: theme.accent,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.text,
  },
  optionTextSelected: {
    color: theme.accentText,
  },
  mainButton: {
    marginTop: 24,
    backgroundColor: theme.accent,
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: 'center',
  },
  mainButtonText: {
    color: theme.accentText,
    fontSize: 17,
    fontWeight: '900',
  },
  secondaryButton: {
    marginTop: 14,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: theme.accentDark,
    fontSize: 15,
    fontWeight: '800',
  },
});
export default createCheckinStyles;
