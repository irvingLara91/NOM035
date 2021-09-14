import axios from "axios";
import _ from 'lodash';
import {storeData, retrieveData, removeData, asyncForEach} from "../../helpers/storage";
import khorConfig from '../../screens/nom035/estructura/initial_config.json';

const initialData = {
    respuestas: [],
    errores: [],
    estado: 0, /* detenido 0, enviando 1, completado 2 */
    fetching: false, 
    running: false, 
    nomurl: null,
    ecourl: null,
    logErrores: [],
    logExitosos: [],
}

const UPDATE_NOM_URL = 'UPDATE_NOM_URL';
const UPDATE_ECO_URL = 'UPDATE_ECO_URL';
const UPDATE_RESPONSES = 'UPDATE_RESPONSES';
const UPDATE_RESPONSES_ERROR = 'UPDATE_RESPONSES_ERROR';
const DELETE_RESPONSES_ERROR = 'DELETE_RESPONSES_ERROR';
const PROCESS_FETCHING = 'FETCHING';
const PROCESS_STATE = 'PROCESS_STATE';
const PROCESS_RUNNING = 'PROCESS_RUNNING';
const PROCESS_CLEAR = 'PROCESS_CLEAR';
const UPDATE_LOG_SUCCESS = 'UPDATE_LOG_SUCCESS';
const UPDATE_LOG_ERRORS = 'UPDATE_SUCCLOG_ERRORS';
const CLEAR_LOG = 'CLEAR_LOG';

const sendingDuck = (state = initialData, action) => {
    switch (action.type) {
        case UPDATE_NOM_URL:
            return {...state, nomurl:action.payload}
        case UPDATE_ECO_URL:
            return {...state, ecourl:action.payload}
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
        case CLEAR_LOG:
            return {...state, logErrores: [], logExitosos: []}
        case UPDATE_LOG_ERRORS:
            return {...state, logErrores: [...state.logErrores, action.payload]}
        case UPDATE_LOG_SUCCESS:
            return {...state, logExitosos: [...state.logExitosos, action.payload]}
        default:
            return state
    }
}

/* ACTIONS */
export const getUrlAction = () => {
    return async (dispatch, getState) => {
        try {
            let getNomConfig = await retrieveData("nomurl");
            getNomConfig?.length > 0 ? dispatch({type: UPDATE_NOM_URL, payload: getNomConfig}) : dispatch({type: UPDATE_NOM_URL, payload: khorConfig.nom_url});
            let getEcoConfig = await retrieveData("ecourl");
            getEcoConfig?.length > 0 ? dispatch({type: UPDATE_ECO_URL, payload: getEcoConfig}) : dispatch({type: UPDATE_ECO_URL, payload: khorConfig.eco_url});
        } catch (error) {
            //Error
        }
    };
}

export const saveNomUrlAction = (url) => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: UPDATE_NOM_URL, payload: url});
        } catch (error) {
            //Error
        }
    }
}

export const saveEcoUrlAction = (url) => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: UPDATE_ECO_URL, payload: url});
        } catch (error) {
            //Error
        }
    }
}

export const getResponsesAction = () => {
    return async (dispatch, getState) => {
        dispatch({type: PROCESS_FETCHING, payload: true})
        try {
            let getResponses = await retrieveData("savedResponses");
            if (getResponses?.length > 0){
                let newResponses = _.filter(getResponses, ['send', false]);
                newResponses && dispatch({type: UPDATE_RESPONSES, payload: newResponses});
            } else {
                dispatch({type: PROCESS_FETCHING, payload: false})
            }
        } catch (error) {
            //Error
            dispatch({type: PROCESS_FETCHING, payload: false})
        }
    };
}

export const savedResponsesAction = () => { 
    return async (dispatch, getState) => {
        try {
            let responses = getState().sending.respuestas;
            let newStorage = _.filter(responses, ['send', false]);
            newStorage && await storeData('savedResponses', newStorage);
            let newErrors = getState().sending.errores;
            newErrors && await storeData('savedErrores', newErrors);
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
                //await dispatch({type: DELETE_RESPONSES_ERROR}); NOTA: descomentar esto, borrar true, actualizar responses en sendScreen para refrescar datos al cancelar.
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

/*PROCESO*/
export const initProcess = () => async(dispatch, getState) => {
    try {
        let responses = await getState().sending.respuestas;
        let nomApi = await getState().sending.nomurl; 
        await asyncForEach(responses, async (item, index, array) => {
            if (getState().sending.estado !== 0){ 
                if (!item.send){
                    await index === 0 && await waitFor(100);
                    await axios.post(nomApi, [item]).then(async(response) => {
                        response.data[0].status === 0 ? await dispatch(updateResponse(item, index)) : await dispatch(deleteResponse(item, index, response.data[0]));
                        await getState().sending.estado === 0 && await waitFor(100);
                    }).catch(async (error) => {
                        await dispatch(deleteResponse(item, index, {error}));
                        await getState().sending.estado === 0 && await waitFor(100);
                    });
                    await dispatch(savedResponsesAction());
                    array.length == index + 1 && dispatch(completeProcess()); 
                }
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

export const updateResponse = (respuesta, index) => {
    return async (dispatch, getState) => {
        try {
            let respuestas= getState().sending.respuestas;
            respuestas[index].send = true;
            await dispatch({ type: UPDATE_RESPONSES, payload:respuestas});
            await dispatch({ type: UPDATE_LOG_SUCCESS, payload:respuesta });
        } catch (error) {
            //Error
        }
    };
}

export const deleteResponse = (respuesta, index, error) => {
    return async (dispatch, getState) => {
        try {
            let respuestas= getState().sending.respuestas;
            respuestas[index].send = true;
            await dispatch({ type: UPDATE_RESPONSES, payload:respuestas});
            
            let objError = {respuesta, error}
            await dispatch({ type: UPDATE_RESPONSES_ERROR, payload: objError});
            await dispatch({ type: UPDATE_LOG_ERRORS, payload: objError});
        } catch (error) {
            //Error        
        }
    };
}

export const clearProcess = () => {
    return ({
        type: PROCESS_CLEAR,
    })
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

export const clearLog = () => {
    return ({
        type: CLEAR_LOG,
    })
}

export default sendingDuck;