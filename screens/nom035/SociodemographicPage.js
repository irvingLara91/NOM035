import React, {useEffect, useState} from "react";
import {Box,Select, Text,Input,Stack,  Button, Heading, Center, HStack, Flex, ScrollView, useToast} from "native-base";
import {connect} from "react-redux";
import MainLayout from "../../layouts/MainLayout";
import nom035_demograficos from '../nom035/estructura/nom035_demograficos.json'
import {View} from 'react-native'
import {initResponseNom035, responseQuestion, saveRsponseSocio} from "../../redux/ducks/nom035Duck";

const SociodemographicPage = ({navigation, saveRsponseSocio}) => {
    const [respuestas,setRespuestas]=useState([])
    const [dato,setDato]=useState(0)

    const [answer,setAnswer]=useState({})



    useEffect(()=>{
        ///console.log(nom035_demograficos.sociodemograficos[dato].opciones)
    },[])

    const addResponse=(response)=>{
        let data ={}
        data.dato= nom035_demograficos.sociodemograficos[dato].dato
        data.valor= response

        setAnswer(data)
        console.log(answer)
    }

    const next= async ()=>{
        if (answer.valor){
             if(dato===3 && answer.valor==="No"){
                 await respuestas.push(answer)
                 await setDato(dato+1)
                 await setAnswer({})
                 await console.log(respuestas)
                 await saveRsponseSocio(respuestas)
                 navigation.navigate('AssessmentNom035')
            }else {
                await respuestas.push(answer)
                await setAnswer({})
                await console.log(dato,respuestas)
                 if (dato===4){
                    await saveRsponseSocio(respuestas)
                     navigation.navigate('AssessmentNom035')
                     return
                 }
                 await setDato(dato+1)
             }
        }else {
            alert("selecciona una opción")

        }

    }

    return (
        <MainLayout>
            <ScrollView
                height={'100%'}
                style={{height:'100%'}}>
                <Flex direction={'column'}>

                    <View style={{padding:20}}>
                        <Text>
                        {


                            nom035_demograficos.sociodemograficos[dato].dato &&
                            nom035_demograficos.sociodemograficos[dato].dato

                        }
                       </Text>
                        <Select
                            minWidth={200}
                            accessibilityLabel="Elige tu sexo"
                            placeholder="Elige una opción"
                            onValueChange={(itemValue) =>addResponse(itemValue)}
                        >
                            {
                                nom035_demograficos.sociodemograficos[dato].opciones.map((item)=>{
                                  return  <Select.Item label={item.option} value={item.option} />
                                })
                            }
                        </Select>


                        <Button size={'lg'}  colorScheme={'gray'} style={{marginTop:20}} onPress={()=> {next()}}>Continuar</Button>

                    </View>



                </Flex>
            </ScrollView>
        </MainLayout>
    )
}

const mapState = (state) => {
    return {
        nom035: state.nom035
    }
}

export default connect(mapState,{
    initResponseNom035,
    responseQuestion,
    saveRsponseSocio
})(SociodemographicPage,);
