require("dotenv").config();
import { AppDataSource } from "./data-source";
import * as express from "express";
import categoryRoute from "./routes/categoryRoute";
import productRotute from "./routes/productRoute";
import authRouter from "./routes/authRoute";
import cartRoute from "./routes/cartRotue";
import * as cors from "cors";
import AppError from "./utils/appError";
import handleErrors = require("./controllers/errorController");
import * as cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", categoryRoute);
app.use("/api", productRotute);
app.use("/api", authRouter);
app.use("/api", cartRoute);

app.all("*", (req, res, next) => {
  // const err: any= new Error(`Cant't find ${req.originalUrl} on server`);
  // err.status = 'fail'
  // err.statusCode = 404;
  next(new AppError(`Cant't find ${req.originalUrl} on server`, 404));
});

app.use(handleErrors);

AppDataSource.initialize()
  .then(async () => {
    app.listen(3000, () => console.log("app is running"));
  })
  .catch((error) => console.log(error));
