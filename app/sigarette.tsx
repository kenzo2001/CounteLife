// app/Sigarette.tsx
import { useContext, useEffect, useRef, useState } from 'react';
import { Animated, Button, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Counter, CountersContext } from '../components/CountersContext';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Props = { goBack: () => void };

export default function Sigarette({ goBack }: Props) {
  const { counters, updateCounter } = useContext(CountersContext);
  const counter = counters.find(c => c.label === 'Sigarette') as Counter;

  const [value, setValue] = useState(counter?.value || 0);
  const [limit, setLimit] = useState(counter?.limit || 20);
  const [editingLimit, setEditingLimit] = useState(false);
  const [tempLimit, setTempLimit] = useState(limit);

  const radius = 60;
  const strokeWidth = 15;
  const circumference = 2 * Math.PI * radius;
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, { 
      toValue: Math.min(value / limit, 1), 
      duration: 300, 
      useNativeDriver: true 
    }).start();
  }, [value, limit]);

  const strokeDashoffset = animatedValue.interpolate({ inputRange: [0,1], outputRange: [circumference,0] });
  const overLimit = value > limit;
  const color = overLimit ? '#ff5555' : '#4caf50';

  const updateValue = (newVal: number) => {
    setValue(newVal);
    updateCounter('Sigarette', { value: newVal });
  };

  const confirmLimit = () => {
    setLimit(tempLimit);
    updateCounter('Sigarette', { limit: tempLimit });
    setEditingLimit(false);
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS==='ios'?'padding':undefined}>
      <Text style={styles.title}>Contatore Sigarette</Text>

      <View style={styles.circleContainer}>
        <Svg width={150} height={150}>
          <Circle cx={75} cy={75} r={radius} stroke="#333" strokeWidth={strokeWidth} fill="none" />
          <AnimatedCircle
            cx={75} cy={75} r={radius} stroke={color} strokeWidth={strokeWidth} fill="none"
            strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round"
          />
        </Svg>

        {editingLimit ? (
          <View style={styles.editLimitContainer}>
            <TextInput
              style={styles.limitInput}
              keyboardType="number-pad"
              autoFocus
              value={tempLimit.toString()}
              onChangeText={t => setTempLimit(Number(t))}
              returnKeyType="done"
              onSubmitEditing={confirmLimit}
            />
            <Button title="OK" onPress={confirmLimit} />
          </View>
        ) : (
          <TouchableOpacity style={styles.limitTouchable} onPress={() => setEditingLimit(true)}>
            <Text style={[styles.limitText,{color}]}>{limit}</Text>
          </TouchableOpacity>
        )}
      </View>

      {overLimit && <Text style={styles.warningText}>Hai superato il limite!</Text>}

      <View style={styles.counterContainer}>
        <Button title="-1" onPress={() => updateValue(Math.max(value-1,0))} />
        <Text style={styles.counterText}>{value}</Text>
        <Button title="+1" onPress={() => updateValue(value+1)} />
      </View>

     
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, alignItems:'center', justifyContent:'flex-start', padding:20, backgroundColor:'#121212'},
  title:{fontSize:28, fontWeight:'bold', marginTop:20, marginBottom:10, color:'#FFFFFF'},
  warningText:{color:'#ff5555', fontWeight:'bold', marginBottom:10, fontSize:16},
  circleContainer:{marginVertical:30,width:150,height:150,justifyContent:'center',alignItems:'center'},
  limitTouchable:{position:'absolute',justifyContent:'center',alignItems:'center',width:80,height:80},
  limitText:{fontSize:32,fontWeight:'bold'},
  editLimitContainer:{position:'absolute',justifyContent:'center',alignItems:'center',width:100,top:55},
  limitInput:{width:80,height:50,fontSize:32,fontWeight:'bold',textAlign:'center',color:'#FFFFFF',marginBottom:5,backgroundColor:'#1E1E1E',borderRadius:8,padding:5},
  counterContainer:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:180,marginTop:20},
  counterText:{fontSize:32,fontWeight:'bold',marginHorizontal:20,color:'#FFFFFF'},
});
