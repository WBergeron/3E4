import express from "express";
import dayjs from "dayjs";
import planetsRoutes from './routes/planets-routes.js';

import database from './libs/database.js';

import errors from "./middlewares/errors.js";

database();
const app = express();
app.use(express.json()); // Permettre à notre serveur de comprendre le json reçu

app.use('/planets', planetsRoutes);

app.use(errors);

export default app;