import React, { useState, useEffect } from "react";
import { StyleSheet, Image,Dimensions, ActivityIndicator, Text } from 'react-native';
import { Box, Button, Heading, View, ScrollView } from "native-base";
import _ from 'lodash';
import { AntDesign } from '@expo/vector-icons'; 
import MainLayout from "../../layouts/MainLayout";
import { retrieveData } from "../../helpers/storage";
import { connect } from "react-redux";
import {store} from "../../redux/store";
import {textSizeRender} from "../../utils/utils";
const {width, height} = Dimensions.get('window')
import { getResponsesAction, getUrlAction, updateResponsesAction } from "../../redux/ducks/sendingDuck";
    
const SendScreen = ({sending, getResponsesAction, getUrlAction, updateResponsesAction, app}) => {
    const [responses, setResponses] = useState([]) // Guardados
    const [sent, setSent] = useState([]); // Enviados
    const [boton, setBoton] = useState('Iniciar envío de respuestas');
    const [errores, setErrores] = useState([]) // Array de errores
    const [tosend, setToSend] = useState([]); // Por enviar
    const [fetching, setFetching] = useState(false); //bloquear boton en proceso end 
    const [estado, setEstado] = useState(0); // Estado del envío - detenido 0, enviando 1, completado 2

    useEffect(()=>{
        if (sending) {
            setSent( _.filter(sending.respuestas, ['send', true]) ); 
            setToSend( _.filter(sending.respuestas, ['send', false]));
            setErrores(sending.errores);
            setEstado(sending.estado);
            console.log('estado::', estado)
            setFetching(sending.fetching);
            sending.estado === 0 && setBoton("Iniciar envío de respuestas");
            sending.estado === 1 && setBoton("Cancelar");
            sending.estado === 2 && setBoton("Aceptar");
        }
    },[sending]) 
    
    useEffect(()=>{
        getInitialResponses();
        getUrlAction();
        getResponsesAction();
    }, [])

    const getInitialResponses = async () =>{
        let respTemp = await retrieveData("savedResponses");
        respTemp?.length > 0 &&  setResponses( _.filter( respTemp, ['send', false]) ); 
    }

    return (
        <MainLayout>
            <View style={ styles.container }>
                <View style={ styles.sectionHead }>
                    <Image style={{ width: width*.35, height:width*.15, resizeMode: "contain", }} source={require("../../assets/logokhor.png")} />
                    <Text style={{fontFamily:'Poligon_Bold',marginBottom:5, color:app.color,fontSize:textSizeRender(4), textAlign:'center' }} size="lg" mb={3}>
                        Enviar respuestas a KHOR
                    </Text>
                </View>               
                <View style={ styles.sectionSquare } flex={1}>
                    <Text style={ styles.titulo }>{tosend.length} Respuestas pendientes por sincronizar</Text>
                    {
                        estado !== 0 && errores.length > 0 && <Text style={ styles.errores }> Envíos fallidos: {errores.length} </Text>
                    }
                    <Box style={ styles.indicador } flex={1}>
                        <Box style={ styles.contadorBox }>
                        { 
                            estado !== 0 && 
                            <> 
                            <Text style={styles.contador}>{sent.length}/</Text>
                            <Text style={styles.contador}>{responses.length}</Text> 
                            </> 
                        }
                        {
                            estado === 0 && <Text style={styles.contador}>{tosend.length}</Text> 
                        }
                        </Box>
                        {
                            estado === 1 && <ActivityIndicator size={60} color="#75bb89" />
                        }
                        {
                            estado === 2 && <AntDesign name="checkcircle" size={textSizeRender(12)} color="#75bb89" />
                        }
                    </Box>
                </View>
                <Box style={ styles.sectionBoton }>
                    <Button size={'lg'}
                            _light={{bg: app.secondaryColor, _text: {color: app.color ,fontSize:textSizeRender(3.5),
                                    fontFamily:'Poligon_Bold'}}}
                            _pressed={{bg:app.secondaryColorHover, _text: {color: app.color}}}
                            style={{ width: '90%' }} onPress={ () => updateResponsesAction(estado) } disabled={fetching}>{boton}</Button>
                </Box>
            </View>
        </MainLayout>
    )

}

const styles = StyleSheet.create({
    container: { 
        width: '100%',
        backgroundColor:'white',
        height: '100%',
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
        padding: 20,         
        width: '90%',
        maxHeight: 600,
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
        color: store.getState().app.color
    },
    errores: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        color: '#e45a60'
    },
    contadorBox: {
        marginVertical: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contador: {
        marginBottom: 20,
        fontSize: textSizeRender(15),
        fontFamily:'Poligon_Bold',
        textAlign: 'center',
        color: store.getState().app.color
    },
    sectionBoton: {
        marginTop: 30, 
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
    }
}

export default connect(mapState,{
    getResponsesAction,
    getUrlAction,
    updateResponsesAction,
})(SendScreen);