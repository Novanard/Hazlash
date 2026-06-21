import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import recStyles from './styles/recommStyles';

const checkinSummary = {
  energy: 'low',
  stress: 'high',
  sleep: 'medium',
};

const getDailyTasks = () => {
  if (checkinSummary.energy === 'low' && checkinSummary.stress === 'high') {
    return [
      '20 דקות לימודים / עבודה בלבד',
      'הליכה קצרה של 10 דקות',
      'ארוחה מסודרת אחת',
      'הפסקה בלי מסכים ל־15 דקות',
    ];
  }

  if (checkinSummary.energy === 'low') {
    return [
      'משימה אחת קצרה של 25 דקות',
      'שתיית מים לאורך היום',
      'שעת שינה קבועה',
    ];
  }

  return [
    '30 דקות לימודים / עבודה',
    'אימון או הליכה קצרה',
    'סידור משימה אחת שנדחתה',
  ];
};

export default function RecommendationScreen() {
  const router = useRouter();
  const dailyTasks = getDailyTasks();

  const approveTasks = () => {
    router.push({
      pathname: '/',
      params: {
        aiTasks: JSON.stringify(dailyTasks),
      },
    });
  };

  return (
    <View style={recStyles.container}>
      <Text style={recStyles.title}>המלצה יומית</Text>

      <View style={recStyles.card}>
        <Text style={recStyles.text}>
          לפי הצ׳ק־אין האחרון, נראה שהיום מתאים לעומס נמוך ומשימות קצרות.
        </Text>

        <Text style={recStyles.text}>
          במקום לבנות יום עמוס, המערכת מציעה כמה משימות קטנות שאפשר לשנות ידנית במסך הבית.
        </Text>

        {dailyTasks.map((task) => (
          <Text key={task} style={recStyles.text}>
            {`• ${task}`}
          </Text>
        ))}
      </View>

      <TouchableOpacity style={recStyles.button} onPress={approveTasks} activeOpacity={0.85}>
        <Text style={recStyles.buttonText}>אישור והוספה למסך הבית</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[recStyles.button, { marginTop: 12 }]}
        onPress={() => router.push('/')}
        activeOpacity={0.85}
      >
        <Text style={recStyles.buttonText}>חזרה בלי לשנות</Text>
      </TouchableOpacity>
    </View>
  );
}
