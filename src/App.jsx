import './App.css'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'


function App() {

  // Esto se pueden de esas dos formas
  // const { movies: mappedMovies } = useMovies();
  const { movies } = useMovies();

  return (
    <div className='page'>

      <header>
        <h1>Buscador de Peliculas</h1>
        <form className='form'>
          <input placeholder='Avangers, StarWars' />
          <button type='submit'>Buscar</button>
        </form>
      </header>
      <main>
        {/* <Movies movies={mappedMovies} />         */}
        <Movies movies={movies} />
      </main>

    </div>
  )
}

export default App
