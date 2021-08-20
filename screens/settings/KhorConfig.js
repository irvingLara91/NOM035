import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, Image, TextInput, } from 'react-native';
import { Box, Button, Heading, Center, FlatList, Text, View, ScrollView } from "native-base";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import _ from 'lodash';
import MainLayout from "../../layouts/MainLayout";
import { storeData, retrieveData, validURL } from "../../helpers/storage";

const KhorConfig = () => {

    const [datastate, setDatastate] = useState(null);
    const [inputstate, setInputstate] = useState('');

    const getConfig = async () =>{
        let storeConfig = await retrieveData("config");
        if ( storeConfig ) {
            setDatastate(storeConfig);
        } 
    }

    const getKhorUrl = async () =>{
        let storeUrl = await retrieveData("khorurl");
        if ( storeUrl ) {
            setInputstate(storeUrl);
        } 
    }

    useEffect(()=>{
        getConfig();
        getKhorUrl();
    },[]);

    const pickDocument = async () => {
        try {
            const temppath = await DocumentPicker.getDocumentAsync({ type: 'application/json', copyToCacheDirectory: false });
            const filename = new Date().getTime() + '.json';
            const newpath = await FileSystem.documentDirectory + filename;
            await FileSystem.copyAsync({ from: temppath.uri, to: newpath });
            const configData = await FileSystem.readAsStringAsync( newpath );
            let jsonData = JSON.parse(configData)
            await saveConfig( jsonData ) ? ( Alert.alert("Carga exitosa") ): Alert.alert("Error en la carga del archivo");
            getConfig();
        } catch (error){
            console.log(error)
        }
    }

    const saveConfig = ( data ) => {
        if ( data.hasOwnProperty('empresa') && data.hasOwnProperty('cuestionarios') ){
            storeData("config", data );
            return true;
        } else {
            return false;
        }
    }

    const inputSubmit = () => {
        validURL(inputstate) && storeData("khorurl", inputstate) ? Alert.alert("URL guardada") : Alert.alert("Por favor, escriba una url válida");
    }

    return (
        <MainLayout>
            <View style={ styles.container }>
                <View style={ styles.sectionOne }>
                    <Image style={{ width: 200, resizeMode: "contain", }} source={require("../../assets/logokhor.png")} />
                    <Heading style={{ color:'black', textAlign:'center' }} size="lg" mb={3}>
                        Configuración KHOR
                    </Heading>
                    <Text style={ styles.label }>Instancia KHOR</Text>
                    <Box style={{ display: 'flex', flexDirection: 'row' }}>
                        <TextInput
                        style={styles.input}
                        placeholder={"https://demo.khor.mx/"}
                        placeholderTextColor="#c1c1c1"
                        autoCapitalize="none"
                        underlineColorAndroid={"transparent"}
                        value={ inputstate }
                        onChangeText={ text => setInputstate(text)}
                        />
                    </Box>
                    <Button size={'lg'} style={{ marginTop: 16, width: '60%' }} onPress={() => inputSubmit()}>Guardar</Button>
                </View>               
                <View style={ styles.sectionTwo } flex={1}>
                    {
                    datastate ?
                        <ScrollView flex={1}>
                            <Text style={ styles.titulo }> Empresa: </Text>
                            <Text style={ styles.dato }> {datastate.empresa} </Text>
                            <Text style={ styles.titulo }> Cuestionarios: </Text>
                            <Text style={ styles.dato }> {_.join(datastate.cuestionarios, ', ')} </Text>
                            { datastate.Sociodemograficos && (
                            <>
                                <Text style={ styles.titulo }> Sociodemograficos: </Text>
                                <Text style={ styles.dato }> { Object.keys(datastate.Sociodemograficos[0]).length } </Text>
                            </>
                            )}
                            {
                               datastate.preguntasOpinion && (
                            <>
                                <Text style={ styles.titulo }> preguntasOpinion: </Text>
                                <Text style={ styles.dato }> { Object.keys(datastate.preguntasOpinion[0]).length } </Text>
                            </>
                            )}
                        </ScrollView> 
                    : <Text py={20} fontSize={16} textAlign="center">Carga una configuración inicial</Text>
                    } 
                </View>
                <Box style={{ display: 'flex', alignItems: 'center' }} my={4}>
                    <Button size={'lg'} style={{ width: '90%' }} onPress={() => pickDocument()}>Cargar configuración</Button>
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
    }, 
    sectionOne: {
        paddingBottom: 20,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 10           
    },
    sectionTwo: {
        padding: 16,           
        width: '100%',
        minHeight: 200,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 10, 
        borderColor: '#053e65', 
        borderWidth: 1,
        backgroundColor: '#bfdff5'        
    },
    label: {
        marginBottom: 4,
        paddingLeft: 4,
        width: '100%',
        fontSize: 16,
        textAlign: 'left',
    },
    input: {
        width: '100%',
        fontSize: 16,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    dato: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center'
    }
})



export default KhorConfig;
