import { useState, useEffect } from 'react';
import { requestLogin, setToken } from '../services/requests';
import { TEST_ID_MANAGE } from '../utils/dataTestsIds';
import Navbar from '../components/Navbar';
import ManageUsers from '../components/ManageUsers';

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
  // const navigate = useNavigate();
  const [state, setState] = useState(
    { email: '',
      password: '',
      userName: '',
      role: 'customer' },
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [render, setRender] = useState(false);

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
      requestLogin('/register/manage', { name: userName, email, password, role });
      console.log(response);
      setState({ email: '', password: '', userName: '', role: '' });
      // navigate(`/${ROLE_PATH.customer}`);
      setRender(true);
    } catch (error) {
      setErrorMessage(error.request.statusText);
      console.error(error);
    }
  };

  useEffect(() => {
    setErrorMessage('');
    setRender(false);
  }, [state]);

  return (
    <div>
      <Navbar />
      <input
        type="userName"
        data-testid={ INPUT_NAME }
        name="userName"
        placeholder="Nome e sobrenome"
        onChange={ onInputChange }
        value={ state.userName }
      />
      <input
        type="email"
        data-testid={ INPUT_EMAIL }
        name="email"
        placeholder="email"
        onChange={ onInputChange }
        value={ state.email }
      />
      <input
        type="text"
        data-testid={ INPUT_PASSWORD }
        name="password"
        placeholder="Digite sua senha"
        onChange={ onInputChange }
        value={ state.password }
      />
      <select
        data-testid={ MANAGE_SELECT_ROLE }
        name="role"
        onChange={ onInputChange }
        value={ state.role }
      >
        <option value="customer">Consumidor</option>
        <option value="seller">Vendedor</option>
        <option value="administrator">Administrador</option>
      </select>
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
      <ManageUsers render={ render } />
    </div>
  );
}

export default Manage;
