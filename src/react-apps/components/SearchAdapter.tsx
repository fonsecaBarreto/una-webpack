import React, { useState, useEffect, useRef } from 'react'
import queryString from 'query-string'
import { useHistory, useRouteMatch } from 'react-router-dom'

export namespace SearchAdapter {
    export type Params = {
        search?:  Record<any, "m" | "s" | string >,
        params?: string[]
    }
}

export const UseSearchAdapter = ({ search, params }: SearchAdapter.Params )=>{

    const history = useHistory()
    const match = useRouteMatch()
    const [ parsedSearch, setParsedSearch] = useState<any>(null)
    const [ parsedParam, setParsedParam ] = useState<any>(null) 
    const searchRef = useRef(parsedSearch)
    
    useEffect(() => handleUrl(), [ location.search, location.pathname ])

    const handleUrl = () => {
        var upcomming_params, upcomming_search: any = {}
        if(search){
            var parsedSearch: any = queryString.parse(location.search);
            Object.keys(search).map((k,i)=>{
                let type = search[k]
                let searchValue = parsedSearch[k] ?? ((type == "s") ?  "" : []);
                upcomming_search[k] = type == "m" ?  (Array.isArray(searchValue)) ? searchValue : [ searchValue ]: searchValue; 
            })
            setParsedSearch(upcomming_search)
            searchRef.current = upcomming_search;
        }
        if(params) {
            var parsedParams:any = Object.assign({}, match.params);
            params.map((p,i)=>  upcomming_params = { [p]: parsedParams[p] ?? "" })
            setParsedParam(upcomming_params)
        }
    }
    
    const pushSearch= ( key: string, value: any ) =>{
        var result_search = { ...searchRef.current };
        var value = value ?? "";
        result_search[key] = value;
        if( search?.p  && key != "p" ){ result_search.p = 1; }
        return history.replace({ search: queryString.stringify(result_search) })
    }

    const pushParam = ( key: string, payload: any ) =>{
        var result_search = { ...searchRef.current };
        var result_params = "";
        var value = payload ?? "";
        if(params?.includes(key)){
            result_params = `${match.path.split("/:")[0]}/${value}`
        } 
        if( search?.p  && key != "p" ){ result_search.p = 1; }
        return history.replace({ search: queryString.stringify(result_search), pathname: `${result_params}` }) 
    }

    return ({ parsedSearch, parsedParam, pushSearch, pushParam })
}


export default UseSearchAdapter