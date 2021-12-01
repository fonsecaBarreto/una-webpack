export const setDialogStack = () =>{
    return ({ type: "SET_DIALOG_STACK", payload })
}

export const pushDialogStack = () => {
    return ({ type: "PUSH_DIALOG_STACK", payload })
}

export const popDialogStack = () =>{
    return ({ type: "POP_DIALOG_STACK", payload })
}

export const sliceDialogStack = () =>{
    return ({ type: "SLICE_DIALOG_STACK", payload })
}