import React, {useEffect, useState} from "react";
import {Box, Select, Input, Stack, Button, Heading, Center, HStack, Flex, useToast} from "native-base";
import {connect} from "react-redux";
import MainLayout from "../../layouts/MainLayout";
import nom035_demograficos from '../nom035/estructura/nom035_demograficos.json'
import {StyleSheet, Text, BackHandler, View, Dimensions, TextInput} from 'react-native'
import {initResponseNom035, responseQuestion, saveRsponseSocio} from "../../redux/ducks/nom035Duck";
import GenericModal from "../../components/Modals/GenericModal";
import ModalAlertBack from "../../components/Modals/ModalAlertBack";
import {retrieveData} from "../../helpers/storage";
import {textSizeRender} from "../../utils/utils";
import {store} from "../../redux/store";
import ECO_REACTIVOS from "../ECO/estructura/ECOMX.json";

const {height, width} = Dimensions.get('window')
const SociodemographicPage = ({navigation, saveRsponseSocio, app}) => {
    /**
     * modal de gobBack
     * **/
    const [visible, setVisible] = useState(false);
    const [isErrorModal, setIsErrorModal] = useState('');
    const [titleModal, setTitleModal] = useState('');
    const [messageModal, setMessageModal] = useState('');
    /**
     * Final modal de gobBack
     * **/

    /**
     * modal de alertaAviso
     * **/
    const [visibleAlert, setVisibleAlert] = useState(false);
    /**
     * Final modal de alertaAviso
     * **/

    const [respuestas, setRespuestas] = useState([])
    const [dato, setDato] = useState(0)

    const [answer, setAnswer] = useState({})

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
        return true;
    };

    useEffect(() => {

        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);


    useEffect(() => {
        ///console.log(nom035_demograficos.sociodemograficos[dato].opciones)
    }, [])

    const addResponse = (response) => {
        let data = {}
        let sze_array = nom035_demograficos.sociodemograficos.length
        if (dato < sze_array) {
            data.dato = nom035_demograficos.sociodemograficos[dato].dato
            data.valor = response
            setAnswer(data)
            ///console.log(answer)
        }
    }

    const next = async () => {
        if (answer.valor) {
            if (dato === 3) {
                await respuestas.push(answer)
                await setDato(dato + 1)
                await setAnswer({})
                ///await console.log(respuestas)
                await saveRsponseSocio(respuestas)
                navigation.navigate('AssessmentNom035')
            } else {
                await respuestas.push(answer)
                await setAnswer({})
                //await console.log(dato, respuestas)
                await setDato(dato + 1)
            }
        } else {
            setVisibleAlert(true)
            setTitleModal("")
            setMessageModal("Elige una opción")
        }

    }

    return (
        <MainLayout>
            <View style={{
                width: '100%',
                flex: 1,
            }}>
                <View style={{padding: 20, flex: 1}}>
                    <Text style={{
                        marginBottom: 20,
                        textAlign: 'justify',
                        color: app.color,
                        fontFamily: 'Poligon_Regular',
                        fontSize: textSizeRender(5)
                    }}>
                        {


                            dato < nom035_demograficos.sociodemograficos.length &&
                            nom035_demograficos.sociodemograficos[dato].dato &&
                            nom035_demograficos.sociodemograficos[dato].dato

                        }
                    </Text>
                    {
                        dato < nom035_demograficos.sociodemograficos.length &&
                        dato === 1 ?
                            <TextInput
                                style={styles.input}
                                placeholder="Indica la especialidad"
                                placeholderTextColor={app.color}
                                autoCapitalize="none"
                                value={answer?.valor}
                                onChangeText={(itemValue) => addResponse(itemValue)}
                                keyboardType="default"
                                maxLength={300}
                                underlineColorAndroid={'transparent'}
                            /> :
                            dato < nom035_demograficos.sociodemograficos.length &&
                            <Select
                                color={app.color}
                                borderColor={app.colorGray}
                                style={{fontSize: textSizeRender(4.3)}}
                                accessibilityLabel="Elige una opción"
                                placeholder="Elige una opción"
                                onValueChange={(itemValue) => addResponse(itemValue)}
                            >
                                {

                                    nom035_demograficos.sociodemograficos[dato].opciones.map((item) => {
                                        return <Select.Item
                                            _light={{
                                                _text: {
                                                    fontSize: textSizeRender(4.3),
                                                    color: app.color, fontFamily: 'Poligon_Regular'
                                                }
                                            }}
                                            _pressed={{
                                                bg: app.secondaryColorHover, _text: {
                                                    fontSize: textSizeRender(4.3),
                                                    color: app.fontColor
                                                }
                                            }}
                                            label={item.option} value={item.option}/>
                                    })
                                }
                            </Select>
                    }

                </View>
                <View style={{flex: 0, padding: 20}}>
                    <Button size={'lg'}
                            _light={{
                                borderColor: app.colorNom35,
                                borderWidth: 2,
                                bg: app.colorNom35,
                                _text: {
                                    fontSize: textSizeRender(4.3),
                                    color: app.fontColor, fontFamily: 'Poligon_Bold'
                                }
                            }}
                            _pressed={{
                                borderColor: app.colorNom35Hover,
                                borderWidth: 0,
                                bg: app.colorNom35Hover,
                                _text: {
                                    fontSize: textSizeRender(4.3),
                                    color: app.fontColor
                                }
                            }}
                        /***fin***/
                            style={{marginTop: 20}} onPress={() => {
                        next()
                    }}>Continuar</Button>
                </View>
                {
                    visibleAlert &&
                    <GenericModal app={app} visible={visibleAlert} setVisible={setVisibleAlert} isError={true}
                                  title={titleModal} text={messageModal}/>
                }
                {
                    visible &&
                    <ModalAlertBack app={app} visible={visible} actionClose={() => setVisible(false)}
                                    actionAccept={() => acceptBack()} isError={isErrorModal}
                                    ButtonText={isErrorModal ? 'Cerrar' : 'Aceptar'} title={titleModal}
                                    text={messageModal}/>
                }
            </View>
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
            fontSize: textSizeRender(3.5),
            fontFamily: 'Poligon_Regular',
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
        nom035: state.nom035,
        app: state.app
    }
}

export default connect(mapState, {
    initResponseNom035,
    responseQuestion,
    saveRsponseSocio
})(SociodemographicPage);
