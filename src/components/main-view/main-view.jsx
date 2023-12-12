import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row, Col, Container, Button, Card, CardGroup } from "react-bootstrap";
import "./main-view.scss";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://my-flix-fukui-fbfc1615b505.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
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
            director: doc.director.name,
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  return (
    <Container>
      <Row className="justify-content-md-center">
        {!user ? (
          <Col md={10} lg={8} xl={6}>
            <h1 className="centered-title">Fukui's Flixes</h1>
            <div className="my-4"></div>
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
            <div className="my-4"></div>
            <SignupView />
          </Col>
        ) : selectedMovie ? (
          <Col xs={10} sm={8} md={6}>
            <MovieView
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
          </Col>
        ) : movies.length === 0 ? (
          <div>The list is empty!</div>
        ) : (
          <>
            {movies.map((movie) => (
              <Col key={movie.id} xs={6} sm={4} md={3} className="mb-4">
                <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))}
            <button
              onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}
            >
              Logout
            </button>
          </>
        )}
      </Row>
    </Container>
  );
};
