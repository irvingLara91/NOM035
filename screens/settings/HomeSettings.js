import React, {useState, useEffect} from "react";
import {Box,Button, Heading, Center, VStack, Flex, ScrollView, useToast} from "native-base";
import {connect} from "react-redux";
import MainLayout from "../../layouts/MainLayout";
import config from "../../config"
import {Dimensions, Image, Text, View} from "react-native";
import {textSizeRender} from "../../utils/utils";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scrollview";
const {width, height} = Dimensions.get('window')


const HomeSettings = ({navigation,app}) => {
    const [loading,setLoading] = useState(false)
    const toast = useToast();

    const [admin, setadmin] = useState('')

    useEffect(() => {
        setadmin(app.user_admin);
    }, [app])

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
                    <ScrollView style={{width: '100%', alignSelf: 'center', paddingHorizontal:45, }}>
                        <View style={{alignSelf: 'center',paddingVertical:20,paddingHorizontal:40}}>
                            <Text style={{fontFamily:'Poligon_Regular', color: 'black',textAlign:'center',fontSize:textSizeRender(5)}}>Configuración</Text>
                        </View>
                        <View style={{paddingBottom:40}}>

                        <Button size={'lg'}
                                _light={{bg: app.secondaryColor, _text: {color: app.fontColor ,fontSize:textSizeRender(3.5),
                                        fontFamily:'Poligon_Bold'}}}
                                _pressed={{bg: app.secondaryColorHover, _text: {color: app.fontColor}}}
                                style={[style.butonMain,{borderRadius: 12}]}
                                 onPress={() => navigation.navigate('UsersUpdate')} loading={loading}>Actualizar BD de usuarios</Button>
                        <Button size={'lg'}  _light={{bg: app.secondaryColor, _text: {color: app.fontColor ,fontSize:textSizeRender(3.5),
                                fontFamily:'Poligon_Bold'}}}
                                _pressed={{bg: app.secondaryColorHover, _text: {color: app.fontColor}}}
                                style={[style.butonMain,{borderRadius: 12}]} onPress={() => navigation.navigate('KhorConfig')} loading={loading}>Configuración khor</Button>
                        <Button size={'lg'}  _light={{bg: app.secondaryColor, _text: {color: app.fontColor ,fontSize:textSizeRender(3.5),
                                fontFamily:'Poligon_Bold'}}}
                                _pressed={{bg: app.secondaryColorHover, _text: {color: app.fontColor}}}
                                style={[{borderRadius: 12}]} onPress={() => navigation.navigate('SendScreen')} loading={loading}>Enviar respuestas</Button>
                        {
                            admin === "testing" && 
                            <>
                            <Button size={'lg'}  _light={{bg: app.secondaryColor, _text: {color: app.fontColor ,fontSize:textSizeRender(3.5),
                                    fontFamily:'Poligon_Bold'}}}
                                    _pressed={{bg: app.secondaryColorHover, _text: {color: app.fontColor}}}
                                    style={[{borderRadius: 12, marginTop: 20}]} onPress={() => navigation.navigate('ResponsesLog')} loading={loading}>LOG NOM</Button>
                            <Button size={'lg'}  _light={{bg: app.secondaryColor, _text: {color: app.fontColor ,fontSize:textSizeRender(3.5),
                                    fontFamily:'Poligon_Bold'}}}
                                    _pressed={{bg: app.secondaryColorHover, _text: {color: app.fontColor}}}
                                    style={[{borderRadius: 12, marginTop: 20}]} onPress={() => navigation.navigate('ResponsesECOLog')} loading={loading}>LOG ECO</Button>
                            </>
                        }
                        <Image resizeMode={'contain'} style={{width: width*.45, height:width*.24,alignSelf:'center', marginBottom: 40}}
                               source={require('../../assets/logo_grupomexico.png')}/>
                        </View>
                    </ScrollView>
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
