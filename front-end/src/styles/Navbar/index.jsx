import styled from 'styled-components';
import simpleBtn from '../button';

const NavbarStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 3;
  width: 100vw;
  height: 80px;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.secondaryBackground};
  padding: 0.5rem calc(1rem + 2vw);
  
  a {
    list-style: none;
    text-decoration: none;
    color: ${(props) => props.theme.textColor};
    cursor: pointer;
    font-size: 20px;
    border-bottom: solid 1px ${(props) => props.theme.textColor};
    margin-left: 15px;
    padding: 0.5rem 1rem;

    :hover {
      background-color: ${(props) => props.theme.textColor};
      color: ${(props) => props.theme.secondaryBackground};
    }
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media screen and (max-width: 768px) {
    div {
    flex-direction: column;
  }
  }
`;

const NameUser = styled.span`
  font-size: 20px;
  margin-right: 20px;
  :before {
    content: 'Olá, ';
  }


  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const BtnLogout = styled(simpleBtn)`
  background: ${(props) => props.theme.secondaryBackground};
  display: flex;
  align-items: center;
  gap: 15px;
  margin-left: 15px;

  :before {
    content: 'Sair '
  }
`;

export { NavbarStyles, NameUser, BtnLogout };
