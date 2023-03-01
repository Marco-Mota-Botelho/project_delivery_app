const USER_KEY = 'user';

if (!localStorage.getItem(USER_KEY)) {
  localStorage.setItem(USER_KEY, JSON.stringify({}));
}

const setUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));
const getUser = () => JSON.parse(localStorage.getItem(USER_KEY));
const logOutUser = () => localStorage.removeItem(USER_KEY);

export { setUser, getUser, logOutUser };
