import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./main-view.scss";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(null);
  const [movies, setMovies] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchedMovies = movies.filter((movie) => {
    if (searchInput) {
      return movie.title.toLowerCase().includes(searchInput.toLowerCase());
    }
  });

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

  const addFavorite = (id) => {
    fetch(
      `https://my-flix-fukui-fbfc1615b505.herokuapp.com/users/${user.username}/movies/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed to add");
        }
      })
      .then((user) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const removeFavorite = (id) => {
    fetch(
      `https://my-flix-fukui-fbfc1615b505.herokuapp.com/users/${user.username}/movies/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed to remove");
        }
      })
      .then((user) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        searchedMovies={searchedMovies}
        movies={movies}
      />
      <Row className="d-flex justify-content-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col
                    lg={5}
                    className="d-flex align-items-center"
                    style={{ minHeight: "95vh" }}
                  >
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col
                    lg={5}
                    className="d-flex align-items-center"
                    style={{ minHeight: "95vh" }}
                  >
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : searchInput ? (
                  <Row>
                    {searchedMovies.map((movie) => (
                      <Col
                        className="mt-4"
                        xs={12}
                        md={6}
                        lg={4}
                        key={movie.id}
                      >
                        <MovieCard
                          user={user}
                          movie={movie}
                          token={token}
                          setUser={setUser}
                        />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col
                        className="mt-4"
                        xs={12}
                        md={6}
                        lg={4}
                        key={movie.id}
                      >
                        <MovieCard
                          user={user}
                          movie={movie}
                          token={token}
                          setUser={setUser}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <ProfileView
                user={user}
                token={token}
                movies={movies}
                setUser={setUser}
              />
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
