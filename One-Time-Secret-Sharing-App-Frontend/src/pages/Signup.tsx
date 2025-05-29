import { useState, type FC, type FormEvent } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Signup: FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	
	const navigate = useNavigate();

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		if (!email || !password || !confirmPassword) {
			setError('Please fill in all fields');
			return;
		}

		if (password !== confirmPassword) {
			setError('Passwords do not match');
			return;
		}

		const passwordSteps = [
			{
				test: (pw: string) => pw.length >= 8,
				message: 'Password must be at least 8 characters long'
			},
			{
				test: (pw: string) => /[a-z]/.test(pw),
				message: 'Password must include at least one lowercase letter'
			},
			{
				test: (pw: string) => /[A-Z]/.test(pw),
				message: 'Password must include at least one uppercase letter'
			},
			{
				test: (pw: string) => /\d/.test(pw),
				message: 'Password must include at least one number'
			},
			{
				test: (pw: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pw),
				message: 'Password must include at least one special character'
			}
		];

		for (const step of passwordSteps) {
			if (!step.test(password)) {
				setError(step.message);
				return;
			}
		}

		setError('');
		setLoading(true);

		try {
			await axios.post('/api/signup', { email, password });
			toast.success('Account created successfully! Please log in.');
			navigate('/login');
		} catch (err: any) {
			const errorMessage = err.response?.data?.message || 'Signup failed. Please try again.';

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
								<h2 className="fw-bold">Create Account</h2>
								<p className="text-muted">Sign up for a  One-Time Secret Sharing App account</p>
							</div>

							{ error && <Alert variant="danger">{ error }</Alert> }

							<Form onSubmit={ handleSubmit }>
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

								<Form.Group className="mb-3" controlId="password">
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										placeholder="Create a password"
										value={ password }
										onChange={ (event) => setPassword(event.target.value) }
										required
									/>
									<Form.Text className="text-muted">Password must be at least 6 characters long</Form.Text>
								</Form.Group>

								<Form.Group className="mb-4" controlId="confirmPassword">
									<Form.Label>Confirm Password</Form.Label>
									<Form.Control
										type="password"
										placeholder="Confirm your password"
										value={ confirmPassword }
										onChange={ (event) => setConfirmPassword(event.target.value) }
										required
									/>
								</Form.Group>

								<Button 
									variant="primary" 
									type="submit" 
									className="w-100 py-2" 
									disabled={ loading }
								>
									{ loading ? 'Creating Account...' : 'Sign Up' }
								</Button>
							</Form>

							<div className="text-center mt-4">
								<p className="mb-0">Already have an account? <Link to="/login">Log In</Link></p>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Signup;
