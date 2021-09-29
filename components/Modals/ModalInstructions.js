import React from "react";
import {StyleSheet, Dimensions, View, Modal, Image, Text, TouchableOpacity, ScrollView} from "react-native";
import {textSizeRender} from "../../utils/utils";
import {store} from "../../redux/store";
import {MaterialIcons} from "@expo/vector-icons";
import {Button} from "native-base";

const {width, height} = Dimensions.get('window')
const ModalInstructions = ({visible, setVisible,one,setOne, text}) => {


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
                            <Text style={{
                                fontSize: textSizeRender(5),
                                fontFamily: 'Poligon_Bold',
                                color: store.getState().app.fontColor
                            }}>ENCUESTA DE OPINIÓN</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            marginTop: 10,
                            width: '100%',
                        }}>
                            <View>
                                <Text style={[styles.modalTitle, {
                                    marginBottom: 20,
                                    color: 'white',
                                    fontFamily: 'Poligon_Regular'
                                }]}>INSTRUCCIONES</Text>
                            </View>
                            <ScrollView>
                                <View style={{marginHorizontal:20}}>
                                    <Text style={[styles.modalTitle, {
                                        color: 'white',
                                        textAlign: 'justify',
                                        fontFamily: 'Poligon_Regular'

                                    }]}>{
                                        "A continuación se presentan algunas recomendaciones para que puedas realizar y completar satisfactoriamente esta encuesta: \n" +
                                        " \n1.-Lee cuidadosamente cada pregunta y selecciona tu respuesta. \n " +

                                        "\n2.-Cada vez que concluyas una página de la encuesta, el sistema te llevará a la siguiente página de manera automática. \n" +

                                        "\n3.-Antes de finalizar la encuesta asegúrate de responder todas las preguntas. \n "+

                                        "\n4.-Cuando hayas concluido la encuesta, da clic en Continuar. \n"
                                    }</Text>
                                    <Text style={[styles.modalTitle, {
                                        color: 'white',
                                        fontFamily: 'Poligon_Regular'

                                    }]}>{
                                        "Muchas gracias por tu valiosa participación."
                                    }
                                    </Text>
                                </View>
                            </ScrollView>

                        </View>

                        <View style={{flex: 0, alignItems: 'center', justifyContent: 'center'}}>
                            <Button size={'lg'}
                                    _light={{
                                        bg: store.getState().app.colorECO,
                                        _text: {
                                            justifyContent:'center',
                                            fontSize: textSizeRender(4.3),
                                            color: store.getState().app.fontColor, fontFamily: 'Poligon_Bold'}
                                    }}
                                    _pressed={{
                                        bg: store.getState().app.colorSecondaryECO,
                                        _text: {
                                            textAlign:'center',
                                            fontSize: textSizeRender(4.3),
                                            color: store.getState().app.fontColor}
                                    }}
                                /***fin***/
                                    style={{width:width/1.4,marginTop: 20,justifyContent:'center'}} onPress={() => {

                                setVisible(false)
                            }}>Continuar</Button>
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
        width: width/1.1,
        height: height/1.3,
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

export default ModalInstructions;