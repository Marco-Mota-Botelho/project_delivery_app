import styled, { css } from 'styled-components';
import { ReactComponent as Sun } from '../../assets/svg/sun-icon.svg';
import { ReactComponent as Moon } from '../../assets/svg/moon-icon.svg';

const themeCss = css`
  width: 28px;
  height: 28px;
  color: ${(props) => props.theme.quaternaryColor};
`;

export const SunIcon = styled(Sun)`${themeCss}`;
export const MoonIcon = styled(Moon)`${themeCss}`;
