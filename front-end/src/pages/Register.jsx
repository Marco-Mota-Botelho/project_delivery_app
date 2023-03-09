import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { requestLogin } from '../services/requests';
import { setUser } from '../services/userStorage';
import { BoxForm, ButtonLogin, ContainerLogin, InputLogin,
  SpanErrorLogin, TitleBoxLogin } from '../styles/Login';
import ROLE_PATH from '../utils/rolePaths';

const MIN_PASSWORD_LENGTH = 6;
const MIN_NAME_LENGTH = 12;

const twoSeconds = 2000;

function Login() {
  const navigate = useNavigate();
  const [state, setState] = useState(
    { email: '', password: '', name: '', confirmPassword: '' },
  );
  const [errorMessage, setErrorMessage] = useState('');

  const handleError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, [twoSeconds]);
  };

  const validateLogin = () => {
    const checkEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(state.email);
    return !(checkEmail && state.password.length >= MIN_PASSWORD_LENGTH
       && state.name.length >= MIN_NAME_LENGTH);
  };

  const onInputChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };

  const handleClick = async () => {
    const { name, email, password, confirmPassword } = state;
    if (confirmPassword !== password) {
      setState((prev) => ({ ...prev, password: '', confirmPassword: '' }));
      handleError('As senhas não correspondem, tente novamente');
      return;
    }
    try {
      const newUser = await requestLogin('/users/register', { name, email, password });
      setUser(newUser);
      navigate(`/${ROLE_PATH.customer}`);
    } catch (error) {
      handleError(error.request.statusText);
      console.error(error);
    }
  };

  return (
    <ContainerLogin>
      <Header />

      <BoxForm>

        <TitleBoxLogin>Registrar-se</TitleBoxLogin>

        <InputLogin
          type="text"
          data-testid="common_register__input-name"
          name="name"
          placeholder="Digite seu nome"
          onChange={ onInputChange }
          value={ state.name }
        />
        <InputLogin
          type="email"
          data-testid="common_register__input-email"
          name="email"
          placeholder="Digite seu email"
          onChange={ onInputChange }
          value={ state.email }
        />
        <InputLogin
          type="text"
          data-testid="common_register__input-password"
          name="password"
          placeholder="Escolha uma senha"
          onChange={ onInputChange }
          value={ state.password }
        />
        <InputLogin
          type="text"
          name="confirmPassword"
          placeholder="Confirme sua senha"
          onChange={ onInputChange }
          value={ state.confirmPassword }
        />
        <ButtonLogin
          type="button"
          data-testid="common_register__button-register"
          disabled={ validateLogin() }
          onClick={ handleClick }
        >
          Cadastrar
        </ButtonLogin>
        <SpanErrorLogin data-testid="common_register__element-invalid_register">
          { errorMessage }
        </SpanErrorLogin>
      </BoxForm>

    </ContainerLogin>
  );
}

export default Login;
