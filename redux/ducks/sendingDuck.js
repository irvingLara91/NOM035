import axios from "axios";
import _ from 'lodash';
import {storeData, retrieveData} from "../../helpers/storage";

const initialData = {
    respuestas: [],
    errores: [],
    estado: 0, /* detenido 0, enviando 1, completado 2*/
    fetching: false, 
}

const LOAD_RESPONSES = 'LOAD_RESPONSES';
const SAVE_RESPONSES_INIT = 'SAVE_RESPONSES_INIT';
const SAVE_RESPONSES_END = 'SAVE_RESPONSES_END';
const CREATE_RESPONSES_ERROR = 'LOAD_RESPONSES_ERROR';
const PROCESS_STATE = 'PROCESS_STATE';

const sendingDuck = (state = initialData, action) => {
    switch (action.type) {
        case LOAD_RESPONSES:
            return {...state, respuestas: action.payload}
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
        try {
            let getResponses = await retrieveData("savedResponses");
            getResponses && dispatch({type: LOAD_RESPONSES, payload: getResponses});
        } catch (error) {
            //Error
        }
    };
}

export const savedResponsesAction = () => {
    return async (dispatch, getState) => {
        dispatch({type: SAVE_RESPONSES_INIT})
        try {
            let responses = getState().sending.respuestas;
            console.log("OLDSTORAGE::", responses);
            //Filtrar las que quedaron el false y guardarlas en el AsyncStorage (reemplaza arreglo)
            // console.log("NEWSTORAGE::", newStorage);
            //newStorage?.length && await storeData('savedResponses',savedResponses);
            dispatch({type: SAVE_RESPONSES_END});
        } catch (error) {
            dispatch({type: SAVE_RESPONSES_END});
            console.log(error);
        }
    }
}

export const updateResponsesAction = (current) => {
    return async (dispatch, getState) => {
        try {
            current === 0 && dispatch(startProcess()) && dispatch(initProcess());
            current === 1 && dispatch(stopProcess()) && dispatch(savedResponsesAction());
            current === 2 && dispatch(stopProcess()) && dispatch(savedResponsesAction()); 
        } catch (error) {
            //Error
        }
    };
}


/*EVENT*/
export const initProcess = () => {
    return async(dispatch, getState) => {
        try {
            let responses = getState().sending.respuestas;
            let currentState = getState().sending.estado;
            responses.map( (item, index) => {
                if ( !item.send && currentState === 1 ){
                    if (true){
                        setTimeout(() => {
                            dispatch(updateResponse(index)); //Cambia el send a true
                        }, 1000*index);
                    }else{
                        setTimeout(() => {
                            dispatch(deleteResponse(item, index));  //Cambia el send a true y cambia el objeto a errores
                        }, 1000*index);
                    }
                    // axios.post('/send', item).then( response => {
                    //     console.log(response);
                    // })
                    //   .catch( error => {
                    //     console.log(error);
                    // });
                }
            })
            dispatch(savedResponsesAction()) && dispatch(completeProcess()); 
        } catch (error) {
            console.log(error)
        }

    }
}

export const initProcess2 = () => {
    return async(dispatch, getState) => {
        try {
            let responses = getState().sending.respuestas;
            let currentState = getState().sending.estado;
            responses.map( (item, index) => {
                if ( !item.send && currentState === 1 ){
                    if (true){
                        setTimeout(() => {
                            dispatch(updateResponse(index)); //Cambia el send a true
                        }, 1000*index);
                    }else{
                        setTimeout(() => {
                            dispatch(deleteResponse(item, index));  //Cambia el send a true y cambia el objeto a errores
                        }, 1000*index);
                    }
                    // axios.post('/send', item).then( response => {
                    //     console.log(response);
                    // })
                    //   .catch( error => {
                    //     console.log(error);
                    // });
                }
            })
            dispatch(savedResponsesAction()) && dispatch(completeProcess()); 
        } catch (error) {
            console.log(error)
        }

    }
}

export const updateResponse = (index) => {
    return async (dispatch, getState) => {
        let respuestas= getState().sending.respuestas;
        respuestas[index].send = true;
        dispatch({ type: LOAD_RESPONSES, payload:respuestas });
    };
}

export const deleteResponse = (item, index) => {
    return async (dispatch, getState) => {
        try {
            let respuestas= getState().sending.respuestas;
            respuestas[index].send = true;
            dispatch({ type: LOAD_RESPONSES, payload:respuestas });
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