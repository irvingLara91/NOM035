const initialData = {
    respuestaNom035: []
}

const INIT_RESPONSES = 'INIT_RESPONSES';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';
const ERROR_SERVER = 'ERROR_SERVER';

const nom035Duck = (state = initialData, action) => {
    switch (action.type) {
        case INIT_RESPONSES:
            return {...state, respuestaNom035:action.payload}
        default:
            return state
    }
}

export let initResponseNom035 = (cuestionarios) => {
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
    return async (dispatch, getState) => {
        dispatch({type: INIT_RESPONSES, payload:respuestas });
    };
}


export let responseQuestion=(cuestionario=0,indexResponse=0,value)=>{ // value es el que se pondría en esa posicion, y cuestionario debería ser la posicion
    return async (dispatch, getState) => {
        let nom035response = getState().nom035.respuestaNom035
        let responses = getState().nom035.respuestaNom035[cuestionario].respuestas.split('')
        responses[indexResponse] = value;
        nom035response[cuestionario].respuestas = responses.join('')
        dispatch({type: INIT_RESPONSES, payload:nom035response });
    };
}


export default nom035Duck;
