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

//Export MainView component
export const MainView = () => {
  //state variable to retrieve stored user
  const storedUser = JSON.parse(localStorage.getItem("user"));
  //state variable to retrieve stored token
  const storedToken = localStorage.getItem("token");
  //state variable to store which user is present
  const [user, setUser] = useState(storedUser ? storedUser : null);
  //state variable to store which token is present
  const [token, setToken] = useState(null);
  //state variable to store array of movies
  const [movies, setMovies] = useState([]);
  //state variable to store what users input in the search bar
  const [searchInput, setSearchInput] = useState("");

  //create variable that changes searched input into all lowercase letters
  const searchedMovies = movies.filter((movie) => {
    if (searchInput) {
      return movie.title.toLowerCase().includes(searchInput.toLowerCase());
    }
  });

  //fetch movie data from API using stored token
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

  //add movie to user's favorite movie list
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

  //remove movie from user's favorite movie list
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
    //BrowserRouter enables SPA(single page application)
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
          {/* Sign-up page */}
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
          {/* Login page */}
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
          {/*Movie view*/}
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
          {/*Searched movies list*/}
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
                  //Movies list
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
          {/*Profile view*/}
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
