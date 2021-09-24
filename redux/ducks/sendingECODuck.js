import axios from "axios";
import _ from 'lodash';
import {storeData, retrieveData, asyncForEach} from "../../helpers/storage";
import khorConfig from '../../screens/nom035/estructura/initial_config.json';
import base64 from 'react-native-base64';

const initialData = {
    respuestasEco: [],
    erroresEco: [],
    estadoEco: 0, /* detenido 0, enviando 1, completado 2 */
    fetchingEco: false, 
    runningEco: false, 
    logErroresEco: [],
    logExitososEco: [],
}

const LOAD_RESPONSES_ECO = 'LOAD_RESPONSES_ECO';
const UPDATE_RESPONSES_ECO = 'UPDATE_RESPONSES_ECO';
const UPDATE_RESPONSES_ECO_ERROR = 'UPDATE_RESPONSES_ECO_ERROR';
const DELETE_RESPONSES_ERROR_ECO = 'DELETE_RESPONSES_ERROR_ECO';
const PROCESS_FETCHING_ECO = 'PROCESS_FETCHING_ECO';
const PROCESS_STATE_ECO = 'PROCESS_STATE_ECO';
const PROCESS_RUNNING_ECO = 'PROCESS_RUNNING_ECO';
const PROCESS_CLEAR_ECO = 'PROCESS_CLEAR_ECO';
const UPDATE_LOG_SUCCESS_ECO = 'UPDATE_LOG_SUCCESS_ECO';
const UPDATE_LOG_ERRORS_ECO = 'UPDATE_LOG_ERRORS_ECO';
const CLEAR_LOG_ECO = 'CLEAR_LOG_ECO';

const sendingECODuck = (state = initialData, action) => {
    switch (action.type) {
        case LOAD_RESPONSES_ECO:
            return {...state, respuestasEco:action.payload, fetchingEco:false}
        case UPDATE_RESPONSES_ECO:
            return {...state, respuestasEco: state.respuestasEco.map( e => ( e.id === action.payload.id ) ? action.payload : e )}
        case UPDATE_RESPONSES_ECO_ERROR:
            return {...state, erroresEco: [...state.erroresEco, action.payload]}
        case DELETE_RESPONSES_ERROR_ECO:
            return {...state, erroresEco: []}
        case PROCESS_FETCHING_ECO:
            return {...state, fetchingEco:action.payload}
        case PROCESS_STATE_ECO:
            return {...state, estadoEco:action.payload}
        case PROCESS_RUNNING_ECO:
            return {...state, runningEco:action.payload}
        case PROCESS_CLEAR_ECO:
            return {...state, erroresEco: [], estadoEco: 0, runningEco: false}
        case CLEAR_LOG_ECO:
            return {...state, logErroresEco: [], logExitososEco: []}
        case UPDATE_LOG_ERRORS_ECO:
            return {...state, logErroresEco: [...state.logErroresEco, action.payload]}
        case UPDATE_LOG_SUCCESS_ECO:
            return {...state, logExitososEco: [...state.logExitososEco, action.payload]}
        default:
            return state
    }
}



const token = base64.encode(khorConfig.clave_eco);
// const options = { }

/* ACTIONS */
export const getEcoResponsesAction = () => {
    return async (dispatch, getState) => {
        dispatch({type: PROCESS_FETCHING_ECO, payload: true})
        try {
            let getResponses = await retrieveData("savedECOResponses");
            if (getResponses?.length > 0){
                let newResponses = _.filter(getResponses, ['send', false]);
                newResponses && dispatch({type: LOAD_RESPONSES_ECO, payload: newResponses});
            } else {
                dispatch({type: PROCESS_FETCHING_ECO, payload: false})
            }
        } catch (error) {
            //Error
            dispatch({type: PROCESS_FETCHING_ECO, payload: false})
        }
    };
}

