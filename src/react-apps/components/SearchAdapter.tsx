import React, { useState, useEffect, useRef } from 'react'
import queryString from 'query-string'
import { useHistory, useRouteMatch } from 'react-router-dom'

export namespace SearchAdapter {
    export type Params = {
        search?:  Record<any, string | "array" | "string">
        param?: string
    }
}

export const UseSearchAdapter = ({ search, param }: SearchAdapter.Params )=>{

    const history = useHistory()
    const match = useRouteMatch()
    const [ result, setResult] = useState<any>(null)
    const [ parsedParam, setParsedParam ] = useState<any>(null) 
    const resultRef = useRef(result)
    
    useEffect(()=>{
        var upcomming_params: any = {}
        var upcomming_search: any = {}

        if(search){
            var parsedSearch: any = queryString.parse(location.search);
            Object.keys(search).map((k,i)=>{
                let type = search[k]
                let searchValue = parsedSearch[k] ?? ((type == "string") ?  "" : []);
                upcomming_search[k] = type == "array" ?  (Array.isArray(searchValue)) ? searchValue : [ searchValue ]: searchValue+"" 
            })
        }
        if(param) {
            var parsedParams:any = Object.assign({},match.params);
            upcomming_params = { [param]: parsedParams[param] ?? "" } 
            setParsedParam(upcomming_params)
        }

        var result_data= ({ ...upcomming_search})
        setResult(result_data)
        resultRef.current = result_data;

    },[location.search, location.pathname ])


    const pushToHistory= ( payload: any, where: string ) =>{

        var result_params = "";
        var result_search = "";

        var prev_result = { ...resultRef.current };

        if(where == param){
            let r = payload ? payload.value : "";
            result_params += `${match.path.split("/:")[0]}/${r}`
        } else {
            prev_result[where] = payload;
        }
        if( search?.p  && where != "p" ){
            prev_result.p = 1;
        }

        var result_search = queryString.stringify(prev_result)

        return history.replace({ search: result_search, pathname: `${result_params}` }) 
    }

    return ({ parsed: result, parsedParam,  parsedRef: resultRef, pushToHistory})
}


export default UseSearchAdapter