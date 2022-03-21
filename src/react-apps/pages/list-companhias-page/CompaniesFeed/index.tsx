import React, { useEffect, useState } from 'react'
import './style.css'

import ContentPool from '@/react-apps/layouts/components/ContentPool'
import CompanyItem from './Item'
import { useSelector } from 'react-redux'

export namespace CompaniesFeed {
    export type onAction = any
}

export const CompaniesFeed: React.FunctionComponent<any> = ({ onAction }) =>{
    const companies : any = useSelector<any>(state => state.companies)
    
    return (
        <div className="una-product-feed">
            <ContentPool 
                initial_mode="inline"
                itemComponent={CompanyItem} 
                list_data={companies} 
                dataAlias={"companies"}
                onAction={onAction}>
            </ContentPool>  
        </div>
    )
}

export default CompaniesFeed


