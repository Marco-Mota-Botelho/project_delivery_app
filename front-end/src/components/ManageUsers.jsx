import { useState, useEffect } from 'react';
import TableStyle from '../styles/Table/TableStyles';
import { destroyData, requestData } from '../services/requests';
import { TEST_ID_MANAGE_TABLE } from '../utils/dataTestsIds';

function ManageUsers(render) {
  const [users, setusers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    ITEM_NUMBER,
    ITEM_NAME,
    ITEM_EMAIL,
    ITEM_ROLE,
    ITEM_REMOVE_BUTTON,
    ITEM_ERROR,
  } = TEST_ID_MANAGE_TABLE;

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await requestData('/register/manage');
        setusers(result);
      } catch (error) {
        console.log(error);
        setErrorMessage(error);
      }
    }
    fetchData();
  }, [render]);

  const deleteUser = async (id) => {
    try {
      await destroyData(`/register/manage/${id}`);
      const result = await requestData('/register/manage');
      setusers(result);
    } catch (error) {
      setErrorMessage(error.request.statusText);
    }
  };

  return (
    <>
      <TableStyle>
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
          {users?.map((user, i) => (
            <tr key={ user.id }>
              <td
                data-testid={ `${ITEM_NUMBER}${i}` }
              >
                {i + 1}
              </td>
              <td
                data-testid={ `${ITEM_NAME}${i}` }
              >
                {user.name}
              </td>
              <td
                data-testid={ `${ITEM_EMAIL}${i}` }
              >
                {user.email}
              </td>
              <td
                data-testid={ `${ITEM_ROLE}${i}` }
              >
                {user.role}
              </td>
              <td
                data-testid={ `${ITEM_REMOVE_BUTTON}${i}` }
              >
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

    </>
  );
}

export default ManageUsers;
