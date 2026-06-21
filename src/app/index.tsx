import { useRouter } from 'expo-router';
import homeS from './styles/homeStyles';
import {Text, TouchableOpacity, View } from 'react-native';

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
    <View style={homeS.screen}>
      <View style={homeS.header}>
        <Text style={homeS.bell}>⌕</Text>
        <Text style={homeS.logo}>חזל״ש</Text>
      </View>

      <Text style={homeS.title}>היום שלי</Text>
      <Text style={homeS.subtitle}>חזרה לשגרה בצעדים הדרגתיים.</Text>

      <View style={homeS.row}>
        <View style={homeS.smallCard}>
          <Text style={homeS.cardTitle}>מטרה שבועית</Text>
          <Text style={homeS.goalTitle}>אימון 4 פעמים השבוע</Text>
          <Text style={homeS.goalProgress}>3 / 4 הושלמו</Text>

          <View style={homeS.goalBar}>
            <View style={homeS.goalBarFill} />
          </View>

          <TouchableOpacity style={homeS.greenButton} activeOpacity={0.85}>
            <Text style={homeS.buttonText}>ניהול מטרות</Text>
          </TouchableOpacity>
        </View>

        <View style={homeS.smallCard}>
          <Text style={homeS.cardTitle}>היום שלי</Text>
          <Text style={homeS.timeText}>{currentTime}</Text>

          <View style={homeS.progressCircle}>
            <Text style={homeS.progressPercent}>{progressPercent}%</Text>
          </View>

          <Text style={homeS.progressLabel}>
            {completedTasks} מתוך {totalTasks} משימות
          </Text>
        </View>
      </View>

      <View style={homeS.wideCard}>
        <Text style={homeS.dots}>⋮</Text>
        <Text style={homeS.sectionTitle}>המשימות של היום</Text>
        <Text style={homeS.cardText}>
          מטרות קטנות וריאליות שעוזרות לחזור לשגרה בלי עומס מיותר.
        </Text>

        <View style={homeS.taskList}>
          {todayTasks.map((task) => (
            <View key={task.title} style={homeS.taskRow}>
              <Text style={[homeS.taskCheck, task.done && homeS.taskCheckDone]}>
                {task.done ? '✓' : '○'}
              </Text>

              <Text style={[homeS.taskText, task.done && homeS.taskTextDone]}>
                {task.title}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={homeS.fullButton} activeOpacity={0.85}>
          <Text style={homeS.buttonText}>עדכון משימות היום</Text>
        </TouchableOpacity>
      </View>

      <Text style={homeS.sectionHeader}>כניסה מהירה</Text>

      <View style={homeS.row}>
        <View style={homeS.bottomCard}>
          <Text style={homeS.bottomTitle}>צ׳ק־אין</Text>
          <Text style={homeS.bottomText}>
            בדיקה קצרה של שינה, ריכוז, אנרגיה ולחץ
          </Text>

          <TouchableOpacity
            style={homeS.checkinButton}
            onPress={() => router.push('/checkin')}
            activeOpacity={0.85}
          >
            <Text style={homeS.checkinButtonText}>התחל צ׳ק־אין</Text>
          </TouchableOpacity>
        </View>

        <View style={homeS.bottomCard}>
          <Text style={homeS.bottomTitle}>מילואים</Text>
          <Text style={homeS.bottomText}>חזרה הדרגתית אחרי קטיעה בשגרה</Text>

          <View style={homeS.reserveBadge}>
            <Text style={homeS.reserveBadgeText}>בקרוב</Text>
          </View>
        </View>
      </View>

      <View style={homeS.navbar}>
        <Text style={homeS.navItem}>⌂</Text>
        <Text style={homeS.navItem}>◷</Text>
        <Text style={homeS.navItem}>☷</Text>
        <Text style={homeS.navActive}>⌂</Text>
      </View>
    </View>
  );
}

