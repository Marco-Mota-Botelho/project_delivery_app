import PropTypes from 'prop-types';
import { useState, useMemo, useEffect } from 'react';
import { getThemeUser } from '../services/themeStorage';
import ThemeContext from './ThemeContext';

function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(getThemeUser());
  }, []);

  const contextValue = useMemo(() => ({
    setIsDark,
    isDark,
  }), [isDark]);

  return (
    <ThemeContext.Provider value={ contextValue }>
      { children }
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
