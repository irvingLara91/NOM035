import {createStore, combineReducers, compose, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import productsDuck from "./ducks/productsDuck";

const rootReducer = combineReducers({
    productsDuck: productsDuck,
})

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

export default () => {
    //savedSession()(store.dispatch)
    return store
}