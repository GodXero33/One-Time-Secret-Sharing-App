import { useContext, type FC } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import AuthContext from '../context/AuthContext.tsx';

const Header: FC = () => {
	const { isAuthenticated, logout } = useContext(AuthContext);
	const navigate = useNavigate();
	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	return (
		<Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
			<Container>
				<Navbar.Brand as={ Link } to="/" className="d-flex align-items-center">
					<Lock size={ 24 } className="me-2" />
					<span>SecretShare</span>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
					<Nav.Link as={ Link } to="/">Home</Nav.Link>
					
						{isAuthenticated ? (
							<>
								<Nav.Link as={ Link } to="/dashboard">Dashboard</Nav.Link>
								<Nav.Link as={ Link } to="/create-secret">Create Secret</Nav.Link>
								<Nav.Link onClick={handleLogout}>Logout</Nav.Link>
							</>
						) : (
							<>
								<Nav.Link as={ Link } to="/login">Login</Nav.Link>
								<Nav.Link as={ Link } to="/signup">Signup</Nav.Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;