const THEME_KEY = 'isDarkTheme';

if (!localStorage.getItem(THEME_KEY)) {
  localStorage.setItem(THEME_KEY, JSON.stringify(false));
}

const setTheme = (value) => localStorage.setItem(THEME_KEY, JSON.stringify(value));
const getThemeUser = () => JSON.parse(localStorage.getItem(THEME_KEY));

export { setTheme, getThemeUser };
