import { useRef, useState } from 'react';
import { Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Container, Content, Icon } from './styles';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Loading } from '@components/Loading';

import { groupCreate } from '@storage/group/groupCreate';
import { AppError } from '@utils/AppError';

export function NewGroup() {
  const newGroupNameInputRef = useRef<TextInput>(null);

  const [group, setGroup] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { navigate } = useNavigation();

  async function handleCreateNew() {
    if (!group.trim()) {
      return Alert.alert('Novo Grupo', 'Informe o nome da turma');
    }
    try {
      setIsLoading(true);
      await groupCreate(group);

      navigate('players', { group: group });

      setGroup('');
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('Novo Grupo', error.message);
      } else {
        return Alert.alert(
          'Novo Grupo',
          'Não foi possivel criar um novo grupo',
        );
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Container>
      <Header showBackButton />

      <Content>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Icon />
            <Highlight
              title="Nova Turma"
              subtitle="Crie uma turma para adicionar pessoas"
            />
            <Input
              inputRef={newGroupNameInputRef}
              placeholder="Nome da turma"
              value={group}
              onChangeText={setGroup}
              returnKeyType="done"
              autoCapitalize="words"
              onSubmitEditing={handleCreateNew}
            />
            <Button
              title="Criar"
              style={{ marginTop: 20 }}
              onPress={handleCreateNew}
            />
          </>
        )}
      </Content>
    </Container>
  );
}
