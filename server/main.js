import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
//All router
import userRoutes from "./routes/user.route.js";
import categoryRoutes from "./routes/category.route.js";
import postRoutes from "./routes/post.route.js";
import publicRoutes from "./routes/public.route.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server start at port ${PORT}!!`);
});

app.use("/api/user", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/public", publicRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
