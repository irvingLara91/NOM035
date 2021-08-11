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

const AssessmentNom035 = ({navigation}) => {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(0)

    let numQuestion = 0
    let numSection = 0
    const [apply, setApply] = useState({
        empresa: '',
        idParticipante:'',
        idPeriodo:'',
        respuestas:[
            {
                cuestionario:1,
                respuestas:"000000000000000000000"
            },
            {
                cuestionario:2,
                respuestas:"01234012340123401234012340123401234012340123401234012340123401234012340123"
            }
        ]
    })
    const toast = useToast()

    useEffect(()=>{

    },[])

    const prev=()=>{
        let sections = _nomv1.encuesta.length-1
        if(currentPage!=0 ){
            setCurrentPage(
                currentPage-1)
        }

    }

    const next=()=>{
        console.log(currentPage, _nomv1.encuesta.length)
        let sections = _nomv1.encuesta.length-1
        if(currentPage<sections){
            setCurrentPage(currentPage+1)
        }
    }

    return (
        <MainLayout>
            <ScrollView
                height={'100%'}
                style={{height:'100%'}}>
                <Flex direction={'column'}>
                        {
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
                        }





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

export default connect(mapState)(AssessmentNom035);
