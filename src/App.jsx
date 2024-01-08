import './App.css'
// import { useRef } from 'react';
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import { useEffect, useState } from 'react';

// useRef es un hook que te permite crear una referencia mutable que persiste durante todo el ciclo de vida de tu componente y es muy util para guardar cualquier valor que puedas mutar 
// como un identificador, como un elemento del DOM como un contador como lo que tu quieras y que cada vez que cambia no vuelve a renderizar el componente, esto lo hace diferente del
// useState porque cada vez que cambia vuelve a renderizar el componente, pero el useRef cada vez que cambia no renderiza el componente de nuevo 
function App() {

  // Esto se pueden de esas dos formas
  // const { movies: mappedMovies } = useMovies();
  const { movies } = useMovies();
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);

  // FORMA 1 CON useRef()
  // vamos a utilizar el useRef para guardar una referencia del DOM
  // const inputRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    // METODO DE FORMA NO CONTROLADA 
    // // FORMA 1 CON useRef()
    // // aca usamos la propiedad current porque al ser un objeto puede mutar el value
    // // lo que hacemos es recuperar un elemento del DOM y lo estamos leyendo y lo estamos guardando en una referencia
    // const inputEl = inputRef.current;
    // const value = inputEl.value;
    // console.log(value)

    // // tambien podria ser asi resumiendo las dos lineas anteriores a esta
    // // const value = inputRef.current.value

    // // FORMA 2 CON JAVASCRIPT SOLAMENTE
    // const fields = new window.FormData(event.target)
    // const query = fields.get("query")
    // console.log(query)
    // // FORMA 2 CON JAVASCRIPT SOLAMENTE CUANDO SON MULTIPLES INPUTS TRANSFORMANDO TODO LOS CAMPOS CON Objet.fromEntries()
    // // con esta forma se recupera directamente la query
    // const { query } = Object.fromEntries(new window.FormData(event.target))
    console.log({query})
    // // con esta forma se recupera todo el grupo de inputs
    // const fields = Object.fromEntries(new window.FormData(event.target))
    // console.log(fields)
  } 

  // METODO DE FORMA CONTROLADA POR MEDIO DE ESTADOS
  const handleChange = (event) => {
    // esta const la utilizamos para que tome el ultimo estado del evento 
    const newQuery = event.target.value
    // esta prevalidacion la hago para que no ingresen datos con espacio al inicio
    if (newQuery.startsWith(" ")) return
    setQuery(event.target.value)
  }
  
  useEffect(() => {
    if (query === "") {
      setError("No se puede buscar una pelicula vacia")
      return
    }

    if (query.match(/^\d+$/)) {
      setError("No se puede buscar una pelicula con un numero")
      return
    }

    if (query.length < 3) {
      setError("La busqueda debe tener mas de 3 Caracteres")
      return
    }

    setError(null);
// este use efect se activa cada vez que se actualiza el estado query
  }, [query])

  return (
    <div className='page'>
      <header>
        <h1>Buscador de Peliculas</h1>
        {/* Siempre que use el input y el button usar el formulario porque nos permite englobar todos nuestros inputs */}
        <form className='form' onSubmit={handleSubmit}>
          {/* FORMA 1 */}
          {/* <input ref={inputRef} placeholder='Avangers, StarWars' /> */}
          {/* FORMA 2 */}
          <input onChange={handleChange} value={query} name='query' placeholder='Avangers, StarWars' />
          {/* <input name='segundo' placeholder='Avangers, StarWars' /> */}
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
      <main>
        {/* <Movies movies={mappedMovies} />         */}
        <Movies movies={movies} />
      </main>

    </div>
  )
}

export default App
