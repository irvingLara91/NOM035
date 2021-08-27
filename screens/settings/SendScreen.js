import React, { useState, useEffect } from "react";
import { StyleSheet, Image, ActivityIndicator, Text } from 'react-native';
import { Box, Button, Heading, View, ScrollView } from "native-base";
import _ from 'lodash';
import { AntDesign } from '@expo/vector-icons'; 
import MainLayout from "../../layouts/MainLayout";
import { retrieveData } from "../../helpers/storage";
import { connect } from "react-redux";
import { getResponsesAction, getUrlAction, updateResponsesAction } from "../../redux/ducks/sendingDuck";

const SendScreen = ({sending, getResponsesAction, getUrlAction, updateResponsesAction}) => {
    
    const [responses, setResponses] = useState([]) // Guardados
    const [tosend, setToSend] = useState([]); // Por enviar
    const [sent, setSent] = useState([]); // Enviados
    const [boton, setBoton] = useState('Iniciar envío de respuestas');
    const [errores, setErrores] = useState([]) // Array de errores
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
                    <Image style={{ width: 200, resizeMode: "contain", }} source={require("../../assets/logokhor.png")} />
                    <Heading style={{ color:'black', textAlign:'center' }} size="lg" mb={4}>
                        Enviar respuestas a KHOR
                    </Heading>
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
                            estado === 2 && <AntDesign name="checkcircle" size={54} color="#75bb89" />
                        }
                    </Box>
                </View>
                <Box style={ styles.sectionBoton }>
                    <Button size={'lg'} style={{ width: '90%' }} onPress={ () => updateResponsesAction(estado) } disabled={fetching}><Text style={ styles.botonText }>{boton}</Text></Button>
                </Box>
            </View>
        </MainLayout>
    )

}

const styles = StyleSheet.create({
    container: { 
        width: '100%',
        height: '98%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }, 
    sectionHead: {
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
        borderColor: '#053e65', 
        borderWidth: 1,
        backgroundColor: '#bfdff5',   
    },
    indicador: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 32,
        marginBottom: 10,
        fontWeight: '500',
        textAlign: 'center',
        color: '#053e65'
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
        fontSize: 68,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000000'
    },
    sectionBoton: {
        marginTop: 30, 
        width: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    botonText: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        color: '#000000'
    }
})

const mapState = (state) => {
    return {
        sending: state.sending,
    }
}

export default connect(mapState,{
    getResponsesAction,
    getUrlAction,
    updateResponsesAction,
})(SendScreen);