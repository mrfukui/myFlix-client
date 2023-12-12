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

export const MovieView = ({ movie, onBackClick }) => {
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
                          <div>
                            <img src={movie.image} />
                          </div>
                          <Card.Body>
                            <div>
                              <span>Title: </span>
                              <span>{movie.title}</span>
                            </div>
                            <div>
                              <span>Description: </span>
                              <span>{movie.description}</span>
                            </div>
                            <div>
                              <span>Genre: </span>
                              <span>{movie.genre}</span>
                            </div>
                            <div>
                              <span>Director: </span>
                              <span>{movie.director}</span>
                            </div>
                            <div>
                              <button onClick={onBackClick}>Back</button>
                            </div>
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

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
