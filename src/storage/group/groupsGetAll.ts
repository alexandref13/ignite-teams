import AsyncStorage from '@react-native-async-storage/async-storage';

import { GROUP_COLLECTION } from '@storage/storageConfig';

export async function groupGetAll(user_id: string) {
  try {
    const storage = await AsyncStorage.getItem(
      `${GROUP_COLLECTION}:user_${user_id}`,
    );

    const groups: string[] = storage ? JSON.parse(storage) : [];

    return groups;
  } catch (error) {
    throw error;
  }
}
