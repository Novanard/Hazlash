import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import dHistoryStyles from './styles/dailyHistoryStyles';

type Task = {
  title: string;
  done: boolean;
};

type DayHistory = {
  date: string;
  completed: number;
  total: number;
  percent: number;
  tasks?: Task[];
};

const HISTORY_STORAGE_KEY = 'hazlash_day_history';

export default function DaysHistoryScreen() {
  const router = useRouter();
  const [history, setHistory] = useState<DayHistory[]>([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem(HISTORY_STORAGE_KEY);
        const parsedHistory = storedHistory ? JSON.parse(storedHistory) : [];

        setHistory(Array.isArray(parsedHistory) ? parsedHistory : []);
      } catch {
        setHistory([]);
      }
    };

    loadHistory();
  }, []);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('he-IL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const deleteDay = async (date: string) => {
    const updatedHistory = history.filter((day) => day.date !== date);

    setHistory(updatedHistory);

    await AsyncStorage.setItem(
      HISTORY_STORAGE_KEY,
      JSON.stringify(updatedHistory)
    );
  };

  return (
    <ScrollView
      style={dHistoryStyles.screen}
      contentContainerStyle={dHistoryStyles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={dHistoryStyles.title}>הימים שלי</Text>
      <Text style={dHistoryStyles.subtitle}>
        מעקב אחר ההתקדמות היומית לאורך זמן.
      </Text>

      {history.length === 0 ? (
        <View style={dHistoryStyles.emptyCard}>
          <Text style={dHistoryStyles.emptyTitle}>אין ימים שמורים עדיין</Text>
          <Text style={dHistoryStyles.emptyText}>
            אחרי שתלחץ על “סיום יום”, ההתקדמות תופיע כאן.
          </Text>
        </View>
      ) : (
        history.map((day) => {
          const tasks = Array.isArray(day.tasks) ? day.tasks : [];

          return (
            <View key={day.date} style={dHistoryStyles.card}>
              <View style={dHistoryStyles.cardHeader}>
                <TouchableOpacity
                  onPress={() => deleteDay(day.date)}
                  activeOpacity={0.75}
                >
                  <Text style={dHistoryStyles.deleteText}>הסר</Text>
                </TouchableOpacity>

                <Text style={dHistoryStyles.date}>{formatDate(day.date)}</Text>
              </View>

              <View style={dHistoryStyles.row}>
                <Text style={dHistoryStyles.percent}>{day.percent}%</Text>
                <Text style={dHistoryStyles.summary}>
                  {day.completed} מתוך {day.total} משימות
                </Text>
              </View>

              <View style={dHistoryStyles.bar}>
                <View
                  style={[
                    dHistoryStyles.barFill,
                    { width: `${Math.max(0, Math.min(day.percent, 100))}%` },
                  ]}
                />
              </View>

              <View style={dHistoryStyles.taskList}>
                {tasks.length === 0 ? (
                  <Text style={dHistoryStyles.taskText}>
                    אין פירוט משימות ליום זה
                  </Text>
                ) : (
                  tasks.map((task, index) => (
                    <Text
                      key={`${task.title}-${index}`}
                      style={dHistoryStyles.taskText}
                    >
                      {task.done ? '✓' : '○'} {task.title}
                    </Text>
                  ))
                )}
              </View>
            </View>
          );
        })
      )}

      <TouchableOpacity style={dHistoryStyles.backButton} onPress={() => router.back()}>
        <Text style={dHistoryStyles.backButtonText}>חזרה</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}