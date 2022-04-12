export const INITIAL_CURRENT_PAGE = {
  title: "",
  breadCrumbs: [],
  icon: null
}

const INITIAL_STATE = {
  user: null,
  loading: true,
  god_mode: false,
  currentPage:  { ...INITIAL_CURRENT_PAGE }
}

export const mainReducer = (state=INITIAL_STATE, action) => {
  switch(action.type){
    case "SET_USER": return { ...state, user: action.payload};
    case "SET_GOD_MODE": return { ...state, god_mode: action.payload};
    case "SET_LOADING": return { ...state, loading: action.payload };
    case "SET_CURRENT_PAGE": return { ...state, currentPage: action.payload };
    default: return state
  }
}