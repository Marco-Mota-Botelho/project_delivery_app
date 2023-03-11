import styled from 'styled-components';
import containerFlex from '../container';
import delivery404 from '../../assets/images/image-404.png';

const ContainerNotFound = styled(containerFlex)`
  position: relative;
  color: ${(props) => props.theme.textColor};
  background-color:  ${(props) => props.theme.background};
  width: 100vw;
  height: 100vh;
  flex-direction: column;
`;

const BoxMessageError = styled.span`
  position: absolute;
  top: 5vh;
  width: 60%;
  text-align: center;
  color: #74BA00;
  font-size: 40px;
`;

const ImageError = styled.div`
  background-image: url(${delivery404});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 100%;
  height: 80%;
`;

export { ContainerNotFound, BoxMessageError, ImageError };
