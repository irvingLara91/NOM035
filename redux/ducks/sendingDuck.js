import axios from "axios";
import _ from 'lodash';
import {storeData, retrieveData, asyncForEach, joinURL } from "../../helpers/storage";

const initialData = {
    respuestas: [],
    errores: [],
    estado: 0, /* detenido 0, enviando 1, completado 2 */
    fetching: false, 
    url: null,
}

const LOAD_URL = 'LOAD_URL';
const UPDATE_RESPONSES = 'UPDATE_RESPONSES';
const SAVE_RESPONSES_INIT = 'SAVE_RESPONSES_INIT';
const SAVE_RESPONSES_END = 'SAVE_RESPONSES_END';
const CREATE_RESPONSES_ERROR = 'CREATE_RESPONSES_ERROR';
const PROCESS_STATE = 'PROCESS_STATE';

const sendingDuck = (state = initialData, action) => {
    switch (action.type) {
        case UPDATE_RESPONSES:
            return {...state, respuestas: action.payload, fetching: false}
        case LOAD_URL:
            return {...state, url: action.payload}
        case SAVE_RESPONSES_INIT:
            return {...state, fetching: true}
        case SAVE_RESPONSES_END:
            return {...state, fetching: false}
        case CREATE_RESPONSES_ERROR:
            return {...state, errores: [ ...state.errores, action.payload ]}
        case PROCESS_STATE:
            return {...state, estado: action.payload}
        default:
            return state
    }
}

/* ACTIONS */
export const getResponsesAction = () => {
    return async (dispatch, getState) => {
        dispatch({type: SAVE_RESPONSES_INIT})
        try {
            let getResponses = await retrieveData("savedResponses");
            getResponses && dispatch({type: UPDATE_RESPONSES, payload: getResponses});
        } catch (error) {
            //Error
            dispatch({type: SAVE_RESPONSES_END})
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
            console.log("NEWSTORAGE::", newStorage.length);
            //Guardarlas en el AsyncStorage.
            //newStorage?.length && await storeData('savedResponses', newStorage);
        } catch (error) {
            console.log(error);
        }
    }
}

/**/
export const updateResponsesAction = (current) => {
    return async (dispatch, getState) => {
        let existChanges = _.filter(getState().sending.respuestas, ['send', false]).length;
        try {
            current === 0 && existChanges > 0 && dispatch(startProcess()) && dispatch(initProcess());
            current === 1 && dispatch(stopProcess());
            current === 2 && dispatch(stopProcess()); 
        } catch (error) {
            //Error
        }
    };
}

/*EVENT*/
const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

export const initProcess = () => {
    return async(dispatch, getState) => {
        try {
            let responses = getState().sending.respuestas;
            let currentState = getState().sending.estado;
            let urlApi = await joinURL(getState().sending.url, 'nom035'); 
            console.log(urlApi);
            await asyncForEach(responses, async (item, index, array) => {
                await waitFor(50);
                if ( !item.send ){ 
                    console.log(index);
                    /*
                    Cancelar evento
                    Pushear los mensajes de error errores :D 
                    */
                    if (true){
                        await dispatch(updateResponse(index)); 
                    } else {
                        await dispatch(deleteResponse(item, index));
                    }
                    // axios.post(urlKhor, responses).then( response => {
                    //     console.log(response);
                    // }).catch( error => {
                    //     console.log(error);
                    // });
                    array.length == index + 1 && dispatch(completeProcess()); 
                } else {
                    await dispatch(deleteResponse(item, index));  
                }
                dispatch(savedResponsesAction());
            });
            dispatch(savedResponsesAction());
            console.log("done");
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateResponse = (index) => {
    return async (dispatch, getState) => {
        let respuestas= getState().sending.respuestas;
        respuestas[index].send = true;
        dispatch({ type: UPDATE_RESPONSES, payload:respuestas });
    };
}

export const deleteResponse = (item, index) => {
    return async (dispatch, getState) => {
        try {
            let respuestas= getState().sending.respuestas;
            respuestas[index].send = true;
            dispatch({ type: UPDATE_RESPONSES, payload:respuestas });
            dispatch({ type: CREATE_RESPONSES_ERROR, payload:item });
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