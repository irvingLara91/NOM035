import React, {useEffect, useState} from "react";
import {ActivityIndicator, Dimensions, ScrollView, Text, TextInput, View} from "react-native";
import { Select, Button} from "native-base";
import MainLayout from "../../layouts/MainLayout";
import {textSizeRender} from "../../utils/utils";
import ECO_MX from "../ECO/estructura/ECOMX.json";
import ECO_ES from "../ECO/estructura/ECOES.json";
import ECO_PR from "../ECO/estructura/ECOPR.json";
import GenericModal from "../../components/Modals/GenericModal";
import ModalAlertBack from "../../components/Modals/ModalAlertBack";
import {connect} from "react-redux";
import {saveECODEMOGRAFICOS2} from "../../redux/ducks/ECODuck";
import ModalAlertECO from "../../components/Modals/ModalAlertECO";
const {width, height} = Dimensions.get('window')

const AssessmentECO2 = (props) => {

    const [loading,setLoading]=useState(false)
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

    const [id, setId] = useState(null)

    const [encuesta, setEncuesta] = useState(null)
    const [respuestas, setRespuestas] = useState([])
    const [dato, setDato] = useState(0)

    const [answer, setAnswer] = useState(null)
    const [responseGender, setResponseGender] = useState(null)
    const [require_6, setRequire_6] = useState(false)

    const [responseWhatYearWereYouBorn, setResponseWhatYearWereYouBorn] = useState(null)
    const [require_7, setRequire_7] = useState(false)

    const [responseYouHaveBeenWorkingForYears, setResponseYouHaveBeenWorkingForYears] = useState(null)
    const [require_8, setRequire_8] = useState(false)

    const [responseMaritalStatus, setResponseMaritalStatus] = useState(null)
    const [require_9, setRequire_9] = useState(false)

    const [responseResponsiblePersonalFamily, setResponseResponsiblePersonalFamily] = useState(null)
    const [require_10, setRequire_10] = useState(false)

    const [responseGroupsYouIdentifyYourself, setResponseGroupsYouIdentifyYourself] = useState(null)
    const [require_11, setRequire_11] = useState(false)

    const [responseYouHaveADisability, setResponseYouHaveADisability] = useState(null)
    const [require_12, setRequire_12] = useState(false)


    useEffect(() => {
        if (props.eco.IdEncuesta) {
            setId(props.eco.IdEncuesta)
            switch (parseInt(props.eco.IdEncuesta)) {
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
    }, []);

    useEffect(()=>{
        console.log("raking::",props.eco.Ranking)
    },[])

    const acceptBack = () => {
        setVisible(false)
        props.navigation.navigate("Home")
    }



    const next = async () => {
        let msg = [];
        let error = false;

        if (responseGender === null) {
            error = true;
            setRequire_6(true)
            msg.push("· Selecciona el genero")
        }
        if (responseWhatYearWereYouBorn === null) {
            error = true;
            setRequire_7(true)
            msg.push("· Selecciona en que año naciste")
        }
        if (responseYouHaveBeenWorkingForYears === null) {
            error = true;
            setRequire_8(true)
            msg.push("· Selecciona cuantos años cumplidos tienes trabajando en la empresa")
        }
        if (responseMaritalStatus === null) {
            error = true;
            setRequire_9(true)
            msg.push("· Selecciona el tipo de estado civil")
        }
        if (responseResponsiblePersonalFamily === null) {
            error = true;
            setRequire_10(true)
            msg.push("· Selecciona la responsabilidad que tienes")
        }
        if (responseGroupsYouIdentifyYourself === null) {
            error = true;
            setRequire_11(true)
            msg.push("· Selecciona el grupo con el que te identificas")
        }
        if (responseYouHaveADisability === null) {
            error = true;
            setRequire_12(true)
            msg.push("· Selecciona una opción")
        }

        if (error) {

            if (msg.length>0){
                setVisibleAlert(true)
                setTitleModal("")
                setMessageModal("Selecciona los campos requeridos marcados con rojo.")
            }

        } else {

            let arrayNew=[]

            arrayNew.push({"Id":responseGender.id,"valor":responseGender.nombre})
            arrayNew.push({"Id":responseWhatYearWereYouBorn.id,"valor":responseWhatYearWereYouBorn.nombre})
            arrayNew.push({"Id":responseYouHaveBeenWorkingForYears.id,"valor":responseYouHaveBeenWorkingForYears.nombre})
            arrayNew.push({"Id":responseMaritalStatus.id,"valor":responseMaritalStatus.nombre})
            arrayNew.push({"Id":responseResponsiblePersonalFamily.id,"valor":responseResponsiblePersonalFamily.nombre})
            arrayNew.push({"Id":responseGroupsYouIdentifyYourself.id,"valor":responseGroupsYouIdentifyYourself.nombre})
            arrayNew.push({"Id":responseYouHaveADisability.id,"valor":responseYouHaveADisability.nombre})

            setLoading(true)
            props.saveECODEMOGRAFICOS2(arrayNew)
            props.navigation.navigate("OpenQuestionsScreen")
        }


    }

    return (
        <MainLayout>
            {
                loading ?
                    <View style={{backgroundColor: props.app.colorBaseEco,
                        height: height, width: width, justifyContent: 'center', alignItems: 'center'}}>
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
                        <View style={{width: width, paddingLeft: 20, paddingTop: 20}}>
                            <Text style={{fontFamily: 'Poligon_Regular', fontSize: textSizeRender(4.5)}}>
                                Queremos que todas las personas se sientan incluidas, bienvenidas y valoradas en la
                                empresa. Responde a las siguientes preguntas, que nos permitirán conocer mejor tu lugar
                                de trabajo, con perspectiva de Diversidad e Inclusión:
                            </Text>
                        </View>
                        <ScrollView>
                            <View style={{width: '100%', padding: 20, flex: 1}}>
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
                                            Género
                                        </Text>
                                        <Select
                                            minWidth={'100%'}
                                            style={{
                                                fontSize: textSizeRender(4.3)}}
                                            borderColor={require_6 ?"red":props.app.colorGray}
                                            accessibilityLabel="Elige una opción"
                                            placeholder="Elige una opción"
                                            onValueChange={(itemValue) => {
                                                setRequire_6(false)
                                                setResponseGender(itemValue)
                                            }}
                                        >
                                            {
                                                encuesta && encuesta.sociodemograficos[3].genero.map((item) => {
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
                                            ¿En qué año naciste?
                                        </Text>
                                        <Select
                                            minWidth={'100%'}
                                            style={{
                                                fontSize: textSizeRender(4.3)}}
                                            borderColor={require_7 ?"red":props.app.colorGray}
                                            accessibilityLabel="Elige una opción"
                                            placeholder="Elige una opción"
                                            onValueChange={(itemValue) => {
                                                setRequire_7(false)
                                                setResponseWhatYearWereYouBorn(itemValue)
                                            }}
                                        >
                                            {
                                                encuesta && encuesta.sociodemograficos[4].enqueanionaciste.map((item) => {
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
                                            ¿Cuántos años cumplidos tienes trabajando en la empresa?
                                        </Text>
                                        <Select
                                            minWidth={'100%'}
                                            style={{
                                                fontSize: textSizeRender(4.3)}}
                                            borderColor={require_8 ?"red":props.app.colorGray}
                                            accessibilityLabel="Elige una opción"
                                            placeholder="Elige una opción"
                                            onValueChange={(itemValue) => {
                                                setRequire_8(false)
                                                setResponseYouHaveBeenWorkingForYears(itemValue)
                                            }}
                                        >
                                            {
                                                encuesta && encuesta.sociodemograficos[5].cuantosaniostienestrabajando.map((item) => {
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
                                            Estado civil
                                        </Text>
                                        <Select
                                            minWidth={'100%'}
                                            style={{
                                                fontSize: textSizeRender(4.3)}}
                                            borderColor={require_9 ?"red":props.app.colorGray}
                                            accessibilityLabel="Elige una opción"
                                            placeholder="Elige una opción"
                                            onValueChange={(itemValue) => {
                                                setRequire_9(false)
                                                setResponseMaritalStatus(itemValue)
                                            }}
                                        >
                                            {
                                                encuesta && encuesta.sociodemograficos[6].estadocivil.map((item) => {
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
                                            ¿Soy responsable del cuidado personal/ financiero de otras personas o
                                            familiares?
                                        </Text>
                                        <Select
                                            minWidth={'100%'}
                                            style={{
                                                fontSize: textSizeRender(4.3)}}
                                            borderColor={require_10 ?"red":props.app.colorGray}
                                            accessibilityLabel="Elige una opción"
                                            placeholder="Elige una opción"
                                            onValueChange={(itemValue) => {
                                                setRequire_10(false)
                                                setResponseResponsiblePersonalFamily(itemValue)
                                            }}
                                        >
                                            {
                                                encuesta && encuesta.sociodemograficos[7].soyresponsabledelcuidadopersonalfinancierofamiliares.map((item) => {
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
                                            ¿Con cuál de los siguientes grupos te identificas?
                                        </Text>
                                        <Select
                                            minWidth={'100%'}
                                            style={{
                                                fontSize: textSizeRender(4.3)}}
                                            borderColor={require_11 ?"red":props.app.colorGray}
                                            accessibilityLabel="Elige una opción"
                                            placeholder="Elige una opción"
                                            onValueChange={(itemValue) => {
                                                setRequire_11(false)
                                                setResponseGroupsYouIdentifyYourself(itemValue)
                                            }}
                                        >
                                            {
                                                encuesta && encuesta.sociodemograficos[8].concualdelossiguientesgruposteidentificas.map((item) => {
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
                                            ¿Cuentas con alguna discapacidad?
                                        </Text>

                                        <Text style={{
                                            marginTop: 10,
                                            marginBottom: 10,
                                            textAlign: 'justify',
                                            padding:10,
                                            color: 'black',
                                            fontFamily: 'Poligon_Regular',
                                            fontSize: textSizeRender(3),
                                        }}>
                                            {'• Visual (Cualquier alteración de la vista ya sea total o parcial)\n\n' +
                                            '• Motriz (Cualquier alteración de movilidad física, puede afectar sólo a una parte del cuerpo)\n\n' +
                                            '• Auditiva (La disminución total o parcial de la audición en cada oído)\n\n' +
                                            '• Intelectual (Alguna limitación para aprender, comprender y comunicarse)\n\n'+
                                                '• Psicológica (Enfermedad o trastorno mental diagnosticado)'
                                            }
                                        </Text>
                                        <Select
                                            minWidth={'100%'}
                                            style={{
                                                fontSize: textSizeRender(4.3)}}
                                            borderColor={require_12 ?"red":props.app.colorGray}
                                            accessibilityLabel="Elige una opción"
                                            placeholder="Elige una opción"
                                            onValueChange={(itemValue) => {
                                                setRequire_12(false)
                                                setResponseYouHaveADisability(itemValue)
                                            }}
                                        >
                                            {
                                                encuesta && encuesta.sociodemograficos[9].cuentasconalgunadiscapacidad.map((item) => {
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
                                /***fin***/
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

export default connect(mapState,{saveECODEMOGRAFICOS2})(AssessmentECO2);
