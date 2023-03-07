import styled from 'styled-components';
import containerFlex from '../container';
import backgroundDelivery from '../../assets/images/delivery-removebg-preview.png';
import simpleBtn from '../button';

const ContainerLogin = styled(containerFlex)`
  position: relative;
  width: 100vw;
  height: 100vh;
  padding: 1rem;
  background-color: ${(props) => props.theme.background};
  gap: 4rem;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    padding: 0;
  }
`;

const BoxImage = styled.div`
  background-image: url(${backgroundDelivery});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  width: 40%;
  height: 100%;

  @media screen and (max-width: 600px) {
    height: 20%;
    width: 100%;
    position: absolute;
    top: calc(1rem + 15vh);
    z-index: 3;
  }
`;

const BoxForm = styled(containerFlex)`
  position: relative;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  width: 300px;
  height: 400px;
  border-radius: 0.75rem;
  box-shadow:  0.125rem 0.125rem 0.125rem 0.125rem #0000002f;
`;

const InputLogin = styled.input`
  border: none;
  border-radius: 1rem;
  width: 95%;
  height: 2.5rem;
  padding-left: 1rem;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.textColor};

  ::placeholder {
    color: ${(props) => props.theme.textColor};
    opacity: 0.4;
  }

  @media screen and (max-width: 768px) {
    height: 1.5rem;
    font-size: 12px;
  }
`;

const ButtonLogin = styled(simpleBtn)`
  width: 15.625rem;
  height: 2.5rem;
  border-radius: 0.375rem;
  background: ${(props) => props.theme.color};
  font-size: 0.875rem;
  font-weight: 500;
  opacity: 0.8;

  &.first {
    margin-top: 0.75rem;
  }

  :hover {
    opacity: 1;
  }

  :disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  @media screen and (max-width: 768px) {
    width: 10rem;
    height: 1.5rem;
    font-size: 10px;
    font-weight: 400;
  }
`;

const TitleBoxLogin = styled.h1`
  color: ${(props) => props.theme.textColor};
  font-size: 20px;
`;

const SpanErrorLogin = styled.span`
  position: absolute;
  bottom: 50px;
  font-weight: bold;
  left: auto;
  font-size: 18px;
  text-transform: capitalize;
  color: ${(props) => props.theme.textColor};

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

export {
  SpanErrorLogin,
  TitleBoxLogin,
  BoxForm,
  ContainerLogin,
  InputLogin,
  ButtonLogin,
  BoxImage,
};
