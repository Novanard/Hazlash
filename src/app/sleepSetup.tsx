import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import sleepS from './styles/sleepSetupStyles';

type SleepSettings = {
  bedtime: string;
  wakeupTime: string;
  reminderEnabled: boolean;
  reminderMinutesBefore: number;
};

type StoredFocusArea = {
  id: string;
  active: boolean;
};

const SLEEP_SETTINGS_STORAGE_KEY = 'hazlash_sleep_settings';
const FOCUS_AREAS_STORAGE_KEY = 'hazlash_focus_areas';

const defaultSleepSettings: SleepSettings = {
  bedtime: '23:00',
  wakeupTime: '07:00',
  reminderEnabled: true,
  reminderMinutesBefore: 30,
};

export default function SleepSetupScreen() {
  const router = useRouter();

  const [settings, setSettings] = useState<SleepSettings>(defaultSleepSettings);
  const [sleepTrackingActive, setSleepTrackingActive] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const stored = await AsyncStorage.getItem(SLEEP_SETTINGS_STORAGE_KEY);

        if (stored) {
          setSettings(JSON.parse(stored));
        }

        const storedFocusAreas = await AsyncStorage.getItem(
          FOCUS_AREAS_STORAGE_KEY
        );

        const focusAreas: StoredFocusArea[] = storedFocusAreas
          ? JSON.parse(storedFocusAreas)
          : [];

        const sleepIsActive = focusAreas.some(
          (area) => area.id === 'sleep' && area.active
        );

        setSleepTrackingActive(sleepIsActive);
      } catch {
        setSettings(defaultSleepSettings);
        setSleepTrackingActive(false);
      }
    };

    loadSettings();
  }, []);

  const updateField = <K extends keyof SleepSettings>(
    key: K,
    value: SleepSettings[K]
  ) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem(
        SLEEP_SETTINGS_STORAGE_KEY,
        JSON.stringify(settings)
      );

      const storedFocusAreas = await AsyncStorage.getItem(
        FOCUS_AREAS_STORAGE_KEY
      );

      const focusAreas: StoredFocusArea[] = storedFocusAreas
        ? JSON.parse(storedFocusAreas)
        : [];

      const sleepExists = focusAreas.some((area) => area.id === 'sleep');

      const updatedFocusAreas = sleepExists
        ? focusAreas.map((area) =>
            area.id === 'sleep' ? { ...area, active: true } : area
          )
        : [...focusAreas, { id: 'sleep', active: true }];

      await AsyncStorage.setItem(
        FOCUS_AREAS_STORAGE_KEY,
        JSON.stringify(updatedFocusAreas)
      );

      setSleepTrackingActive(true);
      setSaveMessage('הגדרות השינה נשמרו בהצלחה');

      setTimeout(() => {
        setSaveMessage('');
        router.back();
      }, 1200);
    } catch (error) {
      console.log(error);
      setSaveMessage('שגיאה בשמירת ההגדרות');
    }
  };

  const turnOffSleepTracking = async () => {
    try {
      const storedFocusAreas = await AsyncStorage.getItem(
        FOCUS_AREAS_STORAGE_KEY
      );

      const focusAreas: StoredFocusArea[] = storedFocusAreas
        ? JSON.parse(storedFocusAreas)
        : [];

      const updatedFocusAreas = focusAreas.some((area) => area.id === 'sleep')
        ? focusAreas.map((area) =>
            area.id === 'sleep' ? { ...area, active: false } : area
          )
        : [...focusAreas, { id: 'sleep', active: false }];

      await AsyncStorage.setItem(
        FOCUS_AREAS_STORAGE_KEY,
        JSON.stringify(updatedFocusAreas)
      );

      setSleepTrackingActive(false);
      setSaveMessage('מעקב השינה כובה');

      setTimeout(() => {
        setSaveMessage('');
        router.back();
      }, 1200);
    } catch (error) {
      console.log(error);
      setSaveMessage('שגיאה בכיבוי מעקב השינה');
    }
  };

  return (
    <ScrollView
      style={sleepS.screen}
      contentContainerStyle={sleepS.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={sleepS.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.75}>
          <Text style={sleepS.backText}>חזור</Text>
        </TouchableOpacity>

        <Text style={sleepS.logo}>חזל״ש</Text>
      </View>

      <Text style={sleepS.title}>מעקב שינה</Text>

      <Text style={sleepS.subtitle}>
        הגדר שעת שינה ושעת קימה רצויות. בהמשך המערכת תוכל לבדוק האם הצלחת
        לשמור על השגרה ולהתאים את המשימות בהתאם.
      </Text>

      <View style={sleepS.card}>
        <Text style={sleepS.cardTitle}>שגרת שינה</Text>

        <Text style={sleepS.label}>שעת שינה רצויה</Text>
        <TextInput
          value={settings.bedtime}
          onChangeText={(text) => updateField('bedtime', text)}
          placeholder="23:00"
          placeholderTextColor="#8B7D68"
          textAlign="center"
          style={sleepS.input}
        />

        <Text style={sleepS.label}>שעת קימה רצויה</Text>
        <TextInput
          value={settings.wakeupTime}
          onChangeText={(text) => updateField('wakeupTime', text)}
          placeholder="07:00"
          placeholderTextColor="#8B7D68"
          textAlign="center"
          style={sleepS.input}
        />
      </View>

      <View style={sleepS.card}>
        <Text style={sleepS.cardTitle}>תזכורת לפני שינה</Text>

        <TouchableOpacity
          style={[
            sleepS.toggleButton,
            settings.reminderEnabled && sleepS.toggleButtonActive,
          ]}
          activeOpacity={0.85}
          onPress={() =>
            updateField('reminderEnabled', !settings.reminderEnabled)
          }
        >
          <Text
            style={[
              sleepS.toggleText,
              settings.reminderEnabled && sleepS.toggleTextActive,
            ]}
          >
            {settings.reminderEnabled ? 'תזכורת פעילה' : 'תזכורת כבויה'}
          </Text>
        </TouchableOpacity>

        <Text style={sleepS.label}>כמה דקות לפני שעת השינה?</Text>

        <View style={sleepS.reminderRow}>
          {[15, 30, 45, 60].map((minutes) => (
            <TouchableOpacity
              key={minutes}
              style={[
                sleepS.minuteButton,
                settings.reminderMinutesBefore === minutes &&
                  sleepS.minuteButtonActive,
              ]}
              activeOpacity={0.85}
              onPress={() => updateField('reminderMinutesBefore', minutes)}
            >
              <Text
                style={[
                  sleepS.minuteText,
                  settings.reminderMinutesBefore === minutes &&
                    sleepS.minuteTextActive,
                ]}
              >
                {minutes}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={sleepS.saveButton}
        activeOpacity={0.85}
        onPress={saveSettings}
      >
        <Text style={sleepS.saveButtonText}>שמירת הגדרות שינה</Text>
      </TouchableOpacity>

      {sleepTrackingActive ? (
        <TouchableOpacity
          style={sleepS.turnOffButton}
          activeOpacity={0.85}
          onPress={turnOffSleepTracking}
        >
          <Text style={sleepS.turnOffButtonText}>כיבוי מעקב שינה</Text>
        </TouchableOpacity>
      ) : null}

      {saveMessage ? (
        <Text style={sleepS.saveMessage}>{saveMessage}</Text>
      ) : null}
    </ScrollView>
  );
}