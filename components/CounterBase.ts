// components/CounterBase.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Animated } from 'react-native';

export type CounterData = {
  label: string;
  value: number;
  limit: number;
  weeklyHistory: number[]; // valori per i 7 giorni della settimana
};

export class Counter {
  label: string;
  value: number;
  limit: number;
  weeklyHistory: number[];
  animatedValue: Animated.Value;

  constructor(label: string, defaultValue: number = 0, defaultLimit: number = 20) {
    this.label = label;
    this.value = defaultValue;
    this.limit = defaultLimit;
    this.weeklyHistory = Array(7).fill(0);
    this.animatedValue = new Animated.Value(this.value / this.limit);

    this.load();
  }

  getTodayIndex(): number {
    return new Date().getDay(); // 0=Sunday, 6=Saturday
  }

 async load(callback?: () => void) {
  try {
    const data = await AsyncStorage.getItem(this.label);
    if (data) {
      const parsed: CounterData = JSON.parse(data);
      this.value = parsed.value;
      this.limit = parsed.limit;
      this.weeklyHistory = parsed.weeklyHistory || Array(7).fill(0);
      this.updateAnimation();
      if (callback) callback(); // avvisa il componente
    }
  } catch (e) {
    console.log('Error loading counter:', e);
  }
}


  async save() {
    try {
      const data: CounterData = { label: this.label, value: this.value, limit: this.limit, weeklyHistory: this.weeklyHistory };
      await AsyncStorage.setItem(this.label, JSON.stringify(data));
    } catch (e) {
      console.log('Error saving counter:', e);
    }
  }

  updateTodayHistory() {
    const today = this.getTodayIndex();
    this.weeklyHistory[today] = this.value;
  }

  increment(amount: number = 1) {
    this.value = Math.min(this.value + amount, this.limit);
    this.updateAnimation();
    this.updateTodayHistory();
    this.save();
  }

  decrement(amount: number = 1) {
    this.value = Math.max(this.value - amount, 0);
    this.updateAnimation();
    this.updateTodayHistory();
    this.save();
  }

  setLimit(newLimit: number) {
    this.limit = newLimit;
    this.updateAnimation();
    this.save();
  }

  updateAnimation() {
    Animated.timing(this.animatedValue, {
      toValue: Math.min(this.value / this.limit, 1),
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  isOverLimit() {
    return this.value > this.limit;
  }
}
