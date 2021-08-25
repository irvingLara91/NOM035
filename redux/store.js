import {createStore, combineReducers, compose, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import nom035Duck from "./ducks/nom035Duck";
import configReducer,{getConfigAction} from "./ducks/configDuck";
import responsesReducer ,{getSavedResponsesAction} from "./ducks/responsesDuck";


const rootReducer = combineReducers({
    nom035: nom035Duck,
    config:configReducer,
    savedResponses:responsesReducer
})

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)


export default () => {
    getConfigAction()(store.dispatch)
    getSavedResponsesAction()(store.dispatch)
    return store
}
