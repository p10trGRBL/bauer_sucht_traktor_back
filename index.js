import express from 'express';
import './db/server.js';
import  errorHandler  from './middleware/ErrorHandler.js';
import tractorsRoutes from './routes/tractorsRoutes.js';
import cors from 'cors';
import authRouter from './routes/authRouter.js';

const app = express();
const PORT = process.env.PORT||8080;



app.use(cors());
//aoo.use(cors({origin: 'https://production-website.com' }));

app.use(express.json());

app.use('/tractors',cors(), tractorsRoutes);
app.use('/auth',cors(), authRouter);

app.use(errorHandler);



app.listen(PORT, ()=>console.log(`Server is listening on ${PORT}`));