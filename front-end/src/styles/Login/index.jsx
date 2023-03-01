import styled from 'styled-components';
import container from '../container';

const ContainerLogin = styled(container)`
  width: 100vw;
  height: 100vh;
  background: ${(props) => props.theme.background};
  flex-direction: column;
`;

const BoxForm = styled(container)`
  position: relative;
  flex-direction: column;
  gap: 0.5rem;
  padding: 3rem;
  background: ${(props) => props.theme.secondaryBackground};
  width: 300px;
  height: 400px;
  border-radius: 0.75rem;
  box-shadow:  0.125rem 0.125rem 0.125rem 0.125rem #0000002f;
`;

const InputLogin = styled.input`
  border: none;
  border-radius: 1rem;
  width: 15.625rem;
  height: 2.5rem;
  padding-left: 1rem;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.textColor};


  ::placeholder {
    color: ${(props) => props.theme.textColor};
    opacity: 0.4;
  }

  @media screen and (max-width: 768px) {
    width: 10rem;
    height: 1.5rem;
    font-size: 12px;
  }
`;

const ButtonLogin = styled.button`
  cursor: pointer;
  border: none;
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
};
