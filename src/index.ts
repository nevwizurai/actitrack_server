import express, { Request, Response, Application } from "express";

const app: Application = express();
const PORT: string | number = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response): void => {
  res.send("Hello from nodejs typescript");
});

app.listen(PORT, (): void => {
  console.log(`Server running here 👉 https://localhost:${PORT}`);
});
