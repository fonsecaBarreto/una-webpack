import { combineReducers } from 'redux'
import { mainReducer } from './main'
import { departamentosReducer } from './departaments'
import { companhiasReducer } from './companhias'
import { carrinhoReducer } from './cart'

export const Reducers = combineReducers({ 
    main: mainReducer,
    departamentos: departamentosReducer,
    carrinho: carrinhoReducer,
    companhias: companhiasReducer
})

