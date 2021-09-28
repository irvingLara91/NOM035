import React, {useEffect, useState} from "react";
import {ActivityIndicator, Dimensions, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import { Select, Button} from "native-base";
import MainLayout from "../../layouts/MainLayout";
import {textSizeRender} from "../../utils/utils";
import ECO_MX from "../ECO/estructura/ECOMX.json";
import ECO_ES from "../ECO/estructura/ECOES.json";
import ECO_PR from "../ECO/estructura/ECOPR.json";
import GenericModal from "../../components/Modals/GenericModal";
import ModalAlertBack from "../../components/Modals/ModalAlertBack";
import {connect} from "react-redux";
import {saveECODEMOGRAFICOS} from "../../redux/ducks/ECODuck";
import ModalWelcome from "../../components/Modals/ModalWelcome";
import ModalAlertECO from "../../components/Modals/ModalAlertECO";
const {width, height} = Dimensions.get('window')

const AssessmentECO = (props) => {
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

    const [modalWelcome,setModalWelcome]=useState(true)

    const [id, setId] = useState(null)

    const [encuesta, setEncuesta] = useState(null)
    const [responseProperty, setResponseProperty] = useState(null)
    const [require_1, setRequire_1] = useState(false)

    const [responseAddress, setResponseAddress] = useState(null)
    const [require_2, setRequire_2] = useState(false)

    const [responseArea, setResponseArea] = useState(null)
    const [require_3, setRequire_3] = useState(false)

    const [responseCollaboratorType, setResponseCollaboratorType] = useState(null)
    const [require_4, setRequire_4] = useState(false)

    const [responseFamilyResidence, setResponseFamilyResidence] = useState(null)
    const [require_5, setRequire_5] = useState(false)

    const [loading,setLoading]=useState(false)


    const [click, setClick] = useState(false)


    useEffect(() => {
        if (props.route.params?.id) {
            setId(props.route.params.id)
            switch (props.route.params.id) {
                case 3000:
                    setEncuesta(ECO_MX)
                    break;
                case 3001:
                    setEncuesta(ECO_ES)
                    break;
                case 3002:
                    setEncuesta(ECO_PR)
                    break;
            }
        }
    }, [props.route.params?.id]);


    const acceptBack = () => {
        setVisible(false)
        props.navigation.navigate("Home")
    }


    const addResponseProperty = (response) => {
        setResponseProperty(response)

    }
    const addResponseAddress = (response) => {
        setResponseAddress(response)
    }

    const addResponseArea = (response) => {
        setResponseArea(response)
    }
    const addResponseCollaboratorType = (response) => {
        setResponseCollaboratorType(response)
    }

    const next = async () => {
        let msg = [];
        let error = false;

        if (responseProperty === null) {
            error = true;
            setRequire_1(true)
            msg.push("· Selecciona una propiedad")
        }
        if (id !== 3001) {

            if (responseProperty && responseAddress === null) {
                error = true;
                setRequire_2(true)
                msg.push("· Selecciona una dirección")
            }
            if (responseAddress && responseArea === null) {
                error = true;
                setRequire_3(true)
                msg.push("· Selecciona una área")
            }

        }
        if (responseCollaboratorType === null) {
            error = true;
            setRequire_4(true)
            msg.push("· Selecciona el tipo de colaborador")
        }
        if (responseFamilyResidence === null) {
            error = true;
            setRequire_5(true)
            msg.push("· Selecciona la residencia de la familia")
        }

        if (error) {

            if (msg.length>0){
                setVisibleAlert(true)
                setTitleModal("")
                setMessageModal("Selecciona los campos requeridos marcados con rojo.")
            }

        } else {

            let arrayNew=[]

            arrayNew.push({"Id":responseProperty.id,"valor":responseProperty.nombre})
                if (id!==3001){
                    arrayNew.push({"Id":responseAddress.id,"valor":responseAddress.nombre})
                    arrayNew.push({"Id":responseArea.id,"valor":responseArea.nombre})
                }
            arrayNew.push({"Id":responseCollaboratorType.id,"valor":responseCollaboratorType.nombre})
            arrayNew.push({"Id":responseFamilyResidence.id,"valor":responseFamilyResidence.nombre})
            props.saveECODEMOGRAFICOS(arrayNew)
            setLoading(true)
            props.navigation.navigate("ReagentsECOScreen")

        }


    }

    return (
        <MainLayout>
            {
                loading ?
                    <View style={{backgroundColor: props.app.colorBaseEco,
                        height:height,width:width,justifyContent:'center',alignItems:'center'}}>
                        <ActivityIndicator size={"large"} color={props.app.colorECO}/>
                        <Text style={{color:props.app.colorECO,fontFamily:'Poligon_Bold',fontSize:textSizeRender(5)}}>Guardando...</Text>
                    </View>

                    :
                <View style={{
                    width: '100%',
                    backgroundColor: props.app.colorBaseEco,
                    flex: 1,
                }}>
                    <View style={{width: width, paddingLeft: 20, paddingTop: 20,paddingRight:20}}>
                        <Text style={{fontFamily: 'Poligon_Regular',  fontSize: textSizeRender(4.5)}}>
                            Registra los siguientes datos.
                        </Text>
                    </View>
                    <View style={{width: '100%', paddingLeft: 10, paddingTop: 20,paddingRight:10, flex: 1}}>
                    <ScrollView>
                        <View style={{paddingLeft: 10,paddingRight:10}}>
                            <Text style={{
                                marginBottom: 10,
                                textAlign: 'justify',
                                color: props.app.color,
                                fontFamily: 'Poligon_Regular',
                                fontSize: textSizeRender(4.3)
                            }}>
                                {
                                    encuesta && "Propiedad"

                                }
                            </Text>
                            {
                                encuesta &&
                                <View style={{flexDirection: 'row'}}>
                                        <Select
                                            isDisabled={click}
                                            minWidth={'100%'}
                                            style={{
                                                fontSize: textSizeRender(4.3)}}
                                            accessibilityLabel="Elige una opción"
                                            borderColor={require_1 ?"red":props.app.colorGray}
                                            placeholder="Elige una opción"
                                            onValueChange={(itemValue) => {
                                                setRequire_1(false)
                                                addResponseAddress(null)
                                                addResponseArea(null)
                                                addResponseProperty(itemValue)
                                            }}
                                        >
                                            {
                                                encuesta && encuesta.sociodemograficos[0].propiedad.map((item) => {
                                                    return (<Select.Item
                                                            _light={{
                                                                _text: {
                                                                    fontSize: textSizeRender(4.3),
                                                                    color: props.app.color,
                                                                    fontFamily: 'Poligon_Regular'
                                                                }
                                                            }}
                                                            _pressed={{
                                                                fontSize: textSizeRender(4.3),
                                                                bg: props.app.secondaryColorHover,
                                                                _text: {color: props.app.fontColor}
                                                            }}
                                                            label={item.nombre} value={item}/>
                                                    )
                                                })
                                            }

                                    </Select>
                                </View>
                            }

                            {
                                id === 3000 || id === 3002 ?
                                    responseProperty &&
                                    <View>
                                        <Text style={{
                                            marginTop: 10,
                                            marginBottom: 10,
                                            textAlign: 'justify',
                                            color: props.app.color,
                                            fontFamily: 'Poligon_Regular',
                                            fontSize: textSizeRender(5)
                                        }}>
                                            Dirección
                                        </Text>
                                        <Select
                                            isDisabled={click}
                                            minWidth={'100%'}
                                            style={{
                                                fontSize: textSizeRender(4.3)}}
                                            borderColor={require_2 ?"red":props.app.colorGray}
                                            accessibilityLabel="Elige una opción"
                                            placeholder="Elige una opción"
                                            onValueChange={(itemValue) => {
                                                setRequire_2(false)
                                                addResponseAddress(itemValue)
                                                addResponseArea(null)
                                            }}
                                        >
                                            {
                                                responseProperty.direccion.map((item) => {
                                                    return (<Select.Item
                                                            _light={{
                                                                _text: {
                                                                    fontSize: textSizeRender(4.3),
                                                                    color: props.app.color,
                                                                    fontFamily: 'Poligon_Regular'
                                                                }
                                                            }}
                                                            _pressed={{
                                                                fontSize: textSizeRender(4.3),
                                                                bg: props.app.secondaryColorHover,
                                                                _text: {color: props.app.fontColor}
                                                            }}
                                                            label={item.nombre} value={item}/>
                                                    )
                                                })
                                            }

                                        </Select>
                                    </View>
                                    :
                                    null
                            }

                            {
                                id === 3000 || id === 3002 ?
                                    responseAddress &&
                                    <View>
                                        <Text style={{
                                            marginTop: 10,
                                            marginBottom: 10,
                                            textAlign: 'justify',
                                            color: props.app.color,
                                            fontFamily: 'Poligon_Regular',
                                            fontSize: textSizeRender(4.3),
                                        }}>
                                            Área
                                        </Text>
                                        <Select
                                            isDisabled={click}
                                            minWidth={'100%'}
                                            style={{
                                                fontSize: textSizeRender(4.3)}}
                                            borderColor={require_3 ?"red":props.app.colorGray}
                                            accessibilityLabel="Elige una opción"
                                            placeholder="Elige una opción"
                                            onValueChange={(itemValue) => {
                                                setRequire_3(false)
                                                addResponseArea(itemValue)
                                            }}
                                        >
                                            {
                                                responseAddress.area.map((item) => {
                                                    return (<Select.Item
                                                            _light={{
                                                                _text: {
                                                                    fontSize: textSizeRender(4.3),
                                                                    color: props.app.color,
                                                                    fontFamily: 'Poligon_Regular'
                                                                }
                                                            }}
                                                            _pressed={{
                                                                fontSize: textSizeRender(4.3),
                                                                bg: props.app.secondaryColorHover,
                                                                _text: {color: props.app.fontColor}
                                                            }}
                                                            label={item.nombre} value={item}/>
                                                    )
                                                })
                                            }

                                        </Select>
                                    </View>
                                    :
                                    null
                            }

                            {
                                encuesta &&
                                <View>
                                    <Text style={{
                                        marginTop: 10,
                                        marginBottom: 10,
                                        textAlign: 'justify',
                                        color: props.app.color,
                                        fontFamily: 'Poligon_Regular',
                                        fontSize: textSizeRender(4.3),
                                    }}>
                                        Tipo de Colaborador
                                    </Text>
                                    <Select
                                        isDisabled={click}
                                        minWidth={'100%'}
                                        style={{
                                            fontSize: textSizeRender(4.3)}}
                                        borderColor={require_4 ?"red":props.app.colorGray}
                                        accessibilityLabel="Elige una opción"
                                        placeholder="Elige una opción"
                                        onValueChange={(itemValue) => {
                                            setRequire_4(false)
                                            addResponseCollaboratorType(itemValue)
                                        }}
                                    >
                                        {
                                            encuesta && encuesta.sociodemograficos[1].tipodecolaborador.map((item) => {
                                                return (<Select.Item
                                                        _light={{
                                                            _text: {
                                                                fontSize: textSizeRender(4.3),
                                                                color: props.app.color,
                                                                fontFamily: 'Poligon_Regular'
                                                            }
                                                        }}
                                                        _pressed={{
                                                            fontSize: textSizeRender(4.3),
                                                            bg: props.app.secondaryColorHover,
                                                            _text: {color: props.app.fontColor}
                                                        }}
                                                        label={item.nombre} value={item}/>
                                                )
                                            })
                                        }
                                    </Select>
                                </View>
                            }
                            {
                                encuesta &&
                                <View>
                                    <Text style={{
                                        marginTop: 10,
                                        marginBottom: 10,
                                        textAlign: 'justify',
                                        color: props.app.color,
                                        fontFamily: 'Poligon_Regular',
                                        fontSize: textSizeRender(4.3),
                                    }}>
                                        Residencia de la familia
                                    </Text>
                                    <Select
                                        isDisabled={click}
                                        minWidth={'100%'}
                                        style={{
                                            fontSize: textSizeRender(4.3)}}
                                        borderColor={require_5 ?"red":props.app.colorGray}
                                        placeholder="Elige una opción"
                                        onValueChange={(itemValue) => {
                                            setRequire_5(false)
                                            setResponseFamilyResidence(itemValue)
                                        }}
                                    >
                                        {
                                            encuesta && encuesta.sociodemograficos[2].residenciadelafamilia.map((item) => {
                                                return (<Select.Item
                                                        _light={{
                                                            _text: {
                                                                fontSize: textSizeRender(4.3),
                                                                color: props.app.color,
                                                                fontFamily: 'Poligon_Regular'
                                                            }
                                                        }}
                                                        _pressed={{
                                                            fontSize: textSizeRender(4.3),
                                                            bg: props.app.secondaryColorHover,
                                                            _text: {color: props.app.fontColor}
                                                        }}
                                                        label={item.nombre} value={item}/>
                                                )
                                            })
                                        }
                                    </Select>
                                </View>
                            }


                        </View>
                    </ScrollView>
                    </View>
                    <View style={{flex: 0, padding: 20}}>
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
                                style={{marginTop: 20}} onPress={() => {
                            next()
                        }}>Continuar</Button>
                    </View>
                    {
                        visibleAlert &&
                        <ModalAlertECO  visible={visibleAlert} setVisible={setVisibleAlert}/>

                    }
                    {
                        visible &&
                        <ModalAlertBack app={props.app} visible={visible} actionClose={() => setVisible(false)}
                                        actionAccept={() => acceptBack()} isError={isErrorModal}
                                        ButtonText={isErrorModal ? 'Cerrar' : 'Aceptar'} title={titleModal}
                                        text={messageModal}/>
                    }
                    {
                        modalWelcome&&
                        <ModalWelcome visible={modalWelcome} setVisible={setModalWelcome}/>
                    }

                </View>
            }

        </MainLayout>
    )

}
const mapState = (state) => {
    return {
        eco:state.eco,
        nom035: state.nom035,
        app: state.app
    }
}

export default connect(mapState,{saveECODEMOGRAFICOS})(AssessmentECO);
