import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from './db';
import crypto from 'crypto';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

function authenticateToken (req: Request, res: Response, next: NextFunction): Response {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) return res.status(401).json({ message: 'No token provided' });

	jwt.verify(token, JWT_SECRET, (err, user) => {
		if (err) return res.status(403).json({ message: 'Invalid token' });

		(req as any).user = user;

		next();
	});
}

app.post('/api/signup', async (req: Request, res: Response) => {
	const { email, password } = req.body;

	if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const [result] = await pool.query('INSERT INTO users (email, password_hash) VALUES (?, ?)', [email, hashedPassword]);

		res.status(201).json({ message: 'User created' });
	} catch (err: any) {
		if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ message: 'Email already exists' });

		res.status(500).json({ message: 'Server error' });
	}
});

app.post('/api/login', async (req: Request, res: Response) => {
	const { email, password } = req.body;

	if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

	try {
		const [rows]: any = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
		const user = rows[0];

		if (!user) return res.status(400).json({ message: 'Invalid credentials' });

		const validPassword = await bcrypt.compare(password, user.password_hash);

		if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });

		const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

		res.json({ token });
	} catch {
		res.status(500).json({ message: 'Server error' });
	}
});

app.get('/api/me', authenticateToken, async (req: Request, res: Response) => {
	try {
		const userId = (req as any).user.id;
		const [rows]: any = await pool.query('SELECT id, email, created_at FROM users WHERE id = ?', [userId]);
		const user = rows[0];

		if (!user) return res.status(404).json({ message: 'User not found' });

		res.json(user);
	} catch {
		res.status(500).json({ message: 'Server error' });
	}
});

app.post('/api/secret', authenticateToken, async (req: Request, res: Response) => {
	const { message, password } = req.body;
	const userId = (req as any).user.id;

	if (!message || !password) return res.status(400).json({ message: 'Message and password are required' });

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const token = crypto.randomBytes(24).toString('hex');

		await pool.query(
			'INSERT INTO secrets (token, message, password_hash, creator_user_id) VALUES (?, ?, ?, ?)',
			[token, message, hashedPassword, userId]
		);

		res.status(201).json({ url: `/secret/${token}` });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
});

app.get('/api/secret/:token', async (req: Request, res: Response) => {
	const { token } = req.params;

	try {
		const [rows]: any = await pool.query('SELECT id FROM secrets WHERE token = ?', [token]);

		if (rows.length === 0) return res.status(404).json({ message: 'Secret unavailable' });

		res.json({ message: 'Please enter the password to view the secret' });
	} catch {
		res.status(500).json({ message: 'Server error' });
	}
});

app.post('/api/secret/:token/view', async (req: Request, res: Response) => {
	const { token } = req.params;
	const { password } = req.body;
	const ip = req.ip;

	if (!password) return res.status(400).json({ message: 'Password is required' });

	try {
		const [rows]: any = await pool.query('SELECT * FROM secrets WHERE token = ?', [token]);
		const secret = rows[0];

		if (!secret) {
			await pool.query('INSERT INTO access_logs (token, success, ip_address) VALUES (?, ?, ?)', [token, false, ip]);
			return res.status(404).json({ message: 'Secret not found or already viewed' });
		}

		const passwordMatch = await bcrypt.compare(password, secret.password_hash);

		await pool.query('INSERT INTO access_logs (token, success, ip_address) VALUES (?, ?, ?)', [token, passwordMatch, ip]);

		if (!passwordMatch) return res.status(403).json({ message: 'Incorrect password' });

		await pool.query('DELETE FROM secrets WHERE token = ?', [token]);

		res.json({ message: secret.message });
	} catch {
		res.status(500).json({ message: 'Server error' });
	}
});

app.listen(PORT, () => {
	console.log(`Server running on http://127.0.0.1:${PORT}`);
});
