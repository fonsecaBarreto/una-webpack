import React, { useContext, useDebugValue, useEffect, useState } from 'react'
import "./style.css"
import GlobalContext from  "@/react-apps/apps/main/global-components-context"
import { MakeDialogConfig, MakeOptions }  from 'fck-react-dialog'
import { useDispatch, useSelector } from 'react-redux'
import UseSearchAdapter from '@/react-apps/components/SearchAdapter'
import { produtosService } from '@/services/api/produtos-service'
import GaleryContainer from './GaleryContainer'
import { Product } from '@/domain/views/Product'
import { pushToCart, removeFromCart } from '@/react-apps/store/reducers/cart'
import ProductBreadCrumbs from './ProductBreadCrumbs'
import AddCartButton from '../mart-page/ProductFeed/AddCartButton'
import { UseCartHandler } from "@/react-apps/store/reducers/cart/handler"

const SEARCH_HEADER = {
  params: [ "ean"],
  search: []
}

export const ProductPage: React.FunctionComponent<any> = ({location, history}) => {

  const cartHandler = UseCartHandler()
  const { parsedParams, parsedSearch, pushToHistory } = UseSearchAdapter({ header : SEARCH_HEADER})
  const [ product, setProduct ] = useState<Product|null>(null);
  const [ breadCrumbs, setBreadCrumbs] = useState(null);

  useEffect(()=>{ if(parsedParams){ handleLoad()} },[parsedParams])

  const handleLoad= () => {
    produtosService.find({ ...parsedParams }).then(data=>{
      setProduct(data?.product ?? null)
      setBreadCrumbs(data?.breadCrumbs ?? null)
    }) 
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
             
                  <span className='product-page-presentation'>
                    <label> Peso:</label> {product.presentation?.weight}
                  </span>

                  <span className='product-page-presentation'>
                    <label> volume:</label> {product.presentation?.volume}
                  </span>

                  <span className='product-page-presentation'>
                    <label> Quantidade:</label> {product.presentation?.quantity}
                  </span>
                  
                <span className='product-page-code'>EAN: {product.ean}</span> 
                <span className='product-page-code'>NCM: {product.ncm}</span> 
                <span className='product-page-code'>SKU: {product.sku}</span> 
              </div>
              <div>
              </div>
                <div className='product-page-cart-option'>
                  <AddCartButton value={cartHandler.count(product?.ean)} height={"42px"}
                    onChange={(n:number)=>{cartHandler.push(n, product)}}></AddCartButton>
                </div>
            </section>
            <section>
              <span>
                
              </span>
            </section>

            <section>
              <span>
                  
              </span>
            </section>
          </div>
          }
      </div>
    </div>
  )
}

export default ProductPage