import React, {useEffect, useState} from "react";
import {Box, Text,Input,Stack,  Button, Heading, Center, HStack, Flex, ScrollView, useToast} from "native-base";
import {connect} from "react-redux";
import MainLayout from "../layouts/MainLayout";
import config from "../config"
import _ from 'lodash'
import {retrieveData} from "../helpers/storage"

const QuestionYesNo = ({navigation, title='ejemplo', index=0, question=null}) => {

    const [response,setResponse] = useState(null)
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const toast = useToast()

    const setValue=(val)=>{
        setResponse(val)
    }

    return (
            <Center>
                {
                    index!==0 || <Text>{question.titulo} {question.section}</Text>
                }

                <Text fontSize="md" style={{fontSize:20, padding:20,color:'#2d4479', width:'100%'}}>#{index} {title}</Text>
                <HStack style={{paddingLeft:30, paddingRight:30}}>
                    <Button size={'lg'} colorScheme={response===1?'blue':'gray'} style={{marginRight:20,width:'50%'}} isLoading={loading} onPress={()=>setValue(1)}>Si</Button>
                    <Button size={'lg'} colorScheme={response===2?'blue':'gray'} isLoading={loading} style={{width:'50%'}} onPress={()=>setValue(2)}>No</Button>
                </HStack>
            </Center>
    )
}

const mapState = (state) => {
    return {
        productsDuck: state.productsDuck
    }
}

export default connect(mapState)(QuestionYesNo);
