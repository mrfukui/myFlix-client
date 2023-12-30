import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Container,
  Button,
  Card,
  CardGroup,
  Form,
} from "react-bootstrap";

export const UpdateUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleUpdate = (event) => {
    event.preventDefault();

    let data = {
      username: username,
      password: password,
      email: email,
      birthday: birthday,
    };

    fetch(
      `https://my-flix-fukui-fbfc1615b505.herokuapp.com/users/${user.username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    )
      .then(async (response) => {
        console.log("response:", response);
        if (response.ok) {
          alert("update successful");
          const data = await response.json();
          localStorage.setItem("user", JSON.stringify(data));
          window.location.reload();
        } else {
          const errorText = await response.text();
          console.log("Error response body:", errorText);
          alert("update failed");
        }
      })
      .catch((err) => console.log("error", err));
  };

  const deregister = () => {
    fetch(
      `https://my-flix-fukui-fbfc1615b505.herokuapp.com/users/${user.username}`,
      {
        method: "DELETE",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify(data),
      }
    ).then((response) => {
      if (response.ok) {
        setUser(null);
        // setMovies(null);
        localStorage.clear();
        alert("your account has been deleted");
        window.location.replace("/login");
      } else {
        alert("could not delete account");
      }
    });
  };

  return (
    <Card className="border-0 mt-4 mb-4">
      <Col>
        <Card.Title>Update Profile Info</Card.Title>
        <Form onSubmit={handleUpdate}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="3"
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Form.Group>
          <Button
            onClick={handleUpdate}
            className="mt-3"
            variant="primary"
            type="submit"
          >
            Update
          </Button>
        </Form>
        <Link to="/login">
          <Button
            variant="danger"
            type=""
            onClick={deregister}
            className="text-white mt-3"
          >
            Delete Account
          </Button>
        </Link>
      </Col>
    </Card>
  );
};
