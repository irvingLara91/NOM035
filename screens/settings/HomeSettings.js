import React, {useEffect, useState} from "react";
import {Box, Text,Input,Stack,  Button, Heading, Center, VStack, Flex, ScrollView, useToast} from "native-base";
import {connect} from "react-redux";
import MainLayout from "../../layouts/MainLayout";
import config from "../../config"

const HomeSettings = ({navigation}) => {
    const [loading,setLoading] = useState(false)

    const toast = useToast()

    return (
        <MainLayout>
            <ScrollView
                height={'100%'}
                style={{height:'100%'}}>
                <Flex direction={'column'}>
                    <Center>
                        <Box>
                            <Heading style={{color:'black', marginTop:'30%'}} size="lg" mb={3}>
                                Configuración
                            </Heading>
                        </Box>
                    </Center>


                    <Center>
                        <VStack>
                            <Button size={'lg'} style={style.butonMain} colorScheme={'gray'}  loading={loading}>Acualizar BD de usuarios</Button>
                            <Button size={'lg'} style={style.butonMain} colorScheme={'gray'}  loading={loading}>Configuración khor</Button>
                            <Button size={'lg'} style={style.butonMain} colorScheme={'gray'}  loading={loading}>Enviar respuestas</Button>
                        </VStack>
                    </Center>
                </Flex>
            </ScrollView>
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
        productsDuck: state.productsDuck
    }
}

export default connect(mapState)(HomeSettings);
