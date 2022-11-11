import { Container, Subtitle, Title } from './styles';

type HighLightProps = {
  title: string;
  subtitle: string;
};

export function Highlight({ title, subtitle }: HighLightProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  );
}
