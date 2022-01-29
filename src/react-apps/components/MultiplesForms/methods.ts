
export const normalizeToHeader = (entry: any[], headers: string[]) =>{
    var final_data: any[] = [];
    entry.map((entry_unit: any)=>{
        var data_row: any ={}
        headers.map((hName)=>{
            data_row[hName] = entry_unit[hName] ?? ""
        })
        final_data.push(data_row)
    })
    return final_data 
}