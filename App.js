import React, {useEffect, useState} from "react";
import {Image, StatusBar, StyleSheet, Dimensions, View, BackHandler} from 'react-native';
import {NativeBaseProvider, Box, Text, Button} from 'native-base';
import {theme} from "./theme";
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from "@react-navigation/native";
import * as Font from 'expo-font';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
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
import ResponsesLog from "./screens/settings/ResponsesLog";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";


let logo = require('./assets/logoa.png')

import generateStore from './redux/store';
import {textSizeRender} from "./utils/utils";
import {retrieveData} from "./helpers/storage";
import ModalAlertBack from "./components/Modals/ModalAlertBack";
import SelectCountryScreen from "./screens/ECO/SelectCountryScreen";
import AssessmentECO from "./screens/ECO/AssessmentECO";
import ReagentsECOScreen from "./screens/ECO/ReagentsECOScreen";
import FactorRankingScreen from "./screens/ECO/FactorRankingScreen";
import OpenQuestionsScreen from "./screens/ECO/OpenQuestionsScreen";
import AssessmentECO2 from "./screens/ECO/AssessmentECO2";

const store = generateStore();

const Stack = createStackNavigator();
console.disableYellowBox = true;


const {height, width} = Dimensions.get("window")
export default function App({iconSettings}) {
    /**
     * modal de gobBack
     * **/
    const [visible, setVisible] = useState(false);
    const [isErrorModal, setIsErrorModal] = useState('');
    const [titleModal, setTitleModal] = useState('');
    const [messageModal, setMessageModal] = useState('');
    const [navigation, setNavigation] = useState(null);

    /**
     * Final modal de gobBack
     * **/


    const [isReady, setIsReady] = useState(false);

    let [fontsLoaded] = useFonts({
        'Poligon_Bold': require('./assets/fonts/Poligon_Bold.otf'),
        'Poligon_Regular': require('./assets/fonts/Poligon_Regular.otf'),
    });

    const acceptBack = () => {
        setVisible(false)
        navigation.navigate("Home")
    }


    const backAction = async () => {
        let storeUser = await retrieveData("user");
        if (storeUser) {
            await setTitleModal("Hola " + storeUser.nombre + " " + storeUser.apellido)
        } else {
            setTitleModal("Hola usuario")
        }
        setMessageModal("¿Estas seguro que desea salir de la encuesta?")
        setVisible(true)
    };

    const backAction_eco = async () => {
        setTitleModal("Hola usuario")
        setMessageModal("¿Estas seguro que desea salir de la encuesta?")
        setVisible(true)
    };


    useEffect(() => {
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
                    {
                        visible &&
                        <ModalAlertBack app={store.getState().app} visible={visible}
                                        actionClose={() => setVisible(false)} actionAccept={() => acceptBack()}
                                        isError={isErrorModal} title={titleModal} text={messageModal}/>
                    }
                    <NavigationContainer>
                        <Stack.Navigator>
                            <Stack.Screen name="Home" options={({navigation}) =>
                                ({
                                    navigation,
                                    title: '',
                                    headerLeft: () => (
                                        <Image resizeMode={'contain'}
                                               style={{tintColor: 'white', width: width * .4, marginLeft: 10}}
                                               source={require('./assets/logo_grupomexico_blanco.png')}/>
                                    ),
                                    headerRight: () => (
                                        <Ionicons
                                            onPress={() => navigation.navigate('LoginAdmin')}
                                            name="md-settings-outline"
                                            size={38}
                                            style={{marginRight:15}}
                                            color={store.getState().app.fontColor}
                                        />
                                    ),
                                    headerStyle: {
                                        backgroundColor: store.getState().app.color,
                                    },
                                    headerTintColor: store.getState().app.fontColor,
                                    headerTitleStyle: {
                                        fontFamily: 'Poligon_Regular',
                                        fontSize: textSizeRender(3.5)
                                    },
                                })
                            } component={HomeScreen}/>
                            <Stack.Screen name="LoginAdmin"
                                          options={({navigation}) =>
                                              ({
                                                  navigation,
                                                  title: 'Login',
                                                  headerLeft: () => (
                                                      <MaterialIcons name="arrow-back-ios" size={width * .06}
                                                                     onPress={() => {
                                                                         navigation.goBack()
                                                                     }}
                                                                     style={{marginLeft: 15}}
                                                                     color={store.getState().app.fontColor}/>
                                                  ),
                                                  headerStyle: {
                                                      backgroundColor: store.getState().app.color,
                                                  },
                                                  headerTintColor: store.getState().app.fontColor,
                                                  headerTitleStyle: {
                                                      fontFamily: 'Poligon_Regular',
                                                      fontSize: textSizeRender(3.5)
                                                  },
                                              })
                                          }
                                          component={LoginAdmin}/>
                            <Stack.Screen name="HomeConfig"
                                          options={({navigation}) =>
                                              ({
                                                  navigation,
                                                  title: 'Configuración General',
                                                  headerLeft: () => (
                                                      <MaterialIcons name="arrow-back-ios" size={width * .06}
                                                                     onPress={() => {
                                                                         navigation.goBack()
                                                                     }}
                                                                     style={{marginLeft: 15}}
                                                                     color={store.getState().app.fontColor}/>
                                                  ),
                                                  headerStyle: {
                                                      backgroundColor: store.getState().app.color,
                                                  },
                                                  headerTintColor: store.getState().app.fontColor,
                                                  headerTitleStyle: {
                                                      fontFamily: 'Poligon_Regular',
                                                      fontSize: textSizeRender(3.5)
                                                  },
                                              })
                                          }
                                          component={HomeSettings}/>
                            <Stack.Screen name="loginUser"
                                          options={({navigation}) =>
                                              ({
                                                  navigation,
                                                  title: 'Acceso',
                                                  headerLeft: () => (
                                                      <MaterialIcons name="arrow-back-ios" size={width * .06}
                                                                     onPress={() => {
                                                                         navigation.goBack()
                                                                     }}
                                                                     style={{marginLeft: 15}}
                                                                     color={store.getState().app.fontColor}/>
                                                  ),
                                                  headerStyle: {
                                                      backgroundColor: store.getState().app.color,
                                                  },
                                                  headerTintColor: store.getState().app.fontColor,
                                                  headerTitleStyle: {
                                                      fontFamily: 'Poligon_Regular',
                                                      fontSize: textSizeRender(3.5)
                                                  },
                                              })
                                          }
                                          component={LoginUser}/>
                            <Stack.Screen name="AssessmentNom035"
                                          options={({navigation}) =>
                                              ({
                                                  navigation,
                                                  title: 'Nom035',
                                                  headerLeft: () => (
                                                      <MaterialIcons name="arrow-back-ios" size={width * .06}
                                                                     onPress={() => {
                                                                         setNavigation(navigation)
                                                                         backAction()
                                                                     }}
                                                                     style={{marginLeft: 15}}
                                                                     color={store.getState().app.fontColor}/>

                                                  ),
                                                  headerStyle: {
                                                      backgroundColor: store.getState().app.color,
                                                  },
                                                  headerTintColor: store.getState().app.fontColor,
                                                  headerTitleStyle: {
                                                      fontFamily: 'Poligon_Regular',
                                                      fontSize: textSizeRender(3.5)
                                                  },
                                              })} component={AssessmentNom035}/>
                            <Stack.Screen name="UsersUpdate"
                                          options={({navigation}) =>
                                              ({
                                                  navigation,
                                                  title: 'Actualizar usuarios',
                                                  headerLeft: () => (
                                                      <MaterialIcons name="arrow-back-ios" size={width * .06}
                                                                     onPress={() => {
                                                                         navigation.goBack()
                                                                     }}
                                                                     style={{marginLeft: 15}}
                                                                     color={store.getState().app.fontColor}/>
                                                  ),
                                                  headerStyle: {
                                                      backgroundColor: store.getState().app.color,
                                                  },
                                                  headerTintColor: store.getState().app.fontColor,
                                                  headerTitleStyle: {
                                                      fontFamily: 'Poligon_Regular',
                                                      fontSize: textSizeRender(3.5)
                                                  },
                                              })
                                          }
                                          component={UsersUpdate}/>
                            <Stack.Screen name="KhorConfig"
                                          options={({navigation}) =>
                                              ({
                                                  navigation,
                                                  title: 'Configuración KHOR',
                                                  headerLeft: () => (
                                                      <MaterialIcons name="arrow-back-ios" size={width * .06}
                                                                     onPress={() => {
                                                                         navigation.goBack()
                                                                     }}
                                                                     style={{marginLeft: 15}}
                                                                     color={store.getState().app.fontColor}/>

                                                  ),
                                                  headerStyle: {
                                                      backgroundColor: store.getState().app.color,
                                                  },
                                                  headerTintColor: store.getState().app.fontColor,
                                                  headerTitleStyle: {
                                                      fontFamily: 'Poligon_Regular',
                                                      fontSize: textSizeRender(3.5)
                                                  },
                                              })
                                          } component={KhorConfig}/>
                            <Stack.Screen name="SendScreen"
                                          options={({navigation}) =>
                                              ({
                                                  navigation,
                                                  title: 'Enviar respuestas a KHOR',
                                                  headerLeft: () => (
                                                      <MaterialIcons name="arrow-back-ios" size={width * .06}
                                                                     onPress={() => {
                                                                         navigation.goBack()
                                                                     }}
                                                                     style={{marginLeft: 15}}
                                                                     color={store.getState().app.fontColor}/>
                                                  ),
                                                  headerStyle: {
                                                      backgroundColor: store.getState().app.color,
                                                  },
                                                  headerTintColor: store.getState().app.fontColor,
                                                  headerTitleStyle: {
                                                      fontFamily: 'Poligon_Regular',
                                                      fontSize: textSizeRender(3.5)
                                                  },
                                              })
                                          } component={SendScreen}/>
                            <Stack.Screen name="ResponsesLog"
                                          options={({navigation}) =>
                                              ({
                                                  navigation,
                                                  title: 'Respuestas enviadas a KHOR',
                                                  headerLeft: () => (
                                                      <MaterialIcons name="arrow-back-ios" size={width * .06}
                                                                     onPress={() => {
                                                                         navigation.goBack()
                                                                     }}
                                                                     style={{marginLeft: 15}}
                                                                     color={store.getState().app.fontColor}/>

                                                  ),
                                                  headerStyle: {
                                                      backgroundColor: store.getState().app.color,
                                                  },
                                                  headerTintColor: store.getState().app.fontColor,
                                                  headerTitleStyle: {
                                                      fontFamily: 'Poligon_Regular',
                                                      fontSize: textSizeRender(3.5)
                                                  },
                                              })
                                          }
                                          component={ResponsesLog}/>
                            <Stack.Screen name="SociodemographicPage"
                                          options={({navigation}) =>
                                              ({
                                                  navigation,
                                                  title: 'Datos sociodemográficos',
                                                  headerLeft: () => (
                                                      <MaterialIcons name="arrow-back-ios" size={width * .06}
                                                                     onPress={() => {
                                                                         setNavigation(navigation)
                                                                         backAction()
                                                                     }}
                                                                     style={{marginLeft: 15}}
                                                                     color={store.getState().app.fontColor}/>

                                                  ),
                                                  headerStyle: {
                                                      backgroundColor: store.getState().app.color,
                                                  },
                                                  headerTintColor: store.getState().app.fontColor,
                                                  headerTitleStyle: {
                                                      fontFamily: 'Poligon_Regular',
                                                      fontSize: textSizeRender(3.5)
                                                  },
                                              })
                                          } component={SociodemographicPage}/>
                            <Stack.Screen name="SelectCountryScreen"
                                          options={({navigation}) =>
                                              ({
                                                  navigation,
                                                  title: '',
                                                  headerLeft: () => (
                                                      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                                          <MaterialIcons name="arrow-back-ios" size={textSizeRender(5)}
                                                                         onPress={() => {
                                                                             setNavigation(navigation)
                                                                             backAction_eco()
                                                                             //navigation.goBack()
                                                                         }}
                                                                         style={{top:-6,marginLeft: 15}}
                                                                         color={'#a5a5a5'}/>
                                                          <Image resizeMode={'contain'}
                                                                 style={{top:-4,tintColor: '#a5a5a5', width: textSizeRender(10), marginLeft: 10}}
                                                                 source={require('./assets/logo_eco.png')}/>

                                                      </View>

                                                  ),
                                                  headerStyle: {
                                                      backgroundColor: store.getState().app.colorECO,
                                                  },
                                                  headerTintColor: store.getState().app.fontColor,
                                                  headerTitleStyle: {
                                                      fontFamily: 'Poligon_Regular',
                                                      fontSize: textSizeRender(3.5)
                                                  },
                                                  headerRight: () => (
                                                      <Image resizeMode={'contain'}
                                                             style={{top:-6,tintColor: '#a5a5a5', width: textSizeRender(32), marginLeft: 10}}
                                                             source={require('./assets/logo_grupomexico_blanco.png')}/>),
                                              })
                                          } component={SelectCountryScreen}/>

                            <Stack.Screen name="AssessmentECO"
                                          options={({navigation}) =>
                                              ({
                                                  navigation,
                                                  title: '',
                                                  headerLeft: () => (
                                                      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                                          <MaterialIcons name="arrow-back-ios" size={textSizeRender(5)}
                                                                         onPress={() => {
                                                                             setNavigation(navigation)
                                                                             backAction_eco()
                                                                             //navigation.goBack()
                                                                         }}
                                                                         style={{top:-6,marginLeft: 15}}
                                                                         color={'#a5a5a5'}/>
                                                          <Image resizeMode={'contain'}
                                                                 style={{top:-4,tintColor: '#a5a5a5', width: textSizeRender(10), marginLeft: 10}}
                                                                 source={require('./assets/logo_eco.png')}/>

                                                      </View>

                                                  ),
                                                  headerStyle: {
                                                      backgroundColor: store.getState().app.colorECO,
                                                  },
                                                  headerTintColor: store.getState().app.fontColor,
                                                  headerTitleStyle: {
                                                      fontFamily: 'Poligon_Regular',
                                                      fontSize: textSizeRender(3.5)
                                                  },
                                                  headerRight: () => (
                                                      <Image resizeMode={'contain'}
                                                             style={{top:-6,tintColor: '#a5a5a5', width: textSizeRender(32), marginLeft: 10}}
                                                             source={require('./assets/logo_grupomexico_blanco.png')}/>),
                                              })
                                          } component={AssessmentECO}/>
                            <Stack.Screen name="AssessmentECO2"
                                          options={({navigation}) =>
                                              ({
                                                  navigation,
                                                  title: '',
                                                  headerLeft: () => (
                                                      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                                          <MaterialIcons name="arrow-back-ios" size={textSizeRender(5)}
                                                                         onPress={() => {
                                                                             setNavigation(navigation)
                                                                             backAction_eco()
                                                                             //navigation.goBack()
                                                                         }}
                                                                         style={{top:-6,marginLeft: 15}}
                                                                         color={'#a5a5a5'}/>
                                                          <Image resizeMode={'contain'}
                                                                 style={{top:-4,tintColor: '#a5a5a5', width: textSizeRender(10), marginLeft: 10}}
                                                                 source={require('./assets/logo_eco.png')}/>

                                                      </View>

                                                  ),
                                                  headerStyle: {
                                                      backgroundColor: store.getState().app.colorECO,
                                                  },
                                                  headerTintColor: store.getState().app.fontColor,
                                                  headerTitleStyle: {
                                                      fontFamily: 'Poligon_Regular',
                                                      fontSize: textSizeRender(3.5)
                                                  },
                                                  headerRight: () => (
                                                      <Image resizeMode={'contain'}
                                                             style={{top:-6,tintColor: '#a5a5a5', width: textSizeRender(32), marginLeft: 10}}
                                                             source={require('./assets/logo_grupomexico_blanco.png')}/>),
                                              })
                                          } component={AssessmentECO2}/>
                            <Stack.Screen name="ReagentsECOScreen"
                                          options={({navigation}) =>
                                              ({
                                                  navigation,
                                                  title: '',
                                                  headerLeft: () => (
                                                      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                                          <MaterialIcons name="arrow-back-ios" size={textSizeRender(5)}
                                                                         onPress={() => {
                                                                             setNavigation(navigation)
                                                                             backAction_eco()
                                                                             //navigation.goBack()
                                                                         }}
                                                                         style={{top:-6,marginLeft: 15}}
                                                                         color={'#a5a5a5'}/>
                                                          <Image resizeMode={'contain'}
                                                                 style={{top:-4,tintColor: '#a5a5a5', width: textSizeRender(10), marginLeft: 10}}
                                                                 source={require('./assets/logo_eco.png')}/>

                                                      </View>

                                                  ),
                                                  headerStyle: {
                                                      backgroundColor: store.getState().app.colorECO,
                                                  },
                                                  headerTintColor: store.getState().app.fontColor,
                                                  headerTitleStyle: {
                                                      fontFamily: 'Poligon_Regular',
                                                      fontSize: textSizeRender(3.5)
                                                  },
                                                  headerRight: () => (
                                                      <Image resizeMode={'contain'}
                                                             style={{top:-6,tintColor: '#a5a5a5', width: textSizeRender(32), marginLeft: 10}}
                                                             source={require('./assets/logo_grupomexico_blanco.png')}/>),
                                              })
                                          } component={ReagentsECOScreen}/>

                            <Stack.Screen name="FactorRankingScreen"
                                          options={({navigation}) =>
                                              ({
                                                  navigation,
                                                  title: '',
                                                  headerLeft: () => (
                                                      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                                          <MaterialIcons name="arrow-back-ios" size={textSizeRender(5)}
                                                                         onPress={() => {
                                                                             setNavigation(navigation)
                                                                             backAction_eco()
                                                                             //navigation.goBack()
                                                                         }}
                                                                         style={{top:-6,marginLeft: 15}}
                                                                         color={'#a5a5a5'}/>
                                                          <Image resizeMode={'contain'}
                                                                 style={{top:-4,tintColor: '#a5a5a5', width: textSizeRender(10), marginLeft: 10}}
                                                                 source={require('./assets/logo_eco.png')}/>

                                                      </View>

                                                  ),
                                                  headerStyle: {
                                                      backgroundColor: store.getState().app.colorECO,
                                                  },
                                                  headerTintColor: store.getState().app.fontColor,
                                                  headerTitleStyle: {
                                                      fontFamily: 'Poligon_Regular',
                                                      fontSize: textSizeRender(3.5)
                                                  },
                                                  headerRight: () => (
                                                      <Image resizeMode={'contain'}
                                                             style={{top:-6,tintColor: '#a5a5a5', width: textSizeRender(32), marginLeft: 10}}
                                                             source={require('./assets/logo_grupomexico_blanco.png')}/>),
                                              })
                                          } component={FactorRankingScreen}/>

                            <Stack.Screen name="OpenQuestionsScreen"
                                          options={({navigation}) =>
                                              ({
                                                  navigation,
                                                  title: '',
                                                  headerLeft: () => (
                                                      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                                          <MaterialIcons name="arrow-back-ios" size={textSizeRender(5)}
                                                                         onPress={() => {
                                                                             setNavigation(navigation)
                                                                             backAction_eco()
                                                                             //navigation.goBack()
                                                                         }}
                                                                         style={{top:-6,marginLeft: 15}}
                                                                         color={'#a5a5a5'}/>
                                                          <Image resizeMode={'contain'}
                                                                 style={{top:-4,tintColor: '#a5a5a5', width: textSizeRender(10), marginLeft: 10}}
                                                                 source={require('./assets/logo_eco.png')}/>

                                                      </View>

                                                  ),
                                                  headerStyle: {
                                                      backgroundColor: store.getState().app.colorECO,
                                                  },
                                                  headerTintColor: store.getState().app.fontColor,
                                                  headerTitleStyle: {
                                                      fontFamily: 'Poligon_Regular',
                                                      fontSize: textSizeRender(3.5)
                                                  },
                                                  headerRight: () => (
                                                      <Image resizeMode={'contain'}
                                                             style={{top:-6,tintColor: '#a5a5a5', width: textSizeRender(32), marginLeft: 10}}
                                                             source={require('./assets/logo_grupomexico_blanco.png')}/>),
                                              })
                                          } component={OpenQuestionsScreen}/>


                        </Stack.Navigator>

                    </NavigationContainer>
                </NativeBaseProvider>

            </Provider>

        );
    } else {
        return (
            <View style={{flex: 1, backgroundColor: '#5494ce'}}>

                <View style={{flex: 1}}>
                    <Image
                        source={require('./assets/logo_grupomexico_blanco.png')}
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
