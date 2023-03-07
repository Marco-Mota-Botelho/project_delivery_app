import Styled from 'styled-components';

const TableStyle = Styled.table`
  margin-top: 50px;
  background: ${(props) => props.theme.color};
  color: ${(props) => props.theme.textColor};
  width: 80vw;

  th {
    padding: 0.5rem 1rem;
    background: ${(props) => props.theme.secondaryBackground};
  }

  tbody {
    background: ${(props) => props.theme.background};
  }

  td {
    text-align: center;
    padding: 0.5rem 1rem;
  }
`;

export default TableStyle;
