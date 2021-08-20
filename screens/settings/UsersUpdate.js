import React, { useState, useEffect } from "react";
import { Alert, StyleSheet } from 'react-native';
import {Box, Button, Heading, Center, FlatList, Text, View, ScrollView } from "native-base";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import XLSX from 'xlsx';
import _ from 'lodash';
import MainLayout from "../../layouts/MainLayout";
import { storeData, retrieveData } from "../../helpers/storage";

const UsersUpdate = () => {

    const [datatable, setDatatable] = useState(null);

    const getUsers = async () =>{
        let users = await retrieveData("users");
        if ( users && users.length > 0  ) {
            setDatatable(users);
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
            await saveUsers( usersdata ) ? ( Alert.alert("Carga exitosa") ): Alert.alert("Error en la carga del archivo");
            getUsers();
        } catch (error){
            console.log(error)
        }
    }

    const saveUsers = async( data ) => {
        try {
            await Promise.all( data.map( validateUsers ) ).then( repeated => {
                if ( datatable && datatable.length > 0 ){
                    let tempArray = _.difference(datatable, repeated);
                    let newArray = _.orderBy([...tempArray, ...data], ['idParticipante'], ['asc']);
                    storeData("users", newArray );
                } else {
                    let newArray = _.orderBy(data, ['idParticipante'], ['asc']);
                    storeData("users", newArray );
                }
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    const validateUsers = ( users ) => {
        return new Promise( ( resolve, reject ) => {
            if( users.hasOwnProperty('idParticipante') && users.hasOwnProperty('username') && users.hasOwnProperty('password') ) {
                if ( datatable && datatable.length > 0 ){
                    let userExist = _.find( datatable, {'idParticipante': users.idParticipante} )
                    userExist ? resolve(userExist) : resolve();
                } else {
                    resolve();
                }
            } else {
                reject(false);
            }
        });
    }

    return (
        <MainLayout>
            <View style={ styles.container }>
                <Center py={ 8 }>
                    <Box>
                        <Heading style={{ color:'black' }} size="lg" mb={3}>
                            Actualizar BD de usuarios
                        </Heading>
                    </Box>
                    <Button size={'lg'} style={{marginTop:20}} onPress={() => pickDocument()}>Cargar archivo .xlsx</Button>
                </Center>
                { 
                datatable && datatable.length > 0 ?
                <ScrollView flex={1}>
                    <Text style={styles.titleHeaderTable}> Número de personas: {datatable.length} </Text>
                    <View style={ styles.headerTable }>
                        <View style={ styles.item1Table }>
                            <Text fontSize={18} textAlign="center" fontWeight="bold">id</Text>
                        </View>
                        <View style={ styles.item2Table }>
                            <Text fontSize={18} textAlign="center" fontWeight="bold">Nombre</Text>
                        </View>
                        <View style={ styles.item3Table }>
                            <Text fontSize={18} textAlign="center" fontWeight="bold">username</Text>
                        </View>
                    </View>
                    <FlatList
                        data={datatable}
                        renderItem={({ item }) => (
                            <View style={ styles.itemsTable }>
                                <View style={ styles.item1Table }>
                                    <Text fontSize={18} textAlign="center">{item.idParticipante}</Text>
                                </View>
                                <View style={ styles.item2Table }>
                                    <Text fontSize={18} textAlign="center">{item.nombre}</Text>
                                </View>
                                <View style={ styles.item3Table }>
                                    <Text fontSize={18} textAlign="center">{item.username}</Text>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => item.idParticipante.toString() }
                    />
                </ScrollView> : <Text py={40} fontSize={22} textAlign="center">No existen usuarios</Text>
                }
            </View>
        </MainLayout>
    )

}

const styles = StyleSheet.create({
    container: { 
        width: '100%',
        height: '98%',
        display: 'flex',
        flexDirection: 'column',
    }, 
    titleHeaderTable:{
        fontSize: 18,
        fontWeight: "bold",
        textAlign:'center',
        paddingVertical: 4,
        borderColor: '#707070', 
        borderWidth: 1, 
        backgroundColor: '#add3ec'
    },
    headerTable: {
        display: 'flex', 
        flexDirection: 'row', 
        borderBottomColor: '#707070', 
        borderBottomWidth: 1, 
        borderLeftWidth: 1, 
        borderRightWidth: 1, 
        backgroundColor: '#bfdff5'
    },
    itemsTable: { 
        display: 'flex', 
        flexDirection: 'row', 
        borderBottomColor: '#707070', 
        borderBottomWidth: 1,
        borderLeftWidth: 1, 
        borderRightWidth: 1, 
        backgroundColor: '#e0ebf3'
    },
    item1Table: { 
        width: '20%', 
        paddingHorizontal: 8, 
        borderRightWidth: 1, 
        borderColor: '#707070'
    },
    item2Table: { 
        width: '40%', 
        paddingHorizontal: 8, 
        borderRightWidth: 1, 
        borderColor: '#707070'
    },
    item3Table: { 
        width: '40%', 
        paddingHorizontal: 8, 
    },
    
})



export default UsersUpdate;
