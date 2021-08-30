// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';

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

export const  retrieveData = async (key)=>{
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

export const removeData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true
    } catch (error) {
        return null
    }
}

export const validURL = (string) => {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
}

export const joinURL = async(url, encuesta) => {
    if ( _.endsWith(url, '/') ) {
        return url + 'api/' + encuesta;
    } else {
        return url + '/api/' + encuesta;
    }
}

export const asyncForEach = async(array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}