import React from "react";
import {Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {textSizeRender} from "../../utils/utils";
import {store} from "../../redux/store";
import moment from "moment";
import {Button} from "native-base";

const {width, height} = Dimensions.get('window')

const ModalAlertECO = ({visible, setVisible, exception = false, addAllResponse = null}) => {

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
            >
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, {backgroundColor: '#494949'}]}>

                        <View style={{flex: 0, alignItems: 'center', justifyContent: 'center'}}>
                            <Image resizeMode={'contain'}
                                   style={{
                                       tintColor: 'white',
                                       width: textSizeRender(45),
                                       height: textSizeRender(13),
                                       marginLeft: 10
                                   }}
                                   source={require('../../assets/grupo_Mexico_rojo.png')}/>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: textSizeRender(5),
                                fontFamily: 'Poligon_Bold',
                                color: store.getState().app.fontColor
                            }}>{"Aviso"}</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            paddingHorizontal: 20,
                            marginTop: 30,
                            width: '100%',
                        }}>

                            <View>
                                {
                                    exception ?
                                        <Text style={[styles.modalTitle, {
                                            color: 'white',
                                            textAlign: 'justify',
                                            fontFamily: 'Poligon_Regular'

                                        }]}>{"No has respondido la secci??n de preguntas.\n??Deseas dar por terminada la evaluaci??n? "}</Text>
                                        :
                                        <Text style={[styles.modalTitle, {
                                            color: 'white',
                                            textAlign: 'justify',
                                            fontFamily: 'Poligon_Regular'

                                        }]}>{"Debes responder todas las preguntas para continuar"}</Text>
                                }


                                <Text style={[styles.modalTitle, {
                                    color: 'white',
                                    fontFamily: 'Poligon_Regular'

                                }]}>{
                                    ""
                                }
                                </Text>
                            </View>
                        </View>


                        <View style={{flex: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <Button size={'lg'}
                                    _light={{
                                        bg: store.getState().app.colorECO,
                                        _text: {
                                            justifyContent: 'center',
                                            fontSize: textSizeRender(4.3),
                                            color: store.getState().app.fontColor, fontFamily: 'Poligon_Bold'
                                        }
                                    }}
                                    _pressed={{
                                        bg: store.getState().app.colorSecondaryECO,
                                        _text: {
                                            textAlign: 'center',
                                            fontSize: textSizeRender(4.3),
                                            color: store.getState().app.fontColor
                                        }
                                    }}
                                /***fin***/
                                    style={{
                                        flex: 1,
                                        marginRight: 5,
                                        width: width / 1.4,
                                        marginTop: 20,
                                        justifyContent: 'center'
                                    }} onPress={() => {

                                if (exception) {
                                    addAllResponse()
                                    setVisible()
                                } else {
                                    setVisible()
                                }


                            }}>{exception ? "Aceptar" : "Continuar"}</Button>

                            {
                                exception &&
                                <Button size={'lg'}
                                        _light={{
                                            bg: store.getState().app.colorECO,
                                            _text: {
                                                justifyContent: 'center',
                                                fontSize: textSizeRender(4.3),
                                                color: store.getState().app.fontColor, fontFamily: 'Poligon_Bold'
                                            }
                                        }}
                                        _pressed={{
                                            bg: store.getState().app.colorSecondaryECO,
                                            _text: {
                                                textAlign: 'center',
                                                fontSize: textSizeRender(4.3),
                                                color: store.getState().app.fontColor
                                            }
                                        }}
                                    /***fin***/
                                        style={{flex: 1, width: width / 1.4, marginTop: 20, justifyContent: 'center'}}
                                        onPress={() => {

                                            setVisible()

                                        }}>Cancelar</Button>
                            }

                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )

}
const styles = StyleSheet.create({
    centeredView: {
        position: 'absolute',
        height: height,
        width: width,
        backgroundColor: 'rgba(0,0,0,0.32)',
        justifyContent: "center",
        alignItems: "center",
    },
    fbBtn: {
        width: height / 3,
        height: 40,
        borderRadius: 10,
        marginTop: 30,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    fbText: {
        fontSize: textSizeRender(4),
    },
    modalView: {
        margin: 20,
        width: '90%',
        height: width/1.2,
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 10,
        //padding: 10,
        //elevation: 2
    },
    modalText: {
        textAlign: "center",
        fontSize: textSizeRender(3.5),
    },
    modalTitle: {
        marginBottom: 5,
        textAlign: "center",
        fontSize: textSizeRender(4),
    }
});
export default ModalAlertECO;