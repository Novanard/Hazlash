import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
  workoutDone?: boolean;
  tasks: Task[];
};

type StoredFocusArea = {
  id: string;
  active: boolean;
};

type SportsSettings = {
  weeklyGoal: number;
};

type ProgressCircleProps = {
  percent: number;
};

const TASKS_STORAGE_KEY = 'hazlash_today_tasks';
const HISTORY_STORAGE_KEY = 'hazlash_day_history';
const FOCUS_AREAS_STORAGE_KEY = 'hazlash_focus_areas';
const SLEEP_HISTORY_STORAGE_KEY = 'hazlash_sleep_history';
const SPORTS_SETTINGS_STORAGE_KEY = 'hazlash_sports_settings';

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
  const [showWorkoutQuestion, setShowWorkoutQuestion] = useState(false);

  const [sleepActive, setSleepActive] = useState(false);
  const [sportsActive, setSportsActive] = useState(false);
  const [sportsWeeklyGoal, setSportsWeeklyGoal] = useState(4);
  const [workoutsThisWeek, setWorkoutsThisWeek] = useState(0);
  const [activeDayStreak, setActiveDayStreak] = useState(0);

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

  const weeklyProgressPercent =
    sportsWeeklyGoal === 0
      ? 0
      : Math.min(Math.round((workoutsThisWeek / sportsWeeklyGoal) * 100), 100);

  const getDateKey = (dateString: string) => {
    const date = new Date(dateString);

    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const getStartOfWeek = () => {
    const now = new Date();
    const start = new Date(now);

    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - start.getDay());

    return start;
  };

  const calculateActiveDayStreak = (history: DayHistory[]) => {
    if (history.length === 0) return 0;

    const uniqueDates = Array.from(
      new Set(history.map((day) => getDateKey(day.date)))
    ).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    if (uniqueDates.length === 0) return 0;

    let streak = 0;
    const dateSet = new Set(uniqueDates);
    const currentDate = new Date(uniqueDates[0]);

    while (true) {
      const key = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

      if (!dateSet.has(key)) break;

      streak += 1;
      currentDate.setDate(currentDate.getDate() - 1);
    }

    return streak;
  };

  const getFocusAreas = async () => {
    const storedFocusAreas = await AsyncStorage.getItem(
      FOCUS_AREAS_STORAGE_KEY
    );

    const focusAreas: StoredFocusArea[] = storedFocusAreas
      ? JSON.parse(storedFocusAreas)
      : [];

    return Array.isArray(focusAreas) ? focusAreas : [];
  };

  const loadDashboardStats = async () => {
    try {
      const focusAreas = await getFocusAreas();

      const sleepIsActive = focusAreas.some(
        (area) => area.id === 'sleep' && area.active
      );

      const sportsIsActive = focusAreas.some(
        (area) => area.id === 'sports' && area.active
      );

      setSleepActive(sleepIsActive);
      setSportsActive(sportsIsActive);

      const storedSportsSettings = await AsyncStorage.getItem(
        SPORTS_SETTINGS_STORAGE_KEY
      );

      const sportsSettings: SportsSettings = storedSportsSettings
        ? JSON.parse(storedSportsSettings)
        : { weeklyGoal: 4 };

      setSportsWeeklyGoal(sportsSettings.weeklyGoal || 4);

      const storedHistory = await AsyncStorage.getItem(HISTORY_STORAGE_KEY);

      const history: DayHistory[] = storedHistory
        ? JSON.parse(storedHistory)
        : [];

      const safeHistory = Array.isArray(history) ? history : [];
      const startOfWeek = getStartOfWeek();

      const weeklyWorkoutCount = safeHistory.filter((day) => {
        const dayDate = new Date(day.date);
        return day.workoutDone === true && dayDate >= startOfWeek;
      }).length;

      setWorkoutsThisWeek(weeklyWorkoutCount);
      setActiveDayStreak(calculateActiveDayStreak(safeHistory));
    } catch {
      setSleepActive(false);
      setSportsActive(false);
      setSportsWeeklyGoal(4);
      setWorkoutsThisWeek(0);
      setActiveDayStreak(0);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadDashboardStats();
    }, [])
  );

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
      const focusAreas = await getFocusAreas();

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

  const getLatestSleepScore = async () => {
    try {
      const storedSleepHistory = await AsyncStorage.getItem(
        SLEEP_HISTORY_STORAGE_KEY
      );

      const sleepHistory = storedSleepHistory
        ? JSON.parse(storedSleepHistory)
        : [];

      if (Array.isArray(sleepHistory) && sleepHistory.length > 0) {
        return sleepHistory[0].score;
      }

      return undefined;
    } catch {
      return undefined;
    }
  };

  const handleFinishDayPress = async () => {
    if (sportsActive) {
      setShowWorkoutQuestion(true);
      return;
    }

    saveDay(undefined);
  };

  const saveDay = async (workoutDone?: boolean) => {
    const sleepScore = await getLatestSleepScore();

    const todaySummary: DayHistory = {
      date: new Date().toISOString(),
      completed: completedTasks,
      total: totalTasks,
      percent: progressPercent,
      sleepScore,
      workoutDone,
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
      setShowWorkoutQuestion(false);
      await loadDashboardStats();

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
            <Text style={homeS.cardTitle}>השבוע שלי</Text>

            <Text style={homeS.goalTitle}>רצף שימוש באפליקציה</Text>
            <Text style={homeS.goalProgress}>
              {activeDayStreak === 1
                ? 'יום אחד ברצף'
                : `${activeDayStreak} ימים ברצף`}
            </Text>

            <View style={homeS.streakDivider} />

            <Text style={homeS.goalTitle}>מעקב שינה</Text>
            <Text style={homeS.goalProgress}>
              {sleepActive ? 'פעיל' : 'לא פעיל'}
            </Text>

            <View style={homeS.streakDivider} />

            <Text style={homeS.goalTitle}>
              {sportsActive
                ? `אימון ${sportsWeeklyGoal} פעמים השבוע`
                : 'מעקב פעילות לא פעיל'}
            </Text>

            <Text style={homeS.goalProgress}>
              {sportsActive
                ? `${workoutsThisWeek} מתוך ${sportsWeeklyGoal} אימונים הושלמו`
                : 'אפשר להפעיל מעקב דרך תחומי מיקוד'}
            </Text>

            {sportsActive ? (
              <View style={homeS.goalBar}>
                <View
                  style={[
                    homeS.goalBarFill,
                    { width: `${weeklyProgressPercent}%` },
                  ]}
                />
              </View>
            ) : null}
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

              {showWorkoutQuestion ? (
                <View style={homeS.workoutQuestionCard}>
                  <Text style={homeS.workoutQuestionTitle}>
                    האם ביצעת פעילות גופנית היום?
                  </Text>

                  <View style={homeS.workoutQuestionRow}>
                    <TouchableOpacity
                      style={homeS.workoutYesButton}
                      activeOpacity={0.85}
                      onPress={() => saveDay(true)}
                    >
                      <Text style={homeS.buttonText}>כן</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={homeS.workoutNoButton}
                      activeOpacity={0.85}
                      onPress={() => saveDay(false)}
                    >
                      <Text style={homeS.finishDayText}>לא</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  style={homeS.finishDayButton}
                  activeOpacity={0.85}
                  onPress={handleFinishDayPress}
                >
                  <Text style={homeS.finishDayText}>
                    סיום יום ושמירת התקדמות
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        ) : (
          <TouchableOpacity
            style={[homeS.fullButton, homeS.bottomButton]}
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
    </ScrollView>
  );
}