import React, { useState, useEffect, useRef } from 'react'
import queryString from 'query-string'
import { useHistory, useRouteMatch } from 'react-router-dom'

export namespace SearchAdapter {
    export type Params = {
        header:{
            params?: string[],
            search?: string[]
        }
    }
}

export const UseSearchAdapter = ({ header }: SearchAdapter.Params )=>{

    const history = useHistory(), match = useRouteMatch();
    const [ parsedSearch, setParsedSearch] = useState<any>(null)
    const [ parsedParams, setParsedParams ] = useState<any>(null) 
 
    useEffect(() => {
        const [params, search] = parseUrl();
        setParsedParams(params);
        setParsedSearch(search);
    }, [ location.search, location.pathname ])

    const parseUrl = () => {
        
        var upcomming_params, upcomming_search: any = {}
        var parsedSearch: any = queryString.parse(location.search);
        var parsedParams: any = Object.assign({}, match.params);

        const { search=[], params=[] } = header;
        search.map((k,i)=>{
            let value = parsedSearch[k] ?? [];
            upcomming_search[k] = Array.isArray(value) ? value : [ value ]; 
        })
        
        params.map((k,i)=> upcomming_params = { [k]: parsedParams[k] ?? "" } ) 

        return [ upcomming_params, upcomming_search]

    }


    /* Append vai ignorar o header */
    const appendToHistory = (struct: any,) => {
        var parsedSearch: any = queryString.parse(location.search);
        parsedSearch = { ...parsedSearch, ...struct}
        history.replace({ search:  queryString.stringify(parsedSearch)}) 
    }

    /* Push vai adicionar de acordo com hader */
    const pushToHistory = (struct: any, clear: boolean= false ) => {
        const [ parsedParams, parsedSearch ] = parseUrl()
        var params_result = !clear ? {...parsedParams} : {},
        search_result = !clear ? { ...parsedSearch } : {};
        
        /*  Vai filtrar os valores de struct que tiverem no header */
        const { search=[], params=[] } = header;
        Object.keys(struct).map((k: string,i)=>{
            var value: any = struct[k];
            if (params.includes(k)){
                params_result[k]= value[0] ?? ""
            } else if (search.includes(k)){
                search_result[k]= value ?? []
            }
        })

        var str_params = ""
        Object.keys(params_result).map(p=> str_params+= "/"+  params_result[p] ?? "");
        history.replace({ search:  queryString.stringify(search_result), pathname: `${match.path.split("/:")[0]}${str_params}` }) 
    }
    
    return ({ parsedSearch, parsedParams, pushToHistory, appendToHistory })
}


export default UseSearchAdapter