import { useState, useContext, type FC, type FormEvent } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const Login: FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const { login } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		if (!email || !password) {
			setError('Please enter both email and password');
			return;
		}

		setError('');
		setLoading(true);

		try {
			const response = await axios.post('/api/login', { email, password });

			login(response.data.token);
			toast.success('Login successful!');
			navigate('/dashboard');
		} catch (err: any) {
			const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';

			setError(errorMessage);
			toast.error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container>
			<Row className="justify-content-center">
				<Col md={ 6 }>
					<Card className="shadow-sm">
						<Card.Body className="p-4">
							<div className="text-center mb-4">
								<h2 className="fw-bold">Log In</h2>
								<p className="text-muted">Sign in to your One-Time Secret Sharing App account</p>
							</div>

							{ error && <Alert variant="danger">{ error }</Alert> }

							<Form onSubmit={handleSubmit}>
								<Form.Group className="mb-3" controlId="email">
									<Form.Label>Email address</Form.Label>
									<Form.Control
										type="email"
										placeholder="Enter your email"
										value={ email }
										onChange={ (event) => setEmail(event.target.value) }
										required
									/>
								</Form.Group>

								<Form.Group className="mb-4" controlId="password">
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										placeholder="Enter your password"
										value={ password }
										onChange={ (event) => setPassword(event.target.value) }
										required
									/>
								</Form.Group>

								<Button 
									variant="primary" 
									type="submit" 
									className="w-100 py-2" 
									disabled={ loading }
								>
									{ loading ? 'Logging in...' : 'Log In' }
								</Button>
							</Form>

							<div className="text-center mt-4">
								<p className="mb-0">Don't have an account? <Link to="/signup">Sign Up</Link></p>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Login;
