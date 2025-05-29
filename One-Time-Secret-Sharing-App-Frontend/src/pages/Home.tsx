import { type FC } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home: FC = () => {
	return (
		<Container>
			<Row className="mb-5 py-5">
				<Col md={ 6 } className="d-flex flex-column justify-content-center">
					<h1 className="display-4 fw-bold mb-3">Share Sensitive Information Securely</h1>
					<p className="lead mb-4">One-Time-Secret-Sharing-App allows you to share sensitive information with password protection. 
					Each secret can only be viewed once before it's permanently deleted.</p>
					<div>
						<Link to="/signup">
							<Button variant="primary" size="lg" className="me-3">Get Started</Button>
						</Link>
						<Link to="/login">
							<Button variant="outline-primary" size="lg">Sign In</Button>
						</Link>
					</div>
				</Col>
				<Col md={ 6 } className="d-flex justify-content-center align-items-center">
					<img
						src="https://images.pexels.com/photos/39389/keyboard-key-success-online-39389.jpeg?auto=compress&cs=tinysrgb&w=600"
						alt="Secure Data"
						className="img-fluid rounded shadow-lg"
						style={ { maxHeight: '350px' } }
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default Home;
