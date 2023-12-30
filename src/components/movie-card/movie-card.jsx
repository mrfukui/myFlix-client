import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie, user, token, setUser, showButton }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user && user.favoritemovies && user.favoritemovies.includes(movie.id)) {
      setIsFavorite(true);
    }
  }, [user]);

  const addFavoriteMovie = () => {
    console.log(`${token}`);
    fetch(
      `https://my-flix-fukui-fbfc1615b505.herokuapp.com/users/${user?.username}/movies/${movie.id}`,
      { method: "POST", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Failed to add fav movie");
        }
      })
      .then((user) => {
        if (user) {
          alert("successfully added to favorites");
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setIsFavorite(true);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const removeFavoriteMovie = () => {
    fetch(
      `https://my-flix-fukui-fbfc1615b505.herokuapp.com/users/${user.username}/movies/${movie.id}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
        }
      })
      .then((user) => {
        if (user) {
          alert("successfully deleted from favorites");
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setIsFavorite(false);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Link
      to={`/movies/${encodeURIComponent(movie.id)}`}
      style={{ textDecoration: "none" }}
    >
      <Col>
        <Card className="shadow mb-2 mx-auto">
          <Card.Img className="movie-image" variant="top" src={movie.image} />
          <Card.Body className="movie-card-body d-flex flex-column">
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>{movie.description}</Card.Text>
            {showButton && !isFavorite ? (
              <Button className="mt-auto" onClick={addFavoriteMovie}>
                Add To Favorite Movies
              </Button>
            ) : (
              showButton && (
                <Button className="mt-auto" onClick={removeFavoriteMovie}>
                  Remove From Favorite Movies
                </Button>
              )
            )}
          </Card.Body>
        </Card>
      </Col>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

MovieCard.defaultProps = {
  showButton: true,
};
