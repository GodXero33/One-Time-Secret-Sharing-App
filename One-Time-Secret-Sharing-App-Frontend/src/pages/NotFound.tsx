import { type FC } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound: FC = () => {
	return (
		<Container className="text-center py-5">
			<Row className="justify-content-center">
			<Col md={ 8 } lg={ 6 }>
					<h1 className="display-4 fw-bold mb-4">404</h1>
					<h2 className="mb-4">Page Not Found</h2>
					<p className="lead mb-5">The page you are looking for doesn't exist or has been moved.</p>
					<Link to="/">
						<Button variant="primary" size="lg">Go to Homepage</Button>
					</Link>
				</Col>
			</Row>
		</Container>
	);
};

export default NotFound;
