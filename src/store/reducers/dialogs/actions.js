export const setDialogStack = (payload) =>{
    return ({ type: "SET_DIALOG_STACK", payload })
}

export const pushDialogStack = (payload) => {
    return ({ type: "PUSH_DIALOG_STACK", payload })
}

export const popDialogStack = (payload) =>{
    return ({ type: "POP_DIALOG_STACK", payload })
}

export const sliceDialogStack = (payload) =>{
    return ({ type: "SLICE_DIALOG_STACK", payload })
}