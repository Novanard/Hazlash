import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import createFocusAreasStyles from './styles/focusAreasStyles';

type FocusArea = {
  id: string;
  title: string;
  description: string;
  active: boolean;
  available: boolean;
};

type StoredFocusArea = {
  id: string;
  active: boolean;
};

const FOCUS_AREAS_STORAGE_KEY = 'hazlash_focus_areas';

const defaultFocusAreas: FocusArea[] = [
  {
    id: 'sleep',
    title: 'שינה',
    description: 'הגדרת שעת שינה, שעת קימה ותזכורות לשגרה יציבה.',
    active: false,
    available: true,
  },
  {
    id: 'sports',
    title: 'פעילות גופנית',
    description: 'הגדרת יעד אימונים שבועי ומעקב אחרי פעילות.',
    active: false,
    available: true,
  },
  {
    id: 'food',
    title: 'אכילה מסודרת',
    description: 'מעקב פשוט אחרי ארוחות מסודרות במהלך השבוע.',
    active: false,
    available: false,
  },
  {
    id: 'social',
    title: 'קשר חברתי',
    description: 'מעקב עדין אחרי קשר עם חברים, משפחה או אנשים קרובים.',
    active: false,
    available: false,
  },
];

export default function FocusAreasScreen() {
  const router = useRouter();
  const theme = useTheme();
  const focusS = useMemo(() => createFocusAreasStyles(theme), [theme]);

  const [focusAreas, setFocusAreas] = useState<FocusArea[]>(defaultFocusAreas);
  const [loaded, setLoaded] = useState(false);

  const loadFocusAreas = async () => {
    try {
      const stored = await AsyncStorage.getItem(FOCUS_AREAS_STORAGE_KEY);

      if (!stored) {
        setFocusAreas(defaultFocusAreas);
        return;
      }

      const storedAreas: StoredFocusArea[] = JSON.parse(stored);

      const fixedAreas = defaultFocusAreas.map((defaultArea) => {
        const savedArea = storedAreas.find(
          (area) => area.id === defaultArea.id
        );

        return {
          ...defaultArea,
          active:
            typeof savedArea?.active === 'boolean'
              ? savedArea.active
              : defaultArea.active,
        };
      });

      setFocusAreas(fixedAreas);
    } catch {
      setFocusAreas(defaultFocusAreas);
    } finally {
      setLoaded(true);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadFocusAreas();
    }, [])
  );

  useEffect(() => {
    if (!loaded) return;

    const saveFocusAreas = async () => {
      const areasToSave: StoredFocusArea[] = focusAreas.map((area) => ({
        id: area.id,
        active: area.active,
      }));

      await AsyncStorage.setItem(
        FOCUS_AREAS_STORAGE_KEY,
        JSON.stringify(areasToSave)
      );
    };

    saveFocusAreas();
  }, [focusAreas, loaded]);

  const handleAreaPress = (area: FocusArea) => {
    if (!area.available) return;

    if (area.id === 'sleep') {
      router.push('/sleepSetup');
      return;
    }

    if (area.id === 'sports') {
      router.push('/sportsSetup');
      return;
    }
  };

  return (
    <ScrollView
      style={focusS.screen}
      contentContainerStyle={focusS.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={focusS.header}>
        <Text style={focusS.logo}>חזל״ש</Text>
      </View>

      <Text style={focusS.title}>תחומי מיקוד</Text>

      <Text style={focusS.subtitle}>
        בחר את התחומים שאתה רוצה לחזק בתקופה הקרובה. הבחירה תשפיע בהמשך על
        המשימות, התזכורות והמעקב השבועי.
      </Text>

      <View style={focusS.list}>
        {focusAreas.map((area) => (
          <TouchableOpacity
            key={area.id}
            style={[
              focusS.areaCard,
              area.active && focusS.areaCardActive,
              !area.available && focusS.areaCardDisabled,
            ]}
            activeOpacity={area.available ? 0.85 : 1}
            onPress={() => handleAreaPress(area)}
          >
            <View style={focusS.areaHeader}>
              <Text style={focusS.areaTitle}>{area.title}</Text>

              <Text
                style={[
                  focusS.statusText,
                  area.active && focusS.statusTextActive,
                ]}
              >
                {!area.available ? 'בקרוב' : area.active ? 'פעיל' : 'לא פעיל'}
              </Text>
            </View>

            <Text style={focusS.areaDescription}>{area.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={focusS.backButton}
        activeOpacity={0.85}
        onPress={() => router.back()}
      >
        <Text style={focusS.backButtonText}>חזרה</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
