import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(null);
  const [movies, setMovies] = useState([
    // {
    //   id: 1,
    //   title: 'Howl`s Moving Castle',
    //   description: 'When an unconfident young woman is cursed with an old body by a spiteful witch, her only chance of breaking the spell lies with a self-indulgent yet insecure young wizard and his companions in his legged, walking castle.',
    //   director: 'Hayao Miyazaki',
    //   genre: 'Animated',
    //   image: 'https://m.media-amazon.com/images/M/MV5BNmM4YTFmMmItMGE3Yy00MmRkLTlmZGEtMzZlOTQzYjk3MzA2XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg'
    // },
    // {
    //   id: 2,
    //   title: 'Parasite',
    //   description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    //   director: 'Bong Joon Ho',
    //   genre: 'Thriller',
    //   image: 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg'
    // },
    // {
    //   id: 3,
    //   title: 'Eternal Sunshine of the Spotless Mind',
    //   description: 'When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories forever.',
    //   director: 'Michel Gondry',
    //   genre: 'Sci-Fi',
    //   image: 'https://m.media-amazon.com/images/M/MV5BYjQ1ZWFlZDQtZDhjOS00NjdmLTg1MzEtYjM0MzM0MGIxYTU5XkEyXkFqcGdeQXVyMTEyMDcwNw@@._V1_.jpg'
    // }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (!user) {
    return (
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
      />
    );
  }

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://my-flix-fukui-fbfc1615b505.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((doc) => {
          return {
            id: doc._id,
            title: doc.title,
            description: doc.description,
            image: doc.imageurl,
            genre: doc.genre.name,
            director: doc.director.name
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
        key={movie.id}
        movie={movie}
        onMovieClick={(newSelectedMovie) => {
          setSelectedMovie(newSelectedMovie);
        }}
        />
      ))}
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
    </div>
  );
};