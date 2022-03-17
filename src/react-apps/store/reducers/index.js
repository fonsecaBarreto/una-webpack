import { combineReducers } from 'redux'
import { mainReducer } from './main'
import { martReducer } from './mart'
import { companiesReducer } from './companies'
import { carrinhoReducer } from './cart'
import { BudgetsReducer } from './budgets'

export const Reducers = combineReducers({ 
    main: mainReducer,
    mart: martReducer,
    carrinho: carrinhoReducer,
    companies: companiesReducer,
    budgets: BudgetsReducer
})

