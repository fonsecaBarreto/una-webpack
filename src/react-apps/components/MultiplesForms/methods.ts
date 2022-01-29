import MultiplesForms from ".";

export const normalizeData = (entry: any[], headers: MultiplesForms.Header[]) =>{


    var final_data: any[] = [];

    entry.map((entry_unit: any)=>{
        var data_row: any ={}

        headers.map( (header:  MultiplesForms.Header)=>{

            let { label, list, type='text' } = header

            let name = header.value
            let value =  type == "text" ? entry_unit[name] ?? "" : { label: "", value: ""}

            data_row[name] = value

        })



        final_data.push(data_row)
    })



    return final_data 
}