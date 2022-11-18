import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROUP_COLLECTION, PLAYER_COLLECTION } from '@storage/storageConfig';
import { groupGetAll } from './groupsGetAll';

export async function groupRemove(groupToBeRemoved: string, user_id: string) {
  try {
    const allGroups = await groupGetAll(user_id);

    const listWithGroupRemoved = allGroups.filter(
      (group) => group !== groupToBeRemoved,
    );

    await AsyncStorage.removeItem(
      `${PLAYER_COLLECTION}-${groupToBeRemoved}:user_${user_id}`,
    );

    await AsyncStorage.setItem(
      `${GROUP_COLLECTION}:user_${user_id}`,
      JSON.stringify(listWithGroupRemoved),
    );
  } catch (error) {
    throw error;
  }
}
