import styled from 'styled-components';

const ContainerHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: end;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100px;
  background: ${(props) => props.theme.secondaryBackground};
`;

export default ContainerHeader;
