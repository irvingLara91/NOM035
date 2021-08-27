import React, {useEffect, useState} from "react";
import {Image, StatusBar, StyleSheet, View} from 'react-native';
import {NativeBaseProvider, Box, Text, Button} from 'native-base';
import {theme} from "./theme";
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from "@react-navigation/native";
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';
import {Provider} from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import LoginUser from "./screens/nom035/LoginUser";
import AssessmentNom035 from "./screens/nom035/AssessmentNom035";
import SociodemographicPage from "./screens/nom035/SociodemographicPage";
import LoginAdmin from "./screens/settings/LoginAdmin";
import HomeSettings from "./screens/settings/HomeSettings";
import UsersUpdate from "./screens/settings/UsersUpdate";
import KhorConfig from "./screens/settings/KhorConfig";
import SendScreen from "./screens/settings/SendScreen";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";


let logo = require('./assets/logoa.png')

import generateStore from './redux/store';
import {textSizeRender} from "./utils/utils";

const store = generateStore();

const Stack = createStackNavigator();
console.disableYellowBox = true;


export default function App({iconSettings}) {
    const [isReady, setIsReady] = useState(false);

    let [fontsLoaded] = useFonts({
        'Poligon_Bold': require('./assets/fonts/Poligon_Bold.otf'),
        'Poligon_Regular': require('./assets/fonts/Poligon_Regular.otf'),
    });

    useEffect( () => {
        SplashScreen.preventAutoHideAsync();
    }, [])


    const _cacheResourcesAsync = async () => {
        SplashScreen.hideAsync();

        try {

        } catch (e) {
            console.warn(e);
        } finally {
            setTimeout(() => {
                setIsReady(true)

            }, 4500)
        }
    };

    if (fontsLoaded && isReady) {
        return (
            <Provider store={store}>
                <NativeBaseProvider theme={theme}>
                    <StatusBar
                        barStyle="light-content"
                        backgroundColor={"rgba(7,6,6,0)"}
                        translucent={true}
                    />
                    <NavigationContainer>
                        <Stack.Navigator>
                            <Stack.Screen name="Home" options={({navigation}) =>
                                ({
                                    navigation,
                                    title: '',
                                    headerLeft: () => (
                                        <Image resizeMode={'contain'} style={{tintColor:'white',width:150,marginLeft:10}} source={require('./assets/logokhor.png')}/>
                                    ),
                                    headerRight: () => (
                                        <Ionicons
                                            onPress={() => navigation.navigate('LoginAdmin')}
                                            name="md-settings-outline"
                                            size={38}
                                            color={store.getState().app.secondaryColor}
                                        />
                                    ),
                                    headerStyle: {
                                        backgroundColor: store.getState().app.color,
                                    },
                                    headerTintColor: store.getState().app.secondaryColor,
                                    headerTitleStyle: {
                                        fontFamily:'Poligon_Regular',
                                        fontSize: textSizeRender(3.5)
                                    },
                                })
                            } component={HomeScreen}/>
                            <Stack.Screen name="LoginAdmin"
                                          options={{
                                              title: 'Login',
                                              headerStyle: {
                                                  backgroundColor: store.getState().app.color,
                                              },
                                              headerTintColor: store.getState().app.secondaryColor,
                                              headerTitleStyle: {
                                                  fontFamily:'Poligon_Regular',
                                                  fontSize: textSizeRender(3.5)
                                              },
                                          }}
                                          component={LoginAdmin}/>
                            <Stack.Screen name="HomeConfig" options={
                                {
                                    title: 'Configuración General',
                                    headerStyle: {
                                        backgroundColor: store.getState().app.color,
                                    },
                                    headerTintColor: store.getState().app.secondaryColor,
                                    headerTitleStyle: {
                                        fontFamily:'Poligon_Regular',
                                        fontSize: textSizeRender(3.5)
                                    },
                                }
                            } component={HomeSettings}/>
                            <Stack.Screen name="loginUser" options={
                                {
                                    title: 'Acceso',
                                    headerStyle: {
                                        backgroundColor: store.getState().app.color,
                                    },
                                    headerTintColor: store.getState().app.secondaryColor,
                                    headerTitleStyle: {
                                        fontFamily:'Poligon_Regular',
                                        fontSize: textSizeRender(3.5)
                                    },
                                }
                            } component={LoginUser}/>
                            <Stack.Screen name="AssessmentNom035" options={
                                {
                                    title: 'Nom035',
                                    headerStyle: {
                                        backgroundColor: store.getState().app.color,
                                    },
                                    headerTintColor: store.getState().app.secondaryColor,
                                    headerTitleStyle: {
                                        fontFamily:'Poligon_Regular',
                                        fontSize: textSizeRender(3.5)
                                    },
                                }
                            } component={AssessmentNom035}/>
                            <Stack.Screen name="UsersUpdate" options={
                                {
                                    title: 'Actualizar usuarios',

                                    headerStyle: {
                                        backgroundColor: store.getState().app.color,
                                    },
                                    headerTintColor: store.getState().app.secondaryColor,
                                    headerTitleStyle: {
                                        fontFamily:'Poligon_Regular',
                                        fontSize: textSizeRender(3.5)
                                    },
                                }
                            } component={UsersUpdate}/>
                            <Stack.Screen name="KhorConfig" options={
                                {
                                    title: 'Configuración KHOR',
                                    headerStyle: {
                                        backgroundColor: store.getState().app.color,
                                    },
                                    headerTintColor: store.getState().app.secondaryColor,
                                    headerTitleStyle: {
                                        fontFamily:'Poligon_Regular',
                                        fontSize: textSizeRender(3.5)
                                    },
                                }
                            } component={KhorConfig}/>
                            <Stack.Screen name="SendScreen" options={
                                {
                                    title: 'Enviar respuestas a KHOR',
                                    headerStyle: {
                                        backgroundColor: store.getState().app.color,
                                    },
                                    headerTintColor: store.getState().app.secondaryColor,
                                    headerTitleStyle: {
                                        fontFamily:'Poligon_Regular',
                                        fontSize: textSizeRender(3.5)
                                    },
                                }
                            } component={SendScreen}/>
                            <Stack.Screen name="SociodemographicPage" options={
                                {
                                    title: 'Datos sociodemográficos',
                                    headerStyle: {
                                        backgroundColor: store.getState().app.color,
                                    },
                                    headerTintColor: store.getState().app.secondaryColor,
                                    headerTitleStyle: {
                                        fontFamily:'Poligon_Regular',
                                        fontSize: textSizeRender(3.5)
                                    },
                                }
                            } component={SociodemographicPage}/>
                        </Stack.Navigator>
                    </NavigationContainer>
                </NativeBaseProvider>
            </Provider>
        );
    }else {
        return (
            <View style={{flex: 1,backgroundColor:'#ffffff'}}>

                <View style={{flex: 1}}>
                    <Image
                        source={require('./assets/splash.png')}
                        onLoad={_cacheResourcesAsync}
                        style={{resizeMode: 'contain', width: '100%', height: '100%'}}
                    />
                </View>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    container: {}
});
