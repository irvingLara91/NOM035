import React, { useState, useEffect } from "react";
import {Alert, StyleSheet, Text, Image, TextInput, Dimensions,} from 'react-native';
import { Box, Button, Heading, View, ScrollView } from "native-base";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import _ from 'lodash';
import MainLayout from "../../layouts/MainLayout";
import { storeData, validURL } from "../../helpers/storage";
import {connect} from "react-redux";
import {textSizeRender} from "../../utils/utils";
import {store} from "../../redux/store";
import GenericModal from "../../components/Modals/GenericModal";
const {width, height} = Dimensions.get('window')
import {saveConfigAction} from "../../redux/ducks/configDuck";
import {saveUrlAction} from "../../redux/ducks/sendingDuck";

const KhorConfig = ({app, config, sending, saveConfigAction, saveUrlAction}) => {

    const [datastate, setDatastate] = useState(null);
    const [inputstate, setInputstate] = useState('');

    const [visible, setVisible] = useState(false);
    const [isErrorModal, setIsErrorModal] = useState('');
    const [titleModal, setTitleModal] = useState('');
    const [messageModal, setMessageModal] = useState('');

    useEffect(()=>{
        let urlTemp = sending.url;
        urlTemp && setInputstate(urlTemp);
    },[sending]);

    useEffect(()=>{
        let configTemp = config.config;
        configTemp && setDatastate(configTemp);
    },[config]);

    const pickDocument = async () => {
        try {
            const tempPath = await DocumentPicker.getDocumentAsync({ type: 'application/json', copyToCacheDirectory: false });
            const filename = new Date().getTime() + '.json';
            const newPath = FileSystem.documentDirectory + filename;
            await FileSystem.copyAsync({ from: tempPath.uri, to: newPath });
            const configData = await FileSystem.readAsStringAsync( newPath );
            let jsonData = JSON.parse(configData)
            if (await saveConfig( jsonData)){
                setTitleModal("");
                setMessageModal("Carga exitosa");
                setIsErrorModal(false);
                setVisible(true);
            }else {
                setTitleModal("");
                setMessageModal("Error en la carga del archivo");
                setIsErrorModal(true);
                setVisible(true);
            }
        } catch (error){
            console.log(error)
        }
    }

    const saveConfig = async( data ) => {
        if ( data.hasOwnProperty('empresa') && data.hasOwnProperty('cuestionarios') ){
            await storeData("configkhor", data );
            await saveConfigAction(data)
            return true;
        } else {
            return false;
        }
    }

    const inputSubmit = async() => {
        if (validURL(inputstate) && storeData("khorurl", inputstate)){
            saveUrlAction(inputstate); 
            setTitleModal("")
            setMessageModal("URL guardada")
            setIsErrorModal(false)
            setVisible(true)
        }else {
            setTitleModal("")
            setMessageModal("Por favor, escriba una url válida")
            setIsErrorModal(true)
            setVisible(true)
        }
        //validURL(inputstate) && storeData("khorurl", inputstate) ? Alert.alert("URL guardada") : Alert.alert("Por favor, escriba una url válida");
    }

    return (
        <MainLayout>
            <View style={ styles.container }>
                <View style={ styles.sectionOne }>
                    <Text style={{fontFamily:'Poligon_Regular',marginBottom:0, color:app.color,fontSize:textSizeRender(4), textAlign:'center' }} size="lg" mb={3}>
                        Configuración
                    </Text>
                    <Image style={{ width: width*.35, height:width*.15, resizeMode: "contain", }} source={require("../../assets/logokhor.png")} />
                    <Text style={{fontFamily:'Poligon_Bold',marginBottom:5, color:app.color,fontSize:textSizeRender(4), textAlign:'center' }} size="lg" mb={3}>
                        Instancia KHOR
                    </Text>
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
                    <Button size={'lg'}
                            _light={{bg: app.secondaryColor, _text: {color: app.fontColor ,fontSize:textSizeRender(3.5),
                                    fontFamily:'Poligon_Bold'}}}
                            _pressed={{bg:app.secondaryColorHover, _text: {color: app.fontColor}}}
                            style={{ marginTop: 16, width: '60%' }} onPress={() => inputSubmit()}>Guardar</Button>
                </View>               
                <View style={ styles.sectionTwo } flex={1}>
                    {
                    datastate ?
                        <ScrollView flex={1}>
                            <Text style={ styles.titulo }> Empresa: </Text>
                            <Text style={ styles.dato }> {datastate.empresa} </Text>
                            <Text style={ styles.titulo }> Cuestionarios: </Text>
                            <Text style={ styles.dato }> {_.join(datastate.cuestionarios, ', ')} </Text>
                            { datastate.idPeriodo && (
                            <>
                                <Text style={ styles.titulo }>Periodo:</Text>
                                <Text style={ styles.dato }>{datastate.idPeriodo}</Text>
                            </>
                            )}
                        </ScrollView> 
                    :
                        <Text style={{fontFamily:'Poligon_Bold',marginBottom:0, color:app.color,fontSize:textSizeRender(4), textAlign:'center' }} size="lg" mb={3}>
                            Carga una configuración inicial</Text>
                    } 
                </View>
                <Box style={{ display: 'flex', alignItems: 'center' }} my={4}>
                    <Button size={'lg'}
                            _light={{bg: app.secondaryColor, _text: {color: app.fontColor ,fontSize:textSizeRender(3.5),
                                    fontFamily:'Poligon_Bold'}}}
                            _pressed={{bg:app.secondaryColorHover, _text: {color: app.fontColor}}}
                            style={{width:'90%'}}
                            onPress={() => pickDocument()}>Cargar configuración</Button>
                </Box>
            </View>
            {
                visible &&
                <GenericModal app={app} visible={visible} setVisible={setVisible} isError={isErrorModal} title={titleModal} text={messageModal}/>
            }
        </MainLayout>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal:40,
    }, 
    sectionOne: {
        marginTop:20,
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
        backgroundColor: '#DFE0EA'
    },
    label: {
        marginBottom: 4,
        paddingLeft: 4,
        width: '100%',
        fontSize: 16,
        textAlign: 'left',
    },
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
    titulo: {
        fontSize: textSizeRender(4.5),
        textAlign: 'justify',
        fontFamily:'Poligon_Bold',
    },
    dato: {
        fontSize: textSizeRender(3.1),
        marginBottom: 20,
        fontFamily:'Poligon_Regular',
        textAlign: 'justify',
    }
})

const mapState = (state) => {
    return {
        app: state.app,
        config: state.config,
        sending: state.sending,
    }
}

export default connect(mapState,{saveConfigAction, saveUrlAction})(KhorConfig);
