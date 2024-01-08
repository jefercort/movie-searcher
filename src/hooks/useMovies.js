import responseMovies from "../mocks/with-results.json"
import withoutResults from "../mocks/no-results.json"
// Vamos a hacer un custom Hook que se preocupe de ahcer todo el fetch de datos de la pelicula y datos y demas

export function useMovies () {
    const movies = responseMovies.Search
  
    // Ahora vamos a mapear las movies para no depender exclusivamente de esa API ya que si se hace un cambio a futuro saldria muy costoso desligarse de la misma
    // Aca lo que hice fue controlar las variables que le vamos a enviar como props a el componente movies para que se renderice
    const mappedMovies = movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      image: movie.Poster
      
    }))
  
    return { movies: mappedMovies }
  }