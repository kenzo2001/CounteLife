// components/CounterBase.ts
import { Animated } from 'react-native';

export type CounterData = {
  label: string;
  value: number;
  limit: number;
};

export class Counter {
  label: string;
  value: number;
  limit: number;
  animatedValue: Animated.Value;

  constructor(label: string, value: number = 0, limit: number = 20) {
    this.label = label;
    this.value = value;
    this.limit = limit;
    this.animatedValue = new Animated.Value(value / limit);
  }

  increment(amount: number = 1) {
    this.value = Math.min(this.value + amount, this.limit);
    this.updateAnimation();
  }

  decrement(amount: number = 1) {
    this.value = Math.max(this.value - amount, 0);
    this.updateAnimation();
  }

  setLimit(newLimit: number) {
    this.limit = newLimit;
    this.updateAnimation();
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
