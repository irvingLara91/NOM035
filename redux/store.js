import {createStore, combineReducers, compose, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import nom035Duck from "./ducks/nom035Duck";


const rootReducer = combineReducers({
    nom035: nom035Duck,
})

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)


export default () => {
    //savedSession()(store.dispatch)
    return store
}
