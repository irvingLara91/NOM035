import React, {useEffect, useState} from "react";
import {Box, Text, Button, Heading, Center, Container, Flex, Modal} from "native-base";
import {connect} from "react-redux";
import productsDuck from "../redux/ducks/productsDuck";
import MainLayout from "../layouts/MainLayout";
import config from "../config"
import {storeData, retrieveData} from '../helpers/storage'

const HomeScreen = ({productsDuck, navigation}) => {

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

            <Flex direction={'column'}>
                <Center>
                    <Box>
                        <Heading style={{color:'black', marginTop:'30%'}} size="lg" mb={3}>
                            Elige la prueba que deseas responder
                        </Heading>
                    </Box>
                </Center>
                <Button size={'lg'} style={{marginBottom:20}}>ECCO</Button>

                <Button size={'lg'} onPress={() => navigation.navigate('loginUser')}>NOM 035</Button>
            </Flex>
        </MainLayout>
    )
}

const mapState = (state) => {
    return {
        productsDuck: state.productsDuck
    }
}

export default connect(mapState)(HomeScreen);
