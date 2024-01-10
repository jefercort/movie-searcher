const API_KEY = "a028715b"

// En este servicio no le pasamos el estado siempre devolvemos el fetch de datos
export const searchMovies = async ({ search }) => {
    // no hacemos el fetch de datos si la consulta es vacia
    if (search === "") return null

    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
        const json = await response.json()
        // aca debe hacerse el mapeo de datos ya que es parte del servicio 
        const movies = json.Search
        // const movies = responseMovies.Search
  
        // Ahora vamos a mapear las movies para no depender exclusivamente de esa API ya que si se hace un cambio a futuro saldria muy costoso desligarse de la misma
        // Aca lo que hice fue controlar las variables que le vamos a enviar como props a el componente movies para que se renderice
        return movies?.map((movie) => ({
          id: movie.imdbID,
          title: movie.Title,
          year: movie.Year,
          image: movie.Poster
          
        }))
    } catch (e) {
        // aca lo hacemos para que no salga el error original si no que lo paramos antes de
        throw new Error("Error Searching movies")
    }
}