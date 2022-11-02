
import './styles.css'
import React, { useEffect, useState } from 'react'
import useResize from '../useResize'

export namespace UtilsCarouselTypes{

    export type ItemProps<Data>= {
        onChange?: (k:string, p?:any) =>void
        entry: { data: Data, index: number },
    }

    export type Props = {
        records: any[],
        element: React.FunctionComponent<ItemProps<any>>,
        colums?: number[],
        onChange?: any,
        height_ration?: number
    }
}


export const UtilsCarousel: React.FunctionComponent<UtilsCarouselTypes.Props> = ( props ) =>{

    const { records, height_ration= 1, colums= [5, 4, 3, 2, 2], element: Element, onChange } = props;

    const [ ref, { width : viewPortWidth }]: any = useResize();

    const [ columnIndex, setColumnIndex ] = useState(0)
    const [ itemWidth, setItemWidth ] = useState(0)
    const [ offset, setOffset ] = useState(0)

    useEffect(() => {
        if(viewPortWidth == 0) return;

        let cl = viewPortWidth > 1240 ? 0 : viewPortWidth > 1024 ? 1 : 
            viewPortWidth > 756 ? 2 : viewPortWidth > 480 ? 3: 4;
        setItemWidth(Math.round(viewPortWidth / colums[cl]) );
        setColumnIndex(cl)
        setOffset(0)
    },[viewPortWidth]);

    const handleClick = (key: string) =>{
        let n_colunas = colums[columnIndex];
        setOffset(prev=> {
            let jump_proj = prev + ( n_colunas * (key =="RIGHT" ? 1 : -1));
            switch(key){
                case 'RIGHT':
                    // Se a posição encontrada for zero va para o ultimo candidato
                    if(prev == 0){
                        jump_proj = (records.length - n_colunas) * -1
                    }else if(jump_proj > 0){
                        jump_proj= 0;
                    }
                break;
                case 'LEFT':
                    if(Math.abs(jump_proj) == records.length){
                        jump_proj = 0;
                    }
                    else if(Math.abs(jump_proj) > records.length - n_colunas ){
                        jump_proj = (records.length - n_colunas) * -1
                    } 
                break;
            }
            return jump_proj;
        }) 
    }

    const calcAbsOffset = (offset: number): number => {
        let jump_proj =  itemWidth * offset;
        return jump_proj
    }

    const handleItemChanges = onChange


    const itemHeight = `calc( ${height_ration * itemWidth}px - 12px )`

    return (
        <div className='utils-carousel'>
            <div className='utc-aside'> 
                <button onClick={()=>handleClick("LEFT")}>&lsaquo;</button>
            </div>
            <nav className='utc-viewport' ref={ref} style={{height: height_ration * itemWidth}} >
                <div className='utc-pool' style={{ left :`${calcAbsOffset(offset)}px`} }>
                    { records.map( (rec,i)=>(
                        <div key={i} 
                            style={{width: `${itemWidth}px`, height: itemHeight }} className='utc-itemwarpper'> 
                            <Element key={i} onChange={handleItemChanges} entry={ { data: rec, index: i } } />
                        </div>))
                    }
                </div>
            </nav> 
            <div className='utc-aside'>  
                <button className='asideright' onClick={()=>handleClick("RIGHT")} >
                    &rsaquo;
                </button>
            </div>
        </div>
    )
}

export default UtilsCarousel