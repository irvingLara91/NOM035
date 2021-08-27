import React, { useState, useEffect } from "react";
import {Alert, StyleSheet, Text, View} from 'react-native';
import {Box, Button, Heading, Center, FlatList, ScrollView } from "native-base";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import XLSX from 'xlsx';
import _ from 'lodash';
import MainLayout from "../../layouts/MainLayout";
import { storeData, retrieveData } from "../../helpers/storage";
import {textSizeRender} from "../../utils/utils";
import {connect} from "react-redux";
import {store} from "../../redux/store";

const UsersUpdate = ({app}) => {

    const [datatable, setDatatable] = useState(null);

    const getUsers = async () =>{
        let users = await retrieveData("userslist");
        if ( users && users.length > 0  ) {
            setDatatable(users);
        } 
    }

    useEffect(()=>{
        getUsers();
    },[]);

    const pickDocument = async () => {
        try {
            const tempPath = await DocumentPicker.getDocumentAsync({ type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', copyToCacheDirectory: false });
            const filename = new Date().getTime() + '.xlsx';
            const newPath = FileSystem.documentDirectory + filename;
            await FileSystem.copyAsync({ from: tempPath.uri, to: newPath });
            const b64 = await FileSystem.readAsStringAsync( newPath, {encoding: FileSystem.EncodingType.Base64} );
            const wb = await XLSX.read( b64 , {type:'base64'});
            const wsName = wb.SheetNames[0];
            const ws = await wb.Sheets[wsName];
            let usersData = XLSX.utils.sheet_to_json(ws, {header:'1', blankrows: false});
            await saveUsers( usersData ) ? Alert.alert("Carga exitosa") : Alert.alert("Error en la carga del archivo");
            await getUsers();
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
                    storeData("userslist", newArray );
                } else {
                    let newArray = _.orderBy(data, ['idParticipante'], ['asc']);
                    storeData("userslist", newArray );
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
                        <Text style={{fontFamily:'Poligon_Bold',marginBottom:0, color:app.color,fontSize:textSizeRender(5), textAlign:'center' }} size="lg" mb={3}>
                            Actualizar BD de usuarios
                        </Text>
                    <Button size={'lg'}
                            _light={{
                                bg: app.color, _text: {
                                    color: app.fontColor, fontSize: textSizeRender(3.5),
                                    fontFamily: 'Poligon_Bold'
                                }
                            }}
                            _pressed={{bg: app.colorHover, _text: {color: app.fontColor}}}
                            style={{flex:1,borderRadius: 12}}
                            style={{marginTop:20}} onPress={() => pickDocument()}>Cargar archivo .xlsx</Button>
                </Center>
                {
                datatable && datatable.length > 0 ?
                <ScrollView flex={1} paddingRight={5} paddingLeft={5}>
                    <Text style={styles.titleHeaderTable}> Número de personas: {datatable.length} </Text>
                    <View style={ styles.headerTable }>
                        <View style={ styles.item1Table }>
                            <Text style={{textAlign:'center',color:app.color, fontSize:textSizeRender(4),fontFamily:'Poligon_Bold'}}>id</Text>
                        </View>
                        <View style={ styles.item2Table }>
                            <Text style={{textAlign:'center',color:app.color, fontSize:textSizeRender(4),fontFamily:'Poligon_Bold'}}>Nombre</Text>
                        </View>
                        <View style={ styles.item3Table }>
                            <Text style={{textAlign:'center',color:app.color, fontSize:textSizeRender(4),fontFamily:'Poligon_Bold'}}>username</Text>
                        </View>
                    </View>
                    <FlatList
                        data={datatable}
                        renderItem={({ item }) => (
                            <View style={ styles.itemsTable }>
                                <View style={ styles.item1Table }>
                                    <Text style={{textAlign:'center',color:app.color, fontSize:textSizeRender(4),fontFamily:'Poligon_Regular'}}>{item.idParticipante}</Text>
                                </View>
                                <View style={ styles.item2Table }>
                                    <Text style={{textAlign:'center',color:app.color, fontSize:textSizeRender(4),fontFamily:'Poligon_Regular'}}>{item.nombre}</Text>
                                </View>
                                <View style={ styles.item3Table }>
                                    <Text style={{textAlign:'center',color:app.color, fontSize:textSizeRender(4),fontFamily:'Poligon_Regular'}}>{item.username}</Text>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => item.idParticipante.toString() }
                    />
                </ScrollView> :
                    <View style={{
                        width: '80%',
                        height:'60%',
                        alignSelf:'center',
                        justifyContent:'center',
                        display: 'flex',
                        borderRadius: 10,
                        borderColor:app.color,
                        borderWidth:2,
                        backgroundColor: 'white'}}>

                    <Text style={{textAlign:'center',color:app.color, fontSize:textSizeRender(5),fontFamily:'Poligon_Regular'}}>No existen usuarios</Text>
                    </View>
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
        fontSize: textSizeRender(5),
        fontFamily: 'Poligon_Regular',
        textAlign:'center',
        paddingVertical: 4,
        borderColor: store.getState().app.color,
        borderWidth: 2,
        backgroundColor: store.getState().app.fontColor
    },
    headerTable: {
        display: 'flex', 
        flexDirection: 'row', 
        borderBottomColor: store.getState().app.color,
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        backgroundColor: store.getState().app.fontColor
    },
    itemsTable: { 
        display: 'flex', 
        flexDirection: 'row', 
        borderBottomColor: store.getState().app.color,
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        backgroundColor:store.getState().app.fontColor
    },
    item1Table: { 
        width: '20%',
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRightWidth: 2,
        borderColor: store.getState().app.color
    },
    item2Table: { 
        width: '40%',
        paddingVertical: 8,
        paddingHorizontal: 8, 
        borderRightWidth: 2,
        borderColor: store.getState().app.color
    },
    item3Table: {
        paddingVertical: 8,
        width: '40%', 
        paddingHorizontal: 8, 
    },
    
})

const mapState = (state) => {
    return {
        app: state.app,
        productsDuck: state.productsDuck,
        savedResponses: state.savedResponses
    }
}

export default connect(mapState)(UsersUpdate);
