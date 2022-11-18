import { ButtonAuth } from '@components/ButtonAuth';
import { Header } from '@components/Header';
import { Loading } from '@components/Loading';
import { useAuth } from '@hooks/useAuth';

import {
  Container,
  FooterContent,
  HeaderContent,
  LoginText,
  Title,
} from './styled';

export function Login() {
  const { signIn, isUserLoading } = useAuth();

  if (isUserLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <HeaderContent>
        <Header />

        <Title>Faça grupos com suas {'\n'} turmas</Title>
      </HeaderContent>

      <FooterContent>
        <LoginText>Faça seu login com{'\n'} uma das contas abaixo</LoginText>
        <ButtonAuth title="Entrar com Google" onPress={signIn} />
      </FooterContent>
    </Container>
  );
}
