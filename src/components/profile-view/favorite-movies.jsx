import {
  Row,
  Col,
  Container,
  Button,
  Card,
  CardGroup,
  Form,
} from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const FavoriteMovies = ({ favoriteMovieList, token, setUser, user }) => {
  return (
    <>
      <Row>
        <h2>Favorite Movies</h2>
        {favoriteMovieList.map((movie) => {
          return (
            <Col key={movie.id} md={3}>
              <MovieCard
                movie={movie}
                token={token}
                setUser={setUser}
                user={user}
                showButton={false}
              />
            </Col>
          );
        })}
      </Row>
    </>
  );
};
