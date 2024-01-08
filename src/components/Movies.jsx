function ListOfMovies ({ movies }) {
    return (
      <ul>
        {
          // al realizar este .map podemos ahorrar mucho tiempo ya que de una vez sabemos como es la estructyra de la respuesta sin 
          // haber tenido que hacer un fetch
          movies.map((movie) => (
            <li key={movie.imdbID}>
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
              <img src={movie.Poster} alt={movie.Title} />
            </li>
          ))
        }
      </ul>
    );
  }
  // NOTA: Cualquier cosa que tu veas que es render debe ser un componente
  function NoMovieResults () {
      
      return (
          <p>No hay resultados</p>
          )
        }
        
export function Movies ({ movies }) {
    // Aca reemplazamos este por una prop que viene desde que invocan el Componente
    // const movies = responseMovies.Search
    const hasMovies = movies?.length > 0
     
    return (        
        hasMovies ? <ListOfMovies movies={movies} /> : <NoMovieResults />
          
    )
  }