import { useState } from 'react';

const MIN_PASSWORD_LENGTH = 6;

function Login() {
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [state, setState] = useState({ email: '', password: '' });

  const validateLogin = () => {
    const checkEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(state.email);
    return !(checkEmail && state.password.length >= MIN_PASSWORD_LENGTH);
  };

  const onInputChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
    setIsInvalidEmail(validateLogin());
  };

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
      >
        LOGIN
      </button>
      <button
        type="button"
        data-testid="common_login__button-register"
      >
        AINDA NÃO TENHO CONTA
      </button>

      { isInvalidEmail && (
        <span data-testid="">
          ERRO
        </span>
      ) }

    </div>
  );
}

export default Login;
