import { useState, type FC, type FormEvent } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, InputGroup } from 'react-bootstrap';
import { Copy, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';

const CreateSecret: FC = () => {
	const [message, setMessage] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [secretUrl, setSecretUrl] = useState('');

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		if (!message || !password) {
			setError('Please enter both message and password');
			return;
		}

		setError('');
		setLoading(true);

		try {
			const response = await axios.post('/api/secret', { message, password });
			const secret = `${response.data.url.split('/')[2]}`;

			setSecretUrl(secret);
			toast.success('Secret created successfully!');
		} catch (err: any) {
			const errorMessage = err.response?.data?.message || 'Failed to create secret. Please try again.';

			setError(errorMessage);
			toast.error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	const copyToClipboard = () => {
		navigator.clipboard.writeText(secretUrl);
		toast.info('Secret URL copied to clipboard!');
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<Container>
			<Row className="justify-content-center">
				<Col md={8}>
					<Card className="shadow-sm">
						<Card.Body className="p-4">
							<h2 className="fw-bold mb-4">Create a One-Time Secret</h2>

							{ error && <Alert variant="danger">{ error }</Alert> }

							{ secretUrl ? (
								<div className="text-center">
									<Alert variant="success">
										<h5 className="mb-3">Secret Created Successfully!</h5>
										<p>Share this URL with your recipient. They will need the password to view the secret.</p>
										<p className="small mb-0">Remember: The secret can only be viewed once!</p>
									</Alert>
									
									<InputGroup className="mb-4 mt-4">
										<Form.Control type="text" value={ secretUrl } readOnly />
										<Button variant="outline-primary" onClick={ copyToClipboard }>
											<Copy size={ 18 } />
										</Button>
									</InputGroup>
									
									<Button variant="primary" onClick={ () => {
										setMessage('');
										setPassword('');
										setSecretUrl('');
									} }
									>
										Create Another Secret
									</Button>
								</div>
							) : (
							<Form onSubmit={ handleSubmit }>
								<Form.Group className="mb-4" controlId="message">
									<Form.Label>Secret Message</Form.Label>
									<Form.Control
										as="textarea"
										rows={ 5 }
										placeholder="Enter the sensitive information you want to share..."
										value={ message }
										onChange={ (event) => setMessage(event.target.value) }
										required
									/>
									<Form.Text className="text-muted">This secret will self-destruct after being viewed once.	</Form.Text>
								</Form.Group>

								<Form.Group className="mb-4" controlId="password">
									<Form.Label>Password Protection</Form.Label>
									<InputGroup>
										<Form.Control
											type={showPassword ? "text" : "password"}
											placeholder="Create a password for your secret"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											required
										/>
										<Button variant="outline-secondary" onClick={togglePasswordVisibility}>
											{ showPassword ? <EyeOff size={ 18 } /> : <Eye size={ 18 } /> }
										</Button>
									</InputGroup>
									<Form.Text className="text-muted">Share this password with the recipient through a different secure channel.</Form.Text>
								</Form.Group>

								<div className="d-grid">
								<Button 
									variant="primary" 
									type="submit" 
									disabled={ loading }
									className="py-2"
								>
									{ loading ? 'Creating...' : 'Create Secret' }
								</Button>
								</div>
							</Form>
							)}
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default CreateSecret;
