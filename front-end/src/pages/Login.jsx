import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { requestLogin } from '../services/requests';
import ROLE_PATH from '../utils/rolePaths';
import { setUser } from '../services/userStorage';
import { ContainerLogin, BoxForm, InputLogin, ButtonLogin,
  TitleBoxLogin, SpanErrorLogin, BoxImage, BoxPassword } from '../styles/Login';
import Header from '../components/Header';
import { ClosedEyeIcon, OpenEyeIcon } from '../styles/Icons';

const MIN_PASSWORD_LENGTH = 6;
const twoSeconds = 2000;

function Login() {
  const [state, setState] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, [twoSeconds]);
  };

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
      const result = await requestLogin('/login', { email, password });
      setUser(result);
      navigate(`/${ROLE_PATH[result.role]}`);
    } catch (error) {
      handleError('Email ou senha inválido(a)');
      console.error(error);
    }
  };

  useEffect(() => {
    if (user?.role === 'customer') navigate(`/${ROLE_PATH[user.role]}`);
    if (user?.role === 'seller') navigate(`/${ROLE_PATH[user.role]}`);
  }, [user, navigate]);

  return (
    <ContainerLogin>
      <Header />

      <BoxImage />

      <BoxForm>

        <TitleBoxLogin>Login</TitleBoxLogin>

        <InputLogin
          type="email"
          data-testid="common_login__input-email"
          name="email"
          placeholder="Digite seu email"
          onChange={ onInputChange }
          value={ state.email }
        />
        <BoxPassword>
          <InputLogin
            type={ isShowPassword ? 'text' : 'password' }
            data-testid="common_login__input-password"
            name="password"
            placeholder="Digite sua senha"
            onChange={ onInputChange }
            value={ state.password }
          />
          { isShowPassword ? (
            <ClosedEyeIcon onClick={ () => setIsShowPassword(!isShowPassword) } />
          ) : <OpenEyeIcon onClick={ () => setIsShowPassword(!isShowPassword) } /> }
        </BoxPassword>
        <ButtonLogin
          type="button"
          className="first"
          data-testid="common_login__button-login"
          disabled={ validateLogin() }
          onClick={ handleClick }
        >
          LOGIN
        </ButtonLogin>
        <Link to="/register">
          <ButtonLogin
            type="button"
            data-testid="common_login__button-register"
          >
            AINDA NÃO TENHO CONTA
          </ButtonLogin>
        </Link>

        <SpanErrorLogin data-testid="common_login__element-invalid-email">
          { errorMessage }
        </SpanErrorLogin>
      </BoxForm>

    </ContainerLogin>
  );
}

export default Login;
