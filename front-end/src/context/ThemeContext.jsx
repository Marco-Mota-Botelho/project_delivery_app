import { createContext } from 'react';

const defaultState = {
  isDark: false,
};

const ThemeContext = createContext(defaultState);

export default ThemeContext;
