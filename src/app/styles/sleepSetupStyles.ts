import { StyleSheet } from 'react-native';

const sleepSetupStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F4EFE4',
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
    color: '#6F8F6D',
    fontSize: 16,
    fontWeight: '800',
  },

  logo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2F332C',
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2F332C',
    textAlign: 'right',
    marginTop: 24,
  },

  subtitle: {
    fontSize: 13,
    color: '#8A8174',
    textAlign: 'right',
    marginTop: 4,
    marginBottom: 18,
    lineHeight: 20,
  },

  card: {
    backgroundColor: '#FFFDF7',
    borderRadius: 22,
    padding: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 16,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#34382F',
    textAlign: 'right',
    marginBottom: 10,
  },

  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#746A5D',
    textAlign: 'right',
    marginTop: 10,
    marginBottom: 6,
  },

  input: {
    backgroundColor: '#F4EFE4',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: '700',
    color: '#2F332C',
  },

  toggleButton: {
    backgroundColor: '#F4EFE4',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },

  toggleButtonActive: {
    backgroundColor: '#E6D8BD',
  },

  toggleText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#746A5D',
  },

  toggleTextActive: {
    color: '#6F8F6D',
  },

  reminderRow: {
    flexDirection: 'row-reverse',
    gap: 10,
    marginTop: 8,
  },

  minuteButton: {
    flex: 1,
    backgroundColor: '#F4EFE4',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },

  minuteButtonActive: {
    backgroundColor: '#8EAA8C',
  },

  minuteText: {
    color: '#746A5D',
    fontWeight: '800',
    fontSize: 13,
  },

  minuteTextActive: {
    color: '#FFFFFF',
  },

  saveButton: {
    backgroundColor: '#8EAA8C',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },

  saveMessage: {
    marginTop: 10,
    color: '#6F8F6D',
    fontWeight: '800',
    fontSize: 13,
    textAlign: 'center',
  },
});

export default sleepSetupStyles;