import React, {useEffect, useState} from "react";
import MainLayout from "../../layouts/MainLayout";
import {connect} from "react-redux";
import {ActivityIndicator, BackHandler, Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ECO_REACTIVOS from "../ECO/estructura/ECOMX.json";
import {textSizeRender} from "../../utils/utils";
import RenderHtml, {defaultSystemFonts} from 'react-native-render-html';
import {Button, VStack} from "native-base";
import GenericModal from "../../components/Modals/GenericModal";
import ModalAlertBack from "../../components/Modals/ModalAlertBack";
import {saveReagents} from "../../redux/ducks/ECODuck";

const {width, height} = Dimensions.get('window')
import {MaterialCommunityIcons} from '@expo/vector-icons';
import ModalInstructions from "../../components/Modals/ModalInstructions";
import ModalInstructions2 from "../../components/Modals/ModalInstructions2";

const ReagentsECOScreen = (props) => {
    const [loading, setLoading] = useState(false)

    const systemFonts = ["Poligon_Regular", "Poligon_Bold", ...defaultSystemFonts];


    /**
     * modal de gobBack
     * **/
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [one, setOne] = useState(true);

    const [isErrorModal, setIsErrorModal] = useState('');
    const [titleModal, setTitleModal] = useState('');
    const [messageModal, setMessageModal] = useState('');


    /**
     * Final modal de gobBack
     * **/

    /**
     * modal de alertaAviso
     * **/
    const [visibleAlert, setVisibleAlert] = useState(true);
    useEffect(()=>{
        if (one && visibleAlert===false){
            setTimeout( () => {
                setVisible2(true)
            },500);

        }
    },[one,visibleAlert])
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
        /* setTitleModal("Hola usuario")
         setMessageModal("??Estas seguro que desea salir de la encuesta?")
         setVisible(true)*/
        return true;
    };

    useEffect(() => {

        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);


    const addResponse = async (response) => {
        let data = {}
        let sze_array = ECO_REACTIVOS.reactivos.length
        if (dato < sze_array) {
            data.Id = ECO_REACTIVOS.reactivos[dato].id
            data.valor = response
            setAnswer(data)
            await respuestas.push(data)

        }
    }

    useEffect(() => {
        if (dato === 87) {
            setLoading(true)
            props.saveReagents(respuestas)
            props.navigation.navigate("FactorRankingScreen")
        }
    }, [dato])

    return (<MainLayout>

        {
            loading ?
                <View style={{
                    backgroundColor: props.app.colorBaseEco,
                    height: height, width: width, justifyContent: 'center', alignItems: 'center'
                }}>
                    <ActivityIndicator size={"large"} color={props.app.colorECO}/>
                    <Text style={{
                        color: props.app.colorECO,
                        fontFamily: 'Poligon_Bold',
                        fontSize: textSizeRender(5)
                    }}>Guardando...</Text>
                </View>

                :
                <View style={{
                    width: '100%',
                    backgroundColor: props.app.colorBaseEco,
                    flex: 1,
                }}>
                    {
                        dato < ECO_REACTIVOS.reactivos.length &&
                        ECO_REACTIVOS.reactivos[dato].titulo &&

                        <View style={{width: width, paddingLeft: 20, paddingTop: 20, paddingRight: 20}}>
                            <Text style={{fontFamily: 'Poligon_Regular', fontSize: textSizeRender(4.5)}}>
                                Responde las preguntas, en donde 1 es Totalmente en desacuerdo y 5 es Totalmente de
                                acuerdo.</Text>
                        </View>
                    }

                    <View style={{padding: 20, flex: 1}}>
                        {
                            dato < ECO_REACTIVOS.reactivos.length &&
                            ECO_REACTIVOS.reactivos[dato].titulo &&

                            <RenderHtml
                                tagsStyles={{
                                    p: {
                                        textAlign: 'left',
                                        color: ECO_REACTIVOS.reactivos[dato].color,
                                        fontSize: textSizeRender(4.3)
                                    },
                                    a: {
                                        color: 'red',
                                        fontSize: textSizeRender(4.3)
                                    }
                                }}
                                contentWidth={width}
                                systemFonts={systemFonts}
                                source={{html: ECO_REACTIVOS.reactivos[dato].titulo}}
                            />

                        }

                    </View>
                    <View style={{flex: 2, paddingBottom: 20}}>
                        {
                            dato < ECO_REACTIVOS.reactivos.length &&
                            ECO_REACTIVOS.reactivos[dato].tipo === '1a5' &&
                            <VStack style={{paddingLeft: 30, paddingRight: 30}}>
                                <TouchableOpacity
                                    onPress={() => {
                                        addResponse(5)
                                        setDato(dato + 1)
                                    }}
                                    style={{
                                        borderColor: props.app.color,
                                        borderWidth: 1,
                                        borderRadius: 5,
                                        flexDirection: 'row',
                                        width: '100%',
                                        alignItems: 'center',
                                        marginBottom: 8
                                    }}>
                                    <View style={{flex: .3}}>
                                        <View
                                            style={{alignItems: 'center'}}>

                                            <MaterialCommunityIcons name="emoticon-outline" size={textSizeRender(10)}
                                                                    color={"#1e9200"}/>
                                        </View>
                                    </View>
                                    <View style={{flex: .1}}>
                                        <Text style={{fontSize: textSizeRender(4.1)}}>5</Text>
                                    </View>
                                    <View style={{flex: 1}}>
                                        <Text style={{fontSize: textSizeRender(4.2), color: '#000'}}>Totalmente de
                                            acuerdo.</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        addResponse(4)
                                        setDato(dato + 1)
                                    }}
                                    style={{
                                        borderColor: props.app.color,
                                        borderWidth: 1,
                                        borderRadius: 5,
                                        flexDirection: 'row',
                                        width: '100%',
                                        alignItems: 'center',
                                        marginBottom: 8
                                    }}>
                                    <View style={{flex: .3}}>
                                        <View
                                            style={{alignItems: 'center'}}>
                                            <MaterialCommunityIcons name="emoticon-happy-outline"
                                                                    size={textSizeRender(10)} color={"#2aea00"}/>
                                        </View>
                                    </View>
                                    <View style={{flex: .1}}>
                                        <Text style={{fontSize: textSizeRender(4.1)}}>4</Text>
                                    </View>
                                    <View style={{flex: 1}}>
                                        <Text style={{fontSize: textSizeRender(4.2), color: '#000'}}>Parcialmente de
                                            acuerdo.</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        addResponse(3)
                                        setDato(dato + 1)
                                    }}
                                    style={{
                                        borderColor: props.app.color,
                                        borderWidth: 1,
                                        borderRadius: 5,
                                        flexDirection: 'row',
                                        width: '100%',
                                        alignItems: 'center',
                                        marginBottom: 8
                                    }}>
                                    <View style={{flex: .3}}>
                                        <View
                                            style={{alignItems: 'center'}}>
                                            <MaterialCommunityIcons name="emoticon-neutral-outline"
                                                                    size={textSizeRender(10)} color={"#ffde00"}/>
                                        </View>
                                    </View>
                                    <View style={{flex: .1}}>
                                        <Text style={{fontSize: textSizeRender(4.1)}}>3</Text>
                                    </View>
                                    <View style={{flex: 1}}>
                                        <Text style={{fontSize: textSizeRender(4.2), color: '#000'}}>Ni de acuerdo ni en
                                            desacuerdo.</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        addResponse(2)
                                        setDato(dato + 1)
                                    }}
                                    style={{
                                        borderColor: props.app.color,
                                        borderWidth: 1,
                                        borderRadius: 5,
                                        flexDirection: 'row',
                                        width: '100%',
                                        alignItems: 'center',
                                        marginBottom: 8
                                    }}>
                                    <View style={{flex: .3}}>
                                        <View
                                            style={{alignItems: 'center'}}>
                                            <MaterialCommunityIcons name="emoticon-confused-outline"
                                                                    size={textSizeRender(10)} color={"#FF8025"}/>
                                        </View>
                                    </View>
                                    <View style={{flex: .1}}>
                                        <Text style={{fontSize: textSizeRender(4.1)}}>2</Text>
                                    </View>
                                    <View style={{flex: 1}}>
                                        <Text style={{fontSize: textSizeRender(4.2), color: '#000'}}>Parcialmente en
                                            desacuerdo.</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        addResponse(1)
                                        setDato(dato + 1)
                                    }}
                                    style={{
                                        borderColor: props.app.color,
                                        borderWidth: 1,
                                        borderRadius: 5,
                                        flexDirection: 'row',
                                        width: '100%',
                                        alignItems: 'center',
                                        marginBottom: 8,
                                    }}>
                                    <View style={{flex: .3}}>
                                        <View
                                            style={{alignItems: 'center'}}>
                                            <MaterialCommunityIcons name="emoticon-sad-outline"
                                                                    size={textSizeRender(10)}
                                                                    color="red"/>
                                        </View>
                                    </View>
                                    <View style={{flex: .1}}>
                                        <Text style={{fontSize: textSizeRender(4.1)}}>1</Text>
                                    </View>
                                    <View style={{flex: 1}}>
                                        <Text style={{fontSize: textSizeRender(4.2), color: '#000'}}>Totalmente en
                                            desacuerdo.</Text>
                                    </View>
                                </TouchableOpacity>
                            </VStack>
                        }
                    </View>

                    {
                        dato < ECO_REACTIVOS.reactivos.length &&
                        ECO_REACTIVOS.reactivos[dato].titulo &&
                        <View style={{flex: 0, padding: 20}}>
                            <Button size={'lg'}
                                    _light={{
                                        bg: props.app.colorECO,
                                        _text: {
                                            fontSize: textSizeRender(4.3),
                                            color: props.app.fontColor, fontFamily: 'Poligon_Bold'
                                        }
                                    }}
                                    _pressed={{
                                        bg: props.app.colorSecondaryECO,
                                        _text: {
                                            fontSize: textSizeRender(4.3),
                                            color: props.app.fontColor
                                        }
                                    }}
                                    style={{marginTop: 20, width: '100%'}} onPress={() => {
                                setVisibleAlert(true)
                            }}>INSTRUCCIONES</Button>
                        </View>
                    }
                </View>
        }

        {
            visible &&
            <ModalAlertBack app={props.app} visible={visible} actionClose={() => setVisible(false)}
                            actionAccept={() => acceptBack()} isError={isErrorModal}
                            ButtonText={isErrorModal ? 'Cerrar' : 'Aceptar'} title={titleModal}
                            text={messageModal}/>
        }
        {
            visibleAlert &&
            <ModalInstructions visible={visibleAlert} setVisible={setVisibleAlert}  text={""}/>
        }
        {
            visible2 && one &&
            <ModalInstructions2 visible={visible2} setVisible={setVisible2} setOne={setOne} text={""}/>
        }
    </MainLayout>)
}
const mapState = (state) => {
    return {
        eco: state.eco,
        app: state.app
    }
}

export default connect(mapState, {saveReagents})(ReagentsECOScreen);
