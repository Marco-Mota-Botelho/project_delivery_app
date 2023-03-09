import { useState, useEffect } from 'react';
import { requestLogin, setToken } from '../services/requests';
import { TEST_ID_MANAGE } from '../utils/dataTestsIds';
import Navbar from '../components/Navbar';
import { BoxForm, ContainerManage, TitleForm } from '../styles/Manage.';

const {
  INPUT_NAME,
  INPUT_EMAIL,
  INPUT_PASSWORD,
  MANAGE_REGISTER_BUTTON,
  MANAGE_SELECT_ROLE,
  MANAGE_INVALID_MESSAGE,
} = TEST_ID_MANAGE;

const MIN_PASSWORD_LENGTH = 6;
const MIN_NAME_LENGTH = 12;

function Manage() {
  const [state, setState] = useState({ email: '', password: '', userName: '', role: '' });
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
    const { userName, email, password, role } = state;
    const user = JSON.parse(localStorage.getItem('user'));
    setToken(user.token);
    try {
      const response = await
      requestLogin('/users/register/manage', { name: userName, email, password, role });
      console.log(response);
      setState({ email: '', password: '', userName: '', role: '' });
    } catch (error) {
      setErrorMessage(error.request.statusText);
      console.error(error);
    }
  };

  useEffect(() => {
    setErrorMessage('');
  }, [state]);

  return (
    <ContainerManage>
      <Navbar />
      <BoxForm>
        <TitleForm>Gerenciar novo usuário</TitleForm>
        <label htmlFor="userName">
          Nome
          <input
            type="userName"
            data-testid={ INPUT_NAME }
            id="userName"
            name="userName"
            placeholder="Nome e sobrenome"
            onChange={ onInputChange }
            value={ state.userName }
          />
        </label>
        <label htmlFor="userEmail">
          Email
          <input
            type="email"
            data-testid={ INPUT_EMAIL }
            name="email"
            id="userEmail"
            placeholder="email"
            onChange={ onInputChange }
            value={ state.email }
          />
        </label>
        <label htmlFor="userPassword">
          Senha
          <input
            type="text"
            data-testid={ INPUT_PASSWORD }
            name="password"
            id="userPassword"
            placeholder="Digite sua senha"
            onChange={ onInputChange }
            value={ state.password }
          />
        </label>
        <label htmlFor="userRole">
          Role
          <select
            data-testid={ MANAGE_SELECT_ROLE }
            name="role"
            id="userRole"
            onChange={ onInputChange }
            value={ state.role }
          >
            <option value="customer">Consumidor</option>
            <option value="seller">Vendedor</option>
            <option value="administrator">Administrador</option>
          </select>
        </label>
        <button
          type="button"
          data-testid={ MANAGE_REGISTER_BUTTON }
          disabled={ validateLogin() }
          onClick={ handleClick }
        >
          Cadastrar
        </button>
        <span data-testid={ MANAGE_INVALID_MESSAGE }>
          { errorMessage }
        </span>
      </BoxForm>

    </ContainerManage>
  );
}

export default Manage;
