export const INITIAL_CURRENT_PAGE = {
  title: "",
  breadCrumbs: [],
  icon: null
}

const INITIAL_STATE = {
  user: null,
  user_address: null,
  loading: false,
  god_mode: false,
  currentPage:  { ...INITIAL_CURRENT_PAGE }
}

export const mainReducer = (state=INITIAL_STATE, action) => {
  switch(action.type){
    case "SET_USER": return { ...state, user: action.payload};
    case "SET_USER_ADDRESS": return { ...state, user_address: action.payload};
    case "SET_GOD_MODE": return { ...state, god_mode: action.payload};
    case "SET_LOADING": return { ...state, loading: action.payload };
    case "SET_CURRENT_PAGE": return { ...state, currentPage: action.payload };
    default: return state
  }
}