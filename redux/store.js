import {createStore, combineReducers, compose, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import nom035Duck from "./ducks/nom035Duck";
import configReducer,{getConfigAction} from "./ducks/configDuck";
import responsesReducer ,{getSavedResponsesAction} from "./ducks/responsesDuck";
import sendingDuck, {getResponsesAction, getUrlAction} from "./ducks/sendingDuck";
import sendingECODuck, {getEcoResponsesAction} from "./ducks/sendingECODuck";
import appReducer, {getUsersAction} from './ducks/appDuck'
import progressCountReducer from "./ducks/progressCountDuck";
import ECODuck from "./ducks/ECODuck";
import responsesECODuck, {getSavedECOResponsesAction} from "./ducks/responsesECODuck";


const rootReducer = combineReducers({
    app:appReducer,
    nom035: nom035Duck,
    eco:ECODuck,
    config:configReducer,
    savedResponses:responsesReducer,
    sending: sendingDuck,
    sendeco: sendingECODuck,
    countResponse:progressCountReducer,
    responsesECO:responsesECODuck
})

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)


export default () => {
    getSavedECOResponsesAction()(store.dispatch)
    getConfigAction()(store.dispatch)
    getSavedResponsesAction()(store.dispatch)
    getResponsesAction()(store.dispatch)
    getEcoResponsesAction()(store.dispatch)
    getUrlAction()(store.dispatch)
    getUsersAction()(store.dispatch)
    return store
}
