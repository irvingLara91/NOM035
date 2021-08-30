import axios from "axios";
import _ from 'lodash';
import {storeData, retrieveData, asyncForEach, joinURL } from "../../helpers/storage";

const initialData = {
    respuestas: [],
    errores: [],
    estado: 0, /* detenido 0, enviando 1, completado 2 */
    fetching: false, 
    running: false, 
    url: null,
}

const LOAD_URL = 'LOAD_URL';
const UPDATE_RESPONSES = 'UPDATE_RESPONSES';
const UPDATE_RESPONSES_ERROR = 'UPDATE_RESPONSES_ERROR';
const DELETE_RESPONSES_ERROR = 'DELETE_RESPONSES_ERROR';
const PROCESS_FETCHING = 'FETCHING';
const PROCESS_STATE = 'PROCESS_STATE';
const PROCESS_RUNNING = 'PROCESS_RUNNING';
const PROCESS_CLEAR = 'PROCESS_CLEAR';

const sendingDuck = (state = initialData, action) => {
    switch (action.type) {
        case LOAD_URL:
            return {...state, url:action.payload}
        case UPDATE_RESPONSES:
            return {...state, respuestas:action.payload, fetching:false}
        case UPDATE_RESPONSES_ERROR:
            return {...state, errores: [...state.errores, action.payload]}
        case DELETE_RESPONSES_ERROR:
            return {...state, errores: []}
        case PROCESS_FETCHING:
            return {...state, fetching:action.payload}
        case PROCESS_STATE:
            return {...state, estado:action.payload}
        case PROCESS_RUNNING:
            return {...state, running:action.payload}
        case PROCESS_CLEAR:
            return {...state, errores: [], estado: 0, running: false}
        default:
            return state
    }
}

/* ACTIONS */
export const getResponsesAction = () => {
    return async (dispatch, getState) => {
        dispatch({type: PROCESS_FETCHING, payload: true})
        try {
            let getResponses = await retrieveData("savedResponses");
            getResponses && dispatch({type: UPDATE_RESPONSES, payload: getResponses});
        } catch (error) {
            //Error
            dispatch({type: PROCESS_FETCHING, payload: false})
        }
    };
}

export const getUrlAction = () => {
    return async (dispatch, getState) => {
        try {
            let getConfig = await retrieveData("khorurl");
            getConfig && dispatch({type: LOAD_URL, payload: getConfig});
        } catch (error) {
            //Error
        }
    };
}

export const savedResponsesAction = () => { 
    return async (dispatch, getState) => {
        try {
            let responses = getState().sending.respuestas;
            const newStorage = _.filter(responses, ['send', false]);
            //Guardarlas en el AsyncStorage.
            //newStorage?.length && await storeData('savedResponses', newStorage);
            console.log("saved");
        } catch (error) {
            console.log("SAVE_ERROR::", error);
        }
    }
}

/*CONTROLADOR*/
export const updateResponsesAction = () => {
    return async (dispatch, getState) => {
        try {
            let existChanges = _.filter(getState().sending.respuestas, ['send', false]).length;
            if ( getState().sending.estado === 0 && existChanges > 0) {
                await dispatch({type: DELETE_RESPONSES_ERROR});
                await dispatch(startProcess());
                await dispatch({type: PROCESS_RUNNING, payload: true})
                dispatch(initProcess());
            }else{
                dispatch(stopProcess());
            }
        } catch (error) {
            //Error
        }
    };
}

const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

/*
TAREAS POR HACER: 
Probar Axios :D 
Pushear los mensajes de error errores :D 
*/

/*PROCESO*/
export const initProcess = () => async(dispatch, getState) => {
    try {
        let responses = getState().sending.respuestas;
        let urlApi = await joinURL(getState().sending.url, 'nom035'); 
        await asyncForEach(responses, async (item, index, array) => {
            if (getState().sending.estado !== 0){ 
                if (!item.send){
                    await waitFor(500);
                    await axios.post(urlApi, responses).then(async(response) => {
                        console.log("AXIOS_RESPONSE::", response);
                        await dispatch(updateResponse(index)); 
                    }).catch(async (error) => {
                        console.log("AXIOS_ERROR::", error);
                        await dispatch(deleteResponse(item, index));
                    });
                    dispatch(savedResponsesAction());
                }
                array.length == index + 1 && dispatch(completeProcess()); 
            } else {
                dispatch({type: PROCESS_FETCHING, payload: true})
                console.log("Envio cancelado...")
            }
        });
        dispatch({type: PROCESS_RUNNING, payload: false});
        dispatch({type: PROCESS_FETCHING, payload: false});
    } catch (error) {
        dispatch({type: PROCESS_FETCHING, payload: false});
    }
}

export const updateResponse = (index) => {
    return async (dispatch, getState) => {
        try {
            let respuestas= getState().sending.respuestas;
            respuestas[index].send = true;
            await dispatch({ type: UPDATE_RESPONSES, payload:respuestas });
            console.log("update");
        } catch (error) {
            //Error
        }
    };
}

export const deleteResponse = (item, index) => {
    return async (dispatch, getState) => {
        try {
            let respuestas= getState().sending.respuestas;
            respuestas[index].send = true;
            await dispatch({ type: UPDATE_RESPONSES, payload:respuestas });
            await dispatch({ type: UPDATE_RESPONSES_ERROR, payload:item });
            console.log("error");
        } catch (error) {
            //Error        
        }
    };
}

export const startProcess = () => {
    return ({
        type: PROCESS_STATE,
        payload: 1
    })
}

export const stopProcess = () => {
    return ({
        type: PROCESS_STATE,
        payload: 0
    })
}

export const completeProcess = () => {
    return ({
        type: PROCESS_STATE,
        payload: 2
    })
}

export default sendingDuck;