import { setProdutos } from "@/react-apps/store/reducers/departaments/actions";
import { produtosService } from "@/services/api/produtos-service";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'

export function GlobalMethods(){

    const dispatch = useDispatch();
    const { products_listingview, toSubmit } = useSelector( (state: any)=> state.departamentos);

    const listProdutos = async (append: boolean) => {
        const { queries, pageIndex } = products_listingview;
        const data = await produtosService.list({ ...queries, p: append ? pageIndex + 1 : 1 })
        dispatch(setProdutos(data, append));
    }

    useEffect(()=>{ 
        if(toSubmit === true){
            listProdutos(false)
        }
    },[toSubmit])

    return ({ listProdutos })
}