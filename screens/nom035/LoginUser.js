import React, {useEffect, useState} from "react";
import {Box, Text,Input,Stack,  Button, Heading, Center, HStack, Flex, ScrollView, useToast} from "native-base";
import {connect} from "react-redux";
import MainLayout from "../../layouts/MainLayout";
import config from "../../config"
import _ from 'lodash'
import {retrieveData} from "../../helpers/storage"
import {Image} from 'react-native'
let logo = require('../../assets/logoa.png')

const LoginUser = ({navigation}) => {

    const [userName, setUserName] = useState("gaspar.dzul@hiumanlab.com")
    const [password, setPassword] = useState("root")
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const toast = useToast()

    useEffect(()=>{
        getUsers()
    },[])



    const getUsers=async()=>{
        let val = await retrieveData('users')
        console.log('valor de users',val)
        if(val)
        setUsers(val)
    }

    const validateUser=()=>{
        if(!userName || !password) {
            toast.show({
                title: "Ingresa la información solicitada",
            })
            setLoading(false)
            return false
        }


        let isUser = _.find(users,{'username':userName})
        if(isUser){
            //existe el usuario en el arreglo de usuarios
            let pass = isUser.password.toString()
            if(pass.toString()!==password){
                toast.show({
                    title: "Las credenciales son inválidas",
                })
                return
            }
            setLoading(false)
            toast.show({
                title:`Bienvenido ${isUser.nombre} ${isUser.apellido}` ,
            })
            navigation.navigate('SociodemographicPage')

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
                                Acceso a evaluación NOM035
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
                            style={{marginBottom:10, color:'gray'}}
                            placeholder="Usuario"
                        />


                        <Box style={{height:10}}></Box>
                        <Input
                            w="80%"
                            size={'2xl'}
                            value={password}
                            onChangeText={(text)=> setPassword(text)}
                            type={'password'}
                            style={{marginBottom:10, color:'gray'}}
                            placeholder="Contraseña"
                        />

                        <HStack>
                            <Button size={'lg'} isDisabled={loading} colorScheme={'gray'} style={{marginRight:10}} loading={loading} onPress={()=> navigation.navigate('Home')}>Regresar</Button>
                            <Button size={'lg'} isLoading={loading} onPress={validateUser}>Ingresar</Button>
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

export default connect(mapState)(LoginUser);
