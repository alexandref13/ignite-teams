import AsyncStorage from '@react-native-async-storage/async-storage';
import { PLAYER_COLLECTION } from '@storage/storageConfig';
import { playerGetByGroup } from './playerGetByGroup';

export async function playerRemoveByGroup(group: string, playerName: string) {
  try {
    const allPlayers = await playerGetByGroup(group);

    const listWithPlayerRemoved = allPlayers.filter(
      (player) => player.name !== playerName,
    );

    await AsyncStorage.setItem(
      `${PLAYER_COLLECTION}-${group}`,
      JSON.stringify(listWithPlayerRemoved),
    );

    return listWithPlayerRemoved;
  } catch (error) {
    throw error;
  }
}
