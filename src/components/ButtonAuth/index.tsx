import { TouchableOpacityProps } from 'react-native';

import GoogleImg from '@assets/google.svg';
import { Container, Title } from './styled';

type ButtonAuthProps = TouchableOpacityProps & {
  title: string;
  type?: 'GOOGLE';
};

export function ButtonAuth({
  title,
  type = 'GOOGLE',
  ...rest
}: ButtonAuthProps) {
  return (
    <Container {...rest}>
      {type === 'GOOGLE' ? <GoogleImg width={24} height={24} /> : null}
      <Title>{title}</Title>
    </Container>
  );
}
