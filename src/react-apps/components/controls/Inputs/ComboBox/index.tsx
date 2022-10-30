import React, { useState } from "react";
import "./styles.css"
import { ChangeEvent } from "react"
import useOnclickOutside from "react-cool-onclickoutside";

export namespace ComboBoxTypes {
  export type DataType = { value: string, labels: string[], icon?: React.ReactNode };
  export interface Props {
    data: DataType[]
    value: any,
    onChange: (key: "INPUT" | "SELECT" | "CLEAR" , value?: any ) => void,
    placeHolder?:string,
    disabled?: boolean
  }
}

export const ComboBox: React.FunctionComponent<ComboBoxTypes.Props> = (props) => {
    const [ focus, setFocus ] = useState(false)
    const { value, data, onChange,  placeHolder, disabled=false } = props;
    const ref = useOnclickOutside(() => { setFocus(false) });


    function handleChanges( e: ChangeEvent<HTMLInputElement> ) { 
      onChange("INPUT", e.target.value);
    }

    function handleSelect(payload: ComboBoxTypes.DataType){
      onChange("SELECT", payload)
      setFocus(false)
    }

    function handleClear(){
      onChange("CLEAR");
      setFocus(false)
    }

    const renderData = ()=>{
      return (data.map((_data: ComboBoxTypes.DataType) => {
        let { value, labels, icon } = _data;
        return (
          <li key={value} onClick={()=>handleSelect(_data)}>
            <section>
              { icon && icon }
            </section>
            
            <section>
              <span>{labels[0]} </span>

              { labels.length > 1 && ( 
                <span>
                  {labels[1]}
                </span>
              )}
             </section>
          </li>
        );
      }))
    };

  
    return (
      <div className="app-combo-box" ref={ref} onMouseDownCapture={() => setFocus(true)}>
        <input 
          disabled={disabled} 
          placeholder={placeHolder ?? ''} 
          value={value}  
          onInput={ handleChanges }/>

        <button className="clear-btn" onClick={handleClear}> &#215;  </button>
          { (data.length > 0 && focus == true) &&
            <ul className="combobox-float-list">
              { renderData() }
            </ul>
          }
      </div>
    )
}

export default ComboBox;