import React from "react";
import {
    View, Modal,
    StyleSheet,
    Text,
    Dimensions, TouchableOpacity,
} from "react-native";

const {width, height} = Dimensions.get('window');
import {AntDesign, MaterialIcons} from '@expo/vector-icons';

const GenericModal =({visible, setVisible, title = '', text, isError = true,app})=>{


    return( <View style={styles.centeredView}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <View style={styles.centeredView}>
                <View style={[styles.modalView,{backgroundColor:app.color}]}>
                    <View style={{flex: 0, alignItems: 'center', justifyContent: 'center', marginBottom: 50}}>
                        {isError ?
                            <MaterialIcons name="cancel" size={50} color={app.secondaryColor} />
                            :
                            <AntDesign name="checkcircle" size={50} color={app.secondaryColor} />
                        }
                    </View>
                    {
                        title !=='' &&
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 50}}>
                        <Text style={[styles.modalTitle,{color:'white'}]}>{title}</Text>
                        </View>
                    }
                    <View style={{flex: 0, alignItems: 'center', justifyContent: 'center', marginBottom: 50}}>
                    <Text style={[styles.modalText, {marginBottom: 20,color:'white'}]}>{text}</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 50}}>

                    <TouchableOpacity style={[styles.fbBtn,{backgroundColor:app.secondaryColor}]} onPress={() => {
                        setVisible()
                    }}>
                        <Text style={[styles.fbText,{color:app.color,fontWeight:'bold'}]}>
                            Cerrar
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
        fontSize: 14,
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
        marginBottom: 15,
        textAlign: "center",

    },
    modalTitle: {
        marginBottom: 5,
        textAlign: "center",
        fontSize: 20,
    }
});

export default GenericModal;