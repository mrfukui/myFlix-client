import {
  Row,
  Col,
  Container,
  Button,
  Card,
  CardGroup,
  Form,
} from "react-bootstrap";

export const UserInfo = ({ email, name }) => {
  return (
    <Card className="m-3 border-0">
      <Row>
        <Col>User: {name}</Col>
        <Col>Email: {email}</Col>
      </Row>
    </Card>
  );
};
