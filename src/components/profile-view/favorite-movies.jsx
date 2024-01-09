import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const FavoriteMovies = ({ favoriteMovieList, token, setUser, user }) => {
  return (
    <>
      <Row className="mt-4">
        <h2 style={{ color: "white" }}>Favorite Movies</h2>
        {favoriteMovieList.map((movie) => {
          return (
            <Col key={movie.id} md={4} className="mt-4">
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
