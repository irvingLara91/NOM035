import React, {useEffect, useState} from "react";
import {Box, Text,Input,Stack,  Button, Heading, Center, HStack, Flex, ScrollView, useToast} from "native-base";
import {connect} from "react-redux";
import QuestionYesNo from "../../components/QuestionYesNo";

const SectionComponent = ({navigation, index=0, vref=null, encuesta=null, numEncuesta=1, nom035}) => {


    const [validate1Section, setValidate1Section] = useState(false)
    const [currentSection, setCurrentSection] = useState(1)
    const toast = useToast()

    useEffect(()=>{
        if(vref===1){ // validamos si la encuesta es la v1 entonces sabemos que hay que validar la primera sección
            setValidate1Section(true)

        }
    },[])

    useEffect(()=>{
        if(vref===1 && currentSection!==1 && currentSection!==undefined){
            /// si ya no es la seccion1 entonces validamos si se contestaron todas las preguntas con NO
        }
    },[currentSection])

    return (
        <Center>
            <Text fontSize="md" style={{fontSize:20, padding:20,color:'#2d4479', width:'100%'}}>#{index}</Text>
            <Text>vref: {vref}</Text>
            {
                encuesta.preguntas.map((question,i)=>{
                    return  <QuestionYesNo question={question} title={question.pregunta} index={i}/>
                })
            }
        </Center>
    )
}

const mapState =(state)=> {
    return {
        nom035: state.nom035
    }
}

export default connect(mapState)(SectionComponent);