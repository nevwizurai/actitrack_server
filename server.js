const express = require("express");

// Server init
const app = express();

// Middleware
app.use(express.json());

// Server start
app.listen(5000, () => {
  console.log("Server up and running...");
});
