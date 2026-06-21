import { StyleSheet} from 'react-native';
const COLORS = {
  bg: '#F4EFE4',
  card: '#FFFFFF',
  text: '#1F2933',
  muted: '#6B7280',
  primary: '#8EAA8C',
  primaryDark: '#5F7F5F',
  border: '#E2D8C8',
};
const checkinStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
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
    backgroundColor: '#E8DED0',
    color: COLORS.primaryDark,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    fontWeight: '800',
    marginBottom: 14,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: COLORS.text,
    textAlign: 'right',
    lineHeight: 38,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.muted,
    textAlign: 'right',
    lineHeight: 24,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: 18,
    marginTop: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  questionTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: COLORS.text,
    textAlign: 'right',
  },
  questionSubtitle: {
    marginTop: 5,
    fontSize: 14,
    color: COLORS.muted,
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
    backgroundColor: '#F8F5EF',
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  optionSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.text,
  },
  optionTextSelected: {
    color: '#FFFFFF',
  },
  mainButton: {
    marginTop: 24,
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: 'center',
  },
  mainButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
  },
  secondaryButton: {
    marginTop: 14,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: COLORS.primaryDark,
    fontSize: 15,
    fontWeight: '800',
  },
});
export default checkinStyles;