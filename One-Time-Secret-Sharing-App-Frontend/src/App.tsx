import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import Dashboard from './pages/Dashboard.tsx';
import CreateSecret from './pages/CreateSecret.tsx';
import ViewSecret from './pages/ViewSecret.tsx';
import NotFound from './pages/NotFound.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import PrivateRoute from './components/PrivateRoute.tsx';

export default function App () {
	return (
		<AuthProvider>
			<Router>
				<div className="d-flex flex-column min-vh-100">
					<Header />
					<main className="flex-grow-1">
						<Routes>
							<Route path="/" element={ <Home /> } />
							<Route path="/login" element={ <Login /> } />
							<Route path="/signup" element={ <Signup /> } />
							<Route path="/dashboard" element={
								<PrivateRoute>
									<Dashboard />
								</PrivateRoute>
							} />
							<Route path="/create-secret" element={
								<PrivateRoute>
									<CreateSecret />
								</PrivateRoute>
							} />
							<Route path="/view-secret" element={
								<PrivateRoute>
									<ViewSecret />
								</PrivateRoute>
							} />
							<Route path="/secret/:token" element={ <ViewSecret /> } />
							<Route path="*" element={ <NotFound /> } />
						</Routes>
					</main>
					<Footer />
				</div>

				<ToastContainer position="top-right" autoClose={ 3000 } />
			</Router>
		</AuthProvider>
	);
}
