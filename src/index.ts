import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDatabase from "./config/connectDatabase";
import { initRoutes } from "./presentations/routes/index.route";
import "./utils/cron-jobs";
dotenv.config();
const app = express();

//config connect FE
app.use(express.json());
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

//endpoints
initRoutes(app);

//connectDB
connectDatabase();

const port = process.env.PORT_SERVER || 8080;
app.listen(port, () => {
  console.log(`Server is running port ${port}`);
});
