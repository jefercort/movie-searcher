import { useState } from "react"
import { searchMovies } from "../services/movies";
// Vamos a hacer un custom Hook que se preocupe de ahcer todo el fetch de datos de la pelicula y datos y demas
// Es un custome Hook y le pasamos parametros
export function useMovies ({ search }) {
    const [movies, setMovies] = useState([]);
    // podemos escalar este customeHook
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getMovies = async () => {

      try {
        setLoading(true);
        setError(null)
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