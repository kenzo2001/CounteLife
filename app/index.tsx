// app/index.tsx
import { useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CounterCircle from '../components/CounterCircle';
import { CountersContext } from '../components/CountersContext';

export default function HomeScreen() {
  const { counters } = useContext(CountersContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Benvenuto in LifeCounters</Text>
      <Text style={styles.subtitle}>
        Apri il menu a sinistra per scegliere la schermata
      </Text>

      <View style={styles.circlesContainer}>
        {counters.map((c, idx) => (
          <CounterCircle
            key={idx}
            label={c.label}
            value={c.value}
            limit={c.limit}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#121212', // sfondo dark
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff', // testo bianco
  },
  subtitle: {
    fontSize: 16,
    color: '#bbbbbb', // testo grigio chiaro
    textAlign: 'center',
    marginBottom: 20,
  },
  circlesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
