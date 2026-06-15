import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CheckInScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>צ׳ק־אין יומי</Text>

      <Text style={styles.question}>
        איך ישנת הלילה?
      </Text>

      <View style={styles.row}>
        <TouchableOpacity style={styles.option}>
          <Text>גרוע</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text>סביר</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text>מצוין</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.question}>
        כמה אנרגיה יש לך היום?
      </Text>

      <View style={styles.scale}>
        <Text>1</Text>
        <Text>2</Text>
        <Text>3</Text>
        <Text>4</Text>
        <Text>5</Text>
      </View>

      <Text style={styles.question}>
        כמה לחץ אתה מרגיש?
      </Text>

      <View style={styles.scale}>
        <Text>1</Text>
        <Text>2</Text>
        <Text>3</Text>
        <Text>4</Text>
        <Text>5</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/recommendation')}
      >
        <Text style={styles.buttonText}>
          קבל המלצה
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4EFE4',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'right',
    marginBottom: 30,
  },
  question: {
    textAlign: 'right',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row-reverse',
    gap: 10,
  },
  option: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  scale: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
  },
  button: {
    backgroundColor: '#8EAA8C',
    marginTop: 40,
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
  },
});