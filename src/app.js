import express from "express";
import dayjs from "dayjs";
import planetsRoutes from './routes/planets-routes.js';

import database from './libs/database.js';

import errors from "./middlewares/errors.js";

database();
const app = express();
app.use(express.json()); // Permettre à notre serveur de comprendre le json reçu

//TODO: Ajouter du code ici

app.get('/premiere', (req, res) => {

    res.status(200);
    res.set('Content-Type', 'text/plain');
    res.send('Première route avec express');
});

app.get('/date', (req, res) => {

    res.status(200);
    res.set('Content-Type', 'text/plain');
    const today = dayjs(); 
    res.send(today.format());
});

app.get('/maths/:operation', (req, res)=> {
    const a = parseInt(req.query.a, 10);
    const b = parseInt(req.query.b, 10);
    
    const operation = req.params.operation;
    let result = 0;
    const somme = (a+b).toString();

    switch (operation) {
        case 'somme':
            result = (a+b).toString();
            break;

        case 'soustraction':
            result = (a-b).toString();
            break;

        case 'division':
            result = (a/b).toString();
            break;
        
        case 'multiplication':
            result = (a*b).toString();
            break;

        case 'modulo':
            result = (b%a).toString();
            break;
    
        default:
            result = 'Opération non définie';
            break;
    }

    res.status(200);
    res.set('Content-Type', 'text/plain');
    res.send(result);
});

app.use('/planets', planetsRoutes);

app.use(errors);

export default app;