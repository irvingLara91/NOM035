import { Image } from 'react-native';
// constants
const initialData = {
    fetching: true,
    error_msg: '',
    color:'#1A1B38',
    colorHover:'rgba(26,27,56,0.79)',
    secondaryColor:'#FBB920',
    secondaryColorHover:'rgba(251,185,32,0.76)',
    fontColor:'#ffffff',
    logo: '',
    url_base:'',
    url_term:'',
    name: '',
}
const LOAD_APP_DATA = 'LOAD_APP_DATA'
const LOAD_APP_DATA_SUCCESS = 'LOAD_APP_DATA_SUCCESS'
const LOAD_APP_DATA_ERROR = 'LOAD_APP_DATA_ERROR'

// reducer
const appReducer = (state = initialData, action) => {
    switch(action.type){
        case LOAD_APP_DATA:
            return {...state, fetching: true, error_msg: ''}
        case LOAD_APP_DATA_SUCCESS:
            let newState = {...state, ...action.payload, fetching: false, error_msg: ''}
            return newState
        case LOAD_APP_DATA_ERROR:
            return {...state, error_msg: action.payload, fetching: false}
        default:
            return state
    }
}
export default appReducer;

// action
/*
export const getAppDataAction = () => async (dispatch, getState) => {
    dispatch({type: LOAD_APP_DATA})
    try{
        const data = await appApi.getAppData();
        const statusCode = data.data.m.code;
        if(statusCode === '203')
            dispatch({type: LOAD_APP_DATA_SUCCESS, payload: data.data.c.obj})
        else
            dispatch({type: LOAD_APP_DATA_ERROR, payload: 'Error de servidor'})
    }catch(err){
        dispatch({type: LOAD_APP_DATA_ERROR, payload: err})
    }
}*/
