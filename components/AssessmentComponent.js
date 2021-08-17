import React, {useEffect, useState} from "react";
import {Box, Text,Input,Stack,  Button, Heading, Center, HStack, Flex, ScrollView, useToast} from "native-base";
import {connect} from "react-redux";
import MainLayout from "../layouts/MainLayout";
import config from "../config"
import _ from 'lodash'
import {retrieveData} from "../helpers/storage"
import {Alert} from 'react-native'
import SectionComponent from "../screens/nom035/SectionComponent";

const AssessmentComponent = ({navigation, title='ejemplo',assment=null}) => {

    const [currentAssessment, setCurrentAssessment] = useState(0)
    const [assessment, setAssessment] = useState(assment)
    const [questions,setQuestions] = useState([])


    useEffect(()=>{
        if(assessment){
            setAssessment(assment)
            setCurrentAssessment(1)
            processAssessment()
        }
    },[assessment])


    const processAssessment=()=>{
        /// array de preguntas por secciones
        let q=[]
        if(assessment){
            assessment.map((item,i)=>{
                item.preguntas.map((qu)=>{
                    q.push(qu)
                })
            })
        }
        setQuestions(q)
    }


    const reiniciarPreguntas=()=>{
            setCurrentAssessment(2);
    }

    const onNextAssessment=()=>{
        if(assessment.length>1){
            if(currentAssessment===2){
                Alert.alert('Gracias por haber contestado la encuesta!')
                navigation.goBack(null)
            }else{
                setCurrentAssessment(2); // de este nos sirve para cuando es el tipo de assessment 1 y no contesta

            }
            // algun si en la primera sección entonces saltamos  al siguiente assessment
        }else{
            Alert.alert('Gracias por haber contestado la encuesta!')
            navigation.goBack(null)
        }
    }


    return (
       assessment?assessment.map((encuesta,i)=>{
            return  <Box>
                {
                   currentAssessment===i+1?<Box>
                       {
                           <SectionComponent onNextAssessment={onNextAssessment}
                                             currentAssessment={currentAssessment}
                                             encuesta={encuesta}
                                             key={i} index={i}
                                             numEncuesta={encuesta.encuesta}
                                             vref={encuesta.vref}/>
                       }
                       {
                          assessment.length>1&&i!==1? <Button size={'lg'}  style={{width:'50%'}} onPress={()=>reiniciarPreguntas()}>Continuar</Button>:null
                       }
                    </Box>
                    :null
                }

               </Box>
           }):null
    )
}

const mapState = (state) => {
    return {
        nom035: state.nom035
    }
}

export default connect(mapState)(AssessmentComponent);
