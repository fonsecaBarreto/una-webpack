import MultiplesForms from ".";

export const normalizeData = (entry: any[], headers: MultiplesForms.Header[]) =>{

    var final_data: any[] = [];

    final_data = entry.map((entry_unit: any)=>{
        return normalizeValues(entry_unit, headers)
    })

    return final_data 
}

export const normalizeValues = (entry_unit: any, headers: MultiplesForms.Header[]) =>{
    var data_row: any ={
        _id: Date.now()+"-"+(Math.random()*100)
    }

    headers.map( (header:  MultiplesForms.Header)=>{
        let { list, type='text' } = header
        let name = header.value;
        var value:any=  entry_unit[name] ?? "" 
        if(type == "select"){
            list = (list && list.length > 0) ? list: [];
            let list_labels = list.map(v=>v.label.toUpperCase()) ?? []
            var indexOf = list_labels.findIndex((v_name:string)=> v_name === value.toUpperCase() );
            value = indexOf != -1 ? list[indexOf] : { label: "", value: ""}
        }
        data_row[name] = value
    })
    return data_row 
}