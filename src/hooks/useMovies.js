import { useCallback, useMemo, useRef, useState } from "react"
import { searchMovies } from "../services/movies";
// Vamos a hacer un custom Hook que se preocupe de ahcer todo el fetch de datos de la pelicula y datos y demas
// Es un custome Hook y le pasamos parametros
// aca tambien recibimos el sort
export function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState([]);
  // podemos escalar este customeHook
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Vamos a user el useRef para guardar una consulta anterior y aca lo inicializo con search pero puedo hacerlo con cualquier cosa
  const previousSearch = useRef(search)

  // AHORA LO QUE VAMOS A USAR ES EL useCALLBACK ES LO MISMO QUE EL useMemo PERO PENSADO PARA FUNCIONES, LO QUE SUCEDE TAMBIEN ES QUE 
  // useMemo PODEMOS USARLO TAMBIEN PARA FUNCIONES YA QUE EL useCallback FUNCIONA CON EL USEMEMO POR DEBAJO, LO UNICO QUE PERMITE EL useCallback ES 
  // SIMPLIFICAR LA SINTAXIS DE LA SIGUIENTE MANERA (YA NO ES NECESARIO PASARLE UNA FUNCION VACIA PARA QUE FUNCIONE) POR DEBAJO EL CALLBACK
  // FUNCIONA IGUAL QUE EL USEMEMO

  // EL useMemo TAMBIEN FUNCIONA PARA FUNCIONES
  // PARA QUE LAS FUNCIONES SE EJECUTEN UNA SOLA VEZ LAS VAMOS A PASAR COMO PARAMETRO EN EL async
  const getMovies = useCallback(
    // cada vez que cambie el search se ejecuta get movies y ahi le pasamos toda la funcion desde el async
    async ({ search }) => {
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
    
    // cada vez que cambia el Search tenemos que volver a generar esta funcion
    // si el parametro lo dejamos vacio no va a ocurrir nada porque se supone que cada vez qu cambie el search se debe ejecutar 
  }, [])
  // const getSortedMovies = () => {
  //   console.log("render", sortedMovies)
  //   // aca le decimos que hacemos una copia del array de objetos [...movies] y entramos a comparar entre a y b por titulos
  //   const sortedMovies = sort ? [...movies].sort((a, b) => a.title.localCompare(b.title)) : movies
  //   return sortedMovies
  // }

  // AHORA VAMOS A USAR EL useMemo() EL CUAL LO QUE HACE ES MEMORIZAR (COMPUTACIONES QUE HEMOS HECHO QUE QUEREMOS QUE EVITAR QUE SE HAGAN A NO SER QUE CAMBIEN LAS DEPENDENCIAS QUE LE INDIQUEMOS)UN VALOR PARA NO TENERLO QUE VOLVER A CALCULAR DEPENDIENDO DE UNA
  // LIST DE DEPENDENCIAS PARA ESTE EJEMPLO TOMAMOS EL CALCULO DE sortedMovies, LA MEMORIZAMOS Y TOME EL CALCULO Y LO HAGA SOLO CUANDO CAMBIE CIERTA INFORMACION o dependencias
// DE ESTA FORMA OPTIMIZAMOS EL COMPONENTE PORQUE ASI CAMBIE EL INPUT DE BUSQUEDA NO EJECUTA DE NUEVO EL RENDER
  const sortedMovies = useMemo(() => {
    console.log("sortedMovies")
    return (
      // console.log("Aca se ejecuta el sort", movies)
      sort ? [ ...movies ].sort((a, b) => a.title.localCompare(b.title)) : movies
    )
      // cada vez que cambia sort porque significa que esta organizando el orden o el movies cuando cambien las peliculas
  }, [sort, movies])
  


// HEMOS CREADO UNA CAJA NEGRA QUE CONSTANTEMENTE ITERAMOS EN ELLA SI SE CUMPLE EL 
// CONTRATO EN MOVIES ESTA LA LISTA DE PELICULAS Y GETMOVIES VAS A TENER UNA FORMA DE RECUPERAR LAS PELOCULAS
  return { movies: sortedMovies, getMovies, loading }
}