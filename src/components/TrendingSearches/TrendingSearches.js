import React, { useEffect, useState } from 'react'
import getTrendingTerms from 'services/getTrendingTermsService'
import Category from 'components/Category/index'

export default function TrendingSearches() {
    const [trends, setTrends] = useState([])

    useEffect(function () {
        getTrendingTerms().then(setTrends)
    },[])
    
    return <Category name='Tendencias' options={trends}/>
}
