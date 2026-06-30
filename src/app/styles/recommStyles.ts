import { Colors } from '@/constants/theme';
import { StyleSheet } from "react-native";

type AppTheme = (typeof Colors)[keyof typeof Colors];

const createRecStyles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'right',
    marginBottom: 25,
    color: theme.text,
  },
  card: {
    backgroundColor: theme.surface,
    borderRadius: 20,
    padding: 20,
  },
  text: {
    textAlign: 'right',
    marginBottom: 15,
    fontSize: 17,
    lineHeight: 28,
    color: theme.text,
  },
  button: {
    backgroundColor: theme.accent,
    padding: 18,
    borderRadius: 16,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.accentText,
    fontWeight: '700',
  },
});
export default createRecStyles;
