import React, { useState } from "react";
import {Box, Text, Button, Heading, Center, Container, Flex} from "native-base";
import {connect} from "react-redux";
import MainLayout from "../../layouts/MainLayout";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import XLSX from 'xlsx';

const UsersUpdate = () => {

    const pickDocument = async () => {
        try {
            const temppath = await DocumentPicker.getDocumentAsync({copyToCacheDirectory: false});
            console.log('temppath')
            const filename = new Date().getTime() + '.xlsx';
            console.log('temppath')
            const newpath = await FileSystem.documentDirectory + filename;
            await FileSystem.copyAsync({ from: temppath.uri, to: newpath });
            const b64 = await FileSystem.readAsStringAsync( newpath, {encoding: FileSystem.EncodingType.Base64} );
            const wb = await XLSX.read( b64 , {type:'base64'});
            const wsname = await wb.SheetNames[0];
            const ws = await wb.Sheets[wsname];
            let data = await XLSX.utils.sheet_to_json(ws, {header:0});

            saveDocument({
                data:data
            });
        } catch (error){
            console.log(error)
        }
    }

    const saveDocument = async (datos) => {
        try {
          await AsyncStorage.setItem('users', JSON.stringify(datos));
          getStorage();
        } catch (error) {
          console.log(error);
        }
    }

    const getStorage = async () => {
        try {
            const storageFile = await AsyncStorage.getItem('users');
            console.log(storageFile)
        } catch (error) {
          console.log(error);
        }
    }

    return (
        <MainLayout>
            <Flex direction={'column'}>
                <Center>
                    <Box>
                        <Heading style={{color:'black', marginTop:'30%'}} size="lg" mb={3}>
                            Actualizar BD de usuarios
                        </Heading>
                    </Box>
                </Center>
                <Button size={'lg'} style={{marginTop:20}} onPress={() => pickDocument()}>Cargar archivo .xlsx</Button>
            </Flex>
        </MainLayout>
    )

}

export default UsersUpdate;
