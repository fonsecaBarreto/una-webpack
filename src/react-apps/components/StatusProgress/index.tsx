import React, { useCallback } from "react"
import "./styles.css"

export type StatusProgressProps ={
    index: number,
    items: { label: string, image?: any }[]
}

export const StatusProgress: React.FunctionComponent<StatusProgressProps> = (props) =>{

    const { index, items }  = props;


    const renderProgressBar = useCallback(()=> (
        <>
        {   
            items.map((item, i)=>(
                <section 
                    key={i} 
                    className={`status-bar-indicator ${(index >= i) ? "active": ""}`}
                />))
        }
        </>
    ),[index, items])

    return (
        <div className="status-progress-bar">
            <nav style={{gridTemplateColumns: `repeat(${items.length}, 1fr)`}}>
                {
                    items.map((item, i)=>{
                        return (
                            <section key={i} className={`status-bar-description ${index >= i ? 'active': ''}`} >
                                <span className="status-image-vp">
                                    <img src={item.image} />
                                </span>
                                {item.label}
                            </section>
                        )
                    })
                }
                 
            </nav>

            <footer style={{gridTemplateColumns: `repeat(${items.length}, 1fr)`}}>
                {renderProgressBar()}
            </footer>
        </div>
    )
}

export default StatusProgress;