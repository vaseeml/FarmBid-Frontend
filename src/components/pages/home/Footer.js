import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../../Footer.css'; // Import CSS for additional styling

function Footer() {
  return (
    <footer className="footer fixed-bottom">
      <Container>
        <Row className=' justify-content-center'>
          <Col xs={12} md={6} className="text-md-right">
            <p>&copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
