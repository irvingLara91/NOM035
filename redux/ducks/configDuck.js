import {retrieveData} from "../../helpers/storage";

const initialData = {
   fetching:false,
   config:null
}

const LOAD_CONFIG = 'LOAD_CONFIG'
const LOAD_CONFIG_SUCCESS = 'LOAD_CONFIG_SUCCESS'
const LOAD_CONFIG_ERROR = 'LOAD_CONFIG_ERROR'

// reducer
const configReducer = (state = initialData, action) => {
   switch(action.type){
      case LOAD_CONFIG:
         return {...state, fetching: true}
      case LOAD_CONFIG_SUCCESS:
         let newState = {...state, config: action.payload, fetching: false}
         return newState
      case LOAD_CONFIG_ERROR:
         return {...state, fetching: false}
      default:
         return state
   }
}
export default configReducer;



/***
 *ACTION AUX
 * ***/

//funcion action para recuperar configuración del AsyncStorage
export let getConfigAction = () => async dispatch => {


   try {
      let storeConfig = await retrieveData("config");
      if (storeConfig) {
         dispatch({
            type: LOAD_CONFIG_SUCCESS,
            payload: storeConfig
         })
      }
   } catch (error) {
      // Error saving data
   }
}

/**** actions ****/
export const saveConfigAction = (config) => async (dispatch, getState) => {
    dispatch({type: LOAD_CONFIG})
    try{
       dispatch({type: LOAD_CONFIG_SUCCESS, payload: config})
    }catch(err){
        dispatch({type: LOAD_CONFIG_ERROR, payload: err})
    }
}




