// app/components/CounterCircle.tsx
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type CounterCircleProps = {
  label: string;
  value: number;
  limit: number;
};

export default function CounterCircle({ label, value, limit }: CounterCircleProps) {
  const router = useRouter();

  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: Math.min(value / limit, 1),
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [value, limit]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  const overLimit = value > limit;
  const color = overLimit ? '#ff5555' : '#4caf50';

  // Mappiamo il label alla rotta corretta
  const routeMap: { [key: string]: '/' | '/caffe' | '/sigarette' } = {
    Caffe: '/caffe',
    Sigarette: '/sigarette',
  };

  const handlePress = () => {
    const route = routeMap[label];
    if (route) router.push(route);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Svg width={120} height={120}>
        <Circle
          cx={60}
          cy={60}
          r={radius}
          stroke="#333"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={60}
          cy={60}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <View style={styles.textContainer}>
        <Text style={[styles.valueText, { color }]}>{value}</Text>
        <Text style={styles.labelText}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { margin: 0, alignItems: 'center', justifyContent: 'center' },
  textContainer: { position: 'absolute', alignItems: 'center', justifyContent: 'center', top: 40 },
  valueText: { fontSize: 30, fontWeight: 'bold', color: '#FFFFFF' },
  labelText: { fontSize: 16, color: '#CCCCCC', marginTop: 42 },
});
