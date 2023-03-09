import styled, { css } from 'styled-components';
import containerFlex from '../container';

const buttonCSS = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  background: ${(props) => props.theme.secondaryBackground};
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
`;

const Container = styled(containerFlex)`
  flex-direction: column;
  background: ${(props) => props.theme.background};
  width: 100%;
  margin-top: 60px;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
`;

const ContainerProducts = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-wrap: wrap;
  gap: 10px;
  padding: 50px 5px;
`;

const CartProduct = styled(containerFlex)`
  position: relative;
  flex-direction: column;
  width: 300px;
  height: 400px;
  box-shadow: 3px 3px 12px 5px rgba(0, 0, 0, 0.1);
  padding: 5px;
  border-radius: 8px;
  background: white;

  img {
    width: 100%;
    height: 100%;
    max-height: 65%;
    object-fit: contain;
  }
`;

const BoxButtons = styled(containerFlex)`
  position: relative;
  width: 100px;

  input {
    max-width: 100%;
    text-align: center;
    outline: none;
    border: none;
  }
`;

const BtnDifference = styled.button`
  ${buttonCSS};
  position: absolute;
  left: 0;
`;

const BtnSum = styled.button`
  ${buttonCSS};
  position: absolute;
  right: 0;
`;

const ContainerProduct = styled(containerFlex)`
  display: flex;
  flex-wrap: wrap;
`;

const TitleProduct = styled.span`
  position: absolute;
  top: 10px;
  font-size: 14px;
`;

const PriceProduct = styled.span`
  position: absolute;
  bottom: 10px;
  left: 12px;

  :before {
    content: 'R$'
  }
`;

const TotalPrice = styled.span`
  color: ${(props) => props.theme.textColor};
  transform: ${(props) => props.animations === 'true' && 'scale(1.5)'};
  margin-right: ${(props) => (props.animations === 'true' ? '50px' : '10px')};
  font-size: 20px;
  cursor: default;
  :before {
    content: 'Preço Total: '
  }

  @media screen and (max-width: 768px) {
    :before {
      content: ''
    }
  }
`;

const ButtonCart = styled.button`
  position: relative;
  cursor: pointer;
  border: none;
  background-color: ${(props) => props.theme.secondaryBackground};
`;

const SpanCountCartItems = styled.span`
  position: absolute;
  top: -0.7rem;
  right: -1.3rem;
  border-radius: 50%;
  padding: 0.1rem 0.5rem 0;
  background-color: ${(props) => props.theme.quaternaryColor};
  color: ${(props) => props.theme.textColor};
`;

export { CartProduct, ContainerProduct, BoxButtons, TitleProduct, Container,
  PriceProduct, ContainerProducts, TotalPrice, ButtonCart,
  BtnDifference, BtnSum, SpanCountCartItems,
};
