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
import axios from "axios";
const data = [
    {
        "Fecha": "2021-09-21T11:09:38",
        "IdEncuesta": 3000,
        "Demograficos":  [
            {
                "Id": 3000,
                "valor": "BUENAVISTA DEL COBRE",
            },
            {
                "Id": 3001,
                "valor": "ADMINISTRATIVA",
            },
            {
                "Id": 3002,
                "valor": "NO APLICA",
            },
            {
                "Id": 3003,
                "valor": "SINDICALIZADO",
            },
            {
                "Id": 3004,
                "valor": "CAMPAMENTO",
            },
            {
                "Id": 3005,
                "valor": "HOMBRE",
            },
            {
                "Id": 3006,
                "valor": "1963 O ANTES",
            },
            {
                "Id": 3007,
                "valor":"11 A 20",
            },
            {
                "Id": 3008,
                "valor": "CASADO",
            },
            {
                "Id": 3009,
                "valor": "SÍ: ADULTOS MAYORES",
            },
            {
                "Id": 3010,
                "valor": "ASIÁTICO",
            },
            {
                "Id": 3011,
                "valor": "SI",
            },
        ],
        "PreguntasAbiertas": [
            {
                "Id": 1,
                "valor": "r",
            },
            {
                "Id": 2,
                "valor": "r",
            },
        ],
        "Ranking": [
            {
                "Id": 1,
                "valor": 1,
            },
            {
                "Id": 2,
                "valor": 2,
            },
            {
                "Id": 3,
                "valor": 3,
            },
            {
                "Id": 4,
                "valor": 4,
            },
            {
                "Id": 5,
                "valor": 5,
            },
            {
                "Id": 6,
                "valor": 6,
            },
            {
                "Id": 7,
                "valor": 7,
            },
            {
                "Id": 8,
                "valor": 8,
            },
            {
                "Id": 9,
                "valor": 9,
            },
            {
                "Id": 10,
                "valor": 10,
            },
            {
                "Id": 11,
                "valor": 11,
            },
        ],
        "Respuestas": [
            {
                "Id": 1000,
                "valor": 2,
            },
            {
                "Id": 1001,
                "valor": 4,
            },
            {
                "Id": 1002,
                "valor": 5,
            },
            {
                "Id": 1003,
                "valor": 3,
            },
            {
                "Id": 1004,
                "valor": 1,
            },
            {
                "Id": 1005,
                "valor": 2,
            },
            {
                "Id": 1006,
                "valor": 4,
            },
            {
                "Id": 1007,
                "valor": 5,
            },
            {
                "Id": 1008,
                "valor": 4,
            },
            {
                "Id": 1009,
                "valor": 2,
            },
            {
                "Id": 1010,
                "valor": 1,
            },
            {
                "Id": 1011,
                "valor": 5,
            },
            {
                "Id": 1012,
                "valor": 5,
            },
            {
                "Id": 1013,
                "valor": 3,
            },
            {
                "Id": 1014,
                "valor": 1,
            },
            {
                "Id": 1015,
                "valor": 3,
            },
            {
                "Id": 1016,
                "valor": 4,
            },
            {
                "Id": 1017,
                "valor": 5,
            },
            {
                "Id": 1018,
                "valor": 3,
            },
            {
                "Id": 1019,
                "valor": 2,
            },
            {
                "Id": 1020,
                "valor": 4,
            },
            {
                "Id": 1021,
                "valor": 2,
            },
            {
                "Id": 1022,
                "valor": 3,
            },
            {
                "Id": 1023,
                "valor": 4,
            },
            {
                "Id": 1024,
                "valor": 3,
            },
            {
                "Id": 1025,
                "valor": 1,
            },
            {
                "Id": 1026,
                "valor": 5,
            },
            {
                "Id": 1027,
                "valor": 1,
            },
            {
                "Id": 1028,
                "valor": 5,
            },
            {
                "Id": 1029,
                "valor": 3,
            },
            {
                "Id": 1030,
                "valor": 2,
            },
            {
                "Id": 1031,
                "valor": 1,
            },
            {
                "Id": 1032,
                "valor": 5,
            },
            {
                "Id": 1033,
                "valor": 2,
            },
            {
                "Id": 1034,
                "valor": 1,
            },
            {
                "Id": 1035,
                "valor": 3,
            },
            {
                "Id": 1036,
                "valor": 5,
            },
            {
                "Id": 1037,
                "valor": 2,
            },
            {
                "Id": 1038,
                "valor": 1,
            },
            {
                "Id": 1039,
                "valor": 4,
            },
            {
                "Id": 1040,
                "valor": 4,
            },
            {
                "Id": 1041,
                "valor": 2,
            },
            {
                "Id": 1042,
                "valor": 4,
            },
            {
                "Id": 1043,
                "valor": 2,
            },
            {
                "Id": 1044,
                "valor": 4,
            },
            {
                "Id": 1045,
                "valor": 4,
            },
            {
                "Id": 1046,
                "valor": 3,
            },
            {
                "Id": 1047,
                "valor": 1,
            },
            {
                "Id": 1048,
                "valor": 3,
            },
            {
                "Id": 1049,
                "valor": 5,
            },
            {
                "Id": 1050,
                "valor": 4,
            },
            {
                "Id": 1051,
                "valor": 3,
            },
            {
                "Id": 1052,
                "valor": 5,
            },
            {
                "Id": 1053,
                "valor": 2,
            },
            {
                "Id": 1054,
                "valor": 1,
            },
            {
                "Id": 1055,
                "valor": 2,
            },
            {
                "Id": 1056,
                "valor": 5,
            },
            {
                "Id": 1057,
                "valor": 2,
            },
            {
                "Id": 1058,
                "valor": 4,
            },
            {
                "Id": 1059,
                "valor": 5,
            },
            {
                "Id": 1060,
                "valor": 2,
            },
            {
                "Id": 1061,
                "valor": 1,
            },
            {
                "Id": 1062,
                "valor": 3,
            },
            {
                "Id": 1063,
                "valor": 4,
            },
            {
                "Id": 1064,
                "valor": 1,
            },
            {
                "Id": 1065,
                "valor": 3,
            },
            {
                "Id": 1066,
                "valor": 5,
            },
            {
                "Id": 1067,
                "valor": 2,
            },
            {
                "Id": 1068,
                "valor": 1,
            },
            {
                "Id": 1069,
                "valor": 3,
            },
            {
                "Id": 1070,
                "valor": 4,
            },
            {
                "Id": 1071,
                "valor": 1,
            },
            {
                "Id": 1072,
                "valor": 3,
            },
            {
                "Id": 1073,
                "valor": 1,
            },
            {
                "Id": 1074,
                "valor": 2,
            },
            {
                "Id": 1075,
                "valor": 4,
            },
            {
                "Id": 1076,
                "valor": 5,
            },
            {
                "Id": 1077,
                "valor": 5,
            },
            {
                "Id": 1078,
                "valor": 4,
            },
            {
                "Id": 1079,
                "valor": 3,
            },
            {
                "Id": 1080,
                "valor": 2,
            },
            {
                "Id": 1081,
                "valor": 1,
            },
            {
                "Id": 1082,
                "valor": 1,
            },
            {
                "Id": 1083,
                "valor": 3,
            },
            {
                "Id": 1084,
                "valor": 5,
            },
            {
                "Id": 1085,
                "valor": 5,
            },
            {
                "Id": 1086,
                "valor": 2,
            },
        ]
    }
]
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
        let ecoTemp = await retrieveData("savedECOResponses");
        ecoTemp?.length > 0 && setResponsesEco( _.filter( ecoTemp, ['send', false]) ); 
    }

    const handleSending = () => {
        updateResponsesAction();
    }

    const handleSendingEco = () => {
        updateEcoResponsesAction();
       //Api()
    }

    const Api =()=>{

        axios.post("https://gmnom035.khor.mx/api2/ecco",data).then(res=>{
           /// console.log(res.data)
        }).catch(e=>{
            console.log("ERROR:::::>",JSON.stringify(e))
        })
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