import React, {useEffect, useState} from "react";
import {Box, Text,Input,Stack,  Button, Heading, Center, HStack, Flex, ScrollView, useToast} from "native-base";
import {connect} from "react-redux";
import MainLayout from "../../layouts/MainLayout";
import config from "../../config"
import _ from 'lodash'
import {retrieveData} from "../../helpers/storage"
import QuestionYesNo from "../../components/QuestionYesNo";
import _nomv1 from '../nom035/estructura/nom035_ref1v2.json'
import _nomv2 from '../nom035/estructura/nom035_ref2.json'
import _nomv3 from '../nom035/estructura/nom035_ref3.json'
import AssessmentComponent from "../../components/AssessmentComponent";
import {initResponseNom035, responseQuestion} from "../../redux/ducks/nom035Duck";

const AssessmentNom035 = ({navigation, initResponseNom035, nom035, responseQuestion}) => {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [currentAssessment, setCurrentAssessment] = useState(0)
    const [assessment, setAssessment] = useState(null)
    let configAssessment = [1,3]


    const toast = useToast()

    useEffect(()=>{
        processAssessment()
    },[])

    const processAssessment=()=>{
        let array_questions = []
        let globalarray = []

        // tomamos de la configuracion cuales encuestas se van a contestar por los usuarios
        configAssessment.forEach((encuesta,i) => {
            if(encuesta===1){
                globalarray.push({encuesta:i+1, vref:1, preguntas:_nomv1.encuesta}) // vref representa el tiupo de nom si es el 1 el 2 o el 3
            }

            if(encuesta===2) {
                globalarray.push({encuesta:i+1, vref:2, preguntas:_nomv2.encuesta})
            }

            if(encuesta===3){
                globalarray.push({encuesta:i+1, vref:3, preguntas:_nomv3.encuesta})
            }
        })

        setAssessment(globalarray)
        initResponseNom035(globalarray)
        //responseQuestion(0,2,1) // de la encuetsa 1, cambiar el valor de la posicion 2 por el valor 1
        // deberemos recorrer globalarray

    }



    return (
        <MainLayout>
            <ScrollView
                height={'100%'}
                style={{height:'100%'}}>
                <Flex direction={'column'}>
                    <Text>
                        {JSON.stringify(nom035)}
                    </Text>

                    {
                        assessment?
                            <AssessmentComponent  assment={assessment}/>
                        :null
                    }



                        {/*
                            _nomv1.encuesta.map((item, i)=>{
                                return <Box>

                                    {
                                        i===currentPage?<>
                                            <Box style={{backgroundColor:'#2d4479', width:'100%',marginBottom:20,padding:20}}>
                                            <Text style={{fontSize:25,color:'white'}}>{item.titulo}</Text>
                                        </Box>

                                            {
                                                item.preguntas.map((q,j)=>{
                                                    numQuestion++
                                                    return <QuestionYesNo index={numQuestion} title={q.pregunta}/>
                                                })
                                            }

                                            <HStack style={{paddingLeft:30, paddingRight:30, marginTop:20,float:'right',width:'100%'}}>
                                                <Button size={'lg'} style={{marginRight:20}} onPress={prev}>Anterior</Button>
                                                <Button size={'lg'} onPress={next}>Siguiente</Button>
                                            </HStack>
                                        </>:null
                                    }

                                </Box>
                            })
                       */ }





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
    responseQuestion
})(AssessmentNom035,);