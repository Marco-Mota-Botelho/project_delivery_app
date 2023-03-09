import Styled from 'styled-components';

const TableStyle = Styled.table`
  margin-top: 150px;
  background: ${(props) => props.theme.secondaryBackground};
  color: ${(props) => props.theme.textColor};
  width: 80vw;
  padding: 1rem;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;

  p {
    padding: 1rem;
    font-weight: bold;
  }

  span {
    padding: 1rem;
    margin-top: 1rem;
    font-weight: bold;
    :before {
      content: 'Total: R$ '
    }
  }

  th {
    padding: 0.5rem 1rem;
    background: ${(props) => props.theme.color};
  }

  tbody {
    background: ${(props) => props.theme.background};
  }

  td {
    text-align: center;
    padding: 0.5rem 1rem;
  }

  button {
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 12px;
    cursor: pointer;
    background: ${(props) => props.theme.quaternaryColor};
    color: ${(props) => props.theme.textColor};
  }
`;

export default TableStyle;
