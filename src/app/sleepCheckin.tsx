import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import sleepCheckinS from './styles/sleepCheckinStyles';

type NightWakeup = 'no' | 'once' | 'multiple';

type SleepRecord = {
  date: string;
  sleptOnTime: boolean | null;
  wokeOnTime: boolean | null;
  wokeDuringNight: NightWakeup | null;
  score: number;
};

const SLEEP_HISTORY_STORAGE_KEY = 'hazlash_sleep_history';


export default function SleepCheckinScreen() {
  const router = useRouter();

  const [sleptOnTime, setSleptOnTime] = useState<boolean | null>(null);
  const [wokeOnTime, setWokeOnTime] = useState<boolean | null>(null);
  const [wokeDuringNight, setWokeDuringNight] = useState<NightWakeup | null>(
    null
  );
  const [saveMessage, setSaveMessage] = useState('');

  const calculateScore = () => {
    let score = 0;

    if (sleptOnTime) score += 40;
    if (wokeOnTime) score += 40;

    if (wokeDuringNight === 'no') score += 20;
    if (wokeDuringNight === 'once') score += 10;
    if (wokeDuringNight === 'multiple') score += 0;

    return score;
  };

  const canSave =
    sleptOnTime !== null && wokeOnTime !== null && wokeDuringNight !== null;

  const saveSleepCheckin = async () => {
    if (!canSave) {
      setSaveMessage('יש לענות על כל השאלות');
      return;
    }

    const score = calculateScore();

    const sleepRecord: SleepRecord = {
      date: new Date().toISOString(),
      sleptOnTime,
      wokeOnTime,
      wokeDuringNight,
      score,
    };

    try {
      const storedHistory = await AsyncStorage.getItem(
        SLEEP_HISTORY_STORAGE_KEY
      );

      const currentHistory: SleepRecord[] = storedHistory
        ? JSON.parse(storedHistory)
        : [];

      const updatedHistory = [sleepRecord, ...currentHistory];

      await AsyncStorage.setItem(
        SLEEP_HISTORY_STORAGE_KEY,
        JSON.stringify(updatedHistory)
      );

      setSaveMessage(`ציון השינה שלך להיום: ${score}/100`);

      setTimeout(() => {
        router.push('/checkin');
      }, 1200);
    } catch {
      setSaveMessage('שגיאה בשמירת בדיקת השינה');
    }
  };

  return (
    <ScrollView
      style={sleepCheckinS.screen}
      contentContainerStyle={sleepCheckinS.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={sleepCheckinS.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.75}>
          <Text style={sleepCheckinS.backText}>חזור</Text>
        </TouchableOpacity>

        <Text style={sleepCheckinS.logo}>חזל״ש</Text>
      </View>

      <Text style={sleepCheckinS.title}>בדיקת שינה</Text>

      <Text style={sleepCheckinS.subtitle}>
        כמה שאלות קצרות על הלילה האחרון. המידע יעזור להתאים את המשימות של היום
        בצורה ריאלית יותר.
      </Text>

      <View style={sleepCheckinS.card}>
        <Text style={sleepCheckinS.question}>
          האם הלכת לישון בערך בזמן שהגדרת?
        </Text>

        <View style={sleepCheckinS.optionsRow}>
          <TouchableOpacity
            style={[
              sleepCheckinS.optionButton,
              sleptOnTime === true && sleepCheckinS.optionButtonActive,
            ]}
            onPress={() => setSleptOnTime(true)}
            activeOpacity={0.85}
          >
            <Text
              style={[
                sleepCheckinS.optionText,
                sleptOnTime === true && sleepCheckinS.optionTextActive,
              ]}
            >
              כן
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              sleepCheckinS.optionButton,
              sleptOnTime === false && sleepCheckinS.optionButtonActive,
            ]}
            onPress={() => setSleptOnTime(false)}
            activeOpacity={0.85}
          >
            <Text
              style={[
                sleepCheckinS.optionText,
                sleptOnTime === false && sleepCheckinS.optionTextActive,
              ]}
            >
              לא
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={sleepCheckinS.card}>
        <Text style={sleepCheckinS.question}>
          האם קמת בערך בזמן שהגדרת?
        </Text>

        <View style={sleepCheckinS.optionsRow}>
          <TouchableOpacity
            style={[
              sleepCheckinS.optionButton,
              wokeOnTime === true && sleepCheckinS.optionButtonActive,
            ]}
            onPress={() => setWokeOnTime(true)}
            activeOpacity={0.85}
          >
            <Text
              style={[
                sleepCheckinS.optionText,
                wokeOnTime === true && sleepCheckinS.optionTextActive,
              ]}
            >
              כן
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              sleepCheckinS.optionButton,
              wokeOnTime === false && sleepCheckinS.optionButtonActive,
            ]}
            onPress={() => setWokeOnTime(false)}
            activeOpacity={0.85}
          >
            <Text
              style={[
                sleepCheckinS.optionText,
                wokeOnTime === false && sleepCheckinS.optionTextActive,
              ]}
            >
              לא
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={sleepCheckinS.card}>
        <Text style={sleepCheckinS.question}>
          האם התעוררת במהלך הלילה?
        </Text>

        <View style={sleepCheckinS.verticalOptions}>
          <TouchableOpacity
            style={[
              sleepCheckinS.wideOption,
              wokeDuringNight === 'no' && sleepCheckinS.optionButtonActive,
            ]}
            onPress={() => setWokeDuringNight('no')}
            activeOpacity={0.85}
          >
            <Text
              style={[
                sleepCheckinS.optionText,
                wokeDuringNight === 'no' && sleepCheckinS.optionTextActive,
              ]}
            >
              לא
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              sleepCheckinS.wideOption,
              wokeDuringNight === 'once' && sleepCheckinS.optionButtonActive,
            ]}
            onPress={() => setWokeDuringNight('once')}
            activeOpacity={0.85}
          >
            <Text
              style={[
                sleepCheckinS.optionText,
                wokeDuringNight === 'once' && sleepCheckinS.optionTextActive,
              ]}
            >
              פעם אחת
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              sleepCheckinS.wideOption,
              wokeDuringNight === 'multiple' && sleepCheckinS.optionButtonActive,
            ]}
            onPress={() => setWokeDuringNight('multiple')}
            activeOpacity={0.85}
          >
            <Text
              style={[
                sleepCheckinS.optionText,
                wokeDuringNight === 'multiple' &&
                  sleepCheckinS.optionTextActive,
              ]}
            >
              כמה פעמים
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={sleepCheckinS.saveButton}
        activeOpacity={0.85}
        onPress={saveSleepCheckin}
      >
        <Text style={sleepCheckinS.saveButtonText}>שמירה והמשך לצ׳ק־אין</Text>
      </TouchableOpacity>

      {saveMessage ? (
        <Text style={sleepCheckinS.saveMessage}>{saveMessage}</Text>
      ) : null}
    </ScrollView>
  );
}