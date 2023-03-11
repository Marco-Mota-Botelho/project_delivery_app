import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { destroyData, requestData, requestLogin, setToken } from '../services/requests';
import { TEST_ID_MANAGE, TEST_ID_MANAGE_TABLE } from '../utils/dataTestsIds';
import Navbar from '../components/Navbar';
import { BoxForm, ContainerManage, TitleForm } from '../styles/Manage.';
import TableStyle from '../styles/Table/TableStyles';
import { getUser } from '../services/userStorage';

const { INPUT_NAME, INPUT_EMAIL, INPUT_PASSWORD, MANAGE_REGISTER_BUTTON,
  MANAGE_SELECT_ROLE, MANAGE_INVALID_MESSAGE } = TEST_ID_MANAGE;

const { ITEM_NUMBER, ITEM_NAME, ITEM_EMAIL, ITEM_ROLE, ITEM_REMOVE_BUTTON,
  ITEM_ERROR } = TEST_ID_MANAGE_TABLE;

const MIN_PASSWORD_LENGTH = 6;
const MIN_NAME_LENGTH = 12;
const INITIAL_STATE = {
  email: '',
  password: '',
  name: '',
  role: 'customer',
};

function Manage() {
  const [state, setState] = useState(INITIAL_STATE);
  const [errorMessage, setErrorMessage] = useState('');
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();

  const validateLogin = () => {
    const checkEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(state.email);
    return !(checkEmail && state.password.length >= MIN_PASSWORD_LENGTH
       && state.name.length >= MIN_NAME_LENGTH);
  };

  const onInputChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };

  const handleClick = async () => {
    const { name, email, password, role } = state;
    const user = JSON.parse(localStorage.getItem('user'));
    setToken(user.token);
    try {
      await requestLogin(
        '/user/register/manage',
        { name, email, password, role },
      );
      setState(INITIAL_STATE);
      const result = await requestData('/user');
      setUsers(result);
    } catch (error) {
      setErrorMessage(error.request.statusText);
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await destroyData(`/user/${id}`);
      const result = await requestData('/user');
      setUsers(result);
    } catch (error) {
      setErrorMessage(error.request.statusText);
    }
  };

  useEffect(() => {
    setErrorMessage('');
  }, [state]);

  useEffect(() => {
    const user = getUser();
    if (user.role !== 'administrator') return navigate('/401');
    async function fetchData() {
      try {
        const result = await requestData('/user');
        setUsers(result);
      } catch (error) {
        setErrorMessage(error);
      }
    }
    fetchData();
  }, [navigate]);

  return (
    <ContainerManage>
      <Navbar />
      <BoxForm>
        <TitleForm>Gerenciar novo usuário</TitleForm>
        <label htmlFor="userName">
          Nome
          <input
            type="name"
            data-testid={ INPUT_NAME }
            id="userName"
            name="name"
            placeholder="Nome e sobrenome"
            onChange={ onInputChange }
            value={ state.name }
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
      { users && (
        <div>
          <TableStyle isMenage="true">
            <thead>
              <tr>
                <th>Item</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Tipo</th>
                <th>Excluir</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={ user.id }>
                  <td data-testid={ `${ITEM_NUMBER}${i}` }>
                    {i + 1}
                  </td>
                  <td data-testid={ `${ITEM_NAME}${i}` }>
                    {user.name}
                  </td>
                  <td data-testid={ `${ITEM_EMAIL}${i}` }>
                    {user.email}
                  </td>
                  <td data-testid={ `${ITEM_ROLE}${i}` }>
                    {user.role}
                  </td>
                  <td data-testid={ `${ITEM_REMOVE_BUTTON}${i}` }>
                    <button
                      type="submit"
                      onClick={ () => deleteUser(user.id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </TableStyle>
          <p data-testid={ ITEM_ERROR }>
            {errorMessage}
          </p>
        </div>
      ) }

    </ContainerManage>
  );
}

export default Manage;
