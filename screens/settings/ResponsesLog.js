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
import { getResponsesAction, clearLog } from "../../redux/ducks/sendingDuck";
import { marginBottom, marginTop } from "styled-system";
    
const ResponsesLog = ({sending, getResponsesAction, clearLog, app}) => {
    const [tosend, setToSend] = useState([]); // Por enviar
    const [errors, setErrors] = useState([]) // Array de errores
    const [success, setSuccess] = useState([]) // Array de errores
    const [fetching, setFetching] = useState(false); //Bloquea el boton 

    useEffect(()=>{
        if (sending) {
            setToSend( _.filter(sending.respuestas, ['send', false]));
            setErrors(sending.logErrores);
            setSuccess(sending.logExitosos);
            setFetching(sending.fetching);
        }
    },[sending]) 
    
    useEffect(()=>{
        getResponsesAction();
    }, [])

    return (
        <MainLayout>
            <View style={ styles.container }>
                <View style={ styles.sectionHead }>
                    <Image style={{ width: width*.35, height:width*.15, resizeMode: "contain", }} source={require("../../assets/logokhor.png")} />
                    <Text style={{fontFamily:'Poligon_Bold',marginBottom:5, color:app.color,fontSize:textSizeRender(4), textAlign:'center' }} size="lg" mb={3}>
                        Respuestas enviadas a KHOR
                    </Text>
                </View>               
                <View style={ styles.sectionSquare } flex={1}>
                    <ScrollView style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
                        <Text style={ styles.titulo }> RESUMEN </Text>
                        <Text style={ styles.pendientes }>Respuestas pendientes: {tosend.length}</Text>
                        <Text style={ styles.exitosos }>Envíos exitosos: {success.length}</Text>
                        <Text style={ styles.errores }>Envíos fallidos: {errors.length}</Text>
                        {
                            success.length > 0 && <>
                                <Text style={ styles.titulo }> EXITOSOS </Text>
                                {   
                                    success.map( (exitoso, index) => (
                                        <Text style={styles.dato} key={index}> Envio exitoso {index + 1}: {JSON.stringify(exitoso)}</Text>
                                    )) 
                                }
                            </>
                        }
                        {
                            errors.length > 0 && <>
                                <Text style={ styles.titulo }> ERRORES </Text>
                                {   
                                    errors.map( (error, index) => (
                                        <Text style={ styles.dato} key={index}> Envio fallido {index + 1}: {JSON.stringify(error)}</Text>
                                    )) 
                                }
                            </>
                        }
                    </ScrollView>
                </View>

                <Box style={ styles.sectionBoton }>
                    <Button size={'lg'}
                            _light={{bg: app.secondaryColor, _text: {color: app.color ,fontSize:textSizeRender(3.5),
                                    fontFamily:'Poligon_Bold'}}}
                            _pressed={{bg:app.secondaryColorHover, _text: {color: app.color}}}
                            style={{ width: '90%' }} onPress={ () => clearLog() } isLoading={fetching}>Limpiar Log de respuestas</Button>
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
        paddingVertical: 20,         
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
        fontSize: textSizeRender(5),
        fontFamily:'Poligon_Bold',
        marginBottom: 6,
        fontWeight: '500',
        textAlign: 'center',
        color: store.getState().app.color,
        marginTop: 10,
        marginBottom: 10
    },
    pendientes: {
        fontSize: textSizeRender(4.5),
        fontFamily:'Poligon_Bold',
        fontWeight: '500',
        textAlign: 'left',
        color: store.getState().app.color
    },
    exitosos: {
        fontSize: textSizeRender(4.5),
        fontFamily:'Poligon_Bold',
        fontWeight: '500',
        textAlign: 'left',
        color: '#7dc28e'
    },
    errores: {
        fontSize: textSizeRender(4.5),
        fontFamily:'Poligon_Bold',
        fontWeight: '500',
        textAlign: 'left',
        color: '#e45a60',
        marginBottom: 20,
    },
    dato: {
        fontSize: textSizeRender(3.1),
        fontFamily:'Poligon_Regular',
        textAlign: 'left',
        marginBottom: 20,
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
    clearLog,
})(ResponsesLog);