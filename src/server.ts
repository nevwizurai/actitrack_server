// Environment variables
import dotenv from "dotenv";
dotenv.config();

// Import libraries
import express, { Application } from "express";
import cors from "cors";

// Server init
const app: Application = express();
const PORT: string | number = process.env.PORT || 5000;
const ORIGIN: string = process.env.ORIGIN as string;

// Server middleware
app.use(cors({ origin: ORIGIN }));

// Server start
app.listen(PORT, (): void => {
  console.log(`Server up and running at port ${PORT}...`);
});
