import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "../../utils/AppError";

import { PLAYER_COLLETION } from "../storageConfig";
import { playerGetByGroup } from './playersGetByGroup'
import { PlayerStorageDTO } from './PlayerStorageDTO'

export async function PlayerAddByGroup(newPlayer: PlayerStorageDTO, group: string){
try {
    const storedPlayers = await playerGetByGroup(group);

    const playerAlreadyExists = storedPlayers.filter(player => player.name === newPlayer.name)

    if(playerAlreadyExists.length > 0) {
      throw new AppError('Essa pessoa já está em outro time.')
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer])

  await AsyncStorage.setItem(`${PLAYER_COLLETION}-${group}`, storage);

}catch(error) {
  throw(error);
}
}