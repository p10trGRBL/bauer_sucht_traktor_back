import express from 'express';
import './db/server.js';
import { errorHandler } from './middleware/ErrorHandler.js';
import tractorsRoutes from './routes/tractorsRoutes.js';

const app = express();
const PORT = process.env.PORT||3030;


app.use(express.json());
app.use('/books', tractorsRoutes);


app.use(errorHandler);



app.listen(port, ()=>console.log(`Server is listening on ${PORT}`));