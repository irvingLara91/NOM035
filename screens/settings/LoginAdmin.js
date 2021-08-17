import React, {useEffect, useState} from "react";
import {Box, Text,Input,Stack,  Button, Heading, Center, HStack, Flex, ScrollView, useToast} from "native-base";
import {connect} from "react-redux";
import MainLayout from "../../layouts/MainLayout";
import config from "../../config"

const LoginAdmin = ({navigation}) => {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const toast = useToast()

    const validateAdmin=()=>{
        const {USER_ADMIN, USER_PASSWORD_ADMIN} = config;
        console.log(USER_ADMIN, USER_PASSWORD_ADMIN)
        setLoading(true)

        if(!userName || !password) {
            toast.show({
                title: "Ingresa la información solicitada",
            })
            setLoading(false)
            return false
        }

        if(USER_ADMIN===userName && USER_PASSWORD_ADMIN===password){
            setTimeout(
                () => {
                    navigation.navigate('HomeConfig')
                    setLoading(false)
                },
                500
            );
        }else{
            toast.show({
                title: "Las credenciales son inválidas",
            })
            setLoading(false)
        }

    }


    return (

        <MainLayout>
            <ScrollView
                height={'100%'}
                style={{height:'100%'}}>
            <Flex direction={'column'}>
                <Center>
                    <Box>
                        <Heading style={{color:'black', marginTop:'30%'}} size="lg" mb={3}>
                            Acceso a configuración
                        </Heading>
                    </Box>
                </Center>




                        <Center>
                            <Input
                                w="80%"
                                size={'2xl'}
                                mx={3}
                                value={userName}
                                onChangeText={(text)=> setUserName(text)}
                                style={{marginBottom:10}}
                                placeholder="Usuario"
                            />


                            <Box style={{height:10}}></Box>
                            <Input
                                w="80%"
                                size={'2xl'}
                                value={password}
                                onChangeText={(text)=> setPassword(text)}
                                type={'password'}
                                style={{marginBottom:10}}
                                placeholder="Contraseña"
                            />

                            <HStack>
                                <Button size={'lg'} isDisabled={loading} colorScheme={'gray'} style={{marginRight:10}} loading={loading} onPress={()=> navigation.navigate('Home')}>Regresar</Button>
                                <Button size={'lg'} isLoading={loading} onPress={validateAdmin}>Ingresar</Button>
                            </HStack>



                        </Center>




            </Flex>
            </ScrollView>
        </MainLayout>
    )
}

const mapState = (state) => {
    return {
        productsDuck: state.productsDuck
    }
}

export default connect(mapState)(LoginAdmin);
