import React, { useContext, useDebugValue, useEffect, useState } from 'react'
import "./style.css"
import GlobalContext from  "@/react-apps/apps/main/global-components-context"
import { MakeDialogConfig, MakeOptions }  from 'fck-react-dialog'
import { useDispatch, useSelector } from 'react-redux'
import { CompaniesState, setCompanhias } from '@/react-apps/store/reducers/companies'
import UseSearchAdapter from '@/react-apps/components/SearchAdapter'
import { produtosService } from '@/services/api/produtos-service'
import GaleryContainer from './GaleryContainer'
import { Product } from '@/domain/views/Product'
import SubmitButton from '@/react-apps/components/una/inputs-control/SubmitButton'
import { pushToCart, removeFromCart } from '@/react-apps/store/reducers/cart'
import { BsCart4 } from 'react-icons/bs'
import CounterControl from '@/react-apps/components/una/inputs-control/CounterControl'
import ProductBreadCrumbs from './ProductBreadCrumbs'
import AddCartButton from '../mart-page/ProductFeed/AddCartButton'

const SEARCH_HEADER = {
  params: [ "ean"],
  search: []
}
export const ProductPage: React.FunctionComponent<any> = ({location, history}) => {

  const dispatch = useDispatch()
  const { cart } = useSelector((state: any)=>state.carrinho)
  const [ count, setCount ] = useState(0)
  const { parsedParams, parsedSearch, pushToHistory } = UseSearchAdapter({ header : SEARCH_HEADER})
  const [ product, setProduct ] = useState<Product|null>(null);
  const [ breadCrumbs, setBreadCrumbs] = useState(null);

  useEffect(()=>{ if(parsedParams){ handleLoad()} },[parsedParams])

  useEffect(()=>{
    if(product?.ean) return setCount(countProductQtd(product.ean))
  },[cart])

  const handleLoad= () => {
    produtosService.find({ ...parsedParams }).then(data=>{
      setProduct(data?.product ?? null)
      setBreadCrumbs(data?.breadCrumbs ?? null)
    }) 
  }

  const countProductQtd = (ean:string) => {
    const item_index = cart.map((c:any)=> c.product.ean ).indexOf(ean);
    const item = cart[item_index];
    console.log("found item", item)
    return item?.qtd ?? 0;
  }

  const handleAdd = (a: number) =>{
    switch(a){
        case +1:  dispatch(pushToCart(a)); break;
        case -1:  dispatch(removeFromCart(a)); break;
    }
  }


  return (
    <div id="product-page">
      <div className='app-container'>
        { !product ? (<span> Carregando ... </span>) :
          <div className='prouct-page-container'>
            <ProductBreadCrumbs breadCrumbs={breadCrumbs}/>
            <section> <GaleryContainer playlist_id={product.media_playlist_id}/> </section>
            <section>
              <div>
                <span className='product-page-specification'>{product.specification}</span>
                <span className='product-page-brand'> <label>Marca:</label> {product.brand?.label}</span> 
                <span className='product-page-presentation'><label> Apresentação:</label> {product.presentation?.label}</span>  
                <span className='product-page-code'>EAN: {product.ean}</span> 
                <span className='product-page-code'>NCM: {product.ncm}</span> 
                <span className='product-page-code'>SKU: {product.sku}</span> 
              </div>
              <div>
               
              </div>
                <div className='product-page-cart-option'>
                  <button>Informações </button>
                  <AddCartButton value={count} onChange={handleAdd}></AddCartButton>
                </div>
            </section>
            <section>
              <span>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Fusce scelerisque, erat a ullamcorper lacinia, felis risus ultrices enim, id tincidunt erat risus ac nisi. 
                  Quisque consequat magna aliquam lobortis elementum.
                  Donec eleifend congue sem, sed congue nunc venenatis vel. 
                  Cras sed mi eu mauris auctor dictum in quis justo. 
              </span>
            </section>

            <section>
              <span>
                  aqui especificaçãoes do produto
              </span>
            </section>
          </div>
          }
      </div>
    </div>
  )
}

export default ProductPage