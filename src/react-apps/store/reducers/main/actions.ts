import { INITIAL_CURRENT_PAGE } from './index'

export const setUser = (value = null) => ({
    type: "SET_USER",
    payload: value
})

export const setSessionAddress = (value: any) => ({
    type: "SET_SESSION_ADDRESS",
    payload: value
})

export const setLoading = (value = false) => ({
    type: "SET_LOADING",
    payload: value 
})

export const setGodMode = (value = false) => ({
    type: "SET_GOD_MODE",
    payload: value 
})

export const setForceCartToOpen = (value = false) => ({
    type: "SET_FORCE_CART_TO_OPEN",
    payload: value 
})

export const setCurrentPage = (payload: any ) => {
    
    const title = payload.title || INITIAL_CURRENT_PAGE.title
    const breadCrumbs = payload.breadCrumbs || INITIAL_CURRENT_PAGE.breadCrumbs
    const icon = payload.icon || INITIAL_CURRENT_PAGE.icon

    return({
    type: "SET_CURRENT_PAGE",
    payload: {  title, breadCrumbs, icon  } 
})}

