import { Colors } from '@/constants/theme';
import { StyleSheet } from "react-native";

type AppTheme = (typeof Colors)[keyof typeof Colors];

const createDHistoryStyles = (theme: AppTheme) => StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.background,
  },
  content: {
    padding: 22,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: theme.text,
    textAlign: 'right',
  },
  subtitle: {
    fontSize: 15,
    color: theme.textSecondary,
    textAlign: 'right',
    marginTop: 8,
    marginBottom: 18,
    lineHeight: 22,
  },
  emptyCard: {
    backgroundColor: theme.surface,
    borderRadius: 22,
    padding: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: theme.text,
    textAlign: 'right',
  },
  emptyText: {
    fontSize: 14,
    color: theme.textSecondary,
    textAlign: 'right',
    marginTop: 8,
    lineHeight: 20,
  },
  card: {
    backgroundColor: theme.surface,
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
  },
  date: {
    fontSize: 17,
    fontWeight: '900',
    color: theme.text,
    textAlign: 'right',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  percent: {
    fontSize: 24,
    fontWeight: '900',
    color: theme.accentDark,
  },
  summary: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.textSecondary,
  },
  bar: {
    height: 9,
    backgroundColor: theme.border,
    borderRadius: 999,
    overflow: 'hidden',
    marginTop: 12,
    marginBottom: 12,
  },
  barFill: {
    height: '100%',
    backgroundColor: theme.accent,
    borderRadius: 999,
  },
  taskList: {
    gap: 7,
    marginTop: 4,
  },
  taskText: {
    fontSize: 14,
    color: theme.text,
    textAlign: 'right',
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: theme.accent,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  backButtonText: {
    color: theme.accentText,
    fontSize: 16,
    fontWeight: '900',
  },
  cardHeader: {
  flexDirection: 'row-reverse',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 10,
},

deleteText: {
  color: theme.danger,
  fontWeight: '900',
  fontSize: 13,
},
sleepScore: {
  marginTop: 6,
  fontSize: 13,
  color: theme.accentDark,
  fontWeight: '800',
  textAlign: 'right',
},
});
export default createDHistoryStyles;
