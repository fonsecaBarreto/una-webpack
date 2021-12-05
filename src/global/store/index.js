import { createStore } from 'redux'
import { Reducers } from './reducers'

export const Store = createStore(Reducers, window.devToolsExtension && window.devToolsExtension())
export default Store
