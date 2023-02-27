import { useState } from 'react';

function Login() {
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);

  const validateEmail = () => {
    setIsInvalidEmail(true);
  };

  return (
    <div>
      <input
        type="email"
        data-testid="common_login__input-email"
        placeholder="Digite seu email"
      />
      <input
        type="text"
        data-testid="common_login__input-password"
        placeholder="Digite sua senha"
      />
      <button
        type="button"
        data-testid="common_login__button-login"
      >
        LOGIN
      </button>
      <button
        onClick={ validateEmail }
        type="button"
        data-testid="common_login__button-register"
      >
        AINDA NÃO TENHO CONTA
      </button>

      { isInvalidEmail && (
        <span data-testid="">
          ERROR
        </span>
      ) }

    </div>
  );
}

export default Login;
