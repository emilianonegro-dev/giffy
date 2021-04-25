import React, { useCallback } from 'react'
import { Link, useLocation } from 'wouter'
import ListOfGifs from 'components/ListOfGifs/ListOfGifs'
import TrendingSearches from 'components/TrendingSearches'
import { useGifs } from 'hooks/useGifs'
import SearchForm from 'components/Searchform'
import {Helmet} from 'react-helmet'

export default function Home() {
    const [path, pushLocation] = useLocation()
    const {loading, gifs} = useGifs()

  const handleSubmit = useCallback (({keyword}) => {
      // navegar a otra ruta
        pushLocation(`/search/${keyword}`)
    }, [pushLocation])

    return(
        <>  
            <Helmet>
                <title>Home || Giffy</title>
            </Helmet>
            <SearchForm onSubmit={handleSubmit} />
            <h3 className='App-title'>Ultimos Gifs Buscados</h3>
            <ListOfGifs gifs={gifs} />
            <div>
                <TrendingSearches />
            </div>        
        </>
    )
}