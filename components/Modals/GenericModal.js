import React from "react";
import {
    View, Modal,
    StyleSheet,
    Text,
    Dimensions, TouchableOpacity, Image,
} from "react-native";

const {width, height} = Dimensions.get('window');
import {AntDesign, MaterialIcons} from '@expo/vector-icons';
import {textSizeRender} from "../../utils/utils";

const GenericModal =({ButtonText='Cerrar',visible, setVisible, title = '', text, isError = true,app})=>{


    return( <View style={styles.centeredView}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <View style={styles.centeredView}>
                <View style={[styles.modalView,{backgroundColor:app.colorThree}]}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        {isError ?
                            <MaterialIcons name="cancel" size={width/6} color={app.fontColor} />
                            :
                            <Image style={{tintColor:app.fontColor,height:width/6,width:width/6}}  source={require('../../assets/success_icon.png')}/>
                        }
                    </View>
                    {
                        title !=='' &&
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={[styles.modalTitle,{color:'white',fontFamily:'Poligon_Regular'}]}>{title}</Text>
                        </View>
                    }
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={[styles.modalText, {marginBottom: 20,color:'white',fontFamily:'Poligon_Regular'}]}>{text}</Text>
                    </View>
                    <View style={{flex: 0, alignItems: 'center', justifyContent: 'center'}}>

                    <TouchableOpacity style={[styles.fbBtn,{backgroundColor:app.secondaryColor}]} onPress={() => {
                        setVisible()
                    }}>
                        <Text style={[styles.fbText,{color:app.fontColor,fontFamily:'Poligon_Bold'}]}>
                            {ButtonText}
                        </Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    </View>)

}
const styles = StyleSheet.create({
    centeredView: {
        flex:1,
        backgroundColor:'rgba(0,0,0,0.53)',
        justifyContent: "center",
        alignItems: "center",
    },
    fbBtn: {
        width:height/3,
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
        width:'80%',
        height:'40%',
        borderRadius: 20,
        padding: 35,
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
        fontSize: textSizeRender(4.5),

    },
    modalTitle: {
        marginBottom: 5,
        textAlign: "center",
        fontSize: textSizeRender(6),
    }
});

export default GenericModal;