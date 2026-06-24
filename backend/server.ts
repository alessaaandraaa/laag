import "dotenv/config"; // automatically loads .env
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

mongoose
  .connect(process.env.DATABASE_URL || "http://localhost:3000/")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

app.listen(3000, () => {
  console.log(`> Ready on http://localhost:3000`);
});

export default app;
