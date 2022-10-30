import React from "react"
import "./styles.css"
export const SwitchButton = ({ name, value, onChange }: any) =>{

    const handleInputs = () =>{
        console.log("hcanged");
        onChange(name, !value);
    }
    return (
        <div className="app-switch-btn">
            <label>
                <input 
                    onChange={handleInputs} 
                    type="checkbox" 
                    checked={value}/>
                <span className="app-switch-btn-slider"></span> 
            </label>
        </div>

    )
}