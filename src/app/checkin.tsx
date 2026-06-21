import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import checkinStyles from './styles/checkinStyles';
type OptionGroupProps = {
  title: string;
  subtitle: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
};

function OptionGroup({ title, subtitle, options, selected, onSelect }: OptionGroupProps) {
  return (
    <View style={checkinStyles.card}>
      <Text style={checkinStyles.questionTitle}>{title}</Text>
      <Text style={checkinStyles.questionSubtitle}>{subtitle}</Text>

      <View style={checkinStyles.optionsRow}>
        {options.map((option) => {
          const isSelected = selected === option;

          return (
            <TouchableOpacity
              key={option}
              style={[checkinStyles.option, isSelected && checkinStyles.optionSelected]}
              onPress={() => onSelect(option)}
              activeOpacity={0.85}
            >
              <Text style={[checkinStyles.optionText, isSelected && checkinStyles.optionTextSelected]}>
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
    <ScrollView style={checkinStyles.container} contentContainerStyle={checkinStyles.content}>
      <View style={checkinStyles.header}>
        <Text style={checkinStyles.badge}>צ׳ק־אין יומי</Text>
        <Text style={checkinStyles.title}>איך אתה מגיע היום לשגרה?</Text>
        <Text style={checkinStyles.description}>
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
        style={checkinStyles.mainButton}
        onPress={() => router.push('/recommendation')}
        activeOpacity={0.9}
      >
        <Text style={checkinStyles.mainButtonText}>קבל המלצה</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} style={checkinStyles.secondaryButton}>
        <Text style={checkinStyles.secondaryButtonText}>חזרה למסך הבית</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

