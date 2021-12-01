import React from 'react';
import Dialog from "../Dialog"

export const DialogStack = ({ stack, pop }) =>{

    const actionHandler = (action) => {
        return async (n) =>{
            n = action ? ( await action(n) ) || n : n;
            if(n === -1) return pop()
        }
    } 
    
    return (
        <React.Fragment>
            {
                stack.map((c,i)=>{
                    c.onAction = actionHandler(c.onAction)
                    return (
                        <Dialog show={c.content ? true : false} config={c} key={i} index={i}></Dialog>
                    )
                })
            }
        </React.Fragment>
    )
}

export default DialogStack