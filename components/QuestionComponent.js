import React, {useEffect, useState} from "react";
import {Box, Text,Input,Stack,  Button, Heading, Center, HStack, VStack, Flex, ScrollView, useToast} from "native-base";
import {connect} from "react-redux";
import MainLayout from "../layouts/MainLayout";
import config from "../config"
import _ from 'lodash'
import {retrieveData} from "../helpers/storage"

const QuestionComponent = ({navigation, title='ejemplo', index=0, question=null, onSetValueQuestion}) => {

    const [response,setResponse] = useState(null)
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const toast = useToast()

    const setValue=(val)=>{
        setResponse(val)
        onSetValueQuestion(index, val)
    }

    return (
            <Box>
                {
                    index!==0 || <Text>{question.titulo} {question.section}</Text>
                }

                <Text fontSize="md" style={{fontSize:20, padding:20,color:'#2d4479', width:'100%'}}>#{index} {title}</Text>
                {
                    question.tipo==='sino'?<HStack style={{paddingLeft:30, paddingRight:30}}>
                        <Button size={'lg'} colorScheme={response===1?'blue':'gray'} style={{marginRight:20,width:'50%'}} isLoading={loading} onPress={()=>setValue(1)}>Si</Button>
                        <Button size={'lg'} colorScheme={response===0?'blue':'gray'} isLoading={loading} style={{width:'50%'}} onPress={()=>setValue(0)}>No</Button>
                    </HStack>:null
                }

                {
                    question.tipo==='4asc' || question.tipo==='4desc'? <VStack style={{paddingLeft:30, paddingRight:30}}>
                        <Button size={'lg'} colorScheme={response===(question.tipo==='4desc'?0:4)?'blue':'gray'} style={{marginBottom:20,width:'50%'}} isLoading={loading} onPress={()=>setValue(question.tipo==='4desc'?0:4)}>Siempre</Button>
                        <Button size={'lg'} colorScheme={response===(question.tipo==='4desc'?1:3)?'blue':'gray'} isLoading={loading} style={{marginBottom:20,width:'50%'}} onPress={()=>setValue(question.tipo==='4desc'?1:3)}>Casi siempre</Button>
                        <Button size={'lg'} colorScheme={response===(question.tipo==='4desc'?2:2)?'blue':'gray'} isLoading={loading} style={{marginBottom:20,width:'50%'}} onPress={()=>setValue(question.tipo==='4desc'?2:2)}>Algunas veces</Button>
                        <Button size={'lg'} colorScheme={response===(question.tipo==='4desc'?3:1)?'blue':'gray'} isLoading={loading} style={{marginBottom:20,width:'50%'}} onPress={()=>setValue(question.tipo==='4desc'?3:1)}>Casi nunca</Button>
                        <Button size={'lg'} colorScheme={response===(question.tipo==='4desc'?4:0)?'blue':'gray'} isLoading={loading} style={{marginBottom:20,width:'50%'}} onPress={()=>setValue(question.tipo==='4desc'?4:0)}>Nunca</Button>
                    </VStack>:null
                }

            </Box>
    )
}

const mapState = (state) => {
    return {
        productsDuck: state.productsDuck
    }
}

export default connect(mapState)(QuestionComponent);
