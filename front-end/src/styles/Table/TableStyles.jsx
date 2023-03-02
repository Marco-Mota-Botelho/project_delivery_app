import Styled from 'styled-components';

const TableStyle = Styled.table`
  margin-top: 50px;
  background: #031424;
  color: #fff;
  width: 100vw;

  th {
    color: #fff;
  }

  td {
    text-align: center;
  }
  
  button {
    align-items: center;
    color: #456988;
    width: 100%;
    background: transparent;
    border-radius: 12px;
    border: 1px solid #6a0aaa;
    padding: 5px 10px;
    margin-bottom: 5px;
    gap: 4px;

    :hover {
      background: #6a0aaa;
      border: 1px solid #456988;
      color: #fff;
    }
  }
`;

export default TableStyle;
