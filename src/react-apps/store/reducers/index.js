import { combineReducers } from 'redux'
import { mainReducer } from './main'
import { departamentosReducer } from './departaments'

export const Reducers = combineReducers({ 
    main: mainReducer,
    departamentos: departamentosReducer
})

