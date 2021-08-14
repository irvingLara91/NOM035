import React, {useEffect, useState} from "react";
import {Box, Text,Input,Stack,  Button, Heading, Center, HStack, Flex, ScrollView, useToast} from "native-base";
import {connect} from "react-redux";
import MainLayout from "../layouts/MainLayout";
import config from "../config"
import _ from 'lodash'
import {retrieveData} from "../helpers/storage"
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


    return (
       assessment?assessment.map((encuesta,i)=>{
            return  <Box>
                {
                   currentAssessment===i+1?<Box>
                       <SectionComponent  currentAssessment={currentAssessment} encuesta={encuesta} key={i} index={i} numEncuesta={encuesta.encuesta} vref={encuesta.vref}/>
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
