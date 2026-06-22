import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import homeS from './styles/homeStyles';

type Task = {
  title: string;
  done: boolean;
};

type DayHistory = {
  date: string;
  completed: number;
  total: number;
  percent: number;
  sleepScore?: number;
  tasks: Task[];
};

type StoredFocusArea = {
  id: string;
  active: boolean;
};

type ProgressCircleProps = {
  percent: number;
};

const TASKS_STORAGE_KEY = 'hazlash_today_tasks';
const HISTORY_STORAGE_KEY = 'hazlash_day_history';
const FOCUS_AREAS_STORAGE_KEY = 'hazlash_focus_areas';
const SLEEP_HISTORY_STORAGE_KEY = 'hazlash_sleep_history';

const defaultTasks: Task[] = [];

function ProgressCircle({ percent }: ProgressCircleProps) {
  const size = 86;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const safePercent = Math.max(0, Math.min(percent, 100));
  const strokeDashoffset =
    circumference - (circumference * safePercent) / 100;

  return (
    <View style={homeS.progressCircle}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#D8D0BF"
          strokeWidth={strokeWidth}
          fill="none"
        />

        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#8EAA8C"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      <Text style={homeS.progressPercent}>{safePercent}%</Text>
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const { aiTasks } = useLocalSearchParams<{ aiTasks?: string }>();

  const [todayTasks, setTodayTasks] = useState<Task[]>(defaultTasks);
  const [customTask, setCustomTask] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const dayIsActive = todayTasks.length > 0;

  const tasksFromRecommendation = useMemo<Task[] | null>(() => {
    if (!aiTasks) return null;

    try {
      const parsed = JSON.parse(aiTasks);
      if (!Array.isArray(parsed)) return null;

      return parsed.map((title) => ({
        title: String(title),
        done: false,
      }));
    } catch {
      return null;
    }
  }, [aiTasks]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);

        if (storedTasks) {
          setTodayTasks(JSON.parse(storedTasks));
        }
      } catch {
        setTodayTasks(defaultTasks);
      } finally {
        setLoaded(true);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    const applyRecommendedTasks = async () => {
      if (!tasksFromRecommendation) return;

      setTodayTasks(tasksFromRecommendation);
      setLoaded(true);

      await AsyncStorage.setItem(
        TASKS_STORAGE_KEY,
        JSON.stringify(tasksFromRecommendation)
      );
    };

    applyRecommendedTasks();
  }, [tasksFromRecommendation]);

  useEffect(() => {
    if (!loaded) return;

    AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(todayTasks));
  }, [todayTasks, loaded]);

  const completedTasks = todayTasks.filter((task) => task.done).length;
  const totalTasks = todayTasks.length;

  const progressPercent =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const currentTime = new Date().toLocaleTimeString('he-IL', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const toggleTask = (title: string) => {
    setTodayTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.title === title ? { ...task, done: !task.done } : task
      )
    );
  };

  const addCustomTask = () => {
    const cleanTitle = customTask.trim();
    if (!cleanTitle) return;

    setTodayTasks((currentTasks) => [
      ...currentTasks,
      { title: cleanTitle, done: false },
    ]);

    setCustomTask('');
  };

  const removeTask = (title: string) => {
    setTodayTasks((currentTasks) =>
      currentTasks.filter((task) => task.title !== title)
    );
  };

  const startDailyCheckin = async () => {
    try {
      const storedFocusAreas = await AsyncStorage.getItem(
        FOCUS_AREAS_STORAGE_KEY
      );

      const focusAreas: StoredFocusArea[] = storedFocusAreas
        ? JSON.parse(storedFocusAreas)
        : [];

      const sleepIsActive = focusAreas.some(
        (area) => area.id === 'sleep' && area.active
      );

      if (sleepIsActive) {
        router.push('/sleepCheckin');
        return;
      }

      router.push('/checkin');
    } catch {
      router.push('/checkin');
    }
  };

  const finishDay = async () => {
    let sleepScore: number | undefined = undefined;

    try {
      const storedSleepHistory = await AsyncStorage.getItem(
        SLEEP_HISTORY_STORAGE_KEY
      );

      const sleepHistory = storedSleepHistory
        ? JSON.parse(storedSleepHistory)
        : [];

      if (Array.isArray(sleepHistory) && sleepHistory.length > 0) {
        sleepScore = sleepHistory[0].score;
      }
    } catch {}

    const todaySummary: DayHistory = {
      date: new Date().toISOString(),
      completed: completedTasks,
      total: totalTasks,
      percent: progressPercent,
      sleepScore,
      tasks: todayTasks,
    };

    try {
      const storedHistory = await AsyncStorage.getItem(HISTORY_STORAGE_KEY);

      const currentHistory: DayHistory[] = storedHistory
        ? JSON.parse(storedHistory)
        : [];

      const updatedHistory = [todaySummary, ...currentHistory];

      await AsyncStorage.setItem(
        HISTORY_STORAGE_KEY,
        JSON.stringify(updatedHistory)
      );

      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify([]));

      setTodayTasks([]);
      setSaveMessage(`היום נשמר בהצלחה: ${progressPercent}%`);

      setTimeout(() => {
        setSaveMessage('');
      }, 3000);
    } catch {
      setSaveMessage('שגיאה בשמירת היום');
    }
  };

  return (
    <ScrollView
      style={homeS.screen}
      contentContainerStyle={homeS.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={homeS.header}>
        <Text style={homeS.bell}>⌕</Text>
        <Text style={homeS.logo}>חזל״ש</Text>
      </View>

      <Text style={homeS.title}>היום שלי</Text>
      <Text style={homeS.subtitle}>חזרה לשגרה בצעדים הדרגתיים.</Text>

      <View style={homeS.row}>
        <View style={homeS.smallCard}>
          <View>
            <Text style={homeS.cardTitle}>מטרה שבועית</Text>
            <Text style={homeS.goalTitle}>אימון 4 פעמים השבוע</Text>
            <Text style={homeS.goalProgress}>3 / 4 הושלמו</Text>

            <View style={homeS.goalBar}>
              <View style={homeS.goalBarFill} />
            </View>
          </View>

          <TouchableOpacity
            style={homeS.greenButton}
            activeOpacity={0.85}
            onPress={() => router.push('/focusAreas')}
          >
            <Text style={homeS.buttonText}>תחומי מיקוד</Text>
          </TouchableOpacity>
        </View>

        <View style={homeS.smallCard}>
          <View>
            <Text style={homeS.cardTitle}>היום שלי</Text>
            <Text style={homeS.timeText}>{currentTime}</Text>

            <ProgressCircle percent={progressPercent} />

            <Text style={homeS.progressLabel}>
              {completedTasks} מתוך {totalTasks} משימות
            </Text>
          </View>

          <TouchableOpacity
            style={homeS.greenButton}
            activeOpacity={0.85}
            onPress={() => router.push('/daysHistory')}
          >
            <Text style={homeS.buttonText}>הימים שלי</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={homeS.wideCard}>
        <Text style={homeS.dots}>⋮</Text>
        <Text style={homeS.sectionTitle}>המשימות של היום</Text>
        <Text style={homeS.cardText}>
          {dayIsActive
            ? 'מטרות קטנות וריאליות שעוזרות לחזור לשגרה בלי עומס מיותר.'
            : 'אין יום פעיל כרגע. התחל צ׳ק־אין כדי לקבל משימות מותאמות להיום.'}
        </Text>

        {dayIsActive ? (
          <>
            <View style={homeS.taskList}>
              {todayTasks.map((task) => (
                <View key={task.title} style={homeS.taskRow}>
                  <TouchableOpacity
                    onPress={() => toggleTask(task.title)}
                    activeOpacity={0.75}
                  >
                    <Text
                      style={[
                        homeS.taskCheck,
                        task.done && homeS.taskCheckDone,
                      ]}
                    >
                      {task.done ? '✓' : '○'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => toggleTask(task.title)}
                    activeOpacity={0.75}
                    style={homeS.taskTitleButton}
                  >
                    <Text
                      style={[
                        homeS.taskText,
                        task.done && homeS.taskTextDone,
                      ]}
                    >
                      {task.title}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => removeTask(task.title)}
                    activeOpacity={0.75}
                  >
                    <Text style={homeS.removeTaskText}>הסר</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <View style={homeS.addTaskArea}>
              <TextInput
                value={customTask}
                onChangeText={setCustomTask}
                placeholder="הוסף משימה משלך"
                placeholderTextColor="#8B7D68"
                textAlign="right"
                style={homeS.taskInput}
              />

              <TouchableOpacity
                style={homeS.fullButton}
                activeOpacity={0.85}
                onPress={addCustomTask}
              >
                <Text style={homeS.buttonText}>הוסף משימה ידנית</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={homeS.finishDayButton}
                activeOpacity={0.85}
                onPress={finishDay}
              >
                <Text style={homeS.finishDayText}>
                  סיום יום ושמירת התקדמות
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <TouchableOpacity
            style={homeS.fullButton}
            activeOpacity={0.85}
            onPress={startDailyCheckin}
          >
            <Text style={homeS.buttonText}>התחלת היום וקבלת משימות</Text>
          </TouchableOpacity>
        )}

        {saveMessage ? (
          <Text style={homeS.saveMessage}>{saveMessage}</Text>
        ) : null}
      </View>

      <Text style={homeS.sectionHeader}>תחנת איפוס</Text>

      <View style={homeS.bottomCard}>
        <Text style={homeS.bottomTitle}>תחנת איפוס</Text>
        <Text style={homeS.bottomText}>
          משחקים ותרגילים קצרים להרגעה, מיקוד והתמודדות עם לחץ.
        </Text>

        <View style={homeS.reserveBadge}>
          <Text style={homeS.reserveBadgeText}>בקרוב</Text>
        </View>
      </View>

      <View style={homeS.navbar}>
        <Text style={homeS.navItem}>⌂</Text>
        <Text style={homeS.navItem}>◷</Text>
        <Text style={homeS.navItem}>☷</Text>
        <Text style={homeS.navActive}>⌂</Text>
      </View>
    </ScrollView>
  );
}