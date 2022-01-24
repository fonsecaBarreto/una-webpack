import { ListingView } from "@/domain/views/ListingView";
import { Produto } from "@/domain/views/Produto";
import { setMarcasAvailables, setProdutos } from "@/react-apps/store/reducers/departaments/actions";
import { produtosService } from "@/services/api/produtos-service";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'


export function GlobalMethods(){

    const dispatch = useDispatch();
    const { produtos, toSubmitQueries } = useSelector( (state: any)=> state.departamentos);

    const listProdutos = (append: boolean) => {
        console.log("Listando produtos aqui")
        const { queries, pageIndex }: ListingView<Produto> = { ...produtos };

        produtosService.list({ ...queries, p: append ? pageIndex + 1 : 1 }).then((data: any)=>{
            var produtosListView = { ...data, data: [ ...data.data.produtos ]}
            dispatch(setProdutos(produtosListView, append));
            dispatch(setMarcasAvailables(data.data.marcas))
        })
        .finally(()=>{
            console.log("aqui")
        })
    }

    useEffect(()=>{ 
        if(toSubmitQueries === true){
            listProdutos(false)
        }
    },[toSubmitQueries])

    return ({ listProdutos })
}