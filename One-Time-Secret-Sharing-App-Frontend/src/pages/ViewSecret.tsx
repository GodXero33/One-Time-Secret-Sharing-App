import { useState, type FC, type FormEvent } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Eye, EyeOff, AlertTriangle } from 'lucide-react';

const ViewSecret: FC = () => {
	const [token, setToken] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState('');
	const [secretMessage, setSecretMessage] = useState('');

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		if (!token) return setError('Please paste the token.');
		if (!password) return setError('Please enter the password.');

		setError('');
		setLoading(true);
		setSubmitting(true);

		try {
			const response = await axios.post(`/api/secret/${token}/view`, { password });

			setSecretMessage(response.data.message);
			toast.success('Secret revealed successfully! This secret has been permanently deleted.');
		} catch (err: any) {
			const errorMessage = err.response?.data?.message || 'Failed to view secret. Token or password may be wrong.';

			setError(errorMessage);
			toast.error(errorMessage);
		} finally {
			setSubmitting(false);
			setLoading(false);
		}
	};

	const togglePasswordVisibility = () => setShowPassword(!showPassword);

	return (
		<Container>
			<Row className="justify-content-center">
				<Col md={ 8 }>
					<Card className="shadow-sm">
						<Card.Body className="p-4">
							<div className="text-center mb-4">
								<h2 className="fw-bold">Reveal Secret</h2>
								<p className="text-muted">Paste token and enter password to view the one-time secret</p>
							</div>

							{
								error && (
									<Alert variant="danger" className="d-flex align-items-center">
										<AlertTriangle size={ 20 } className="me-2" />
										{ error }
									</Alert>
								)
							}

							{
								secretMessage ? (
									<div>
										<Alert variant="warning" className="mb-3">
											<h5 className="fw-bold">Secret Revealed</h5>
											<p className="mb-0 small">
												This secret has been permanently deleted and cannot be accessed again.
											</p>
										</Alert>

										<Card className="bg-light mb-4">
											<Card.Body>
												<Card.Title>Secret Message:</Card.Title>
												<Card.Text style={ { whiteSpace: 'pre-wrap' } }>{ secretMessage }</Card.Text>
											</Card.Body>
										</Card>
									</div>
								) : (
									<Form onSubmit={ handleSubmit }>
										<Form.Group className="mb-3" controlId="token">
											<Form.Label>Secret Token</Form.Label>
											<Form.Control
												type="text"
												placeholder="Paste secret token here"
												value={ token }
												onChange={ (evet) => setToken(evet.target.value) }
												required
											/>
										</Form.Group>

										<Form.Group className="mb-4" controlId="password">
											<Form.Label>Password</Form.Label>
											<InputGroup>
												<Form.Control
													type={ showPassword ? 'text' : 'password' }
													placeholder="Enter password"
													value={ password }
													onChange={ (evet) => setPassword(evet.target.value) }
													required
												/>
												<Button
													variant="outline-secondary"
													onClick={ togglePasswordVisibility }
												>
													{ showPassword ? <EyeOff size={ 18 } /> : <Eye size={ 18 } /> }
												</Button>
											</InputGroup>
										</Form.Group>

										<Alert variant="info" className="d-flex align-items-center">
											<div><strong>Note:</strong> This secret will be deleted after viewing.</div>
										</Alert>

										<div className="d-grid mt-4">
											<Button
												variant="primary"
												type="submit"
												disabled={ submitting || loading }
												className="py-2"
											>
												{ loading ? 'Revealing...' : 'Reveal Secret' }
											</Button>
										</div>
									</Form>
								)
							}
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default ViewSecret;
