import { useState, useCallback } from 'react';

import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';

import { Container } from './styles';
import { FlatList, Pressable } from 'react-native';
import { EmptyList } from '@components/EmptyList';
import { Button } from '@components/Button';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { groupGetAll } from '@storage/group/groupsGetAll';
import { useAuth } from '@hooks/useAuth';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

  const { navigate } = useNavigation();
  const { signOut, user } = useAuth();

  async function fetchGroups() {
    try {
      const storedGroups = await groupGetAll(user.id);

      setGroups(storedGroups);
    } catch (error) {
      throw error;
    }
  }

  function handleGoToNew() {
    navigate('new');
  }

  function handleGoToPlayers(group: string) {
    navigate('players', { group });
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, []),
  );

  return (
    <Container>
      <Pressable onPress={signOut}>
        <Header />
      </Pressable>
      <Highlight title="Bem vindo, " subtitle={user.name} />
      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <GroupCard title={item} onPress={() => handleGoToPlayers(item)} />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <EmptyList message="Que tal cadastrar a primeira turma?" />
        )}
        showsVerticalScrollIndicator={false}
      />
      <Button title="Criar nova turma" onPress={handleGoToNew} />
    </Container>
  );
}
