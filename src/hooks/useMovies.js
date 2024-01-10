import withResults from "../mocks/with-results.json"
import withoutResults from "../mocks/no-results.json"
import { useState } from "react"
// Vamos a hacer un custom Hook que se preocupe de ahcer todo el fetch de datos de la pelicula y datos y demas
// Es un custome Hook y le pasamos parametros
export function useMovies ({ search }) {
    const [responseMovies, setResponseMovies] = useState([]);

    const movies = responseMovies.Search
  
    // Ahora vamos a mapear las movies para no depender exclusivamente de esa API ya que si se hace un cambio a futuro saldria muy costoso desligarse de la misma
    // Aca lo que hice fue controlar las variables que le vamos a enviar como props a el componente movies para que se renderice
    const mappedMovies = movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      image: movie.Poster
      
    }))

    const getMovies = () => {
      if (search) {
        setResponseMovies(withResults)
      } else {
        setResponseMovies(withoutResults)
      }
    }
  
    return { movies: mappedMovies, getMovies }
  }