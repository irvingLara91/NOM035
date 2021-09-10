import React, {useEffect, useState} from "react";
import {BackHandler, Text, TextInput, View} from "react-native";
import {textSizeRender} from "../../utils/utils";
import {Button, Select} from "native-base";
import GenericModal from "../../components/Modals/GenericModal";
import ModalAlertBack from "../../components/Modals/ModalAlertBack";
import MainLayout from "../../layouts/MainLayout";
import {connect} from "react-redux";
import {initResponseNom035, responseQuestion, saveRsponseSocio} from "../../redux/ducks/nom035Duck";

import ECO_MX from "../ECO/estructura/ECOMX.json";
import ECO_ES from "../ECO/estructura/ECOES.json";
import ECO_PR from "../ECO/estructura/ECOPR.json";
import {retrieveData} from "../../helpers/storage";
import {save_id} from "../../redux/ducks/ECODuck";
const SelectCountryScreen =(props)=>{
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

    const [answer, setAnswer] = useState(null)

    const acceptBack = () => {
        setVisible(false)
        props.navigation.navigate("Home")
    }

    const backAction = async () => {
       /* setTitleModal("Hola usuario")
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
        setAnswer(response)
    }
    const next = async () => {
        if (answer) {
            await props.save_id(answer)
            props.navigation.navigate("AssessmentECO",{id:answer})
        }else {
            setVisibleAlert(true)
            setTitleModal("")
            setMessageModal("Elige una opción")
        }
    }

    return(
        <MainLayout>
        <View style={{
            backgroundColor: props.app.colorBaseEco,
                width: '100%',
            flex: 1,
        }}>
            <View style={{padding: 20, flex: 1,width:'100%'}}>
               <View style={{alignItems:'center'}}>
                <Text style={{
                    marginBottom: 20,
                    textAlign: 'justify',
                    color: props.app.color,
                    fontFamily: 'Poligon_Regular',
                    fontSize: textSizeRender(4.5),
                }}>
                    Selecciona  tu país
                </Text>
               </View>

                        <Select
                            minWidth={200}
                            color={props.app.color}
                            borderColor={props.app.colorGray}
                            style={{fontSize: textSizeRender(4.3)}}
                            accessibilityLabel="Elige una opción"
                            placeholder="Elige una opción"
                            onValueChange={(itemValue) => addResponse(itemValue)}
                        >

                            <Select.Item
                                _light={{_text: {
                                        fontSize: textSizeRender(4.3),
                                        color: props.app.color, fontFamily: 'Poligon_Regular'}}}
                                _pressed={{bg: props.app.secondaryColorHover, _text: {
                                        fontSize: textSizeRender(4.3),
                                        color: props.app.fontColor}}}
                                label={"México"} value={3000}/>
                            <Select.Item
                                _light={{_text: {
                                        fontSize: textSizeRender(4.3),
                                        color: props.app.color, fontFamily: 'Poligon_Regular'}}}
                                _pressed={{bg: props.app.secondaryColorHover, _text: {
                                        fontSize: textSizeRender(4.3),
                                        color: props.app.fontColor}}}
                                label={"España"} value={3001}/>
                            <Select.Item
                                _light={{_text: {
                                        fontSize: textSizeRender(4.3),

                                        color: props.app.color, fontFamily: 'Poligon_Regular'}}}
                                _pressed={{bg: props.app.secondaryColorHover, _text: {
                                        fontSize: textSizeRender(4.3),
                                        color: props.app.fontColor}}}
                                label={"Perú"} value={3002}/>
                        </Select>

            </View>
            <View style={{flex: 0,padding: 20}}>
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
                                color: props.app.fontColor}
                        }}
                    /***fin***/
                        style={{marginTop: 20}} onPress={() => {

                            next()

                }}>Ingresar</Button>
            </View>
            {
                visibleAlert &&
                <GenericModal app={props.app} visible={visibleAlert} setVisible={setVisibleAlert} isError={true} title={titleModal} text={messageModal}/>
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


const mapState = (state) => {
    return {
        nom035: state.nom035,
        app: state.app
    }
}

export default connect(mapState, {
    initResponseNom035,
    responseQuestion,
    saveRsponseSocio,
    save_id
})(SelectCountryScreen);
