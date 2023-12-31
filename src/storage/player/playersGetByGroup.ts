import AsyncStorage from "@react-native-async-storage/async-storage";

import { PlayerStorageDTO } from './PlayerStorageDTO'
import { PLAYER_COLLETION } from "../storageConfig";

export async function  playerGetByGroup(group: string) {
  try{
    const storage = await AsyncStorage.getItem(`${PLAYER_COLLETION}-${group}`);

    const players: PlayerStorageDTO[] = storage ? JSON.parse(storage) : [];

    return players;

  }catch(error){
    throw error;
  }
}