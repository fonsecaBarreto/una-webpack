const INITIAL_STATE = {
     struct: [],
     produtos: null,
}
   
export const departamentosReducer = (state=INITIAL_STATE, action) => {
     switch(action.type){
          case "SET_DEPARTMENTOS_STRUCT": return { ...state, struct: action.payload };
          case "SET_PRODUCTOS": return { ...state, produtos: action.payload };
          default: return state
     }
}