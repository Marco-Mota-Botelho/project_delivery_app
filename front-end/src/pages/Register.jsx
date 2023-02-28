import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestLogin } from '../services/requests';
import ROLE_PATH from '../utils/rolePaths';

const MIN_PASSWORD_LENGTH = 6;
const MIN_NAME_LENGTH = 12;

function Login() {
  const navigate = useNavigate();
  const [state, setState] = useState({ email: '', password: '', userName: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const validateLogin = () => {
    const checkEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(state.email);
    return !(checkEmail && state.password.length >= MIN_PASSWORD_LENGTH
       && state.userName.length >= MIN_NAME_LENGTH);
  };

  const onInputChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };

  const handleClick = async () => {
    const { userName, email, password } = state;
    try {
      const response = await
      requestLogin('/register', { name: userName, email, password });
      console.log(response);
      navigate(`/${ROLE_PATH.customer}`);
    } catch (error) {
      setErrorMessage('Não foi possível castrar');
      console.error(error);
    }
  };

  useEffect(() => {
    setErrorMessage('');
  }, [state]);

  return (
    <div>
      <input
        type="userName"
        data-testid="common_register__input-name"
        name="userName"
        placeholder="Digite seu nome"
        onChange={ onInputChange }
        value={ state.userName }
      />
      <input
        type="email"
        data-testid="common_register__input-email"
        name="email"
        placeholder="Digite seu email"
        onChange={ onInputChange }
        value={ state.email }
      />
      <input
        type="text"
        data-testid="common_register__input-password"
        name="password"
        placeholder="Digite sua senha"
        onChange={ onInputChange }
        value={ state.password }
      />
      <button
        type="button"
        data-testid="common_register__button-register"
        disabled={ validateLogin() }
        onClick={ handleClick }
      >
        Cadastrar
      </button>
      <span data-testid="common_register__element-invalid_register">
        { errorMessage }
      </span>

    </div>
  );
}

export default Login;
