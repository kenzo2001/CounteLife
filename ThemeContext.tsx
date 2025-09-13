import React, { createContext, ReactNode, useContext } from 'react';
import { darkTheme } from './theme';

type ThemeType = typeof darkTheme;

const ThemeContext = createContext<ThemeType>(darkTheme);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeContext.Provider value={darkTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook per usare il tema facilmente
export const useTheme = () => useContext(ThemeContext);
