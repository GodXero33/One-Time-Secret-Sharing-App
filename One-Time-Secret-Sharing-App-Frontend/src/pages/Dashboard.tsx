import { useContext, useEffect, useState, type FC } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const Dashboard: FC = () => {
	const { user } = useContext(AuthContext);
	const [joinDate, setJoinDate] = useState<string>('');

	useEffect(() => {
		if (user && user.id) {
			const formattedDate = new Date().toLocaleDateString();

			setJoinDate(formattedDate);
		}
	}, [user]);

	return (
		<Container>
			<Row className="mb-4">
				<Col>
					<h1 className="fw-bold">Dashboard</h1>
					<p className="lead">Welcome back, { user?.email }</p>
				</Col>
			</Row>

			<Row className="mb-4">
				<Col md={ 4 }>
					<Card className="shadow-sm mb-4 mb-md-0">
						<Card.Body>
							<Card.Title className="fw-bold">Account Info</Card.Title>
							<div className="mt-3">
								<p><strong>Email:</strong> { user?.email }</p>
								<p><strong>Member since:</strong> { joinDate }</p>
							</div>
						</Card.Body>
					</Card>
				</Col>

				<Col md={ 8 }>
					<Card className="shadow-sm h-100">
						<Card.Body className="d-flex flex-column">
							<Card.Title className="fw-bold">Create a New Secret</Card.Title>
							<p className="text-muted">Share sensitive information securely with one-time access and password protection.</p>
							<div className="mt-auto">
								<Link to="/create-secret">
									<Button variant="primary" className="mt-3">
										<Plus size={ 18 } className="me-2" />
										Create New Secret
									</Button>
								</Link>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>

			<Row className="mb-4">
				<Col md={ 8 }>
					<Card className="shadow-sm h-100">
						<Card.Body className="d-flex flex-column">
							<Card.Title className="fw-bold">View Secret</Card.Title>
							<div className="mt-auto">
								<Link to="/view-secret">
									<Button variant="primary" className="mt-3">View Secret</Button>
								</Link>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Dashboard;
