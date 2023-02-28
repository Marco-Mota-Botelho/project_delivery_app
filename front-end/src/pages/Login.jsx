import { useState, useEffect } from 'react';
import { requestLogin } from '../services/requests';

const MIN_PASSWORD_LENGTH = 6;

function Login() {
  const [state, setState] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const validateLogin = () => {
    const checkEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(state.email);
    return !(checkEmail && state.password.length >= MIN_PASSWORD_LENGTH);
  };

  const onInputChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };

  const handleClick = async () => {
    const { email, password } = state;
    try {
      const response = await requestLogin('/login', { email, password });
      console.log(response);
    } catch (error) {
      setErrorMessage(error.request.statusText);
      console.error(error);
    }
  };

  useEffect(() => {
    setErrorMessage('');
  }, [state]);

  return (
    <div>
      <input
        type="email"
        data-testid="common_login__input-email"
        name="email"
        placeholder="Digite seu email"
        onChange={ onInputChange }
        value={ state.email }
      />
      <input
        type="text"
        data-testid="common_login__input-password"
        name="password"
        placeholder="Digite sua senha"
        onChange={ onInputChange }
        value={ state.password }
      />
      <button
        type="button"
        data-testid="common_login__button-login"
        disabled={ validateLogin() }
        onClick={ handleClick }
      >
        LOGIN
      </button>
      <button
        type="button"
        data-testid="common_login__button-register"
      >
        AINDA NÃO TENHO CONTA
      </button>

      <span data-testid="common_login__element-invalid-email">
        { errorMessage }
      </span>

    </div>
  );
}

export default Login;
