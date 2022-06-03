import qs from 'qs';
import * as React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import UnaListingContent from '.';

export namespace HandleSearchValues {
    export type Params = { headers: any[] }// [key, default value;] }
    export type Result = { values: any, setValue: any }
}

export const HandleSearchValues = ( { headers=[] } : HandleSearchValues.Params) =>{
    const history = useHistory()
    const { search } = useLocation();
    const query = React.useMemo(() => new URLSearchParams(search), [search]);
    const values: any = React.useMemo( () => {
        var parsed: any = {};
        if(headers.length > 0 ){
            headers.map((h:string, i)=>{
                console.log(h)
                let [ key, initial_value ] = h;
                parsed[key] = query.get(key) ?? initial_value;
            })
        }
        return parsed
    }, [query])
    const setValue = (payload: any) =>{
        history.replace({ search: qs.stringify({ ...values, ...payload})})
    }
    return { values, setValue }
}


export namespace HandleRecords {
    export type Params = any
    export type Result = any
}

export const handleRecords = ( {}:  HandleRecords.Params ): HandleRecords.Result =>{
    const [ loadTry, setLoadTry ] = React.useState(0)
    const [ metaData, setMetaData]= React.useState<UnaListingContent.MetaData | null>(null)
    const [ records, serRecords ] = React.useState([])

    const setData = (r: any) =>{
        setMetaData(r._metadata)
        serRecords(r.records)
        setLoadTry(prev=>prev+=1)
    }

    const submit = (listService: any) =>{
        setLoadTry(0)
        listService().then(setData)
    }

    return { records, metaData, submit, loadTry}
}

export default handleRecords