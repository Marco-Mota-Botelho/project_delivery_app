import styled from 'styled-components';
import containerFlex from '../container';

const ContainerManage = styled(containerFlex)`
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: ${(props) => props.theme.background};
`;

const BoxForm = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 20vh;
  width: 90%;
  border: solid 2px ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 12px;
  padding: 1rem;

  label {
    display: flex;
    flex-direction: column;
    width: 20%;
    gap: 0.3rem;
  }

  input {
    border: none;
    border-radius: 4px;
    height: 2.5rem;
    padding-left: 1rem;
    background: ${(props) => props.theme.background};
    border: solid 1px ${(props) => props.theme.secondaryBackground};
    color: ${(props) => props.theme.textColor};

  ::placeholder {
    opacity: 0.4;
    }
  }

  select {
    padding: 0 1rem;
    height: 2.5rem;
    cursor: pointer;
    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme.textColor};
    border: solid 2px ${(props) => props.theme.secondaryBackground};
    border-radius: 4px;

    option {
      cursor: pointer;
    }
  }

  button {
    width: 20%;
    padding: 0.5rem 1rem;
    border: none;
    background: ${(props) => props.theme.secondaryBackground};
    color: ${(props) => props.theme.textColor};
    cursor: pointer;
    margin-top: 1.5rem;
    border-radius: 4px;

    :disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
`;

const TitleForm = styled.h1`
  position: absolute;
  top: -3rem;
  left: 0;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.textColor};
`;

export { ContainerManage, BoxForm, TitleForm };
