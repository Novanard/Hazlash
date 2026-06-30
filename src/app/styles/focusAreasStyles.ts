import { Colors } from '@/constants/theme';
import { StyleSheet } from 'react-native';

type AppTheme = (typeof Colors)[keyof typeof Colors];

const createFocusAreasStyles = (theme: AppTheme) => StyleSheet.create({
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
    justifyContent: 'flex-end',
    alignItems: 'center',
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

  list: {
    gap: 14,
  },

  areaCard: {
    backgroundColor: theme.surface,
    borderRadius: 22,
    padding: 16,
    shadowColor: theme.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'transparent',
  },

  areaCardActive: {
    backgroundColor: theme.backgroundSelected,
    borderColor: theme.accent,
  },

  areaCardDisabled: {
    opacity: 0.55,
  },

  areaHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  areaTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: theme.text,
    textAlign: 'right',
  },

  statusText: {
    fontSize: 12,
    fontWeight: '800',
    color: theme.textSecondary,
  },

  statusTextActive: {
    color: theme.accentDark,
  },

  areaDescription: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 18,
    color: theme.textSecondary,
    textAlign: 'right',
  },

  note: {
    marginTop: 20,
    backgroundColor: theme.backgroundSelected,
    borderRadius: 18,
    padding: 16,
    fontSize: 13,
    lineHeight: 20,
    color: theme.textSecondary,
    textAlign: 'right',
    fontWeight: '600',
  },

  backButton: {
    backgroundColor: theme.accent,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 22,
  },

  backButtonText: {
    color: theme.accentText,
    fontSize: 16,
    fontWeight: '900',
  },
});

export default createFocusAreasStyles;
