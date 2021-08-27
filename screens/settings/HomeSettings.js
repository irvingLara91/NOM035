import React, {useState} from "react";
import {Box,Button, Heading, Center, VStack, Flex, ScrollView, useToast} from "native-base";
import {connect} from "react-redux";
import MainLayout from "../../layouts/MainLayout";
import config from "../../config"
import {Dimensions, Image, Text, View} from "react-native";
import {textSizeRender} from "../../utils/utils";
const {width, height} = Dimensions.get('window')
const HomeSettings = ({navigation,app}) => {
    const [loading,setLoading] = useState(false)

    const toast = useToast()

    return (
        <MainLayout>
            <View style={{width: width, height: height}}>
                <View style={{width: width, alignSelf: 'center', flex: 1}}>
                    <Image resizeMode={'contain'} style={{width: width/1.9, height:'100%',alignSelf:'center'}}
                           source={require('../../assets/icon_setting.png')}/>
                </View>

                <View style={{
                    backgroundColor:'white',
                    width: '100%',
                    alignItems: 'center',
                    flex: 1,
                }}>
                    <View style={{width: '100%', alignSelf: 'center',paddingHorizontal:45}}>
                        <View style={{alignSelf: 'center',paddingVertical:35,paddingHorizontal:40}}>
                            <Text style={{fontFamily:'Poligon_Regular', color: 'black',textAlign:'center',fontSize:textSizeRender(5)}}>Configuración</Text>
                        </View>
                        <Button size={'lg'}
                                _light={{bg: app.secondaryColor, _text: {color: app.color ,fontSize:textSizeRender(3.5),
                                        fontFamily:'Poligon_Bold'}}}
                                _pressed={{bg: app.secondaryColorHover, _text: {color: app.color}}}
                                style={[style.butonMain,{borderRadius: 12}]}
                                 onPress={() => navigation.navigate('UsersUpdate')} loading={loading}>Acualizar BD de usuarios</Button>
                        <Button size={'lg'}  _light={{bg: app.secondaryColor, _text: {color: app.color ,fontSize:textSizeRender(3.5),
                                fontFamily:'Poligon_Bold'}}}
                                _pressed={{bg: app.secondaryColorHover, _text: {color: app.color}}}
                                style={[style.butonMain,{borderRadius: 12}]} onPress={() => navigation.navigate('KhorConfig')} loading={loading}>Configuración khor</Button>
                        <Button size={'lg'}  _light={{bg: app.secondaryColor, _text: {color: app.color ,fontSize:textSizeRender(3.5),
                                fontFamily:'Poligon_Bold'}}}
                                _pressed={{bg: app.secondaryColorHover, _text: {color: app.color}}}
                                style={[{borderRadius: 12}]} onPress={() => navigation.navigate('SendScreen')} loading={loading}>Enviar respuestas</Button>

                        <Image resizeMode={'contain'} style={{width: width*.3, height:width*.24,alignSelf:'center'}}
                               source={require('../../assets/logokhor.png')}/>

                    </View>

                </View>
            </View>
        </MainLayout>
    )
}

const style={
    butonMain:{
        marginBottom:20
    }
}

const mapState = (state) => {
    return {
        app:state.app,
        productsDuck: state.productsDuck
    }
}

export default connect(mapState)(HomeSettings);
