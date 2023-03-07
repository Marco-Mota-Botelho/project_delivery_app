import styled from 'styled-components';

const BoxDetailsOrder = styled.div`
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90vw;
  height: calc(1rem + 4vh);
  color: ${(props) => props.theme.textColor};
  gap: 1rem;
  font-size: 18px;
  
  span {
    font-weight: bold;
  }


  button, &div button {
    cursor: pointer;
    border: none;
    height: 100%;
    border-radius: 4px;
    padding: 0 1rem;
    background: ${(props) => props.theme.secondaryBackground};
    opacity: 0.9;

    :hover {
      opacity: 1;
    }

    :disabled {
      opacity: 0.4;
      cursor: initial;
    }

  }
  div {
    display: flex;
    height: 100%;
    gap: 1rem;
  }
`;

const TotalPriceDetails = styled.span`
  position: fixed;
  padding: 1rem 4rem;
  background: ${(props) => props.theme.secondaryBackground};
  bottom: 2rem;
  right: 3rem;
  border-radius: 12px;
  font-weight: bold;
  font-size: 18px;

  :before {
    content: 'Total: R$ ';
  }
`;

export { BoxDetailsOrder, TotalPriceDetails };
