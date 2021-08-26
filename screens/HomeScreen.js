import React, {useEffect, useState} from "react";
import {Box, Button, Center, Flex, Heading} from "native-base";
import {connect} from "react-redux";
import MainLayout from "../layouts/MainLayout";
import config from "../config"
import {storeData, retrieveData} from '../helpers/storage'
import {View,Text} from "react-native";

const HomeScreen = ({productsDuck, navigation,app}) => {
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        console.log(config)
        setInitialFakeData()
    }, [])


    let setInitialFakeData =()=>{
        let dataUser = {
            data: [
                {user: 'gaspar.dzul@hiumanlab.com', password: 'root', nombre:'Gaspar', apellido:'Dzul'},
                {user: 'alex.dzul@hiumanlab.com', password: 'alex', nombre:'Alex', apellido:'Dzul'},
                {user: 'thelma.gamboa@hiumanlab.com', password: 'thelma', nombre:'Thelma', apellido:'Gamboa'},
            ]
        }
        storeData('users',dataUser)
    }


    return (

        <MainLayout>
            <Flex direction={'column'} style={{paddingHorizontal:10, flex:1}}>
                <Center flex={.5}>
                    <Box>
                        <Heading style={{color:'black', marginTop:'30%'}} size="lg" mb={3}>
                            Elige la prueba que deseas responder
                        </Heading>
                    </Box>
                </Center>
                <Button
                    /*Cambiar colores del botón */
                    _light={{ bg: app.color,  _text: { color: app.fontColor }}}
                    _pressed={{ bg: app.colorHover,  _text: { color: app.fontColor }}}
                    /***fin***/
                    size={'lg'}  style={{marginBottom:20}}>ECCO</Button>

                <Button size={'lg'}
                    /*Cambiar colores del botón */
                        _light={{ bg: app.color,  _text: { color: app.fontColor }}}
                        _pressed={{ bg: app.colorHover,  _text: { color: app.fontColor }}}
                    /***fin***/
                        onPress={() => navigation.navigate('loginUser')}>NOM 035</Button>
            </Flex>
        </MainLayout>
    )
}

const mapState = (state) => {
    return {
        app:state.app,
        productsDuck: state.productsDuck
    }
}

export default connect(mapState)(HomeScreen);
