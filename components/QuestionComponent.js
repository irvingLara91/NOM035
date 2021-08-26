import React, {useEffect, useState} from "react";
import {
    Box,
    Text,
    Input,
    Stack,
    Button,
    Heading,
    Center,
    HStack,
    VStack,
    Flex,
    ScrollView,
    useToast
} from "native-base";
import {connect} from "react-redux";
import {TouchableOpacity} from 'react-native'
import MainLayout from "../layouts/MainLayout";
import config from "../config"
import _ from 'lodash'
import {retrieveData} from "../helpers/storage"

const QuestionComponent = ({
                               navigation,
                               title = 'ejemplo',
                               index = 0,
                               question = null,
                               onSetValueQuestion,
                               modeDev = false,
                               app
                           }) => {

    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const toast = useToast()

    const setValue = (val) => {
        setResponse(val)
        onSetValueQuestion(index, val, question.section)
    }

    return (
        <Box>
            <Text style={{
                backgroundColor: '#2d4479',
                fontSize: 20,
                color: 'white',
                padding: 10
            }}>{question.titulo} {modeDev ? `Section:${question.section}` : ''}</Text>
            <Center>
                <Text fontSize="md" style={{
                    fontSize: 30,
                    color: '#2d4479',
                    width: '100%',
                    textAlign: 'justify',
                    marginTop: 20,
                    marginBottom: 20
                }}>{title} {modeDev ? index : ''}</Text>
                {
                    question.tipo === 'sino' ? <HStack style={{paddingLeft: 10, paddingRight: 10}}>
                        <Button size={'lg'}
                            /*Cambiar colores del botón */
                                _light={{bg: app.color, _text: {color: app.fontColor}}}
                                _pressed={{bg: app.colorHover, _text: {color: app.fontColor}}}
                            /***fin***/
                                style={{marginRight: 20, width: '50%'}} isLoading={loading}
                                onPress={() => setValue(1)}>Si</Button>
                        <Button size={'lg'}
                            /*Cambiar colores del botón */
                                _light={{bg: app.color, _text: {color: app.fontColor}}}
                                _pressed={{bg: app.colorHover, _text: {color: app.fontColor}}}
                            /***fin***/
                                isLoading={loading} style={{width: '50%'}} onPress={() => setValue(0)}>No</Button>
                    </HStack> : null
                }


            </Center>

            {
                question.tipo === '4asc' || question.tipo === '4desc' ?
                    <VStack style={{paddingLeft: 30, paddingRight: 30}}>
                        <Button size={'lg'} _light={{bg: app.color, _text: {color: app.fontColor}}}
                                _pressed={{bg: app.colorHover, _text: {color: app.fontColor}}}
                                style={{marginBottom: 20, width: '100%'}} isLoading={loading}
                                onPress={() => setValue(question.tipo === '4desc' ? 0 : 4)}>Siempre</Button>
                        <Button size={'lg'} _light={{bg: app.color, _text: {color: app.fontColor}}}
                                _pressed={{bg: app.colorHover, _text: {color: app.fontColor}}} isLoading={loading}
                                style={{marginBottom: 20, width: '100%'}}
                                onPress={() => setValue(question.tipo === '4desc' ? 1 : 3)}>Casi siempre</Button>
                        <Button size={'lg'} _light={{bg: app.color, _text: {color: app.fontColor}}}
                                _pressed={{bg: app.colorHover, _text: {color: app.fontColor}}} isLoading={loading}
                                style={{marginBottom: 20, width: '100%'}}
                                onPress={() => setValue(question.tipo === '4desc' ? 2 : 2)}>Algunas veces</Button>
                        <Button size={'lg'} _light={{bg: app.color, _text: {color: app.fontColor}}}
                                _pressed={{bg: app.colorHover, _text: {color: app.fontColor}}} isLoading={loading}
                                style={{marginBottom: 20, width: '100%'}}
                                onPress={() => setValue(question.tipo === '4desc' ? 3 : 1)}>Casi nunca</Button>
                        <Button size={'lg'} _light={{bg: app.color, _text: {color: app.fontColor}}}
                                _pressed={{bg: app.colorHover, _text: {color: app.fontColor}}} isLoading={loading}
                                style={{marginBottom: 20, width: '100%'}}
                                onPress={() => setValue(question.tipo === '4desc' ? 4 : 0)}>Nunca</Button>
                    </VStack> : null
            }
        </Box>
    )
}

const mapState = (state) => {
    return {
        app: state.app,
        productsDuck: state.productsDuck
    }
}

export default connect(mapState)(QuestionComponent);
