import React, {useEffect, useState} from "react";
import {Box,Select, Text,Input,Stack,  Button, Heading, Center, HStack, Flex, ScrollView, useToast} from "native-base";
import {connect} from "react-redux";
import MainLayout from "../../layouts/MainLayout";
import config from "../../config"
import _ from 'lodash'
import {retrieveData} from "../../helpers/storage"
import _nomv1 from '../nom035/estructura/nom035_ref1v2.json'
import _nomv2 from '../nom035/estructura/nom035_ref2.json'
import _nomv3 from '../nom035/estructura/nom035_ref3.json'
import AssessmentComponent from "../../components/AssessmentComponent";
import {View} from 'react-native'
import {initResponseNom035, responseQuestion} from "../../redux/ducks/nom035Duck";

const SociodemographicPage = ({navigation, initResponseNom035, nom035, responseQuestion}) => {




    return (
        <MainLayout>
            <ScrollView
                height={'100%'}
                style={{height:'100%'}}>
                <Flex direction={'column'}>

                    <View style={{padding:20}}>
                        <Text>Sexo</Text>
                        <Select
                            minWidth={200}
                            accessibilityLabel="Elige tu sexo"
                            placeholder="Elige una opción"
                            onValueChange={(itemValue) => console.log(itemValue)}
                        >
                            <Select.Item label="Hombre" value="Hombre" />
                            <Select.Item label="Mujer" value="Mujer" />
                        </Select>


                        <Text style={{marginTop:20}}>Edad</Text>
                        <Input
                            type={"number"}
                            keyboardType='number-pad'
                            placeholder=""
                        />

                        <Button size={'lg'}  colorScheme={'gray'} style={{marginTop:20}} onPress={()=> navigation.navigate('AssessmentNom035')}>Continuar</Button>

                    </View>



                </Flex>
            </ScrollView>
        </MainLayout>
    )
}

const mapState = (state) => {
    return {
        nom035: state.nom035
    }
}

export default connect(mapState,{
    initResponseNom035,
    responseQuestion
})(SociodemographicPage,);
