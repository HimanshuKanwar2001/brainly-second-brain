import express from "express";
import authRouter from "./routes/authRoutes";
import dotenv from "dotenv";
import ConnectToDB from "./utils/db";
import featureRoute from "./routes/featureRoutes";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  res.send("Hello from express + Typescript");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/feature",featureRoute);

app.listen(PORT, () => {
  ConnectToDB();
  console.log(`Server is running on port ${PORT}`);
});
