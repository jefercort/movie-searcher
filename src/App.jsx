import './App.css'
import { useRef } from 'react';
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'

// useRef es un hook que te permite crear una referencia mutable que persiste durante todo el ciclo de vida de tu componente y es muy util para guardar cualquier valor que puedas mutar 
// como un identificador, como un elemento del DOM como un contador como lo que tu quieras y que cada vez que cambia no vuelve a renderizar el componente, esto lo hace diferente del
// useState porque cada vez que cambia vuelve a renderizar el componente, pero el useRef cada vez que cambia no renderiza el componente de nuevo 
function App() {

  // Esto se pueden de esas dos formas
  // const { movies: mappedMovies } = useMovies();
  const { movies } = useMovies();

  // vamos a utilizar el useRef para guardar una referencia del DOM
  const inputRef = useRef()

  const handleClick = () => {
    // aca usamos la propiedad current porque al ser un objeto puede mutar el value
    // lo que hacemos es recuperar un elemento del DOM y lo estamos leyendo y lo estamos guardando en una referencia
    const inputEl = inputRef.current;
    const value = inputEl.value;
    // tambien podria ser asi resumiendo las dos lineas anteriores a esta
    // const value = inputRef.current.value
    alert(value)
  } 
  

  return (
    <div className='page'>

      <header>
        <h1>Buscador de Peliculas</h1>
        {/* Siempre que use el input y el button usar el formulario porque nos permite englobar todos nuestros inputs */}
        <form className='form'>
          <input ref={inputRef} placeholder='Avangers, StarWars' />
          <button onClick={handleClick} type='submit'>Buscar</button>
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
