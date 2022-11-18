import AsyncStorage from '@react-native-async-storage/async-storage';
import { PLAYER_COLLECTION } from '@storage/storageConfig';
import { PlayerStorageDTO } from './playerStorageDTO';

export async function playerGetByGroup(group: string, user_id: string) {
  try {
    const storage = await AsyncStorage.getItem(
      `${PLAYER_COLLECTION}-${group}:user_${user_id}`,
    );

    const players: PlayerStorageDTO[] = storage ? JSON.parse(storage) : [];

    return players;
  } catch (error) {
    throw error;
  }
}
