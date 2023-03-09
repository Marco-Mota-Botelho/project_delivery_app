const varBlack = 'var(--black)';

const lightTheme = {
  background: 'var(--white)',
  secondaryBackground: 'var(--secondary-green)',
  textColor: varBlack,
  color: 'var(--green)',
  primaryColor: 'var(--secondary-green)',
  secondaryColor: 'var(--blue)',
  tertiaryColor: 'var(--purple)',
  quaternaryColor: 'var(--yellow)',
  isDark: false,
};

const darkTheme = {
  background: varBlack,
  secondaryBackground: 'var(--orange)',
  textColor: 'var(--light-blue)',
  color: 'var(--sanguine)',
  primaryColor: 'var(--red)',
  secondaryColor: 'var(--sweet-morning)',
  tertiaryColor: 'var(--beige)',
  quaternaryColor: 'var(--blue)',
  isDark: true,
};

export { darkTheme, lightTheme };
