import React, {useEffect, useState} from "react";
import MainLayout from "../../layouts/MainLayout";
import {connect} from "react-redux";
import {BackHandler, Dimensions, StyleSheet, Text, TextInput, View} from "react-native";
import ECO_OPEN_QUESTIONS from "./estructura/ECOMX.json";
import {textSizeRender} from "../../utils/utils";
import RenderHtml, {defaultSystemFonts} from "react-native-render-html";
import {store} from "../../redux/store";
import {Button} from "native-base";
import GenericModal from "../../components/Modals/GenericModal";
import ModalAlertBack from "../../components/Modals/ModalAlertBack";
import {saveOpenQuestions} from "../../redux/ducks/ECODuck";
import ModalAlertECO from "../../components/Modals/ModalAlertECO";
import {savedECOResponsesAction} from "../../redux/ducks/responsesECODuck";

const {width, height} = Dimensions.get('window')
const OpenQuestionsScreen = (props) => {
    const tagsStyles = {
        p: {
            textAlign: 'justify',
            color: props.app.color,
            fontSize: textSizeRender(4.3)
        },
        a: {
            color: 'red',
            fontSize: textSizeRender(5)
        }
    };
    const systemFonts = ["Poligon_Regular", "Poligon_Bold", ...defaultSystemFonts];

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
        props.navigation.navigate("Home")
    }

    const backAction = async () => {
      /*  setTitleModal("Hola usuario")
        setMessageModal("¿Estas seguro que desea salir de la encuesta?")
        setVisible(true)*/
        return true;
    };

    useEffect(() => {

        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);


    const addResponse = (response) => {
        let data = {}
        data.Id = ECO_OPEN_QUESTIONS.preguntasabiertas[dato].id
        data.valor = response
        setAnswer(data)
        console.log(answer)
    }

    const next = async () => {
        if (answer.valor) {
            await respuestas.push(answer)
            await setDato(dato + 1)
            await setAnswer({})
        } else {
            setVisibleAlert(true)
            setTitleModal("")
            setMessageModal("Responde las  pregunta")
        }
    }
    useEffect(() => {
        if (dato === 2) {
            props.saveOpenQuestions(respuestas)
        }
    }, [dato])


    const savedResponse=()=>{
        let  data={}
        data.IdEncuesta=props.eco.IdEncuesta;
        data.Fecha=props.eco.Fecha;
        data.Demograficos= props.eco.Demograficos;
        data.Respuestas=props.eco.Respuestas;
        data.Ranking=props.eco.Ranking;
        data.PreguntasAbiertas=props.eco.PreguntasAbiertas;
        data.send=false;
        props.savedECOResponsesAction(data)
        props.navigation.navigate("Home")
    }


    return (<MainLayout>
        <View style={{
            width: '100%',
            backgroundColor: props.app.colorBaseEco,
            flex: 1,
        }}>
            {
                dato < ECO_OPEN_QUESTIONS.preguntasabiertas.length &&
                ECO_OPEN_QUESTIONS.preguntasabiertas[dato].titulo &&
                <View style={{width: width, paddingLeft: 20, paddingTop: 20}}>
                    <Text style={{fontFamily: 'Poligon_Regular', textAlign: 'center', fontSize: textSizeRender(4.5)}}>
                        Responde la siguiente pregunta.</Text>
                </View>
            }

            <View style={{padding: 20, flex: 1}}>
                {

                    dato < ECO_OPEN_QUESTIONS.preguntasabiertas.length &&
                    ECO_OPEN_QUESTIONS.preguntasabiertas[dato].titulo &&

                    <RenderHtml
                        tagsStyles={tagsStyles}
                        contentWidth={width}
                        systemFonts={systemFonts}
                        source={{html: ECO_OPEN_QUESTIONS.preguntasabiertas[dato].titulo}}
                    />

                }
                {
                    dato < ECO_OPEN_QUESTIONS.preguntasabiertas.length &&
                    <TextInput
                        style={styles.input}
                        placeholder="Responder..."
                        placeholderTextColor={props.app.secondaryColorHover}
                        autoCapitalize="none"
                        numberOfLines={5}
                        value={answer?.valor}
                        onChangeText={(itemValue) => addResponse(itemValue)}
                        keyboardType="default"
                        multiline={true}
                        maxLength={300}

                        underlineColorAndroid={'transparent'}
                    />
                }

                {
                    dato === ECO_OPEN_QUESTIONS.preguntasabiertas.length &&
                    <View>
                        <View style={{alignItems: 'center',flex:0}}>
                            <Text
                                style={{fontFamily: 'Poligon_Bold', textAlign: 'center', fontSize: textSizeRender(7)}}>
                                GRACIAS</Text>
                        </View>
                        <View style={{alignItems: 'center',flex:1}}>
                            <Text
                                style={{fontFamily: 'Poligon_Regular', textAlign: 'justify', fontSize: textSizeRender(7)}}>
                                ¡Muchas gracias por tu participación en la encuesta!
                                Juntos hacemos un mejor lugar para trabajar.</Text>
                        </View>
                    </View>
                }


            </View>

            <View style={{flex: 0, padding: 20}}>

                {
                    dato === ECO_OPEN_QUESTIONS.preguntasabiertas.length &&
                    <Button size={'lg'}
                            _light={{
                                bg: props.app.colorECO,
                                _text: {
                                    fontSize: textSizeRender(4.3),
                                    color: props.app.fontColor, fontFamily: 'Poligon_Bold'}
                            }}
                            _pressed={{
                                bg: props.app.colorSecondaryECO,
                                _text: {
                                    fontSize: textSizeRender(4.3),
                                    color: props.app.fontColor, fontFamily: 'Poligon_Bold'}
                            }}
                        /***fin***/
                            style={{marginTop: 20}} onPress={() => {
                            savedResponse()
                    }}>Salir</Button>
                }
                {
                    dato < ECO_OPEN_QUESTIONS.preguntasabiertas.length &&
                    <Button size={'lg'}
                            _light={{
                                bg: props.app.colorECO,
                                _text: {
                                    fontSize: textSizeRender(4.3),
                                    color: props.app.fontColor, fontFamily: 'Poligon_Bold'}
                            }}
                            _pressed={{
                                bg: props.app.colorSecondaryECO,
                                _text: {
                                    fontSize: textSizeRender(4.3),
                                    color: props.app.fontColor, fontFamily: 'Poligon_Bold'}
                            }}
                        /***fin***/
                            style={{marginTop: 20}} onPress={() => {
                        next()
                    }}>Continuar</Button>
                }
            </View>
            {
                visibleAlert &&
                <ModalAlertECO  visible={visibleAlert} setVisible={setVisibleAlert}/>
            }
            {
                visible &&
                <ModalAlertBack app={props.app} visible={visible} actionClose={() => setVisible(false)}
                                actionAccept={() => acceptBack()} isError={isErrorModal}
                                ButtonText={isErrorModal ? 'Cerrar' : 'Aceptar'} title={titleModal}
                                text={messageModal}/>
            }

        </View>
    </MainLayout>)
}
const styles = StyleSheet.create({
        input: {
            padding: 10,
            textAlignVertical: 'top',
            marginTop: 8,
            height: 100,
            paddingHorizontal: 15,
            fontSize: textSizeRender(4.3),
            fontFamily: 'Poligon_Regular',
            color: store.getState().app.color,
            borderColor: store.getState().app.color,
            borderWidth: 2,
            backgroundColor: "rgba(213,213,213,0)",
            borderRadius: 10
        },
    }
);
const mapState = (state) => {
    return {
        eco: state.eco,
        app: state.app
    }
}

export default connect(mapState, {saveOpenQuestions,savedECOResponsesAction})(OpenQuestionsScreen);