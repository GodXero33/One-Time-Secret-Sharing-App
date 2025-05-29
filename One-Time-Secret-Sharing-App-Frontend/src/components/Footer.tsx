import { type FC } from 'react';
import { Container } from 'react-bootstrap';

const Footer: FC = () => {
	const year = new Date().getFullYear();
	const author = 'Sathish Shan';

	return (
		<footer className="bg-light py-3 mt-4">
			<Container className="text-center">
				<p className="mb-0 text-muted">
					&copy; { year } { author }. All rights reserved.
				</p>
			</Container>
		</footer>
	);
};

export default Footer;
