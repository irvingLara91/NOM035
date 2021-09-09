import React, {useEffect, useState} from "react";
import {Box, Button, Center, Flex, Heading} from "native-base";
import {connect} from "react-redux";
import MainLayout from "../layouts/MainLayout";
import config from "../config"
import {storeData, retrieveData} from '../helpers/storage'
import {View, Dimensions, Image, Text} from "react-native";
import {textSizeRender} from "../utils/utils";

const {width, height} = Dimensions.get('window')
const HomeScreen = ({productsDuck, navigation, app,eco}) => {
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {


        console.log("ECO:::::",eco)
        setInitialFakeData()
    }, [])





    let setInitialFakeData = () => {
        let dataUser = {
            data: [
                {user: 'gaspar.dzul@hiumanlab.com', password: 'root', nombre: 'Gaspar', apellido: 'Dzul'},
                {user: 'alex.dzul@hiumanlab.com', password: 'alex', nombre: 'Alex', apellido: 'Dzul'},
                {user: 'thelma.gamboa@hiumanlab.com', password: 'thelma', nombre: 'Thelma', apellido: 'Gamboa'},
            ]
        }
        storeData('users', dataUser)
    }


    return (

        <MainLayout>
            <View style={{width: width, height: height,backgroundColor:'white'}}>
                <View style={{width: width, alignSelf: 'center', flex: 1}}>
                    <Image style={{width: width, height:'100%', alignSelf:'center'}}
                           source={require('../assets/logo_khor.png')}/>
                </View>

                <View style={{
                    width: '100%',
                    alignItems: 'center',
                    flex: 1,
                }}>
                    <View style={{width: '100%', alignSelf: 'center',paddingHorizontal:45}}>
                        <View style={{alignSelf: 'center',paddingVertical:40,paddingHorizontal:40}}>
                            <Text style={{fontFamily:'Poligon_Regular', color: app.color,textAlign:'center',fontSize:textSizeRender(5)}}>Elige la encuesta que deseas responder</Text>
                        </View>
                        <Button
                            _light={{bg: app.secondaryColor, _text: {color: app.fontColor,
                                    fontFamily:'Poligon_Bold',
                                    fontSize:textSizeRender(3.5)}}}
                            _pressed={{bg: app.secondaryColorHover, _text: {color: app.fontColor}}}
                            size={'lg'} style={{
                            marginBottom: 20,
                            borderRadius: 12
                        }}
                            onPress={() => navigation.navigate('SelectCountryScreen')}
                        >ECCO</Button>

                        <Button size={'lg'}
                                _light={{bg: app.secondaryColor, _text: {color: app.fontColor ,fontSize:textSizeRender(3.5),
                                        fontFamily:'Poligon_Bold'}}}
                                _pressed={{bg: app.secondaryColorHover, _text: {color: app.fontColor}}}
                                style={{ borderRadius: 12}}
                                onPress={() => navigation.navigate('loginUser')}>NOM 035</Button>
                    </View>

                </View>
            </View>
        </MainLayout>
    )
}

const mapState = (state) => {
    return {
        app: state.app,
        eco:state.eco,
        productsDuck: state.productsDuck
    }
}

export default connect(mapState)(HomeScreen);
