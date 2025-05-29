import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

axios.interceptors.response.use(
	response => response,
	error => {
		if (error.response && error.response.status === 401) {
			localStorage.removeItem('token');
			window.location.href = '/login';
		}

		return Promise.reject(error);
	}
);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
