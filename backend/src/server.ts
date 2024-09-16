import express from 'express';
import bodyParser from 'body-parser';
import { connectDB } from './config';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
var cookieParser = require('cookie-parser')

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', authRoutes);

connectDB();
app.listen(5000, () => console.log('Server running on port 5000'));
