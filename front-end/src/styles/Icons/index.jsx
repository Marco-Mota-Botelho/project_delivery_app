import styled, { css } from 'styled-components';
import { ReactComponent as Sun } from '../../assets/svg/sun-icon.svg';
import { ReactComponent as Moon } from '../../assets/svg/moon-icon.svg';
import { ReactComponent as Cart } from '../../assets/svg/shopping-cart.svg';
import { ReactComponent as LogOut } from '../../assets/svg/logout.svg';

const themeCss = css`
  width: 28px;
  height: 28px;
  color: ${(props) => props.theme.quaternaryColor};
`;

const iconsNavBarCss = css`
  width: 32px;
  height: 32px;
  fill: ${(props) => props.theme.textColor};
`;

export const ShoppingCartIcon = styled(Cart)`
  ${iconsNavBarCss};

  @keyframes shake {
    from {
      transform: rotate(30deg) scale(1.5);
    }
    to {
      transform: rotate(-30deg);
    }
  }
  animation: ${(props) => props.animations === 'true' && 'shake 1.3s infinite alternate'};
`;
export const LogoutIcon = styled(LogOut)`${iconsNavBarCss}`;

export const SunIcon = styled(Sun)`${themeCss}`;
export const MoonIcon = styled(Moon)`${themeCss}`;
