import { useContext, type FC, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext.tsx';
import LoadingSpinner from './LoadingSpinner';

interface PrivateRouteProps {
	children: ReactNode;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
	const { isAuthenticated, loading } = useContext(AuthContext);

	if (loading) return <LoadingSpinner />;

	if (!isAuthenticated) return <Navigate to="/login" />;

	return <>{ children }</>;
};

export default PrivateRoute;
