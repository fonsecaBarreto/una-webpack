import MultiplesForms from ".";

export const normalizeData = (entry: any[], headers: MultiplesForms.Header[]) =>{

    var final_data: any[] = [];

    entry.map((entry_unit: any)=>{
        var data_row: any ={}
        headers.map( (header:  MultiplesForms.Header)=>{

            let { list, type='text' } = header
            let name = header.value
            var value:any=  entry_unit[name] ?? "" 

            if(type == "select"){
                list = (list && list.length > 0) ? list: [];
                let list_labels = list.map(v=>v.label.toUpperCase()) ?? []
                var indexOf = list_labels.findIndex((v_name:string)=> v_name === value.toUpperCase() );
                value = indexOf != -1 ? list[indexOf] : { label: "", value: ""}
            }

            data_row[name] = value
        })
        final_data.push(data_row)
    })

    console.log("FINAL DATA AQUI",final_data)
    return final_data 
}