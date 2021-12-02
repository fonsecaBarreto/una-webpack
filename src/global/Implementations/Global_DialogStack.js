import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import DialogStack from '../../components/utils/Dialog/DialogStack'
import { pushDialogStack, popDialogStack, setDialogStack } from '../store/reducers/dialogs/actions'
import Store from '../store'

export * as Dialog from '../../components/utils/Dialog/Dialog'

export const push = (dialogConfig) =>{
    Store.dispatch(pushDialogStack(dialogConfig))
}

export const pop = (i) => {
    Store.dispatch(popDialogStack())
}

export const clear = () => {
    Store.dispatch(setDialogStack([]))
} 

export const GlobalDialogStackComp = () =>{
 
    const { dialogStack } = useSelector(state=> state.dialogs );

    return (
        <DialogStack 
            stack={[ ...dialogStack ]} 
            pop={pop}> 
        </DialogStack>
    )
}


export default GlobalDialogStackComp