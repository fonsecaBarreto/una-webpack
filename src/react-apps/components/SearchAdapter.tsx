import React, { useState, useEffect, useRef } from 'react'
import queryString from 'query-string'
import { useHistory, useRouteMatch } from 'react-router-dom'

export namespace SearchAdapter {
    export type Params = { header :Record<"params" | "search",  string[] > }
}

export const UseSearchAdapter = ({ header={ params : [], search: [] } }: SearchAdapter.Params )=>{

    const history = useHistory(), match = useRouteMatch();
    const [ parsedSearch, setParsedSearch] = useState<any>(null)
    const [ parsedParams, setParsedParams ] = useState<any>(null) 
    const searchRef = useRef(parsedSearch)
    const paramsRef = useRef(parsedParams)
    
    useEffect(() => handleUrl(), [ location.search, location.pathname ])

    const handleUrl = () => {
        var upcomming_params, upcomming_search: any = {}
    
        var parsedSearch: any = queryString.parse(location.search);
        var parsedParams: any = Object.assign({}, match.params);

        header.search.map((k,i)=>{
            let value = parsedSearch[k] ?? [];
            upcomming_search[k] = Array.isArray(value) ? value : [ value ]; 
        })
        
        header.params.map((k,i)=> upcomming_params = { [k]: parsedParams[k] ?? "" } ) 

        setParsedSearch(upcomming_search);
        setParsedParams(upcomming_params);
        searchRef.current = upcomming_search; 
        paramsRef.current = upcomming_params;
    }

    const pushToHistory = (struct: any, clear: boolean= false ) => {

        var params_result = !clear ? {...paramsRef.current} : {},
        search_result = !clear ? { ...searchRef.current } : {};
         
        Object.keys(struct).map((k: string,i)=>{
            var value: any = struct[k];
            if (header.params.includes(k)){
                params_result[k]= value[0] ?? ""
            } else if (header.search.includes(k)){
                search_result[k]= value ?? []
            }
        })

        var str_params = ""
        Object.keys(params_result).map(p=> str_params+= "/"+  params_result[p] ?? "");
        history.replace({ search:  queryString.stringify(search_result), pathname: `${match.path.split("/:")[0]}${str_params}` }) 
    }
    return ({ parsedSearch, parsedParams, pushToHistory })
}


export default UseSearchAdapter