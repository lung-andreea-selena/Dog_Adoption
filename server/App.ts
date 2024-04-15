import cors from 'cors';
import express from 'express';
import DogRoutes from './routes/DogRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', DogRoutes);

export default app;
