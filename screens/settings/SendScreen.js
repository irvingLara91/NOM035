import React, { useState, useEffect } from "react";
import { StyleSheet, Image,Dimensions, ActivityIndicator, Text } from 'react-native';
import { Box, Button, Heading, View, ScrollView } from "native-base";
import _ from 'lodash';
import { AntDesign } from '@expo/vector-icons'; 
import MainLayout from "../../layouts/MainLayout";
import { retrieveData, removeData } from "../../helpers/storage";
import { connect } from "react-redux";
import {store} from "../../redux/store";
import {textSizeRender} from "../../utils/utils";
const {width, height} = Dimensions.get('window')
import { getResponsesAction, updateResponsesAction, clearProcess } from "../../redux/ducks/sendingDuck";
import { getEcoResponsesAction, updateEcoResponsesAction, clearEcoProcess } from "../../redux/ducks/sendingECODuck";

const SendScreen = ({sending, getResponsesAction, updateResponsesAction, clearProcess, sendeco, getEcoResponsesAction, updateEcoResponsesAction, clearEcoProcess, app}) => {
    /*NOM*/
    const [responses, setResponses] = useState([]) // Guardados
    const [sent, setSent] = useState([]); // Enviados
    const [tosend, setToSend] = useState([]); // Por enviar
    const [errores, setErrores] = useState([]) // Array de errores
    const [corriendo, setCorriendo] = useState(false);
    const [completado, setCompletado] = useState(false); 
    const [boton, setBoton] = useState('Iniciar envío de respuestas');
    const [fetching, setFetching] = useState(false); //bloquea el boton 

    /*ECO*/
    const [responsesEco, setResponsesEco] = useState([]) // Guardados
    const [sentEco, setSentEco] = useState([]); // Enviados
    const [tosendEco, setToSendEco] = useState([]); // Por enviar
    const [erroresEco, setErroresEco] = useState([]) // Array de errores
    const [corriendoEco, setCorriendoEco] = useState(false);
    const [completadoEco, setCompletadoEco] = useState(false); 
    const [botonEco, setBotonEco] = useState('Iniciar envío de respuestas');
    const [fetchingEco, setFetchingEco] = useState(false); //bloquea el boton 

    useEffect(()=>{
        if (sending) {
            setSent( _.filter(sending.respuestas, ['send', true]) ); 
            setToSend( _.filter(sending.respuestas, ['send', false]));
            setErrores(sending.errores);
            setFetching(sending.fetching);
            setCorriendo(sending.running);
            sending.estado === 0 && setBoton("Iniciar envío de respuestas");
            sending.estado === 1 && setBoton("Cancelar");
            sending.estado === 2 ? ( setBoton("Aceptar"), setCompletado(true) ) : setCompletado(false);
        }
    },[sending]) 

    useEffect(()=>{
        if (sendeco) {
            setSentEco( _.filter(sendeco.respuestasEco, ['send', true]) ); 
            setToSendEco( _.filter(sendeco.respuestasEco, ['send', false]));
            setErroresEco(sendeco.erroresEco);
            setFetchingEco(sendeco.fetchingEco);
            setCorriendoEco(sendeco.runningEco);
            sendeco.estadoEco === 0 && setBotonEco("Iniciar envío de respuestas");
            sendeco.estadoEco === 1 && setBotonEco("Cancelar");
            sendeco.estadoEco === 2 ? ( setBotonEco("Aceptar"), setCompletadoEco(true) ) : setCompletadoEco(false);
        }
    },[sendeco]) 
    
    useEffect(()=>{
        getInitialResponses();
        clearProcess();
        clearEcoProcess();
        getResponsesAction();
        getEcoResponsesAction();
    }, [])

    const getInitialResponses = async () =>{
        let nomTemp = await retrieveData("savedResponses");
        nomTemp?.length > 0 && setResponses( _.filter( nomTemp, ['send', false]) ); 
        let ecoTemp = await retrieveData("savedEcoResponses");
        ecoTemp?.length > 0 && setResponsesEco( _.filter( ecoTemp, ['send', false]) ); 
    }

    const handleSending = () => {
        updateResponsesAction();
    }

    const handleSendingEco = () => {
        updateEcoResponsesAction();
    }

    return (
        <MainLayout>
            <View style={ styles.container }>
                <View style={ styles.sectionHead }>
                    <Image style={{ width: width*.4, height:width*.15, resizeMode: "contain", }} source={require("../../assets/logo_grupomexico.png")} />
                    <Text style={{fontFamily:'Poligon_Bold',marginBottom:5, color:app.color,fontSize:textSizeRender(4), textAlign:'center' }} size="lg" mb={3}>
                        Enviar respuestas a KHOR
                    </Text>
                </View> 
                <ScrollView style={{ flex: 1, width:'90%', backgroundColor:"f4f4f4", }}>
                    <SendComponent
                        encuesta = "NOM"
                        color = {app.color}
                        tosend = {tosend} 
                        corriendo = {corriendo} 
                        completado = {completado} 
                        errores = {errores} 
                        sent = {sent} 
                        responses = {responses}/>
                    <Box style={ styles.sectionBoton }>
                        <Button 
                            size={'lg'} 
                            _light={{bg: app.secondaryColor, _text: {color: app.fontColor ,fontSize:textSizeRender(3.5), fontFamily:'Poligon_Bold'}}}
                            _pressed={{bg:app.secondaryColorHover, _text: {color: app.fontColor}}}
                            style={{ width: '90%', marginBottom: 20 }} onPress={ handleSending } isLoading={fetching}>{boton}</Button>
                    </Box>
                    <SendComponent
                        encuesta = "ECO"
                        color = {app.colorECO}
                        tosend = {tosendEco} 
                        corriendo = {corriendoEco} 
                        completado = {completadoEco} 
                        errores = {erroresEco} 
                        sent = {sentEco} 
                        responses = {responsesEco}/>
            
                    <Box style={ styles.sectionBoton }>
                        <Button 
                            size={'lg'}
                            _light={{bg: app.colorECO, _text: {color: app.fontColor ,fontSize:textSizeRender(3.5), fontFamily:'Poligon_Bold'}}}
                            _pressed={{bg:app.colorSecondaryECO, _text: {color: app.fontColor}}}
                            style={{ width: '90%' }} onPress={ handleSendingEco } isLoading={fetchingEco}>{botonEco}</Button>
                    </Box>
                </ScrollView>
            </View>
        </MainLayout>
    )
}

