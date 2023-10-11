import express from 'express';
import './db/server.js';
import { errorHandler } from './middleware/ErrorHandler.js';
import tractorsRoutes from './routes/tractorsRoutes.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT||8080;


app.use(express.json());
app.use(cors());
app.use('/tractors', tractorsRoutes);


app.use(errorHandler);



app.listen(PORT, ()=>console.log(`Server is listening on ${PORT}`));