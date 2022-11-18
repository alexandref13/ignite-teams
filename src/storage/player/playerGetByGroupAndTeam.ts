import { playerGetByGroup } from './playerGetByGroup';

export async function playerGetByGroupAndTeam(
  group: string,
  team: string,
  user_id: string,
) {
  try {
    const storedPlayers = await playerGetByGroup(group, user_id);

    const players = storedPlayers.filter((player) => player.team === team);

    return players;
  } catch (error) {
    throw error;
  }
}
