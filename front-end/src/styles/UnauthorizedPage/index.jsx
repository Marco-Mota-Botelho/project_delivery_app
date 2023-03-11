import styled from 'styled-components';
import delivery401 from '../../assets/images/error-401.png';

const ContainerUnauthorizedPage = styled.div`
  background-image: url(${delivery401});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 100vw;
  height: 100vh;
`;

export default ContainerUnauthorizedPage;
