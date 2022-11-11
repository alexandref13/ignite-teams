import { useNavigation } from '@react-navigation/native';

import { Container, Logo, BackIcon, BackButton } from './styles';

import logoImg from '@assets/logo.png';

type HeaderProps = {
  showBackButton?: boolean;
};

export function Header({ showBackButton = false }: HeaderProps) {
  const { navigate } = useNavigation();

  function handleGoToHome() {
    navigate('groups');
  }

  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={handleGoToHome}>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={logoImg}></Logo>
    </Container>
  );
}
