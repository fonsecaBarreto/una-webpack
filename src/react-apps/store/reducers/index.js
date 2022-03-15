import { combineReducers } from 'redux'
import { mainReducer } from './main'
import { departamentosReducer } from './departaments'
import { companiesReducer } from './companies'
import { carrinhoReducer } from './cart'
import { BudgetsReducer } from './budgets'

export const Reducers = combineReducers({ 
    main: mainReducer,
    departamentos: departamentosReducer,
    carrinho: carrinhoReducer,
    companies: companiesReducer,
    budgets: BudgetsReducer
})

