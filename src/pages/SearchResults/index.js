import React, {useCallback, useEffect, useRef} from 'react'
import Spinner from 'components/Spinner/Spinner'
import ListOfGifs from 'components/ListOfGifs/ListOfGifs'
import { useGifs } from 'hooks/useGifs'
import useNearScreen from 'hooks/useNearScreen'
import debounce from 'just-debounce-it'
import SearchForm from 'components/Searchform'
import { useLocation } from 'wouter'
import { Helmet } from 'react-helmet'



export default function SearchResult({params}){
    const { keyword } = params
    const {loading, gifs, setPage} = useGifs({ keyword })
    const externalRef = useRef()
    const { isNearScreen } = useNearScreen({ externalRef: loading ? null : externalRef,
    once: false
     })
    const [path, pushLocation] = useLocation()


    const title = gifs ? `${gifs.length} resultados de ${keyword}` : ''


     const handleSubmit = useCallback (({keyword}) => {
        // navegar a otra ruta
          pushLocation(`/search/${keyword}`)
          keyword = ""
      }, [pushLocation])


    const debounceHandleNextPage = useCallback(debounce(
        () => setPage(prevPage => prevPage + 1), 200
    ),[])

    useEffect(function () {
        if (isNearScreen) debounceHandleNextPage()
    }, [debounceHandleNextPage, isNearScreen])

    return <>
        <SearchForm onSubmit={handleSubmit} />
        {loading
            ? <Spinner/>
            : <>
            <Helmet>
                <title>{title}</title>
                <meta 
                    name="description"
                    content={title}></meta>
            </Helmet>
                <h3>
                    {decodeURI (keyword)}
                </h3>
                <ListOfGifs gifs={gifs} />
                <div id='visor' ref={externalRef}></div>
            </>
        }
        <br />
        {/* <button onClick={handleNextPage}>Get Next Page</button> */}
    </>
      
}