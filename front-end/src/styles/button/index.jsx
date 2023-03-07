import styled from 'styled-components';

const simpleBtn = styled.button`
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
`;

export default simpleBtn;
