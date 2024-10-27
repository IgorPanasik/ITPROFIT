import cors from 'cors';
import express from 'express';

const app = express();
const port = 9090;

app.use(cors());
app.use(express.json());

app.post('/api/registration', (req, res) => {
	if (
		!req.body.name ||
		!req.body.email ||
		!req.body.phone ||
		!req.body.message
	) {
		res.status(400).json({
			status: 'error',
			message: 'All fields are required',
		});
		return;
	}

	if (Math.random() > 0.5) {
		res.status(400).json({
			status: 'error',
			message: 'Bad request',
		});
		return;
	}

	res.status(200).json({
		status: 'success',
		message: 'You are registered',
	});
});

app.get('/api/ping', (req, res) => {
	res.status(200).json({
		status: 'success',
		message: 'Server is ready',
	});
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
