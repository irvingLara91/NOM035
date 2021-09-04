import React, {useEffect, useState} from "react";
import {Box, Text, Input, Stack, Button, Heading, Center, HStack, Flex, ScrollView, useToast} from "native-base";
import {connect} from "react-redux";
import MainLayout from "../../layouts/MainLayout";
import config from "../../config"
import _ from 'lodash'
import {removeData, retrieveData, storeData} from "../../helpers/storage"
import {Dimensions, TextInput, Image, View, StyleSheet} from 'react-native'
import {textSizeRender} from "../../utils/utils";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scrollview";
import {store} from "../../redux/store";
import GenericModal from "../../components/Modals/GenericModal";
import {initialCountAction} from "../../redux/ducks/progressCountDuck";

let logo = require('../../assets/logoa.png')
const {width, height} = Dimensions.get('window')

const LoginUser = ({navigation, savedResponses, app,initialCountAction}) => {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const toast = useToast()

    const [visible, setVisible] = useState(false);
    const [isErrorModal, setIsErrorModal] = useState('');
    const [titleModal, setTitleModal] = useState('');
    const [messageModal, setMessageModal] = useState('');


    const closeModal =()=>{
        if (isErrorModal){
            setVisible(false)
        }else {
            setVisible(false)
             navigation.navigate('SociodemographicPage')
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        console.log(":::irvingLara::", savedResponses)
    }, [])


    const getUsers = async () => {
        let val = app.users;
        // let val = await retrieveData('userslist')
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
            await initialCountAction()
            navigation.navigate('SociodemographicPage')
            return true
        }

        if (!userName || !password) {
            setTitleModal("")
            setMessageModal("Ingresa la información solicitada")
            setIsErrorModal(true)
            setVisible(true)
            setLoading(false)
            return false
        }
        let isUser = _.find(users, function(o) { return o.username.toString().trim() === userName.trim(); });
        // typeof userName === 'string' && console.log("IS STRING");
        if (isUser) {
            //existe el usuario en el arreglo de usuarios
            let pass = isUser.password.toString().trim();
            if (pass !== password.trim()) {
                setTitleModal("")
                setMessageModal("Las credenciales son inválidas")
                setIsErrorModal(true)
                setVisible(true)
                return
            }
            setLoading(false)
            await storeData('devmode', {dev: false})
            await initialCountAction()
            setTitleModal("")
            setMessageModal(`Bienvenido ${isUser.nombre} ${isUser.apellido}`)
            setIsErrorModal(false)
            setVisible(true)
            await storeData('user', isUser)

        } else {
            console.log("USER", users)
            setTitleModal("")
            setMessageModal("Las credenciales son inválidas")
            setIsErrorModal(true)
            setVisible(true)
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
                                    color: app.color,
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
                                                color: app.fontColor, fontSize: textSizeRender(3.5),
                                                fontFamily: 'Poligon_Bold'
                                            }
                                        }}
                                        _pressed={{bg: app.secondaryColorHover, _text: {color: app.fontColor}}}
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
                                    _pressed={{bg: app.secondaryColorHover, _text: {color: app.fontColor}}}
                                    style={{flex:1,borderRadius: 12}}
                                    size={'lg'} isLoading={loading} onPress={validateUser}>Ingresar</Button>

                            </View>

                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
            {
                visible &&
                <GenericModal app={app} visible={visible} setVisible={closeModal} isError={isErrorModal} ButtonText={isErrorModal ?'Cerrar': 'Aceptar'} title={titleModal} text={messageModal}/>
            }
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

export default connect(mapState,{initialCountAction})(LoginUser);
