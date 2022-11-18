import AsyncStorage from '@react-native-async-storage/async-storage';

import { GROUP_COLLECTION } from '@storage/storageConfig';
import { AppError } from '@utils/AppError';

import { groupGetAll } from './groupsGetAll';

export async function groupCreate(newGroupName: string, user_id: string) {
  try {
    const storedGroups = await groupGetAll(user_id);

    const hasSameName = storedGroups.find(
      (group) => group.toLowerCase() === newGroupName.toLowerCase(),
    );

    if (hasSameName) {
      throw new AppError(
        'Mesmo nome de outra turma, tente usar um nome diferente',
      );
    }

    const storage = JSON.stringify([...storedGroups, newGroupName]);

    await AsyncStorage.setItem(`${GROUP_COLLECTION}:user_${user_id}`, storage);
  } catch (error) {
    throw error;
  }
}
