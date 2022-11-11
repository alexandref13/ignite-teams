import { TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';

export type ButtonTypeStyleProps = 'PRIMARY' | 'SECONDARY';

type ButtonProps = {
  type: ButtonTypeStyleProps;
};

export const Container = styled(TouchableOpacity)<ButtonProps>`
  flex: 1;

  min-height: 56px;
  max-height: 56px;

  background-color: ${({ theme, type }) =>
    type === 'SECONDARY' ? theme.COLORS.RED_DARK : theme.COLORS.GREEN_700};

  border-radius: 6px;

  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.BOLD};

    color: ${theme.COLORS.WHITE};
  `};
`;
