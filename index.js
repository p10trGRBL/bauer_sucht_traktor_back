import express from "express";
import "./db/server.js";
import errorHandler from "./middleware/ErrorHandler.js";
import tractorsRoutes from "./routes/tractorsRoutes.js";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
//
//app.use(cors({origin: 'https://production-website.com' }));

app.use(express.json());
app.use(cookieParser());

app.use("/tractors", tractorsRoutes);
app.use("/auth", authRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
