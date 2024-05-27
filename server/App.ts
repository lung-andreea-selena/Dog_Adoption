import cors from 'cors';
import express from 'express';
import DogPossessionRouter from './routes/DogPossessionRouter';
import loginRegisterRoutes from './routes/loginRegisterRoutes';
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', DogPossessionRouter);
app.use('/api', loginRegisterRoutes);

export default app;