export const savedEcoResponsesAction = () => { 
    return async (dispatch, getState) => {
        try {
            let responses = getState().sendeco.respuestasEco;
            let newStorage = _.filter(responses, ['send', false]);
            newStorage && await storeData('savedECOResponses', newStorage);
            let newErrors = getState().sendeco.erroresEco;
            newErrors && await storeData('savedEcoErroresEco', newErrors);
        } catch (error) {
            console.log("SAVE_ERROR::", error);
        }
    }
}

/*CONTROLADOR*/
export const updateEcoResponsesAction = () => {
    return async (dispatch, getState) => {
        try {
            let existChanges = _.filter(getState().sendeco.respuestasEco, ['send', false]).length;
            if ( getState().sendeco.estadoEco === 0 && existChanges > 0) {
                //await dispatch({type: DELETE_RESPONSES_ERROR_ECO}); NOTA: descomentar esto, borrar true, actualizar responses en sendScreen para refrescar datos al cancelar.
                await dispatch(startProcess());
                await dispatch({type: PROCESS_RUNNING_ECO, payload: true})
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

/*PROCESO*/
export const initProcess = () => async(dispatch, getState) => {
    try {
        let responses = await getState().sendeco.respuestasEco;
        let ecoApi = await getState().sending.ecourl; 
        await asyncForEach(responses, async(item, index, array) => {
            if (getState().sendeco.estadoEco !== 0){ 
                if (!item.send){
                    index === 0 &&  waitFor(100);
                    await axios.post(ecoApi, [item]).then(async(response) => {
                        // console.log("response:::",response.data)
                        response.data[0].estado === "Éxito" ? await dispatch(updateResponse(item)) : await dispatch(deleteResponse(item, response.data[0]));
                        await getState().sendeco.estadoEco === 0 && await waitFor(100);
                    }).catch( error => {
                        console.log("ERROR::",error,JSON.stringify(error))
                        dispatch(deleteResponse(item, index, {error}));
                        getState().sendeco.estadoEco === 0 &&  waitFor(100);
                    });
                    dispatch(savedEcoResponsesAction());
                    array.length === index + 1 && dispatch(completeProcess());
                }
            } else {
                dispatch({type: PROCESS_FETCHING_ECO, payload: true})
                console.log("Envio cancelado...")
            }
        });
        dispatch({type: PROCESS_RUNNING_ECO, payload: false});
        dispatch({type: PROCESS_FETCHING_ECO, payload: false});
    } catch (error) {
        dispatch({type: PROCESS_FETCHING_ECO, payload: false});
    }
}

export const updateResponse = (respuesta) => {
    return async (dispatch, getState) => {
        try {
            respuesta.send = true;
           /// console.log("RESPUESTA UPDATE", respuesta);
            await dispatch({type: UPDATE_RESPONSES_ECO, payload:respuesta});
            await dispatch({type: UPDATE_LOG_SUCCESS_ECO, payload:respuesta});
        } catch (error) {
            //Error
        }
    };
}

export const deleteResponse = (respuesta, error) => {
    return async (dispatch, getState) => {
        try {
            respuesta.send = true;
            //console.log("RESPUESTA DELETE", respuesta);
            await dispatch({ type: UPDATE_RESPONSES_ECO, payload:respuesta});
            let objError = {respuesta, error}
            await dispatch({ type: UPDATE_RESPONSES_ECO_ERROR, payload: objError});
            await dispatch({ type: UPDATE_LOG_ERRORS_ECO, payload: objError});
        } catch (error) {
            //Error        
        }
    };
}

export const clearEcoProcess = () => {
    return ({
        type: PROCESS_CLEAR_ECO,
    })
}

export const startProcess = () => {
    return ({
        type: PROCESS_STATE_ECO,
        payload: 1
    })
}

export const stopProcess = () => {
    return ({
        type: PROCESS_STATE_ECO,
        payload: 0
    })
}

export const completeProcess = () => {
    return ({
        type: PROCESS_STATE_ECO,
        payload: 2
    })
}

export const clearLogECO = () => {
    return ({
        type: CLEAR_LOG_ECO,
    })
}

export default sendingECODuck;