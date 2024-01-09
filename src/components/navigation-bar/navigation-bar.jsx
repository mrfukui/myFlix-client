import { Navbar, Container, Nav, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({
  user,
  onLoggedOut,
  searchInput,
  setSearchInput,
  searchedMovies,
}) => {
  const handleMovieSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchReset = () => {
    setSearchInput("");
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ color: 'white' }}>
          Fukui's Flixes
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login" style={{ color: 'white' }}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" style={{ color: 'white' }}>
                  Sign-Up
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Form>
                  <Form.Group>
                    <Form.Control
                      value={searchInput}
                      type="text"
                      placeholder="Search movies, genres, or directors..."
                      onChange={handleMovieSearch}
                    />
                  </Form.Group>
                </Form>
                <Nav.Link as={Link} to="/" style={{ color: 'white' }}>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile" style={{ color: 'white' }}>
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut} as={Link} to="/login" style={{ color: 'white' }}>
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
