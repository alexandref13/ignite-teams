import AsyncStorage from '@react-native-async-storage/async-storage';
import { PLAYER_COLLECTION } from '@storage/storageConfig';
import { playerGetByGroup } from './playerGetByGroup';

export async function playerRemoveByGroup(
  group: string,
  playerName: string,
  user_id: string,
) {
  try {
    const allPlayers = await playerGetByGroup(group, user_id);

    const listWithPlayerRemoved = allPlayers.filter(
      (player) => player.name !== playerName,
    );

    await AsyncStorage.setItem(
      `${PLAYER_COLLECTION}-${group}:user_${user_id}`,
      JSON.stringify(listWithPlayerRemoved),
    );

    return listWithPlayerRemoved;
  } catch (error) {
    throw error;
  }
}
