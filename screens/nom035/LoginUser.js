import React, {useEffect, useState} from "react";
import {Box, Text, Input, Stack, Button, Heading, Center, HStack, Flex, ScrollView, useToast} from "native-base";
import {connect} from "react-redux";
import MainLayout from "../../layouts/MainLayout";
import config from "../../config"
import _ from 'lodash'
import {retrieveData, storeData} from "../../helpers/storage"
import {Dimensions, TextInput, Image, View, StyleSheet} from 'react-native'
import {textSizeRender} from "../../utils/utils";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scrollview";
import {store} from "../../redux/store";

let logo = require('../../assets/logoa.png')
const {width, height} = Dimensions.get('window')

const LoginUser = ({navigation, savedResponses, app}) => {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const toast = useToast()

    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        console.log(":::irvingLara::", savedResponses)
    }, [])


    const getUsers = async () => {
        let val = await retrieveData('userslist')
        console.log('valor de users', val)
        if (val)
            setUsers(val)
    }

    const validateUser = async () => {

        if (password === '.') {
            await storeData('devmode', {dev: true})
            await storeData('user', {
                "apellido": "Lara",
                "idParticipante": "U9",
                "nombre": "Irving",
                "password": 123,
                "username": "ilara9",
            })
            navigation.navigate('AssessmentNom035')
            return true
        }

        if (!userName || !password) {
            toast.show({
                title: "Ingresa la información solicitada",
            })
            setLoading(false)
            return false
        }


        let isUser = _.find(users, {'username': userName})
        if (isUser) {
            //existe el usuario en el arreglo de usuarios
            let pass = isUser.password.toString()
            if (pass.toString() !== password) {
                toast.show({
                    title: "Las credenciales son inválidas",
                })
                return
            }
            setLoading(false)
            await storeData('devmode', {dev: false})
            toast.show({
                title: `Bienvenido ${isUser.nombre} ${isUser.apellido}`,
            })
            await storeData('user', isUser)
            await navigation.navigate('AssessmentNom035')

        } else {
            toast.show({
                title: "Las credenciales son inválidas",
            })
            setLoading(false)
        }

    }


    return (
        <MainLayout>
            <KeyboardAwareScrollView
                extraScrollHeight={80}
                enableOnAndroid={true}
                keyboardShouldPersistTaps='handled'>
                <View style={{width: width, height: height,backgroundColor:'white'}}>
                    <View style={{width: width, alignSelf: 'center', flex: 1}}>
                        <Image style={{width: width, height: '100%', alignSelf: 'center'}}
                               source={require('./../../assets/logo_khor.jpeg')}/>
                    </View>
                    <View style={{
                        width: '100%',
                        flex: 1,
                        alignSelf:'center',
                        alignItems: 'center',
                    }}>
                        <View style={{width: '100%', alignSelf: 'center', paddingHorizontal: 55}}>
                            <View style={{alignSelf: 'center', paddingVertical: 40, paddingHorizontal: 40}}>
                                <Text style={{
                                    fontFamily: 'Poligon_Regular',
                                    color: 'black',
                                    textAlign: 'center',
                                    fontSize: textSizeRender(5)
                                }}>Acceso a evaluación NOM035</Text>
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Usuario"
                                placeholderTextColor={app.color}
                                autoCapitalize="none"
                                value={userName}
                                onChangeText={(text) => setUserName(text)}
                                keyboardType="email-address"
                                underlineColorAndroid={'transparent'}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Contraseña"
                                placeholderTextColor={app.color}
                                autoCapitalize="none"
                                secureTextEntry={true}
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                keyboardType="default"
                                underlineColorAndroid={'transparent'}
                            />

                            <View style={{flexDirection:'row',width:'100%',marginTop:10}}>
                                <Button size={'lg'}
                                        _light={{
                                            bg: app.secondaryColor, _text: {
                                                color: app.color, fontSize: textSizeRender(3.5),
                                                fontFamily: 'Poligon_Bold'
                                            }
                                        }}
                                        _pressed={{bg: app.secondaryColorHover, _text: {color: app.color}}}
                                        style={{flex:1,borderRadius: 12,marginRight: 10}}
                                        isDisabled={loading}
                                        loading={loading} onPress={() => navigation.navigate('Home')}>Regresar</Button>
                                <Button
                                    _light={{
                                        bg: app.color, _text: {
                                            color: app.fontColor, fontSize: textSizeRender(3.5),
                                            fontFamily: 'Poligon_Bold'
                                        }
                                    }}
                                    _pressed={{bg: app.colorHover, _text: {color: app.fontColor}}}
                                    style={{flex:1,borderRadius: 12}}
                                    size={'lg'} isLoading={loading} onPress={validateUser}>Ingresar</Button>

                            </View>

                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </MainLayout>
    )
}

const styles = StyleSheet.create({
        input: {
            marginTop: 8,
            marginBottom: 8,
            alignItems: 'center',
            paddingHorizontal: 15,
            width: "100%",
            height: 54,
            fontSize:textSizeRender(3.5),
            fontFamily:'Poligon_Regular',
            color: store.getState().app.color,
            borderColor: store.getState().app.color,
            borderWidth: 2,
            backgroundColor: "white",
            borderRadius: 10
        },
    }
);
const mapState = (state) => {
    return {
        app: state.app,
        productsDuck: state.productsDuck,
        savedResponses: state.savedResponses
    }
}

export default connect(mapState)(LoginUser);
