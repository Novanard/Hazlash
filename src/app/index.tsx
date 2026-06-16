import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const todayTasks = [
  { title: '30 דקות לימודים / עבודה', done: true },
  { title: 'אימון או הליכה קצרה', done: true },
  { title: 'ארוחה מסודרת', done: true },
  { title: 'הפסקה בלי מסכים', done: false },
  { title: 'שעת שינה קבועה', done: false },
];

export default function HomeScreen() {
  const router = useRouter();

  const completedTasks = todayTasks.filter((task) => task.done).length;
  const totalTasks = todayTasks.length;
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  const currentTime = new Date().toLocaleTimeString('he-IL', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.bell}>⌕</Text>
        <Text style={styles.logo}>חזל״ש</Text>
      </View>

      <Text style={styles.title}>היום שלי</Text>
      <Text style={styles.subtitle}>חזרה לשגרה בצעדים הדרגתיים.</Text>

      <View style={styles.row}>
        <View style={styles.smallCard}>
          <Text style={styles.cardTitle}>מטרה שבועית</Text>
          <Text style={styles.goalTitle}>אימון 4 פעמים השבוע</Text>
          <Text style={styles.goalProgress}>3 / 4 הושלמו</Text>

          <View style={styles.goalBar}>
            <View style={styles.goalBarFill} />
          </View>

          <TouchableOpacity style={styles.greenButton} activeOpacity={0.85}>
            <Text style={styles.buttonText}>ניהול מטרות</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.smallCard}>
          <Text style={styles.cardTitle}>היום שלי</Text>
          <Text style={styles.timeText}>{currentTime}</Text>

          <View style={styles.progressCircle}>
            <Text style={styles.progressPercent}>{progressPercent}%</Text>
          </View>

          <Text style={styles.progressLabel}>
            {completedTasks} מתוך {totalTasks} משימות
          </Text>
        </View>
      </View>

      <View style={styles.wideCard}>
        <Text style={styles.dots}>⋮</Text>
        <Text style={styles.sectionTitle}>המשימות של היום</Text>
        <Text style={styles.cardText}>
          מטרות קטנות וריאליות שעוזרות לחזור לשגרה בלי עומס מיותר.
        </Text>

        <View style={styles.taskList}>
          {todayTasks.map((task) => (
            <View key={task.title} style={styles.taskRow}>
              <Text style={[styles.taskCheck, task.done && styles.taskCheckDone]}>
                {task.done ? '✓' : '○'}
              </Text>

              <Text style={[styles.taskText, task.done && styles.taskTextDone]}>
                {task.title}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.fullButton} activeOpacity={0.85}>
          <Text style={styles.buttonText}>עדכון משימות היום</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionHeader}>כניסה מהירה</Text>

      <View style={styles.row}>
        <View style={styles.bottomCard}>
          <Text style={styles.bottomTitle}>צ׳ק־אין</Text>
          <Text style={styles.bottomText}>
            בדיקה קצרה של שינה, ריכוז, אנרגיה ולחץ
          </Text>

          <TouchableOpacity
            style={styles.checkinButton}
            onPress={() => router.push('/checkin')}
            activeOpacity={0.85}
          >
            <Text style={styles.checkinButtonText}>התחל צ׳ק־אין</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomCard}>
          <Text style={styles.bottomTitle}>מילואים</Text>
          <Text style={styles.bottomText}>חזרה הדרגתית אחרי קטיעה בשגרה</Text>

          <View style={styles.reserveBadge}>
            <Text style={styles.reserveBadgeText}>בקרוב</Text>
          </View>
        </View>
      </View>

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
    paddingBottom: 92,
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
    minHeight: 172,
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
    marginBottom: 8,
  },
  timeText: {
    fontSize: 13,
    color: '#8A8174',
    textAlign: 'right',
    marginBottom: 8,
  },
  progressCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 10,
    borderColor: '#D8D0BF',
    borderRightColor: '#8EAA8C',
    borderBottomColor: '#8EAA8C',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  progressPercent: {
    fontSize: 20,
    color: '#6F8F6D',
    fontWeight: '900',
  },
  progressLabel: {
    fontSize: 12,
    color: '#8A8174',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '700',
  },
  goalTitle: {
    fontSize: 14,
    color: '#34382F',
    textAlign: 'right',
    fontWeight: '700',
    marginTop: 8,
  },
  goalProgress: {
    fontSize: 12,
    color: '#8A8174',
    textAlign: 'right',
    marginTop: 5,
    marginBottom: 12,
  },
  goalBar: {
    height: 9,
    backgroundColor: '#E2D8C8',
    borderRadius: 99,
    overflow: 'hidden',
    marginBottom: 16,
  },
  goalBarFill: {
    width: '75%',
    height: '100%',
    backgroundColor: '#8EAA8C',
    borderRadius: 99,
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
  wideCard: {
    backgroundColor: '#E6D8BD',
    borderRadius: 24,
    padding: 20,
    minHeight: 250,
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
    marginBottom: 14,
    lineHeight: 20,
  },
  taskList: {
    gap: 9,
    marginBottom: 18,
  },
  taskRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 9,
  },
  taskCheck: {
    width: 22,
    height: 22,
    borderRadius: 11,
    textAlign: 'center',
    lineHeight: 22,
    color: '#746A5D',
    fontWeight: '800',
  },
  taskCheckDone: {
    backgroundColor: '#8EAA8C',
    color: '#FFFFFF',
  },
  taskText: {
    flex: 1,
    fontSize: 13,
    color: '#4E473E',
    textAlign: 'right',
    fontWeight: '600',
  },
  taskTextDone: {
    color: '#2F332C',
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
    minHeight: 132,
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
    lineHeight: 18,
  },
  checkinButton: {
    marginTop: 14,
    backgroundColor: '#8EAA8C',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  checkinButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  reserveBadge: {
    marginTop: 14,
    alignSelf: 'flex-end',
    backgroundColor: '#EFE8DA',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  reserveBadgeText: {
    color: '#7D735F',
    fontSize: 12,
    fontWeight: '800',
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
    zIndex: 10,
  },
  floatingText: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 34,
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