const SendComponent = ({ encuesta, color, responses, sent, tosend, errores, corriendo, completado }) => {
    return (
        <>
            <View style={ styles.sectionSquare } flex={1}>
                <Text style={[styles.titulo, { color: color }]}>{tosend.length} Respuestas {encuesta} pendientes por sincronizar </Text>
                {
                    (corriendo || completado) && errores.length > 0 && <Text style={ styles.errores }> Envíos fallidos: {errores.length} </Text>
                }
                <Box style={ styles.indicador } flex={1}>
                    <Box style={ styles.contadorBox }>
                    { 
                        (corriendo || completado) && 
                        <> 
                        <Text style={[styles.contador, {color: color}]}>{sent.length}/</Text>
                        <Text style={[styles.contador, {color: color}]}>{responses.length}</Text> 
                        </> 
                    }
                    {
                        (!corriendo && !completado) && <Text style={[styles.contador, {color: color}]}>{tosend.length}</Text> 
                    }
                    </Box>
                    {
                        (corriendo) && <ActivityIndicator size={textSizeRender(10)} color="#75bb89" />
                    }
                    {
                        !corriendo && completado && <AntDesign name="checkcircle" size={textSizeRender(10)} color="#75bb89" />
                    }
                </Box>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: { 
        width: '100%',
        height: '100%',
        backgroundColor:'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }, 
    sectionHead: {
        marginTop: 20,
        paddingBottom: 20,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 10           
    },
    sectionSquare: {
        padding: 10,         
        width: '100%',
        minHeight: textSizeRender(50),
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 10, 
        backgroundColor: '#DFE0EA'
    },
    indicador: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo: {
        fontSize: textSizeRender(4.5),
        fontFamily:'Poligon_Bold',
        marginBottom: 10,
        fontWeight: '500',
        textAlign: 'center',
    },
    errores: {
        fontSize: textSizeRender(4.5),
        fontFamily:'Poligon_Bold',
        fontWeight: '500',
        textAlign: 'center',
        color: '#e45a60'
    },
    contadorBox: {
        marginVertical: textSizeRender(1),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contador: {
        marginBottom: textSizeRender(1),
        fontSize: textSizeRender(12),
        fontFamily:'Poligon_Bold',
        textAlign: 'center',
        color: store.getState().app.color
    },
    sectionBoton: {
        marginTop: 20,
        width: '100%',
        marginBottom:20,
        alignItems: 'center', 
        justifyContent: 'center'
    },
    botonText: {
        fontSize: textSizeRender(4.5),
        fontFamily:'Poligon_Bold',
        textAlign: 'center',
        color: store.getState().app.color
    }
})

const mapState = (state) => {
    return {
        app:state.app,
        sending: state.sending,
        sendeco: state.sendeco,
    }
}

export default connect(mapState,{
    getResponsesAction,
    updateResponsesAction,
    clearProcess,
    getEcoResponsesAction, 
    updateEcoResponsesAction, 
    clearEcoProcess
})(SendScreen);