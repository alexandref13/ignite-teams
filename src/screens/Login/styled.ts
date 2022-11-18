import { SafeAreaView } from 'react-native-safe-area-context';
import styled, { css } from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  flex: 1;

  background-color: ${({ theme }) => theme.COLORS.GRAY_600};

  padding: 24px;
`;

export const HeaderContent = styled.View`
  flex: 1;
`;

export const FooterContent = styled.View`
  flex: 1;

  justify-content: flex-end;

  padding: 0 50px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.XL}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.WHITE};
  `}

  line-height: 40px;

  text-align: center;
  align-self: center;
  max-width: 270px;

  margin-top: 32px;
`;

export const LoginText = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.WHITE};
  `}

  text-align: center;
  align-self: center;
  max-width: 270px;

  margin-top: 32px;
  margin-bottom: 40px;
`;
