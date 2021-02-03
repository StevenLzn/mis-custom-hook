import { useEffect, useRef, useState } from 'react';

export const useFetch = (url) => {

    // En este caso el useRef lo usamos para saber si el componente fue desmontado
    // En caso de que el componente haya sido desmontado antes de realizar la peticion
    // La aplicación no realiza la petición ya que actualmente isMounted es falso, solo es true cuando el componente está montado
    const isMounted = useRef(true);
    const [state, setState] = useState({data: null, loading: true, error: null});

    useEffect( () => {
        return  () => {
            isMounted.current = false;
        }
    }, []);

    useEffect(()=>{
        setState({data: null, loading: true, error: null});
        fetch(url)
        .then( resp => resp.json())
        .then( data => {
            if(isMounted.current){
                setState({
                    data: data,
                    loading: false,
                    error: null,
                });
            }
        })
        .catch( () =>{
            setState({data: null, loading: false, error: 'No se encontro la frase'});
        })
    }, [url]);

    return state;
}
  