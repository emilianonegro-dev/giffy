import {useEffect, useState, useRef} from 'react'
// creamos un hook
export default function useNearScreen ({ distance= '100px', externalRef, once = true} = {}) {
    const [isNearScreen, setShow]  = useState(false)
      //ref permite guardar el valor indicado sin tener que pasarle in id, si o si hay que poner . current para que lo lea
    const fromRef = useRef()


    useEffect(function () {
        let observer 

        const element = externalRef ? externalRef.current : fromRef.current

        const onChange = (entries, observer) => {
            const el = entries[0]
            console.log(el.isIntersecting)
            if(el.isIntersecting) {
                setShow(true)
                //este disconect permite que no se siga actualizando el efecto
                once && observer.disconnect()
            } else {
                !once && setShow(false)
            }

        }

        Promise.resolve(
            typeof IntersectionObserver !== 'undefined'
                ? IntersectionObserver
                : import('intersection-observer')    
            ).then(() => {
                const observer = new IntersectionObserver(onChange, {
                    rootMargin: distance
                })
        
                if (element) observer.observe(element)
            })       
        
        //permite evitar problemas porque limpia el evento
        return () => observer && observer.disconnect()
    })

    return {isNearScreen, fromRef}
}