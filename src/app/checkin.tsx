import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const COLORS = {
  bg: '#F4EFE4',
  card: '#FFFFFF',
  text: '#1F2933',
  muted: '#6B7280',
  primary: '#8EAA8C',
  primaryDark: '#5F7F5F',
  border: '#E2D8C8',
};

type OptionGroupProps = {
  title: string;
  subtitle: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
};

function OptionGroup({ title, subtitle, options, selected, onSelect }: OptionGroupProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.questionTitle}>{title}</Text>
      <Text style={styles.questionSubtitle}>{subtitle}</Text>

      <View style={styles.optionsRow}>
        {options.map((option) => {
          const isSelected = selected === option;

          return (
            <TouchableOpacity
              key={option}
              style={[styles.option, isSelected && styles.optionSelected]}
              onPress={() => onSelect(option)}
              activeOpacity={0.85}
            >
              <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function CheckInScreen() {
  const router = useRouter();

  const [sleep, setSleep] = useState('סביר');
  const [focus, setFocus] = useState('בינוני');
  const [energy, setEnergy] = useState('בינונית');
  const [stress, setStress] = useState('גבוה');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.badge}>צ׳ק־אין יומי</Text>
        <Text style={styles.title}>איך אתה מגיע היום לשגרה?</Text>
        <Text style={styles.description}>
          כמה שאלות קצרות שיעזרו להתאים המלצה פשוטה להיום — לימודים, עבודה, שינה וריכוז.
        </Text>
      </View>

      <OptionGroup
        title="שינה"
        subtitle="איך ישנת הלילה?"
        options={['חלש', 'סביר', 'טוב']}
        selected={sleep}
        onSelect={setSleep}
      />

      <OptionGroup
        title="ריכוז"
        subtitle="כמה קל לך להתרכז היום?"
        options={['קשה', 'בינוני', 'טוב']}
        selected={focus}
        onSelect={setFocus}
      />

      <OptionGroup
        title="אנרגיה"
        subtitle="כמה אנרגיה יש לך היום?"
        options={['נמוכה', 'בינונית', 'גבוהה']}
        selected={energy}
        onSelect={setEnergy}
      />

      <OptionGroup
        title="לחץ"
        subtitle="כמה עומס או לחץ אתה מרגיש?"
        options={['נמוך', 'בינוני', 'גבוה']}
        selected={stress}
        onSelect={setStress}
      />

      <TouchableOpacity
        style={styles.mainButton}
        onPress={() => router.push('/recommendation')}
        activeOpacity={0.9}
      >
        <Text style={styles.mainButtonText}>קבל המלצה</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>חזרה למסך הבית</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  content: {
    padding: 24,
    paddingTop: 64,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  badge: {
    backgroundColor: '#E8DED0',
    color: COLORS.primaryDark,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    fontWeight: '800',
    marginBottom: 14,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: COLORS.text,
    textAlign: 'right',
    lineHeight: 38,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.muted,
    textAlign: 'right',
    lineHeight: 24,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: 18,
    marginTop: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  questionTitle: {
    fontSize: 19,
    fontWeight: '900',
    color: COLORS.text,
    textAlign: 'right',
  },
  questionSubtitle: {
    marginTop: 5,
    fontSize: 14,
    color: COLORS.muted,
    textAlign: 'right',
  },
  optionsRow: {
    flexDirection: 'row-reverse',
    gap: 10,
    marginTop: 14,
  },
  option: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 15,
    backgroundColor: '#F8F5EF',
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  optionSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.text,
  },
  optionTextSelected: {
    color: '#FFFFFF',
  },
  mainButton: {
    marginTop: 24,
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: 'center',
  },
  mainButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
  },
  secondaryButton: {
    marginTop: 14,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: COLORS.primaryDark,
    fontSize: 15,
    fontWeight: '800',
  },
});