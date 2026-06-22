import { StyleSheet } from "react-native";
const dHistoryStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F4EFE4',
  },
  content: {
    padding: 22,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#2F332C',
    textAlign: 'right',
  },
  subtitle: {
    fontSize: 15,
    color: '#8A8174',
    textAlign: 'right',
    marginTop: 8,
    marginBottom: 18,
    lineHeight: 22,
  },
  emptyCard: {
    backgroundColor: '#FFFDF7',
    borderRadius: 22,
    padding: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#34382F',
    textAlign: 'right',
  },
  emptyText: {
    fontSize: 14,
    color: '#8A8174',
    textAlign: 'right',
    marginTop: 8,
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#FFFDF7',
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
  },
  date: {
    fontSize: 17,
    fontWeight: '900',
    color: '#34382F',
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
    color: '#6F8F6D',
  },
  summary: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8A8174',
  },
  bar: {
    height: 9,
    backgroundColor: '#E2D8C8',
    borderRadius: 999,
    overflow: 'hidden',
    marginTop: 12,
    marginBottom: 12,
  },
  barFill: {
    height: '100%',
    backgroundColor: '#8EAA8C',
    borderRadius: 999,
  },
  taskList: {
    gap: 7,
    marginTop: 4,
  },
  taskText: {
    fontSize: 14,
    color: '#4E473E',
    textAlign: 'right',
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#8EAA8C',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  backButtonText: {
    color: '#FFFFFF',
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
  color: '#7B4F3A',
  fontWeight: '900',
  fontSize: 13,
},
sleepScore: {
  marginTop: 6,
  fontSize: 13,
  color: '#6F8F6D',
  fontWeight: '800',
  textAlign: 'right',
},
});
export default dHistoryStyles;