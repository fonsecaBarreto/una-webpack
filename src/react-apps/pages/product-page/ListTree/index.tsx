import * as React from 'react';
import "./style.css"
export namespace ListTree {
    export type Node = { label: string, value: string, childs?:Node[], initial?: boolean }
    export type Params = { node: Node }
} 

export const NodeComponent: React.FunctionComponent<ListTree.Node> = ({ label, value, childs, initial = false}) =>{
  const [ expand, setExpand ] = React.useState(initial)
  const handleClick = ()=>setExpand(prev=>!prev)
  return (
    <div className={`product-list-tree-node`}>
      <span onClick={handleClick}> { childs?.length && <span>   &#8250; </span>} {label} </span>
     { expand && 
        <nav> 
          { 
          (childs && childs.length > 0) && 
            childs.map((n:any, i: number)=>( <ListTree key={i} node={n}></ListTree> ))
          }
         </nav>
      }
    </div>
  )
}


export const ListTree: React.FunctionComponent<ListTree.Params> = ({node}) => {
  return ( <div className='product-list-tree'>
              <NodeComponent { ...node }> </NodeComponent>
          </div>
    )
}
export default ListTree