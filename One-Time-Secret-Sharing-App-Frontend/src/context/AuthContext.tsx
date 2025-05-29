import { createContext, useState, useEffect, type ReactNode, type FC } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface User {
	id: number;
	email: string;
}

interface AuthContextType {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	loading: boolean;
	login: (token: string) => void;
	logout: () => void;
}

interface AuthProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	token: null,
	isAuthenticated: false,
	loading: true,
	login: () => {},
	logout: () => {}
});

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const initAuth = async () => {
			if (token) {
				try {
					axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

					const response = await axios.get('/api/me');

					setUser(response.data);
					setIsAuthenticated(true);
				} catch (error) {
					console.error('Authentication error:', error);

					localStorage.removeItem('token');
					setToken(null);
					setUser(null);
					setIsAuthenticated(false);

					delete axios.defaults.headers.common['Authorization'];
				}
			}

			setLoading(false);
		};

		initAuth();
	}, [token]);

	const login = (newToken: string) => {
		localStorage.setItem('token', newToken);
		setToken(newToken);
	
		try {
			const decoded: any = jwtDecode(newToken);

			setUser({ id: decoded.id, email: decoded.email });
			setIsAuthenticated(true);

			axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
		} catch (error) {
			console.error('Error decoding token:', error);
			logout();
		}
	};

	const logout = () => {
		localStorage.removeItem('token');
		setToken(null);
		setUser(null);
		setIsAuthenticated(false);

		delete axios.defaults.headers.common['Authorization'];
	};

	return (
		<AuthContext.Provider
			value={ {
				user,
				token,
				isAuthenticated,
				loading,
				login,
				logout
			} }
		>
			{ children }
		</AuthContext.Provider>
	);
};

export default AuthContext;
