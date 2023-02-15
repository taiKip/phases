import "reflect-metadata"
import connectDB from "./config/database";
import express, { Application, Request, Response } from 'express'
import morgan from 'morgan';
import swaggerUi from "swagger-ui-express"

import Router from './routes';


const PORT = process.env.PORT || 8000;

const app: Application = express();
app.use(express.json());
app.use(morgan("short"));
app.use(express.static("public"))

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.use(Router);

connectDB
  .initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port ", PORT);
    });
  })
  .catch((err) => {
      console.error(`Unable to connect to db`, err);
      process.exit(1)
  });
