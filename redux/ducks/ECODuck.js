
const initialData = {
    IdEncuesta: 1003,
    Fecha: new Date(),
    Demograficos: [
        {"Id": 1003, "valor": "Cadena dato sociodemográfico 1"},
        {"Id": 1004, "valor": "Cadena dato sociodemográfico 2"},
        {"Id": 1006, "valor": "Cadena dato sociodemográfico 3"}
    ],
    Respuestas: [
        {"Id": 1, "valor": 1},
        {"Id": 12, "valor": 2},
        {"Id": 29, "valor": 4},
        {"Id": 5, "valor": 30}
    ],
    Ranking: [
        {"Id": 14, "valor": 1},
        {"Id": 11, "valor": 2},
        {"Id": 10, "valor": 3},
        {"Id": 7, "valor": 4},
        {"Id": 20, "valor": 5}
    ],
    PreguntasAbiertas: [
        {"Id": 2, "valor": "Lorem ipsum"},
        {"Id": 3, "valor": "Lorem ipsum"}
    ]
}

const INIT_RESPONSES = 'INIT_RESPONSES';

const ID_SAVE = 'ID_SAVE';
const SOCIODEMOGRAFICO_SAVE = 'SOCIODEMOGRAFICO_SAVE';
const SOCIODEMOGRAFICO_SAVE_2 = 'SOCIODEMOGRAFICO_SAVE_2';

const REAGENTS_SAVE = 'REAGENTS_SAVE';
const RANKING_SAVE = 'RANKING_SAVE';
const OPEN_QUESTIONS_SAVE = 'OPEN_QUESTIONS_SAVE';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';
const ERROR_SERVER = 'ERROR_SERVER';


const ECODuck = (state = initialData, action) => {
    switch (action.type) {
        case INIT_RESPONSES:
            return {...state}
        case ID_SAVE:
            return {...state,IdEncuesta:action.payload}
        case SOCIODEMOGRAFICO_SAVE:
            return {...state,Demograficos:action.payload}
        case SOCIODEMOGRAFICO_SAVE_2:
            let new_Array = state.Demograficos.concat(action.payload)
            return {...state,Demograficos:new_Array}
        case REAGENTS_SAVE:
            return {...state,Respuestas:action.payload}
        case RANKING_SAVE:
            return {...state,Ranking:action.payload}
        case OPEN_QUESTIONS_SAVE:
            return {...state,PreguntasAbiertas:action.payload}
        default:
            return state
    }
}

export let initResponseECO = (IdEncuesta,Fecha,Demograficos,PreguntasAbiertas) => {

}
export let save_id=(id)=>{ // value es el que se pondría en esa posicion, y cuestionario debería ser la posicion
    return async (dispatch, getState) => {
        dispatch({type: ID_SAVE, payload:id});
    };
}
export let saveECODEMOGRAFICOS=(responses)=>{ // value es el que se pondría en esa posicion, y cuestionario debería ser la posicion
    return async (dispatch, getState) => {
        dispatch({type: SOCIODEMOGRAFICO_SAVE, payload:responses});
    };
}
export let saveECODEMOGRAFICOS2=(responses)=>{ // value es el que se pondría en esa posicion, y cuestionario debería ser la posicion
    return async (dispatch, getState) => {
        dispatch({type: SOCIODEMOGRAFICO_SAVE_2, payload:responses});
    };
}
export let saveReagents=(responses)=>{ // value es el que se pondría en esa posicion, y cuestionario debería ser la posicion
    return async (dispatch, getState) => {
        dispatch({type: REAGENTS_SAVE, payload:responses});
    };
}

export let saveRanking=(responses)=>{ // value es el que se pondría en esa posicion, y cuestionario debería ser la posicion
    return async (dispatch, getState) => {
        dispatch({type: RANKING_SAVE, payload:responses});
    };
}

export let saveOpenQuestions=(responses)=>{ // value es el que se pondría en esa posicion, y cuestionario debería ser la posicion
    return async (dispatch, getState) => {
        dispatch({type: OPEN_QUESTIONS_SAVE, payload:responses});
    };
}

export default ECODuck;
