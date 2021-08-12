import React, {useEffect, useState} from "react";
import {Box, Text,Input,Stack,  Button, Heading, Center, HStack, Flex, ScrollView, useToast} from "native-base";
import {connect} from "react-redux";
import MainLayout from "../layouts/MainLayout";
import config from "../config"
import _ from 'lodash'
import {retrieveData} from "../helpers/storage"
import QuestionYesNo from "./QuestionYesNo";
import SectionComponent from "../screens/nom035/SectionComponent";

const AssessmentComponent = ({navigation, title='ejemplo',assment=null}) => {

    const [currentAssessment, setCurrentAssessment] = useState(0)
    const [assessment, setAssessment] = useState(assment)
    const [questions,setQuestions] = useState([])


    useEffect(()=>{
        if(assessment){
            setAssessment(assment)
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

    return (
       assessment?assessment.map((encuesta,i)=>{
            return  <Box>
                <Text>{encuesta.vref}</Text>
                <SectionComponent encuesta={encuesta} key={i} index={i} numEncuesta={encuesta.encuesta} vref={encuesta.vref}/>
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
