import React, {useEffect} from "react";
import {StyleSheet, View} from 'react-native';
import {NativeBaseProvider, Box, Text, Button} from 'native-base';
import {theme} from "./theme";
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import LoginAdmin from "./screens/settings/LoginAdmin";
import LoginUser from "./screens/nom035/LoginUser";
import HomeSettings from "./screens/settings/HomeSettings";
import {Provider} from "react-redux";
import { Ionicons } from '@expo/vector-icons';
import {store} from "./redux/store";
import * as Font from 'expo-font';


const Stack = createStackNavigator();
console.disableYellowBox = true;


export default function App({iconSettings}) {



    return (
        <Provider store={store}>
        <NativeBaseProvider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" options={ ({navigation})=>
                    ({
                            navigation,
                            title: 'Bienvenido',
                            headerRight: () => (
                                <Ionicons
                                   onPress={()=> navigation.navigate('LoginAdmin')}
                                   name="md-settings-outline"
                                   size={38}
                               />
                            )
                        })
                    } component={HomeScreen}/>
                    <Stack.Screen name="LoginAdmin" options={
                        {
                            title:'Login',

                        }
                    } component={LoginAdmin}/>
                    <Stack.Screen name="HomeConfig" options={
                        {
                            title:'Configuración general',
                        }
                    } component={HomeSettings}/>
                    <Stack.Screen name="loginUser" options={
                        {
                            title:'Acceso',
                        }
                    } component={LoginUser}/>
                </Stack.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
        </Provider>
    );
}


const styles = StyleSheet.create({
    container: {}
});
