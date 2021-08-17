import React, { useState, useEffect } from "react";
import {Box, Button, Heading, Center, FlatList, Text, View, ScrollView } from "native-base";
import {connect} from "react-redux";
import MainLayout from "../../layouts/MainLayout";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import XLSX from 'xlsx';
import { Alert } from 'react-native';

import { storeData, retrieveData } from "../../helpers/storage"

const UsersUpdate = () => {

    const [datatable, setDatatable] = useState(null);

    const getUsers = async () =>{
        let users = await retrieveData("users");
        if ( users ) {
            console.log(users);
            setDatatable(users)
        }
    }

    useEffect(()=>{
        getUsers();
    },[]);
    
    const pickDocument = async () => {
        try {
            const temppath = await DocumentPicker.getDocumentAsync({ type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', copyToCacheDirectory: false });
            const filename = new Date().getTime() + '.xlsx';
            const newpath = await FileSystem.documentDirectory + filename;
            await FileSystem.copyAsync({ from: temppath.uri, to: newpath });
            const b64 = await FileSystem.readAsStringAsync( newpath, {encoding: FileSystem.EncodingType.Base64} );
            const wb = await XLSX.read( b64 , {type:'base64'});
            const wsname = await wb.SheetNames[0];
            const ws = await wb.Sheets[wsname];
            let usersdata = await XLSX.utils.sheet_to_json(ws, {header:"1", blankrows: false});
            await saveUsers( usersdata ) ? ( Alert.alert("Carga exitosa") ): Alert.alert("Error");
            getUsers();
        } catch (error){
            console.log(error)
        }
    }

    const saveUsers = async( data ) => {
        try {
            await Promise.all( data.map( validateUsers ) );
            storeData("users", data );
            return true;
        } catch (error) {
            console.log(error);
        }
    }

    const validateUsers = ( users ) => {
        return new Promise( ( resolve, reject ) => {
            if( users.hasOwnProperty('idParticipante') && users.hasOwnProperty('username') && users.hasOwnProperty('password') ) {
                resolve(true);
            } else {
                reject(false);
            }
        });
    }

    return (
        <MainLayout>
            <View>
                <Center>
                    <Box>
                        <Heading style={{color:'black', marginTop:'20%'}} size="lg" mb={3}>
                            Actualizar BD de usuarios
                        </Heading>
                    </Box>
                    <Button size={'lg'} style={{marginTop:20}} onPress={() => pickDocument()}>Cargar archivo .xlsx</Button>
                </Center>
                {
                    datatable ? 
                    datatable.lenght > 0 ?
                    <ScrollView style={{ maxHeight: '60%', marginTop:40, borderBottomColor: '#707070', borderWidth: 1, fontSize: 14 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', borderBottomColor: '#707070', borderWidth: 1, fontSize: 14 }}>
                            <View style={{ width: 60, paddingLeft: 10, paddingRight: 10, borderRightWidth: 1, borderColor: '#707070' }}>
                                <Text fontSize={22} textAlign="center">id</Text> 
                            </View>
                            <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                                <Text fontSize={22} textAlign="center">username</Text> 
                            </View>
                        </View>
                        <FlatList
                            data={datatable}
                            renderItem={({ item }) => (
                                <View style={{ display: 'flex', flexDirection: 'row', borderBottomColor: '#707070', borderWidth: 1, fontSize: 14 }}>
                                    <View style={{ width: 60, paddingLeft: 10, paddingRight: 10, borderRightWidth: 1, borderColor: '#707070' }}>
                                        <Text fontSize={18} textAlign="center">{item.idParticipante}</Text> 
                                    </View>
                                    <View style={{ color: "#000000", paddingLeft: 10, paddingRight: 10, }}>
                                        <Text fontSize={18} textAlign="center">{item.username}</Text> 
                                    </View>
                                </View>
                            )}
                            keyExtractor={(item) => item.idParticipante }
                            />
                    </ScrollView> : <Text py={40} pyfontSize={22} textAlign="center">No existen usuarios</Text>   
                    : <Text py={40} fontSize={22} textAlign="center">No existen usuarios</Text>
                    }
            </View>
        </MainLayout>
    )

}

export default UsersUpdate;
