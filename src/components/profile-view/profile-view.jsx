import { Row, Col, Card, Container } from "react-bootstrap";
import { UserInfo } from "./user-info";
import { UpdateUser } from "./update-user";
import { FavoriteMovies } from "./favorite-movies";

export const ProfileView = ({ user, movies }) => {
  const favoriteMovieList = movies.filter((m) =>
    user.favoritemovies.includes(m.id)
  );

  return (
    <Container>
      <Row className="mt-4 justify-content-around">
        <Col xs={12} sm={4} className="d-flex align-items-center">
          <Card>
            <Card.Body>
              <UserInfo name={user.username} email={user.email} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UpdateUser />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="bg-transparent border-0">
            <Card.Body>
              <FavoriteMovies favoriteMovieList={favoriteMovieList} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
