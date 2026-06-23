import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import sportsS from './styles/sportsSetupStyles';
type SportsSettings = {
  weeklyGoal: number;
};

type StoredFocusArea = {
  id: string;
  active: boolean;
};

const SPORTS_SETTINGS_STORAGE_KEY = 'hazlash_sports_settings';
const FOCUS_AREAS_STORAGE_KEY = 'hazlash_focus_areas';

const defaultSportsSettings: SportsSettings = {
  weeklyGoal: 4,
};

export default function SportsSetupScreen() {
  const router = useRouter();

  const [settings, setSettings] = useState<SportsSettings>(
    defaultSportsSettings
  );
  const [sportsTrackingActive, setSportsTrackingActive] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const stored = await AsyncStorage.getItem(SPORTS_SETTINGS_STORAGE_KEY);

        if (stored) {
          setSettings(JSON.parse(stored));
        }

        const storedFocusAreas = await AsyncStorage.getItem(
          FOCUS_AREAS_STORAGE_KEY
        );

        const focusAreas: StoredFocusArea[] = storedFocusAreas
          ? JSON.parse(storedFocusAreas)
          : [];

        const sportsIsActive = focusAreas.some(
          (area) => area.id === 'sports' && area.active
        );

        setSportsTrackingActive(sportsIsActive);
      } catch {
        setSettings(defaultSportsSettings);
        setSportsTrackingActive(false);
      }
    };

    loadSettings();
  }, []);

  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem(
        SPORTS_SETTINGS_STORAGE_KEY,
        JSON.stringify(settings)
      );

      const storedFocusAreas = await AsyncStorage.getItem(
        FOCUS_AREAS_STORAGE_KEY
      );

      const focusAreas: StoredFocusArea[] = storedFocusAreas
        ? JSON.parse(storedFocusAreas)
        : [];

      const sportsExists = focusAreas.some((area) => area.id === 'sports');

      const updatedFocusAreas = sportsExists
        ? focusAreas.map((area) =>
            area.id === 'sports' ? { ...area, active: true } : area
          )
        : [...focusAreas, { id: 'sports', active: true }];

      await AsyncStorage.setItem(
        FOCUS_AREAS_STORAGE_KEY,
        JSON.stringify(updatedFocusAreas)
      );

      setSportsTrackingActive(true);
      setSaveMessage('הגדרות הפעילות נשמרו בהצלחה');

      setTimeout(() => {
        setSaveMessage('');
        router.back();
      }, 1200);
    } catch {
      setSaveMessage('שגיאה בשמירת ההגדרות');
    }
  };

  const turnOffSportsTracking = async () => {
    try {
      const storedFocusAreas = await AsyncStorage.getItem(
        FOCUS_AREAS_STORAGE_KEY
      );

      const focusAreas: StoredFocusArea[] = storedFocusAreas
        ? JSON.parse(storedFocusAreas)
        : [];

      const updatedFocusAreas = focusAreas.some((area) => area.id === 'sports')
        ? focusAreas.map((area) =>
            area.id === 'sports' ? { ...area, active: false } : area
          )
        : [...focusAreas, { id: 'sports', active: false }];

      await AsyncStorage.setItem(
        FOCUS_AREAS_STORAGE_KEY,
        JSON.stringify(updatedFocusAreas)
      );

      setSportsTrackingActive(false);
      setSaveMessage('מעקב הפעילות כובה');

      setTimeout(() => {
        setSaveMessage('');
        router.back();
      }, 1200);
    } catch {
      setSaveMessage('שגיאה בכיבוי מעקב הפעילות');
    }
  };

  return (
    <ScrollView
      style={sportsS.screen}
      contentContainerStyle={sportsS.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={sportsS.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.75}>
          <Text style={sportsS.backText}>חזור</Text>
        </TouchableOpacity>

        <Text style={sportsS.logo}>חזל״ש</Text>
      </View>

      <Text style={sportsS.title}>מעקב פעילות</Text>

      <Text style={sportsS.subtitle}>
        הגדר יעד שבועי לפעילות גופנית. המטרה היא לעזור לבנות שגרה הדרגתית
        וריאלית, בלי להפוך את זה לתוכנית אימונים קשיחה.
      </Text>

      <View style={sportsS.card}>
        <Text style={sportsS.cardTitle}>יעד אימונים שבועי</Text>

        <Text style={sportsS.label}>כמה פעמים בשבוע תרצה להתאמן?</Text>

        <View style={sportsS.goalGrid}>
          {[2, 3, 4, 5, 6].map((goal) => (
            <TouchableOpacity
              key={goal}
              style={[
                sportsS.goalButton,
                settings.weeklyGoal === goal && sportsS.goalButtonActive,
              ]}
              activeOpacity={0.85}
              onPress={() => setSettings({ weeklyGoal: goal })}
            >
              <Text
                style={[
                  sportsS.goalText,
                  settings.weeklyGoal === goal && sportsS.goalTextActive,
                ]}
              >
                {goal}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={sportsS.helperText}>
          אפשר לשנות את היעד בכל שלב. עדיף יעד יציב שאפשר לעמוד בו מאשר יעד
          גבוה מדי שנשבר אחרי יומיים.
        </Text>
      </View>

      <TouchableOpacity
        style={sportsS.saveButton}
        activeOpacity={0.85}
        onPress={saveSettings}
      >
        <Text style={sportsS.saveButtonText}>שמירת יעד פעילות</Text>
      </TouchableOpacity>

      {sportsTrackingActive ? (
        <TouchableOpacity
          style={sportsS.turnOffButton}
          activeOpacity={0.85}
          onPress={turnOffSportsTracking}
        >
          <Text style={sportsS.turnOffButtonText}>כיבוי מעקב פעילות</Text>
        </TouchableOpacity>
      ) : null}

      {saveMessage ? (
        <Text style={sportsS.saveMessage}>{saveMessage}</Text>
      ) : null}
    </ScrollView>
  );
}