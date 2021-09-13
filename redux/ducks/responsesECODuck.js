import {retrieveData, storeData} from "../../helpers/storage";


const initialData = {
    fetching:false,
    saved_responses:null
}

const LOAD_RESPONSES = 'LOAD_RESPONSES'
const LOAD_RESPONSES_SUCCESS = 'LOAD_RESPONSES_SUCCESS'
const LOAD_RESPONSES_ERROR = 'LOAD_RESPONSES_ERROR'

// reducer
const responseECOReducer = (state = initialData, action) => {
    switch(action.type){
        case LOAD_RESPONSES:
            return {...state, fetching: true}
        case LOAD_RESPONSES_SUCCESS:
            let newState = {...state, saved_responses: action.payload, fetching: false}
            return newState
        case LOAD_RESPONSES_ERROR:
            return {...state, fetching: false}
        default:
            return state
    }
}
export default responseECOReducer;

/***
 *ACTION AUX
 * ***/

//funcion action para recuperar las  respuestas del AsyncStorage
export let getSavedECOResponsesAction = () => async dispatch => {
    try {
        let savedResponses = await retrieveData("savedECOResponses");
        if (savedResponses) {
            dispatch({
                type: LOAD_RESPONSES_SUCCESS,
                payload: savedResponses
            })
        }
    } catch (error) {
        // Error saving data
    }
}


/**** actions ****/
export const savedECOResponsesAction = (data) => async (dispatch, getState) => {
    dispatch({type: LOAD_RESPONSES})
    try{
        let savedResponses = await retrieveData("savedECOResponses");
        if (savedResponses) {
            await  savedResponses.push(data)
            console.log('savedECOResponses',savedResponses)

            dispatch({
                type: LOAD_RESPONSES_SUCCESS,
                payload: savedResponses
            })
            await storeData('savedECOResponses',savedResponses)
        }else {
            let  response_= []
            await response_.push(data)
            console.log('response_',response_)
            dispatch({
                type: LOAD_RESPONSES_SUCCESS,
                payload: response_
            })
            await storeData('savedECOResponses',response_)
        }
    }catch(err){
        dispatch({type: LOAD_RESPONSES_ERROR, payload: err})
    }
}

