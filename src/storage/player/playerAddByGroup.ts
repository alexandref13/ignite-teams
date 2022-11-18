import AsyncStorage from '@react-native-async-storage/async-storage';

import { PLAYER_COLLECTION } from '@storage/storageConfig';
import { AppError } from '@utils/AppError';

import { playerGetByGroup } from './playerGetByGroup';
import { PlayerStorageDTO } from './playerStorageDTO';

export async function playerAddByGroup(
  newPlayer: PlayerStorageDTO,
  group: string,
  user_id: string,
) {
  try {
    const storedPlayers = await playerGetByGroup(group, user_id);

    const playerAlredyInGroup = storedPlayers.find(
      (player) => player.name === newPlayer.name,
    );

    if (playerAlredyInGroup) {
      throw new AppError('Essa pessoa já está adicionada em um time');
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (error) {
    throw error;
  }
}
