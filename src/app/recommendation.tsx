import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import createRecStyles from './styles/recommStyles';

type Task = {
  title: string;
  done: boolean;
};

type SleepRecord = {
  date: string;
  sleptOnTime: boolean | null;
  wokeOnTime: boolean | null;
  wokeDuringNight: 'no' | 'once' | 'multiple' | null;
  score: number;
};

type CapacityLevel = 'low' | 'medium' | 'high';

const TASKS_STORAGE_KEY = 'hazlash_today_tasks';
const SLEEP_HISTORY_STORAGE_KEY = 'hazlash_sleep_history';

export default function RecommendationScreen() {
  const router = useRouter();
  const theme = useTheme();
  const recStyles = useMemo(() => createRecStyles(theme), [theme]);

  const {
    energy = 'medium',
    stress = 'medium',
    sleep = 'medium',
    focus = 'medium',
  } = useLocalSearchParams<{
    energy?: string;
    stress?: string;
    sleep?: string;
    focus?: string;
  }>();

  const [latestSleepScore, setLatestSleepScore] = useState<number | null>(null);

  useEffect(() => {
    const loadLatestSleepScore = async () => {
      try {
        const storedSleepHistory = await AsyncStorage.getItem(
          SLEEP_HISTORY_STORAGE_KEY
        );

        const sleepHistory: SleepRecord[] = storedSleepHistory
          ? JSON.parse(storedSleepHistory)
          : [];

        if (Array.isArray(sleepHistory) && sleepHistory.length > 0) {
          setLatestSleepScore(sleepHistory[0].score);
        }
      } catch {
        setLatestSleepScore(null);
      }
    };

    loadLatestSleepScore();
  }, []);

  const capacityLevel = useMemo<CapacityLevel>(() => {
    let score = 0;

    if (energy === 'high') score += 30;
    if (energy === 'medium') score += 18;
    if (energy === 'low') score += 5;

    if (focus === 'high') score += 25;
    if (focus === 'medium') score += 15;
    if (focus === 'low') score += 5;

    if (stress === 'low') score += 25;
    if (stress === 'medium') score += 12;
    if (stress === 'high') score -= 5;

    if (sleep === 'high') score += 10;
    if (sleep === 'medium') score += 6;
    if (sleep === 'low') score += 0;

    if (latestSleepScore !== null) {
      if (latestSleepScore >= 80) score += 15;
      else if (latestSleepScore >= 50) score += 8;
      else score -= 5;
    }

    if (score >= 70) return 'high';
    if (score >= 40) return 'medium';
    return 'low';
  }, [energy, stress, sleep, focus, latestSleepScore]);

  const dailyTasks = useMemo(() => {
    if (capacityLevel === 'low') {
      return [
        '30 דקות עבודה / לימודים ממוקדים ללא הסחות',
        'טיפול במשימה אישית אחת שדחית',
        'הליכה קצרה או מתיחות במשך 10–15 דקות',
        'ארוחה מסודרת אחת במהלך היום',
      ];
    }

    if (capacityLevel === 'medium') {
      return [
        '60 דקות עבודה / לימודים עם הפסקה באמצע',
        'קידום משימה אישית או בירוקרטית אחת',
        'אימון קל או הליכה ארוכה',
        'הכנה קצרה למחר: רשימת 3 משימות עיקריות',
      ];
    }

    return [
      '90 דקות עבודה / לימודים בשני בלוקים',
      'אימון מלא או פעילות גופנית משמעותית',
      'סגירת משימה חשובה שנדחתה השבוע',
      'זמן לתחביב, חברים או פעילות שמחזירה תחושת שגרה',
    ];
  }, [capacityLevel]);

  const recommendationText = useMemo(() => {
    if (capacityLevel === 'low') {
      return 'לפי הצ׳ק־אין וציון השינה, היום מתאים לעומס נמוך אך עדיין משמעותי. המטרה היא לשמור על תפקוד בסיסי בלי להעמיס יותר מדי.';
    }

    if (capacityLevel === 'medium') {
      return 'לפי הצ׳ק־אין וציון השינה, היום מתאים לעומס בינוני. אפשר להתקדם, אבל עדיף לשמור על משימות ברורות ומדודות.';
    }

    return 'לפי הצ׳ק־אין וציון השינה, נראה שיש לך יכולת ליום פעיל יותר. המשימות עדיין מחולקות בצורה הדרגתית כדי לשמור על שגרה יציבה.';
  }, [capacityLevel]);

  const approveTasks = async () => {
    const tasksToSave: Task[] = dailyTasks.map((title) => ({
      title,
      done: false,
    }));

    await AsyncStorage.setItem(
      TASKS_STORAGE_KEY,
      JSON.stringify(tasksToSave)
    );

    router.replace('/');
  };

  return (
    <View style={recStyles.container}>
      <Text style={recStyles.title}>המלצה יומית</Text>

      <View style={recStyles.card}>
        <Text style={recStyles.text}>{recommendationText}</Text>

        {latestSleepScore !== null ? (
          <Text style={recStyles.text}>
            ציון שינה אחרון: {latestSleepScore}/100
          </Text>
        ) : null}

        {dailyTasks.map((task) => (
          <Text key={task} style={recStyles.text}>
            {`• ${task}`}
          </Text>
        ))}
      </View>

      <TouchableOpacity
        style={recStyles.button}
        onPress={approveTasks}
        activeOpacity={0.85}
      >
        <Text style={recStyles.buttonText}>אישור והוספה למסך הבית</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[recStyles.button, { marginTop: 12 }]}
        onPress={() => router.replace('/')}
        activeOpacity={0.85}
      >
        <Text style={recStyles.buttonText}>חזרה בלי לשנות</Text>
      </TouchableOpacity>
    </View>
  );
}
