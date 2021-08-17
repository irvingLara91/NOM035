import React, {useEffect, useState} from "react";
import {Box, Text, Input, Stack, Button, Heading, Center, HStack, Flex, ScrollView, useToast} from "native-base";
import {Alert} from 'react-native'
import {connect} from "react-redux";
import QuestionComponent from "../../components/QuestionComponent";
import {responseQuestion} from "../../redux/ducks/nom035Duck";
import _ from 'lodash'

const SectionComponent = ({navigation, index=0, vref=null, encuesta=null, numEncuesta=1, nom035, responseQuestion, currentAssessment=1, onNextAssessment}) => {


    const [validate1Section, setValidate1Section] = useState(false)
    const [currentSection, setCurrentSection] = useState(1)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [numQuestions, setNumQuestions] = useState(0)
    const [hasYesSection1vref1, setHasYesSection1vref1] = useState(false) // este nos va a indicar si la seccion1 tiene al menos un yes y si no es así entonces lo saltará a la siguiente encuesta
    const toast = useToast()

    useEffect(()=>{
        if(vref===1){ // validamos si la encuesta es la v1 entonces sabemos que hay que validar la primera sección
            setValidate1Section(true)
        }

        if(encuesta){
            setNumQuestions(encuesta.preguntas.length)
        }
    },[])


    const onSetValueQuestion =(question_index,value, section)=>{
        try{
            if(question_index+1<=numQuestions){
                console.log(numEncuesta, question_index,value)
                responseQuestion(numEncuesta, question_index, value)
                setCurrentQuestion(currentQuestion+1)
            }else{
                onNextAssessment()
            }

        }catch (e) {

        }

        if(vref===1){
            validateNOQuestioninVref1(question_index,value, section)
        }
    }

    const validateNOQuestioninVref1=(question_index, value,section)=>{
        //validar los NO de la primera sección
        console.log('values',vref, section)
        if(vref===1 && currentSection===1 && section!==undefined){
            if(value===1){
                setHasYesSection1vref1(true) // si en la primera sección tuvo al menos un SI entonces lo marcamos y lo dejamos continuar
            }
            if(question_index===5 && !hasYesSection1vref1){ // si no tuvo algun SI entonces lo pasamos a la siguiente encuesta (si la hay)
                onNextAssessment()
            }
        }
    }

    return (
        <Box style={{width:'100%'}}>


                <QuestionComponent
                    onSetValueQuestion={onSetValueQuestion}
                    question={encuesta.preguntas.length>=currentQuestion?encuesta.preguntas[currentQuestion]:0}
                    title={encuesta.preguntas.length>=currentQuestion?_.get(encuesta.preguntas[currentQuestion], 'pregunta',''):0}
                    index={currentQuestion}
                    />

            {/*<Text fontSize="md" style={{fontSize:20, padding:20,color:'#2d4479', width:'100%'}}>#{index}</Text>*/}
            <Text>vref: {vref} , preguntas: {encuesta?encuesta.preguntas.length:0}</Text>


        </Box>
    )
}

const mapState =(state)=> {
    return {
        nom035: state.nom035
    }
}

export default connect(mapState,{
    responseQuestion
})(SectionComponent);
