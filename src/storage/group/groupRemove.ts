import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROUP_COLLECTION, PLAYER_COLLECTION } from '@storage/storageConfig';
import { groupGetAll } from './groupsGetAll';

export async function groupRemove(groupToBeRemoved: string) {
  try {
    const allGroups = await groupGetAll();

    const listWithGroupRemoved = allGroups.filter(
      (group) => group !== groupToBeRemoved,
    );

    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupToBeRemoved}`);

    await AsyncStorage.setItem(
      GROUP_COLLECTION,
      JSON.stringify(listWithGroupRemoved),
    );
  } catch (error) {
    throw error;
  }
}
