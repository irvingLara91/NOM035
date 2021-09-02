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
import {Dimensions, TouchableOpacity, View} from 'react-native'
const {width, height} = Dimensions.get('window')

import RenderHtml, { defaultSystemFonts } from 'react-native-render-html';
import {textSizeRender} from "../utils/utils";
import {saveCountAction} from "../redux/ducks/progressCountDuck";
const QuestionComponent = ({
                               navigation,
                               title = 'ejemplo',
                               index = 0,
                               question = null,
                               onSetValueQuestion,
                               modeDev = false,
                               app,
                               totalQuestions,
                               saveCountAction,
                               countResponse
                           }) => {

    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])

    const toast = useToast()



    const saveActionClick=()=>{
        if (countResponse.count_responses<totalQuestions){
            saveCountAction(countResponse.count_responses+1)
        }
    }

    const setValue = (val) => {
        setResponse(val)
        onSetValueQuestion(index, val, question.section)
    }

    const tagsStyles = {
        p: {
            textAlign:'justify',
            color: app.color,
            fontSize:textSizeRender(5)
        },
        a:{
            color: 'red',
            fontSize:textSizeRender(5)
        }
    };

    const systemFonts = ["Poligon_Regular","Poligon_Bold", ...defaultSystemFonts];

    return (
        <Box>

            {/*
                totalQuestions !==0 &&
                <View style={{padding:20,backgroundColor: '#DFE0EA'}}>
                    <Text style={{
                        fontSize: 20,
                        color: app.color,
                        textAlign:'center',
                        padding: 10

                    }}>{`${totalResponse} /${totalQuestions}`}</Text>

                </View>
            */}


            <View style={{padding:20,backgroundColor: '#DFE0EA'}}>
                <RenderHtml
                    tagsStyles={tagsStyles}
                    contentWidth={width}
                    systemFonts={systemFonts}
                    source={{html:question.titulo}}
                />
            </View>


            {
                modeDev &&
                <Text style={{
                    backgroundColor: '#2d4479',
                    fontSize: 20,
                    color: 'white',
                    padding: 10

                }}>{modeDev ? `Section:${question.section} ref:${question.ref}` : ''}</Text>
            }

            <Center>
                <View style={{padding:20}}>
                    <RenderHtml
                        tagsStyles={tagsStyles}
                        contentWidth={width}
                        systemFonts={systemFonts}
                        source={{html:title}}
                    />
                </View>
                {
                    /***
                     * Para ver en dev  como pa el seteo de respuestas
                     */

                    modeDev &&
                    <Text fontSize="md" style={{
                        fontSize: 30,
                        color: '#2d4479',
                        width: '100%',
                        textAlign: 'justify',
                        marginTop: 20,
                        marginBottom: 20
                    }}>{modeDev ? index+1 : ''}</Text>

                }

                {
                    question.tipo === 'sino' ?
                        <View style={{flexDirection:'row',padding:20}}>
                        <Button size={'lg'}
                            /*Cambiar colores del botón */
                                _light={{borderColor:app.color, borderWidth:2,bg: app.fontColor, _text: {color: app.color,fontFamily: 'Poligon_Bold'}}}
                                _pressed={{borderColor:app.secondaryColor, borderWidth:0,bg: app.secondaryColor, _text: {color: app.color}}}
                            /***fin***/
                                style={{marginRight: 20, width: '50%'}} isLoading={loading}
                                onPress={() => {
                                    saveActionClick()
                                    setValue(1)
                                }}>Si</Button>
                        <Button size={'lg'}
                            /*Cambiar colores del botón */
                                _light={{borderColor:app.color, borderWidth:2,bg: app.fontColor, _text: {color: app.color,fontFamily: 'Poligon_Bold'}}}
                                _pressed={{borderColor:app.secondaryColor, borderWidth:0,bg: app.secondaryColor, _text: {color: app.color}}}
                            /***fin***/
                                isLoading={loading} style={{width: '50%'}} onPress={() => {
                            saveActionClick()
                            setValue(0)
                        }}>No</Button>
                    </View> : null
                }


            </Center>

            {
                question.tipo === '4asc' || question.tipo === '4desc' ?
                    <VStack style={{paddingLeft: 30, paddingRight: 30}}>
                        <Button size={'lg'}
                                _light={{borderColor:app.color, borderWidth:2,bg: app.fontColor, _text: {color: app.color,fontFamily: 'Poligon_Bold'}}}
                                _pressed={{borderColor:app.secondaryColor, borderWidth:0,bg: app.secondaryColor, _text: {color: app.color}}}
                                style={{marginBottom: 20, width: '100%'}} isLoading={loading}
                                onPress={() => {
                                    saveActionClick()
                                    setValue(question.tipo === '4desc' ? 0 : 4)
                                }}>Siempre</Button>
                        <Button size={'lg'}
                                _light={{borderColor:app.color, borderWidth:2,bg: app.fontColor, _text: {color: app.color,fontFamily: 'Poligon_Bold'}}}
                                _pressed={{borderColor:app.secondaryColor, borderWidth:0,bg: app.secondaryColor, _text: {color: app.color}}}
                                isLoading={loading}
                                style={{marginBottom: 20, width: '100%'}}
                                onPress={() => {
                                    saveActionClick()
                                    setValue(question.tipo === '4desc' ? 1 : 3)
                                }}>Casi siempre</Button>
                        <Button size={'lg'}
                                _light={{borderColor:app.color, borderWidth:2,bg: app.fontColor, _text: {color: app.color,fontFamily: 'Poligon_Bold'}}}
                                _pressed={{borderColor:app.secondaryColor, borderWidth:0,bg: app.secondaryColor, _text: {color: app.color}}}
                                isLoading={loading}
                                style={{marginBottom: 20, width: '100%'}}
                                onPress={() => {
                                    saveActionClick()
                                    setValue(question.tipo === '4desc' ? 2 : 2)
                                }}>Algunas veces</Button>
                        <Button size={'lg'}     _light={{borderColor:app.color, borderWidth:2,bg: app.fontColor, _text: {color: app.color,fontFamily: 'Poligon_Bold'}}}
                                _pressed={{borderColor:app.secondaryColor, borderWidth:0,bg: app.secondaryColor, _text: {color: app.color}}}
                                isLoading={loading}
                                style={{marginBottom: 20, width: '100%'}}
                                onPress={() => {
                                    saveActionClick()
                                    setValue(question.tipo === '4desc' ? 3 : 1)
                                }}>Casi nunca</Button>
                        <Button size={'lg'}     _light={{borderColor:app.color, borderWidth:2,bg: app.fontColor, _text: {color: app.color,fontFamily: 'Poligon_Bold'}}}
                                _pressed={{borderColor:app.secondaryColor, borderWidth:0,bg: app.secondaryColor, _text: {color: app.color}}}
                                isLoading={loading}
                                style={{marginBottom: 20, width: '100%'}}
                                onPress={() => {
                                    saveActionClick()
                                    setValue(question.tipo === '4desc' ? 4 : 0)
                                }}>Nunca</Button>
                    </VStack> : null
            }
        </Box>
    )
}

const mapState = (state) => {
    return {
        app: state.app,
        productsDuck: state.productsDuck,
        countResponse:state.countResponse
    }
}

export default connect(mapState,{saveCountAction})(QuestionComponent);
