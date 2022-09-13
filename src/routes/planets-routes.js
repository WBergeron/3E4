import express from "express";
import PLANETS from '../data/planets.js';
import HTTPERROR from 'http-errors';

const router = express.Router();

class PlanetsRoutes {
    // Nous somme déja sous le path /planets
    constructor() {
        router.get('', this.getAll); // /planets
        router.get('/:idPlanet', this.getOne); // /planets/:idPlanet
        router.post('/', this.post); // /planets
        router.delete('/:idPlanet', this.deleteOne); // /planets/:idPlanet
    }

    getAll(req, res, next) {
        res.status(200);
        res.json(PLANETS);
    }

    getOne(req, res, next) {

        // for(let planet of PLANETS){
        //     if(planet.id === idPlanet){
        //         // Planet trouver
        //         res.status(200);
        //         res.json(planet);
        //         break;
        //     }
        // }
        // res.status();

        const idPlanet = parseInt(req.params.idPlanet, 10);
        const planet = PLANETS.filter((p) => p.id === idPlanet)
        if (planet.length > 0) {
            res.status(200);
            res.json(planet[0]);
        }
        else {
            next(HTTPERROR.NotFound(`La planète avec l'identifiant ${idPlanet} n'existe pas`));
        }
    }


    deleteOne(req, res, next) {
        const idPlanet = parseInt(req.params.idPlanet, 10);
        const index = PLANETS.findIndex(p => p.id === idPlanet);

        if (index === -1) {
            return next(HTTPERROR.NotFound(`La planète avec l'identifiant ${idPlanet} n'existe pas`))
        }
        PLANETS.splice(index, 1);
        res.status(204).end();
    }

    post(req, res, next) {
        const newPlanet = req.body;

        if (newPlanet) {

            const index = PLANETS.findIndex(p => p.id === req.body.id);

            if (index === -1) {
                PLANETS.push(newPlanet);
                res.status(201).json(newPlanet);
            }
            else {
                return next(HTTPERROR.Conflict(`Une planète avec l'identifiant ${req.body.id}`));
            }

        } else {
            return next(HTTPERROR.BadRequest('Aucune information tranmise'));
        }
    }
}

new PlanetsRoutes();
export default router;