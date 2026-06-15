import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RecommendationScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        המלצה יומית
      </Text>

      <View style={styles.card}>
        <Text style={styles.text}>
          נראה שהיום רמת האנרגיה מעט נמוכה
          והעומס גבוה.
        </Text>

        <Text style={styles.text}>
          מומלץ להתחיל במשימה אחת קטנה
          של 20 דקות בלבד.
        </Text>

        <Text style={styles.text}>
          לאחר מכן לקחת הפסקה קצרה
          או לצאת להליכה.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/')}
      >
        <Text style={styles.buttonText}>
          חזרה למסך הבית
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4EFE4',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'right',
    marginBottom: 25,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },
  text: {
    textAlign: 'right',
    marginBottom: 15,
    fontSize: 17,
    lineHeight: 28,
  },
  button: {
    backgroundColor: '#8EAA8C',
    padding: 18,
    borderRadius: 16,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
  },
});