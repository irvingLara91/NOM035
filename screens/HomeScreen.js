import React, {useEffect, useState} from "react";
import {Box, Text, Button, Heading, Center, Container, Flex, Modal} from "native-base";
import {connect} from "react-redux";
import productsDuck from "../redux/ducks/productsDuck";
import MainLayout from "../layouts/MainLayout";
import config from "../config"

const HomeScreen = ({productsDuck, navigation}) => {

    const [showModal, setShowModal] = useState(false)


    useEffect(() => {
        console.log(productsDuck)
        console.log(config)
    }, [])



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
                <Button size={'lg'} style={{marginBottom:20}} onPress={() => navigation.navigate('LoginAdmin')}>ECCO</Button>

                <Button size={'lg'} onPress={() => console.log("hello world")}>NOM 035</Button>
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
