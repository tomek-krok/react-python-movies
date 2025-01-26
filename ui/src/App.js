import './App.css';
import {useEffect, useState} from "react";
import "milligram";
import MovieForm from "./MovieForm";
import MoviesList from "./MoviesList";


function App() {
    const [movies, setMovies] = useState([]);
    const [addingMovie, setAddingMovie] = useState(false);
    // const [removeMovie, setRemoveMovie] = useState(false);

    async function handleAddMovie(movie) {
        const response = await fetch('/movies', {
          method: 'POST',
          body: JSON.stringify(movie),   
          headers: { 'Content-Type': 'application/json' }    
        });
      
        if (response.ok) {
          setMovies([...movies, movie]);
          setAddingMovie(false);
        }
      
    }

    async function handleRemoveMovie(movie) {
        const response = await fetch(`/movies/${movie.id}`, {
          method: 'DELETE'   
        });
      
        if (response.ok) {
          setMovies([...movies, movie]);
          const removeMovie = movies.filter(m => m !== movie);

          setMovies(removeMovie);
        }
      
    }

    //use effect = it will fetch data from backend only on start 
    // 
    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch(`/movies`);

            if (response.ok) {
                const movies = await response.json();
                setMovies(movies);
            }
        };
    
        fetchMovies();
// empty array [] gives option that it is executed only onece because array is empty and it guarantte thei1 execution
// in other word effect worka on changes of array so if it is empty never change
    }, []);

    return (
        <div className="container">
            <h1>My favourite movies to watch</h1>
            {movies.length === 0
                ? <p>No movies yet. Maybe add something?</p>
                : <MoviesList movies={movies}
                              onDeleteMovie={handleRemoveMovie}
                />}
            {addingMovie
                ? <MovieForm onMovieSubmit={handleAddMovie}
                             buttonLabel="Add a movieX"
                />
                : <button onClick={() => setAddingMovie(true)}>Add a movie</button>}
            
        </div>
    );
}

export default App;
