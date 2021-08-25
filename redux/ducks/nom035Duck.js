const initialData = {
    respuestaNom035: [],
    respuesta:{
        empresa:'9a4be0d5-367b-4a79-9111-2f724e9c582d',
        idPeriodo:456,
        idParticipante:34,
        respuestas:[],
        respuestasSociodemograficos:[],
        respuestasOpinion:[]
    }
}

const INIT_RESPONSES = 'INIT_RESPONSES';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';
const ERROR_SERVER = 'ERROR_SERVER';

const nom035Duck = (state = initialData, action) => {
    switch (action.type) {
        case INIT_RESPONSES:
            return {...state, respuestaNom035:action.payload.respuestas,
                respuesta:{empresa: action.payload.empresa,
                    idPeriodo:action.payload.idPeriodo,
                    idParticipante:action.payload.idParticipante,
                    respuestas:action.payload.respuestas,
                    respuestasSociodemograficos:[],
                    respuestasOpinion:[]
                    }}
        default:
            return state
    }
}

export let initResponseNom035 = (cuestionarios,empresa,idPeriodo,idParticipante) => {
    let respuestas = [] // es  la configuracion del assessment que puede ser [1,2] , [2], [3], etc

    cuestionarios.map((cuestionario,i)=>{
        respuestas.push({
            cuestionario:i+1,
            respuestas:cuestionario.preguntas.map((e)=> 0).join('')
        })
    })

    // lo anterior nos debería devolver algo como lo siguiente pero con puros 0 //

    /*
        *
        * "respuestas": [{
            "cuestionario": 1,
            "respuestas": "000000000000000000000"
        }, {
            "cuestionario": 2,
            "respuestas": "01234012340123401234012340123401234012340123401234012340123401234012340123"
        }],

    */

    let data ={
        respuestas:respuestas,
        empresa:empresa,
        idPeriodo:idPeriodo,
        idParticipante:idParticipante
    }

    return async (dispatch, getState) => {
        dispatch({type: INIT_RESPONSES, payload:data});
    };
}


export let responseQuestion=(cuestionario=1,indexResponse=0,value)=>{ // value es el que se pondría en esa posicion, y cuestionario debería ser la posicion
    return async (dispatch, getState) => {
        let nom035response = getState().nom035.respuestaNom035
        let nom035Data = getState().nom035.respuesta

        let responses = getState().nom035.respuestaNom035[cuestionario-1].respuestas.split('')
        responses[indexResponse] = value;
        nom035response[cuestionario-1].respuestas = responses.join('')

        let data ={
            respuestas:nom035response,
            empresa:nom035Data.empresa,
            idPeriodo:nom035Data.idPeriodo,
            idParticipante:nom035Data.idParticipante
        }
        return async (dispatch, getState) => {
            dispatch({type: INIT_RESPONSES, payload:data});
        };
    };
}

export let getResponse=()=>{
    return async (dispatch, getState)=>{
        let nom035response = getState().nom035


    }

}


export default nom035Duck;
