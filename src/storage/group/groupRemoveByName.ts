import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLETION, PLAYER_COLLETION } from "../storageConfig";

import { groupsGetAll } from './groupsGetAll';

export async function groupRemoveByName(groupDeleted: string){
    try{
        const storadGroups = await groupsGetAll();
        const groups = storadGroups.filter(group => group !== groupDeleted);

        await AsyncStorage.setItem(GROUP_COLLETION, JSON.stringify(groups));
        await AsyncStorage.removeItem(`${PLAYER_COLLETION}-${groupDeleted}`);
    }catch(error){
        throw error;
    }
}