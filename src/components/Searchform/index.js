import React, {useState} from 'react'

function SearchForm ({onSubmit}) {
    const [keyword, setKeyword] = useState('')

    const handleSubmit = evt => {
        //este preventDefault permite que no se actualice la pagina por defecto y guardar los valores buscados
        evt.preventDefault()
        //una vez teniendo el valor en setkeyword debemos navegar a otra ruta
        onSubmit({keyword})
        setKeyword('')
        }

        const handleChange = evt => {
            //Obtengo el valor de la keyword buscada
            setKeyword(evt.target.value)
        }

    return(
        <form onSubmit={handleSubmit}>
                <button>Buscar</button>
                <input  
                    onChange={handleChange}
                    placeholder='Busca un Gif'
                    type='text'
                    value={keyword}
                />
            </form>
    )
}

export default React.memo(SearchForm )