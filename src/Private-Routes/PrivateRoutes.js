import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"
import { Spinner, Container, Row, Col ,Button } from 'react-bootstrap'
export default function PrivateRoute({children , permittedRoles}){
    const { user } = useAuth()
    if(!user && localStorage.getItem('token')){
        return <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Row>
            <Col>
                <Button
                    color="primary"
                    disabled
                    >
                    <Spinner size="sm">
                    </Spinner>
                    <span>
                        {' '}Loading...
                    </span>
                </Button>
            </Col>
        </Row>
    </Container>
    }
    if(!user){
        return <Navigate to='/loginPage' />
    }
    if(!permittedRoles.includes(user.role)){
        return <p>Nothing Found For You Here</p>
    }
    return children
}