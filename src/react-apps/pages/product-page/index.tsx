import React, { useContext, useDebugValue, useEffect, useState } from 'react'
import "./style.css"
import UseSearchAdapter from '@/react-apps/components/SearchAdapter'
import { produtosService } from '@/services/api/produtos-service'
import GaleryContainer from './GaleryContainer'
import { Product } from '@/domain/views/Product'
import ProductBreadCrumbs from './ProductBreadCrumbs'
import LoadingComponent from '@/react-apps/components/una/Loading'
import ProductInfo from './ProductInfo'

const SEARCH_HEADER = { params: [ "ean"] }

export const ProductPage: React.FunctionComponent<any> = ({ location, history }) => {
  const { parsedParams } = UseSearchAdapter({ header : SEARCH_HEADER})
  const [ product, setProduct ] = useState<Product|null>(null);
  const [ breadCrumbs, setBreadCrumbs] = useState(null);
  const [ supplies, setSupplies ] = useState([])
  useEffect(()=>{ if(parsedParams){ handleLoad()} },[parsedParams])
 
  const handleLoad= () => {
    produtosService.find({ ...parsedParams }).then(data=>{
      setProduct(data?.product ?? null)
      setBreadCrumbs(data?.breadCrumbs ?? null)
      setSupplies(data.supplies)
    }) 
  }

  return (
    <div id="product-page">
      <div className='app-container'>
        { !product ? (<LoadingComponent fill={true}></LoadingComponent>) :
          <div className='product-page-container'>
            {/* BREAD CRUMBS */}
            <section className='span2'>
              <ProductBreadCrumbs breadCrumbs={breadCrumbs}/>
            </section>
            {/* IMAGE CONTAINER */}
            <section className='span1'> 
              <GaleryContainer playlist_id={product.media_playlist_id}/> 
            </section>
            {/* INFORMAÇÕES */}
             <section className='span1'>
               <ProductInfo product={product} supplies={supplies}></ProductInfo>
            </section> 
          </div>
          }
      </div>
    </div>
  )
}

export default ProductPage