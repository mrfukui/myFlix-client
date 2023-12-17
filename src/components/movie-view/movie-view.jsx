import PropTypes from "prop-types";
import "./movie-view.scss";
import {
  Row,
  Col,
  Container,
  Button,
  Card,
  CardGroup,
  Form,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

export const MovieView = ({ movies }) => {
  console.log("Movies array:", movies);
  // console.log("Movie ID from URL:", movieId);
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  if (!movie) {
    return <div>Movie not found</div>; // You can display a message or redirect here
  }

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Container>
                  <Row>
                    <Col>
                      <CardGroup>
                        <Card>
                          <Card.Img src={movie.image} />
                          <Card.Body>
                            <Card.Title>{movie.title}</Card.Title>
                            <Card.Text>{movie.description}</Card.Text>
                            <Card.Text>Genre: {movie.genre}</Card.Text>
                            <Card.Text>Director: {movie.director}</Card.Text>
                            <Link to="/">
                              <Button>Back</Button>
                            </Link>
                          </Card.Body>
                        </Card>
                      </CardGroup>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
};

// MovieView.propTypes = {
//   movies: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired, // Assuming `id` is a string
//       title: PropTypes.string.isRequired,
//       image: PropTypes.string.isRequired,
//       description: PropTypes.string.isRequired,
//       genre: PropTypes.string.isRequired,
//       director: PropTypes.string.isRequired,
//     })
//   ).isRequired,
// };
