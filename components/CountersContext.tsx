// components/CountersContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

export type Counter = {
  label: string;
  value: number;
  limit: number;
  weeklyHistory?: number[]; // aggiunto storico settimanale
};

export type CountersContextType = {
  counters: Counter[];
  setCounters: React.Dispatch<React.SetStateAction<Counter[]>>;
  updateCounter: (label: string, newData: Partial<Counter>) => void;
  resetCounter: (label: string) => void;
};

export const CountersContext = createContext<CountersContextType>({
  counters: [],
  setCounters: () => {},
  updateCounter: () => {},
  resetCounter: () => {},
});

type Props = { children: ReactNode };

const STORAGE_KEY = 'counters';

export const CountersProvider = ({ children }: Props) => {
  const [counters, setCounters] = useState<Counter[]>([
    { label: 'Caffe', value: 0, limit: 20, weeklyHistory: Array(7).fill(0) },
    { label: 'Sigarette', value: 0, limit: 20, weeklyHistory: Array(7).fill(0) },
  ]);

  // Carica dati da AsyncStorage all'avvio
  useEffect(() => {
    const loadCounters = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setCounters(JSON.parse(stored));
        }
      } catch (e) {
        console.log('Error loading counters:', e);
      }
    };
    loadCounters();
  }, []);

  // Salva dati su AsyncStorage ogni volta che cambiano
  useEffect(() => {
    const saveCounters = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(counters));
      } catch (e) {
        console.log('Error saving counters:', e);
      }
    };
    saveCounters();
  }, [counters]);

  const updateCounter = (label: string, newData: Partial<Counter>) => {
    setCounters(prev =>
      prev.map(c => (c.label === label ? { ...c, ...newData } : c))
    );
  };

  const resetCounter = (label: string) => {
    setCounters(prev =>
      prev.map(c =>
        c.label === label
          ? { ...c, value: 0, weeklyHistory: Array(7).fill(0) }
          : c
      )
    );
  };

  return (
    <CountersContext.Provider
      value={{ counters, setCounters, updateCounter, resetCounter }}
    >
      {children}
    </CountersContext.Provider>
  );
};
