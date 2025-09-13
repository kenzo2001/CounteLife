// components/CountersContext.tsx
import { createContext, ReactNode, useState } from 'react';

export type Counter = {
  label: string;
  value: number;
  limit: number;
};

export type CountersContextType = {
  counters: Counter[];
  setCounters: React.Dispatch<React.SetStateAction<Counter[]>>;
};

export const CountersContext = createContext<CountersContextType>({
  counters: [],
  setCounters: () => {},
});

export const CountersProvider = ({ children }: { children: ReactNode }) => {
  const [counters, setCounters] = useState<Counter[]>([
    { label: 'Caffe', value: 0, limit: 20 },
    { label: 'Sigarette', value: 0, limit: 20 },
  ]);

  return (
    <CountersContext.Provider value={{ counters, setCounters }}>
      {children}
    </CountersContext.Provider>
  );
};
