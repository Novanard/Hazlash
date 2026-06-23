import { StyleSheet } from 'react-native';

const sportsSetupStyles = StyleSheet.create({
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
    backgroundColor: '#F4EFE4',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },

  goalButtonActive: {
    backgroundColor: '#8EAA8C',
  },

  goalText: {
    color: '#746A5D',
    fontSize: 15,
    fontWeight: '900',
  },

  goalTextActive: {
    color: '#FFFFFF',
  },

  helperText: {
    marginTop: 14,
    fontSize: 13,
    lineHeight: 19,
    color: '#8A8174',
    textAlign: 'right',
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

  turnOffButton: {
    backgroundColor: '#FFFDF7',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#7B4F3A',
  },

  turnOffButtonText: {
    color: '#7B4F3A',
    fontWeight: '800',
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

export default sportsSetupStyles;