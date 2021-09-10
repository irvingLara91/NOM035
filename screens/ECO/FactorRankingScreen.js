import React, {useEffect, useState} from "react";
import MainLayout from "../../layouts/MainLayout";
import {connect} from "react-redux";
import {saveRanking} from "../../redux/ducks/ECODuck";
import {ActivityIndicator, BackHandler, Dimensions, FlatList, ScrollView, Text, View} from "react-native";
import ECO_RAKING from "./estructura/ECOMX.json";
import {textSizeRender} from "../../utils/utils";
import RenderHtml, {defaultSystemFonts} from 'react-native-render-html';
import {Button, Select, VStack} from "native-base";
import GenericModal from "../../components/Modals/GenericModal";
import ModalAlertBack from "../../components/Modals/ModalAlertBack";
import _ from 'lodash';
import ECO_REACTIVOS from "./estructura/ECOMX.json";

const {width, height} = Dimensions.get('window')


const SelectedComponent = ({update, ...props}) => {
    const [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    const tagsStyles = {
        p: {
            textAlign: 'justify',
            color: props.app.color,
            fontSize: textSizeRender(3.5)
        },
        a: {
            color: 'red',
            fontSize: textSizeRender(4)
        }
    };
    const systemFonts = ["Poligon_Regular", "Poligon_Bold", ...defaultSystemFonts];
    const [arrayFactorsSelecteds, setArrayFactorsSelecteds] = useState([])

    useEffect(() => {
        setArrayFactorsSelecteds(props.arrayFactorsSelecteds)
    }, [update, props.arrayFactorsSelecteds])


    return (
        arrayFactorsSelecteds.map((rating, index) => {
            return (
                <View style={{flexDirection: 'row', margin: 2}}>
                    <View style={{flex: 0, justifyContent: 'center'}}>
                        <Select
                            key={index}
                            minWidth={120}
                            borderColor={props.app.colorGray}
                            style={{fontSize: textSizeRender(3.5)}}
                            color={props.app.color}
                            accessibilityLabel="Elige una opción"
                            placeholder="Elige una opción"
                            selectedValue={rating.value}
                            onValueChange={(itemValue) => props.addResponse(itemValue, index)}>
                            {
                                numbers.map((item, index) => {
                                    return (
                                        <Select.Item
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
                                            label={item + ""} value={item}/>)
                                })
                            }

                        </Select>
                    </View>
                    <View style={{flex: 1, paddingLeft: 10}}>
                        <RenderHtml
                            tagsStyles={tagsStyles}
                            contentWidth={width}
                            systemFonts={systemFonts}
                            source={{html: rating.titulo}}
                        />
                    </View>
                </View>
            )
        })
    )
}


const FactorRankingScreen = (props) => {
    const [loading, setLoading] = useState(false)
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

    const [arrayFactor, setArrayFactor] = useState(ECO_RAKING.rankingdefactores)
    const [arrayFactorsSelecteds, setArrayFactorsSelecteds] = useState([])

    const [respuestas, setRespuestas] = useState([])
    const [update, setUpdate] = useState(null)


    useEffect(() => {
        let newArray = []
        ECO_RAKING.rankingdefactores.map(item => {
            let newFactor = {}
            newFactor.id = item.id
            newFactor.titulo = item.titulo
            newFactor.value = null
            newArray.push(newFactor)
        })
        setArrayFactorsSelecteds(newArray)
    }, [])

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

    const addResponse = async (response, index) => {

        let objectValueExist = _.find(arrayFactorsSelecteds, {value: response});


        console.log(160, objectValueExist)
        if (objectValueExist) {
            let objIndex = arrayFactorsSelecteds.findIndex((obj => obj.id == objectValueExist.id));
            arrayFactorsSelecteds[objIndex].value = null;
        } else {
            console.log('no existe');
        }

        arrayFactorsSelecteds[index].value = response

        //console.log("165: ",arrayFactorsSelecteds[index])
        console.log(arrayFactorsSelecteds)

        setUpdate(!update)
        validateArrayFactor(arrayFactorsSelecteds)
    }
    const validateArrayFactor = (factors) => {
        let countValues = 0;
        factors.map(item => {
            if (item.value != undefined && item.value != null) {
                countValues = countValues + 1;
            }
        })
        if (countValues === factors.length) {
            factors.map(item => {
                respuestas.push({Id: item.id, valor: item.value})
            })

            setLoading(true)
            props.saveRanking(respuestas)
            props.navigation.navigate("AssessmentECO2")
        }
        setArrayFactorsSelecteds(factors)
    }

    return (<MainLayout>
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
                    <View style={{width: width, paddingLeft: 20, paddingTop: 20, paddingRight: 10}}>
                        <Text style={{fontFamily: 'Poligon_Regular', fontSize: textSizeRender(4)}}>
                            Ordena los factores de la lista seleccionando un número de acuerdo al grado de importancia
                            que tiene
                            para ti.
                            Donde 1 es el más importante y 11 es el menos importante.
                            No se pueden repetir los números.
                        </Text>
                    </View>
                    <View style={{padding: 20, flex: 1}}>

                        <ScrollView>
                            <View style={{marginHorizontal: 4}}>
                                <SelectedComponent addResponse={addResponse}
                                                   arrayFactorsSelecteds={arrayFactorsSelecteds} app={props.app}
                                                   update={update}/>
                            </View>
                        </ScrollView>

                    </View>
                    {
                        visibleAlert &&
                        <GenericModal app={props.app} visible={visibleAlert} setVisible={setVisibleAlert} isError={true}
                                      title={titleModal} text={messageModal}/>
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
    </MainLayout>)
}
const mapState = (state) => {
    return {
        eco: state.eco,
        app: state.app
    }
}

export default connect(mapState, {saveRanking})(FactorRankingScreen);
