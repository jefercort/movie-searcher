import { useRef, useState } from "react"
import { searchMovies } from "../services/movies";
// Vamos a hacer un custom Hook que se preocupe de ahcer todo el fetch de datos de la pelicula y datos y demas
// Es un custome Hook y le pasamos parametros
export function useMovies ({ search }) {
    const [movies, setMovies] = useState([]);
    // podemos escalar este customeHook
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // Vamos a user el useRef para guardar una consulta anterior y aca lo inicializo con search pero puedo hacerlo con cualquier cosa
    const previousSearch = useRef(search)

    const getMovies = async () => {
      // aca lo que hago es que le doy click al boton y no hace la consulta porque ya se habia hecho
      if (search === previousSearch.current) return
      try {
        setLoading(true);
        setError(null);
        previousSearch.current = search
        const newMovies = await searchMovies({search})
        setMovies(newMovies)
      } catch (err) {
        setError(err.message)
      } finally {
        // en el finally siempre se va a ejecutar ya si es try o catch se ejecyta al final es como un else del error 
        setLoading(false)
      }
      // le pasamos el parametro y com oes una funcion asincrona usamos el async await
    }
  // HEMOS CREADO UNA CAJA NEGRA QUE CONSTANTEMENTE ITERAMOS EN ELLA SI SE CUMPLE EL 
  // CONTRATO EN MOVIES ESTA LA LISTA DE PELICULAS Y GETMOVIES VAS A TENER UNA FORMA DE RECUPERAR LAS PELOCULAS
    return { movies, getMovies, loading }
  }