import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import { SwitchSpan, ThemeButton, ThemeContainer } from '../styles/Theme';
import { MoonIcon, SunIcon } from '../styles/Icons';
import { setTheme } from '../services/themeStorage';

function SwitchTheme() {
  const { setIsDark, isDark } = useContext(ThemeContext);

  const setThemeDark = () => {
    setTheme(!isDark);
    setIsDark(!isDark);
  };

  return (
    <ThemeContainer onClick={ setThemeDark }>
      <ThemeButton>
        <SwitchSpan />
      </ThemeButton>
      { isDark ? <MoonIcon /> : <SunIcon />}
    </ThemeContainer>
  );
}

export default SwitchTheme;
