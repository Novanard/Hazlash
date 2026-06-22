import { StyleSheet } from 'react-native';

const focusAreasStyles = StyleSheet.create({
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

  list: {
    gap: 14,
  },

  areaCard: {
    backgroundColor: '#FFFDF7',
    borderRadius: 22,
    padding: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'transparent',
  },

  areaCardActive: {
    backgroundColor: '#E6D8BD',
    borderColor: '#8EAA8C',
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
    color: '#34382F',
    textAlign: 'right',
  },

  statusText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#8A8174',
  },

  statusTextActive: {
    color: '#6F8F6D',
  },

  areaDescription: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 18,
    color: '#8A8174',
    textAlign: 'right',
  },

  note: {
    marginTop: 20,
    backgroundColor: '#E6D8BD',
    borderRadius: 18,
    padding: 16,
    fontSize: 13,
    lineHeight: 20,
    color: '#746A5D',
    textAlign: 'right',
    fontWeight: '600',
  },
});

export default focusAreasStyles;