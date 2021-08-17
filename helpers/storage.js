// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value)=>{
    try {

        await AsyncStorage.setItem(
            key,
            JSON.stringify(value)
        );
        return true
    } catch (error) {
        // Error saving data
        return false
    }
}


export const retrieveData = async (key)=>{
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            // We have data!!
            return JSON.parse(value)
        }
    } catch (error) {
        return null
        // Error retrieving data
    }
}
