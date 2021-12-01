
export const INITIAL_STATE = {
    dialogStack: [ ],
}

export const dialogsReducer = (state=INITIAL_STATE, action) => {
    var list;
    switch(action.type){
        case "SET_DIALOG_STACK": return { ...state, dialogStack: [ ...action.payload ] } ;

        case "PUSH_DIALOG_STACK": return { ...state, dialogStack:[ ...state.dialogStack, { ...action.payload }] };

        case "POP_DIALOG_STACK": 
            list = [ ...state.dialogStack ];
            list.pop();
            return { ...state, dialogStack: list };

        case "SLICE_DIALOG_STACK": 
        
            list = [ ...state.dialogStack.filter((j,i)=>{
                if( i != action.payload ) return j;   
            })]
            return { ...state, dialogStack: list };

        default: return state
    }
}