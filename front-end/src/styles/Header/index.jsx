import styled from 'styled-components';

const ContainerHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: end;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 80px;
  background: ${(props) => props.theme.secondaryBackground};
  padding: 0.5rem calc(1rem + 2vw);
  z-index: 999;
`;

export default ContainerHeader;
