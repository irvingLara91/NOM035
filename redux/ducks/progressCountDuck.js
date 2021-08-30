import {retrieveData, storeData} from "../../helpers/storage";

const initialData = {
    fetching: true,
    count_responses:0
}

const LOAD_COUNT_DATA = 'LOAD_COUNT_DATA'
const LOAD_COUNT_SUCCESS = 'LOAD_COUNT_SUCCESS'
const LOAD_COUNT_ERROR = 'LOAD_COUNT_ERROR'

// reducer
const progressCountReducer = (state = initialData, action) => {
    switch(action.type){
        case LOAD_COUNT_DATA:
            return {...state, fetching: true}
        case LOAD_COUNT_SUCCESS:
            let newState = {...state, count_responses:action.payload, fetching: false}
            return newState
        case LOAD_COUNT_ERROR:
            return {...state, error_msg: action.payload, fetching: false}
        default:
            return state
    }
}
export default progressCountReducer;

// action

//funcion action para recuperar configuración del AsyncStorage
export let getCountAction = () => async dispatch => {
    try {
        let storeCount = await retrieveData("countResponse");
        if (storeCount) {
            dispatch({
                type: LOAD_COUNT_SUCCESS,
                payload: storeCount
            })
        }
    } catch (error) {
        // Error saving data
    }
}

export const saveCountAction = (count) => async (dispatch, getState) => {
    dispatch({type: LOAD_COUNT_DATA})
    try{
        dispatch({type: LOAD_COUNT_SUCCESS, payload:count})
        await storeData("countResponse",count);
    }catch(err){
        dispatch({type: LOAD_COUNT_ERROR, payload: err})
    }
}