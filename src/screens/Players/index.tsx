import { useState, useEffect, useRef } from 'react';
import { FlatList, Alert, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Container, Form, HeaderList, NumberOfPlayers } from './styles';

import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { PlayerCard } from '@components/PlayerCard';
import { EmptyList } from '@components/EmptyList';
import { Button } from '@components/Button';

import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { PlayerStorageDTO } from '@storage/player/playerStorageDTO';
import { playerGetByGroupAndTeam } from '@storage/player/playerGetByGroupAndTeam';

import { AppError } from '@utils/AppError';
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';
import { groupRemove } from '@storage/group/groupRemove';
import { Loading } from '@components/Loading';
import { useAuth } from '@hooks/useAuth';

interface RouteParams {
  group: string;
}

export function Players() {
  const newPlayerNameInputRef = useRef<TextInput>(null);

  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { navigate } = useNavigation();
  const { user } = useAuth();

  const { params } = useRoute();
  const { group } = params as RouteParams;

  async function handleAddPlayer() {
    if (!newPlayerName.trim()) {
      return Alert.alert(
        'Nova pessoa',
        'Informe o nome da pessoa para adicionar ',
      );
    }

    const newPlayer: PlayerStorageDTO = {
      name: newPlayerName,
      team,
    };

    try {
      await playerAddByGroup(newPlayer, group, user.id);

      newPlayerNameInputRef.current?.blur();
      setNewPlayerName('');
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('Nova pessoa', error.message);
      } else {
        return Alert.alert(
          'Nova pessoa',
          'Não foi possivel adicionar essa pessoa',
        );
      }
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(group, playerName, user.id);
      fetchPlayersByTeam();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveGroup() {
    try {
      Alert.alert(
        'Remover item',
        'Tem certeza que você deseja remover essa turma?',
        [
          {
            text: 'Não',
            style: 'cancel',
          },
          {
            text: 'Sim',
            onPress: async () => {
              setIsLoading(true);
              await groupRemove(group, user.id);

              navigate('groups');
            },
          },
        ],
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await playerGetByGroupAndTeam(group, team, user.id);

      setPlayers(playersByTeam);
    } catch (error) {
      return Alert.alert('Nova pessoa', 'Não foi possivel carregar as pessoas');
    }
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Highlight
            title={group}
            subtitle="Adicione a galera e separe os times"
          />

          <Form>
            <Input
              inputRef={newPlayerNameInputRef}
              placeholder="Nome do participante"
              value={newPlayerName}
              onChangeText={setNewPlayerName}
              onSubmitEditing={handleAddPlayer}
              returnKeyType="done"
              autoCorrect={false}
              autoCapitalize="words"
            />

            <ButtonIcon icon="add" onPress={handleAddPlayer} />
          </Form>
          <HeaderList>
            <FlatList
              data={['Time A', 'Time B']}
              keyExtractor={(item) => item}
              horizontal
              renderItem={({ item }) => (
                <Filter
                  title={item}
                  isActive={item === team}
                  onPress={() => setTeam(item)}
                />
              )}
            />
            <NumberOfPlayers>{players.length}</NumberOfPlayers>
          </HeaderList>

          <FlatList
            data={players}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <PlayerCard
                name={item.name}
                onRemove={() => handleRemovePlayer(item.name)}
              />
            )}
            ListEmptyComponent={() => (
              <EmptyList message="Não há pessoas nesse time" />
            )}
            contentContainerStyle={[
              players.length === 0 && { flex: 1 },
              { paddingBottom: 50 },
            ]}
            showsVerticalScrollIndicator={false}
          />
          <Button
            title="Remover turma"
            type="SECONDARY"
            onPress={handleRemoveGroup}
          />
        </>
      )}
    </Container>
  );
}
