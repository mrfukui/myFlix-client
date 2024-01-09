import "./movie-view.scss";
import { Row, Col, Container, Button, Card, CardGroup } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

//creates MovieView component
export const MovieView = ({ movies }) => {
  //uses the URL to set movieId
  const { movieId } = useParams();
  //matches movieId found in URL to id found in the movie array
  const movie = movies.find((m) => m.id === movieId);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <CardGroup>
            <Card className="border-0">
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
  );
};
