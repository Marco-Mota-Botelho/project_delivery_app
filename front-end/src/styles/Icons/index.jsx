import styled, { css } from 'styled-components';
import { ReactComponent as Sun } from '../../assets/svg/sun-icon.svg';
import { ReactComponent as Moon } from '../../assets/svg/moon-icon.svg';
import { ReactComponent as Cart } from '../../assets/svg/shopping-cart.svg';
import { ReactComponent as LogOut } from '../../assets/svg/logout.svg';
import { ReactComponent as EyeOpen } from '../../assets/svg/eye-open.svg';
import { ReactComponent as EyeClosed } from '../../assets/svg/eye-closed.svg';

const themeCss = css`
  width: 28px;
  height: 28px;
  color: ${(props) => props.theme.quaternaryColor};
`;

const EyesPassword = css`
  width: 22px;
  height: 22px;
  fill: ${(props) => props.theme.background};
  path {
    stroke: ${(props) => props.theme.textColor};
  }
  cursor: pointer;
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

export const OpenEyeIcon = styled(EyeOpen)`${EyesPassword}`;
export const ClosedEyeIcon = styled(EyeClosed)`${EyesPassword}`;
