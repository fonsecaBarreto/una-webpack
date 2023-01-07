export const INITIAL_CURRENT_PAGE = {
  title: "",
  breadCrumbs: [],
  icon: null
}

const INITIAL_STATE = {
  user: null,
  session_address: null,
  loading: true,
  god_mode: false,
  currentPage:  { ...INITIAL_CURRENT_PAGE },
  force_cart_to_open: false
}

export const mainReducer = (state=INITIAL_STATE, action: any) => {
  switch(action.type){
    case "SET_USER": return { ...state, user: action.payload};
    case "SET_SESSION_ADDRESS": return { ...state, session_address: action.payload};
    case "SET_GOD_MODE": return { ...state, god_mode: action.payload};
    case "SET_LOADING": return { ...state, loading: action.payload };
    case "SET_CURRENT_PAGE": return { ...state, currentPage: action.payload };
    case "SET_FORCE_CART_TO_OPEN": return { ...state, force_cart_to_open: action.payload };
    default: return state
  }
}