
const initialData = {
    IdEncuesta: 1003,
    Fecha: "18/08/2021T16:53:00",
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
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';
const ERROR_SERVER = 'ERROR_SERVER';


const ECODuck = (state = initialData, action) => {
    switch (action.type) {
        case INIT_RESPONSES:
            return {...state}
        default:
            return state
    }
}

export let initResponseECO = (IdEncuesta,Fecha,Demograficos,PreguntasAbiertas) => {

}

export default ECODuck;
