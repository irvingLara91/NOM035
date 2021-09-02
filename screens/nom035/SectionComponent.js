import React, {useEffect, useState} from "react";
import {Box, Text, Input, Stack, Button, Heading, Center, HStack, Flex, ScrollView, useToast} from "native-base";
import {Alert, View} from 'react-native'
import {connect} from "react-redux";
import QuestionComponent from "../../components/QuestionComponent";
import {responseQuestion} from "../../redux/ducks/nom035Duck";
import {retrieveData, storeData} from "../../helpers/storage"
import _ from 'lodash'
import {getCountAction, saveCountAction} from "../../redux/ducks/progressCountDuck";

const SectionComponent = ({
                              navigation,
                              index = 0,
                              vref = null,
                              encuesta = null,
                              numEncuesta = 1,
                              nom035,
                              responseQuestion,
                              currentAssessment = 1,
                              onNextAssessment,
                              countResponse,
                              getCountAction, saveCountAction
                          }) => {


    const [validate1Section, setValidate1Section] = useState(false)
    const [currentSection, setCurrentSection] = useState(1)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [numQuestions, setNumQuestions] = useState(0)
    const [modeDev, setModeDev] = useState(false)
    const [hasYesSection1vref1, setHasYesSection1vref1] = useState(false) // este nos va a indicar si la seccion1 tiene al menos un yes y si no es así entonces lo saltará a la siguiente encuesta
    const toast = useToast()
    const [totalQuestions, setTotalQuestions] = useState(0)
    const [totalResponse, setTotalResponse] = useState(0)



    useEffect(() => {
        if (vref === 1) { // validamos si la encuesta es la v1 entonces sabemos que hay que validar la primera sección
            setValidate1Section(true)
        }


        if (encuesta) {
            setNumQuestions(encuesta.preguntas.length)
        }
        total()
        getModeDev()
    }, [])

    const total = () => {
        if (nom035.respuesta && nom035.respuesta.respuestas[0].respuestas.length > 0 && nom035.respuesta && nom035.respuesta.respuestas[1] && nom035.respuesta.respuestas[1].respuestas.length > 0) {
            setTotalQuestions(nom035.respuesta.respuestas[1].respuestas.length + nom035.respuesta.respuestas[0].respuestas.length)
        }else {
            setTotalQuestions(nom035.respuesta.respuestas[0].respuestas.length)
        }
    }

    const getModeDev = async () => {
        try {
            let dev = await retrieveData('devmode')
            console.log(dev)
            if (dev) {
                setModeDev(dev.dev)
            }
            return dev
        } catch (e) {
            return null
        }
    }


    useEffect(()=>{
        getCountAction()

        console.log(countResponse.count_responses)
    },[])

    const onSetValueQuestion = (question_index, value, section) => {
        try {
            if (question_index + 1 < numQuestions) {
                console.log(numEncuesta, question_index, value)
                responseQuestion(numEncuesta, question_index, value)
                setCurrentQuestion(currentQuestion + 1)
            } else {
                responseQuestion(numEncuesta, question_index, value)
                onNextAssessment()
            }

        } catch (e) {

        }

        if (vref === 1) {
            validateNOQuestioninVref1(question_index, value, section)
        }

        if (vref === 2 && (question_index === 40 || question_index === 44)) {
            validateNoSectionsinVref2(question_index, value, section)
        }

        if (vref === 3 && (question_index === 64 || question_index === 69)) {
            validateNoSectionsinVref3(question_index, value, section)
        }

    }

    const validateNoSectionsinVref2 = (question_index, value, section) => {
        if (question_index === 40 && value === 0) { // si la pregunta es un SINO y la respuesta es No entonces saltamos la sección
            saveCountAction(countResponse.count_responses+4)
            setCurrentQuestion(44)
        }

        if (question_index === 44 && value === 0) { // si la pregunta es un SINO y la respuesta es No entonces saltamos la sección
            saveCountAction(totalQuestions)
            onNextAssessment() // lo forzamos al sig encuesta o finalizarla
        }

    }

    const validateNoSectionsinVref3 = (question_index, value, section) => {
        if (question_index === 64 && value === 0) { // si la pregunta es un SINO y la respuesta es No entonces saltamos la sección
            saveCountAction(countResponse.count_responses+5)
            setCurrentQuestion(69)
        }

        if (question_index === 69 && value === 0) { // si la pregunta es un SINO y la respuesta es No entonces saltamos la sección
            saveCountAction(totalQuestions)
            onNextAssessment() // lo forzamos al sig encuesta o finalizarla
        }

    }

    const validateNOQuestioninVref1 = (question_index, value, section) => {
        //validar los NO de la primera sección
        console.log('values', vref, section)
        if (vref === 1 && currentSection === 1 && section !== undefined) {
            if (value === 1) {
                setHasYesSection1vref1(true) // si en la primera sección tuvo al menos un SI entonces lo marcamos y lo dejamos continuar
            }
            if (question_index === 5 && !hasYesSection1vref1) { // si no tuvo algun SI entonces lo pasamos a la siguiente encuesta (si la hay)
                saveCountAction(20)
                onNextAssessment()
            }
        }
    }

    return (
        <Box style={{width: '100%'}}>


            <View style={{alignItems:'center'}}><Text>  {countResponse.count_responses} /{totalQuestions}</Text></View>
            <QuestionComponent
                onSetValueQuestion={onSetValueQuestion}
                modeDev={modeDev}
                totalQuestions={totalQuestions}
                question={encuesta.preguntas.length >= currentQuestion ? encuesta.preguntas[currentQuestion] : 0}
                title={encuesta.preguntas.length >= currentQuestion ? _.get(encuesta.preguntas[currentQuestion], 'pregunta', '') : 0}
                index={currentQuestion}
            />

            {
                modeDev ? <Box>
                    <Text>Contador: {currentQuestion} / {totalQuestions}</Text>

                    <Text>vref: {vref} , preguntas: {encuesta ? encuesta.preguntas.length : 0}</Text>
                    <Text style={{fontSize: 20}}>{JSON.stringify(nom035)}</Text>
                </Box> : null
            }


        </Box>
    )
}

const mapState = (state) => {
    return {
        nom035: state.nom035,
        countResponse:state.countResponse

    }
}

export default connect(mapState, {
    responseQuestion,getCountAction,saveCountAction
})(SectionComponent);
