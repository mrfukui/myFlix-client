import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import {
  Row,
  Col,
  Container,
  Button,
  Card,
  CardGroup,
  Form,
} from "react-bootstrap";
import { UserInfo } from "./user-info";
import { UpdateUser } from "./update-user";
import { FavoriteMovies } from "./favorite-movies";

export const ProfileView = ({
  user,
  token,
  movies,
  setUser,
  addFavorite,
  removeFavorite,
}) => {
  const favoriteMovieList = movies.filter((m) =>
    user.favoritemovies.includes(m.id)
  );

  return (
    <Row>
      <Card className="border-0">
        <Col>
          <UserInfo name={user.username} email={user.email} />
          <FavoriteMovies favoriteMovieList={favoriteMovieList} />
          <UpdateUser />
        </Col>
      </Card>
    </Row>
  );
};
