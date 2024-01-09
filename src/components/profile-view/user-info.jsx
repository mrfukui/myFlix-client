import { Row, Col, Card } from "react-bootstrap";

export const UserInfo = ({ email, name }) => {
  return (
    <Card className="m-3 border-0">
      <Row>
        <Col>
          <span style={{ textDecoration: "underline", fontSize: "larger" }}>{name}</span>
        </Col>
        <Col>
          <span style={{ textDecoration: "underline", fontSize: "larger" }}>{email}</span>
        </Col>
      </Row>
    </Card>
  );
};
