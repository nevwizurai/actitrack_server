// Environment variables
import dotenv from "dotenv";
dotenv.config();

// Import libraries
import express, { Application, json } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";

// Server init
const app: Application = express();
const PORT: string | number = process.env.PORT || 5000;
const ORIGIN: string = process.env.ORIGIN as string;

// Server middleware
app.use(cors({ origin: ORIGIN }));
app.use(json());

// Database connect then starting server
mongoose.set("strictQuery", true);
mongoose
  .connect(`${process.env.DB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then((): void => {
    console.log(`Database connected...`);
    app.listen(PORT, (): void => console.log(`Server up and running on port ${PORT}...`));
  })
  .catch((err) => {
    console.log(err);
  });
