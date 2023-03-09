import styled from 'styled-components';

const ContainerCheckout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.textColor};
  width: 100%;
  height: 100vh;
`;

const BoxFormCheckout = styled.form`
  display: flex;
  justify-content: center;
  width: 80vw;
  background: ${(props) => props.theme.secondaryBackground};
  padding: 2rem;
  gap: 1rem;

  input, select {
    border: none;
    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme.textColor};
    height: 2.5rem;
    padding-left: 1rem;
    border-radius: 4px;
  }

  select {
    padding: 0 1rem;
    cursor: pointer;

    option {
      cursor: pointer;
    }
  }


  button {
    border: none;
    padding: 0.5rem 1rem;
    width: 80%;
    border-radius: 12px;
    cursor: pointer;
    background: ${(props) => props.theme.quaternaryColor};
    color: ${(props) => props.theme.textColor};
  }
`;

export { ContainerCheckout, BoxFormCheckout };
