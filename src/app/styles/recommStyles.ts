import { StyleSheet } from "react-native";
const recStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4EFE4',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'right',
    marginBottom: 25,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },
  text: {
    textAlign: 'right',
    marginBottom: 15,
    fontSize: 17,
    lineHeight: 28,
  },
  button: {
    backgroundColor: '#8EAA8C',
    padding: 18,
    borderRadius: 16,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
  },
});
export default recStyles;