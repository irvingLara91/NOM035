import nom_config from '../../screens/nom035/estructura/initial_config.json';
import { retrieveData } from "../../helpers/storage";
import { Image } from 'react-native';

// constants
const initialData = {
    fetching: true,
    error_msg: '',
    color:'#1A1B38',
    colorHover:'rgba(26,27,56,0.61)',
    secondaryColor:'#FBB920',
    secondaryColorHover:'rgba(248,197,79,0.62)',
    fontColor:'#ffffff',
    logo: '',
    url_base:'',
    url_term:'',
    name: '',
    users: null,
    user_admin: '',
}

const LOAD_APP_DATA = 'LOAD_APP_DATA'
const LOAD_APP_DATA_SUCCESS = 'LOAD_APP_DATA_SUCCESS'
const LOAD_APP_DATA_ERROR = 'LOAD_APP_DATA_ERROR'
const UPDATE_USERS = 'UPDATE_USERS'
const UPDATE_USER_ADMIN = 'UPDATE_USER_ADMIN'

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
        case UPDATE_USERS:
            return {...state, users:action.payload}
        case UPDATE_USER_ADMIN:
            return {...state, user_admin:action.payload}
        default:
            return state
    }
}
export default appReducer;

export const getUsersAction = () => {
    return async (dispatch, getState) => {
        try {
            let getUsers = await retrieveData("userslist");
            if ( getUsers?.length > 0 ){
                dispatch({type: UPDATE_USERS, payload: getUsers});
            } else {
                dispatch({type: UPDATE_USERS, payload: nom_config.users});
            }
        } catch (error) {
            console.log("ERROR::", error);
        }
    };
}

export const saveUsersAction = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: UPDATE_USERS, payload: data});
        } catch (error) {
            //Error
        }
    }
}

export const saveUserAdminAction = (admin) => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: UPDATE_USER_ADMIN, payload: admin});
        } catch (error) {
            //Error
        }
    }
}


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
