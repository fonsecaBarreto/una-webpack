import { createStore } from 'redux'
import { Reducers } from './reducers/index.js'


const store =  createStore(Reducers)
    // createStore(Reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store