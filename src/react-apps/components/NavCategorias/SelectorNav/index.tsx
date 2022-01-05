/* NavComponent */

import React, { useEffect, useState } from 'react'
import './style.css'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import Item from './Item'

export namespace NavComponent {

    export type Item  = {
        value: string, label: string
    }
    export type Params = {
        title:string,
        items:Item[],
        push: ( items: Item[] ) => void
    }
  
}   

export const SelectorNav: React.FunctionComponent<NavComponent.Params> =  ({title, items, push}) =>{

    const [ selected, setSelected ] = useState<NavComponent.Item[]>([])
    const [ open, setOpen ] = useState(true)

    const selectItem = (item: NavComponent.Item ) =>{
        setSelected( ( prev: NavComponent.Item[] ) =>{
            if(prev.map(c=>c.value).includes(item.value)){
                return( [ ...prev.filter(c=>c.value !== item.value )])
            }
            return [ ...prev, item]
        })
    }

    const toggle = () =>{ setOpen(!open)  }

    const submit = () => {
        push(selected)
    }
    
    return (
        
        <div className="nav-selector">

            <div onClick={toggle} className="nav-selector-title">{ open ? <MdExpandMore/> : <MdExpandLess/>}{ title } </div>
         
            <nav className={`nav-selector-body ${open ? 'open' : ''}`}>

                <ul>
                    { items.map((c,i)=>(
                        <Item key={i} item={c} onClick={selectItem} selected={ selected.map(r=>r.value).includes(c.value) ? true : false }></Item>
                    )) }
                </ul>
    
            </nav>
            <button className='nav-selector-apply-button' onClick={submit}>Aplicar</button>

        </div>

    )
}

export default SelectorNav



   /*  const toggleToTheList = (category) =>{
        var queryCategories = state.queries.categories
        
        if(queryCategories.includes(category)){
            queryCategories = queryCategories.filter(c=>(c != category))
        }else{
            queryCategories.push(category)
        }
        
        state.setCategories(queryCategories)
    }

    const clearList = () =>{
        state.setCategories([])
    }

    const search = () => {
        state.loadFeed(0, false)
    }


    useEffect(()=>{
        if(categories.length == 0 ){

            listPrimariesService(false)
            .then( categories => setCategories(categories))
            .catch(()=>{})
            .finally(()=>setLoading(false))
        }
    },[]) */