import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import DialogStack from '../utils/Dialog/DialogStack'
import { pushDialogStack, popDialogStack, setDialogStack } from '../../store/reducers/dialogs/actions'
import Store from '../../store'

export * from '../utils/Dialog/Dialog'

export const GlobalDialogStack = {
    push:(dialogConfig) =>{
        Store.dispatch(pushDialogStack(dialogConfig))
    },
    pop:(i) =>{
        Store.dispatch(popDialogStack())
    },
    clear:() =>{
        Store.dispatch(setDialogStack([]))
    }
} 

const GlobalDialogStackComp = () =>{
 
    const { dialogStack } = useSelector(state=> state.dialogs );

    return (
        <DialogStack 
            stack={[ ...dialogStack ]} 
            pop={GlobalDialogStack.pop}> 
        </DialogStack>
    )
}


export default GlobalDialogStackComp