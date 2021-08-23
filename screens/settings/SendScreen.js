import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, Image, ActivityIndicator, Text } from 'react-native';
import { Box, Button, Heading, View, ScrollView } from "native-base";
import _ from 'lodash';
import { AntDesign } from '@expo/vector-icons'; 
import MainLayout from "../../layouts/MainLayout";
import { storeData, retrieveData, validURL } from "../../helpers/storage";

const SendScreen = () => {

    const [state, setState] = useState({
        estado: 0,
        boton: 'Iniciar envío de respuestas'
    });

    const { estado, boton } = state;

    const handleSyncing = () => {
        setState({
            estado: 1,
            boton: 'Cancelar'
        });
        setTimeout(() => {
            setState({
                estado: 2,
                boton: 'Aceptar'
            }) 
        }, 3000)
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
                    <Text style={ styles.titulo }>Respuestas pendientes por sincronizar</Text>
                    <Box style={ styles.indicador } flex={1}>
                        <Text style={ styles.contador}>230/230</Text>
                        {
                            estado == 1 && <ActivityIndicator size={60} color="#75bb89" /> 
                        }
                        {
                            estado == 2 && <AntDesign name="checkcircle" size={54} color="#75bb89" />
                        }
                    </Box>
                </View>
                <Box style={ styles.sectionBoton }>
                    <Button size={'lg'} style={{ width: '90%' }} onPress={ () => handleSyncing() }>{boton}</Button>
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
        padding: 18,           
        width: '90%',
        maxHeight: 280,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 10, 
        borderColor: '#053e65', 
        borderWidth: 1,
    },
    indicador: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        color: '#707070'
    },
    contador: {
        marginVertical: 20,
        fontSize: 50,
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
    }
})



export default SendScreen;
