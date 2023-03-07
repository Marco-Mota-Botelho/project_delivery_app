import styled from 'styled-components';

const ContainerOrder = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  padding: 2rem;
  background: ${(props) => props.theme.background};
`;

const BoxOrders = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
  width: 80%;
  margin-top: 100px;

  a {
    list-style: none;
    text-decoration: none;
  }
`;

const CardOrderStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80vw;
  height: calc(1rem + 10vh);
  padding: 1rem calc(0.5rem + 4vw);
  color: ${(props) => props.theme.textColor};
  background: ${(props) => props.theme.background};
  border: solid 2px ${(props) => props.theme.secondaryBackground};
  gap: 2rem;
  border-radius: 2rem;

  span {
    font-size: 18px;
    font-weight: bold;
  }
`;

const SaleIdStyle = styled.span`

  :before {
    content: 'Numero Do Pedido: '
  }
`;

const StatusOrderStyle = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  height: 100%;
  width: 20%;
  color: #000;
  opacity: 0.9;
  
  &.Pendente {
    background: #C5211C;
  }

  &.Preparando {
    background: #f78f07;
  }

  &.emTransito {
    background: #f3e634;
  }

  &.Entregue {
    background: #34c747;
  }

  :hover {
    opacity: 1;
  }
`;

export { ContainerOrder, CardOrderStyle, SaleIdStyle, BoxOrders,
  StatusOrderStyle };
