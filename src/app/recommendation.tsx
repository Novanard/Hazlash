import { useRouter } from 'expo-router';
import {Text, TouchableOpacity, View } from 'react-native';
import recStyles from './styles/recommStyles';
export default function RecommendationScreen() {
  const router = useRouter();

  return (
    <View style={recStyles.container}>
      <Text style={recStyles.title}>
        המלצה יומית
      </Text>

      <View style={recStyles.card}>
        <Text style={recStyles.text}>
          נראה שהיום רמת האנרגיה מעט נמוכה
          והעומס גבוה.
        </Text>

        <Text style={recStyles.text}>
          מומלץ להתחיל במשימה אחת קטנה
          של 20 דקות בלבד.
        </Text>

        <Text style={recStyles.text}>
          לאחר מכן לקחת הפסקה קצרה
          או לצאת להליכה.
        </Text>
      </View>

      <TouchableOpacity
        style={recStyles.button}
        onPress={() => router.push('/')}
      >
        <Text style={recStyles.buttonText}>
          חזרה למסך הבית
        </Text>
      </TouchableOpacity>
    </View>
  );
}

