import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.bell}>⌕</Text>
        <Text style={styles.logo}>חזר״ש</Text>
      </View>

      <Text style={styles.title}>היום שלי</Text>
      <Text style={styles.subtitle}>חזרה לשגרה בצעדים הדרגתיים.</Text>

      <View style={styles.row}>
        <View style={styles.smallCard}>
          <Text style={styles.cardTitle}>התחייבות</Text>
          <Text style={styles.smallMuted}>א ב ג ד ה ו ש</Text>

          <View style={styles.daysRow}>
            <Text style={styles.day}>8</Text>
            <Text style={styles.day}>6</Text>
            <Text style={styles.day}>3</Text>
            <Text style={styles.day}>2</Text>
            <Text style={styles.activeDay}>3</Text>
          </View>

          <TouchableOpacity style={styles.greenButton}>
            <Text style={styles.buttonText}>מטרות היום</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.smallCard}>
          <Text style={styles.cardTitle}>היום שלי</Text>

          <View style={styles.progressCircle}>
            <Text style={styles.progressIcon}>↗</Text>
          </View>
        </View>
      </View>

      <View style={styles.wideCard}>
        <Text style={styles.dots}>⋮</Text>
        <Text style={styles.sectionTitle}>התקדמות</Text>
        <Text style={styles.cardText}>
          חיזוק הפוקוס בתהליך החזרה לשגרה.
        </Text>

        <TouchableOpacity style={styles.fullButton}>
          <Text style={styles.buttonText}>המשך מעקב ומוטיבציה</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionHeader}>כניסה מהירה</Text>

      <View style={styles.row}>
<TouchableOpacity
  style={styles.bottomCard}
  onPress={() => {
    console.log('pressed checkin');
    router.push('/checkin');
  }}
>
  <Text style={styles.bottomTitle}>צ׳ק־אין</Text>
  <Text style={styles.bottomText}>בדיקה קצרה</Text>
</TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomCard}
          onPress={() => router.push('/reserve')}
        >
          <Text style={styles.bottomTitle}>מילואים</Text>
          <Text style={styles.bottomText}>חזרה הדרגתית</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => router.push('/checkin')}
      >
        <Text style={styles.floatingText}>↗</Text>
      </TouchableOpacity>

      <View style={styles.navbar}>
        <Text style={styles.navItem}>⌂</Text>
        <Text style={styles.navItem}>◷</Text>
        <Text style={styles.navItem}>☷</Text>
        <Text style={styles.navActive}>⌂</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F4EFE4',
    paddingHorizontal: 22,
    paddingTop: 58,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bell: {
    fontSize: 22,
    color: '#3F4A3C',
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
  },
  row: {
    flexDirection: 'row-reverse',
    gap: 14,
    marginBottom: 16,
  },
  smallCard: {
    flex: 1,
    minHeight: 150,
    backgroundColor: '#FFFDF7',
    borderRadius: 22,
    padding: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#34382F',
    textAlign: 'right',
    marginBottom: 10,
  },
  smallMuted: {
    fontSize: 11,
    color: '#A5A093',
    textAlign: 'center',
    marginBottom: 10,
  },
  daysRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  day: {
    fontSize: 13,
    color: '#777064',
  },
  activeDay: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#91A886',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: '700',
  },
  greenButton: {
    backgroundColor: '#8EAA8C',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  progressCircle: {
    width: 92,
    height: 92,
    borderRadius: 46,
    borderWidth: 10,
    borderColor: '#D8D0BF',
    borderRightColor: '#8EAA8C',
    borderBottomColor: '#8EAA8C',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  progressIcon: {
    fontSize: 28,
    color: '#6F8F6D',
    fontWeight: '800',
  },
  wideCard: {
    backgroundColor: '#E6D8BD',
    borderRadius: 24,
    padding: 20,
    minHeight: 160,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 22,
  },
  dots: {
    position: 'absolute',
    left: 18,
    top: 12,
    fontSize: 22,
    color: '#5C554A',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#3B3A32',
    textAlign: 'right',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    color: '#746A5D',
    textAlign: 'right',
    marginBottom: 26,
  },
  fullButton: {
    backgroundColor: '#8EAA8C',
    borderRadius: 13,
    paddingVertical: 14,
    alignItems: 'center',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2F332C',
    textAlign: 'right',
    marginBottom: 12,
  },
  bottomCard: {
    flex: 1,
    backgroundColor: '#FFFDF7',
    borderRadius: 20,
    padding: 18,
    minHeight: 105,
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  bottomTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#34382F',
    textAlign: 'right',
  },
  bottomText: {
    fontSize: 13,
    color: '#8A8174',
    textAlign: 'right',
    marginTop: 6,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 48,
    alignSelf: 'center',
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#82A37F',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 5,
  },
  floatingText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 74,
    backgroundColor: '#FFFDF7',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10,
  },
  navItem: {
    fontSize: 24,
    color: '#9A958B',
  },
  navActive: {
    fontSize: 25,
    color: '#7B9B78',
    fontWeight: '800',
  },
});