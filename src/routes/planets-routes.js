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

    post(req, res, next) {

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

}

new PlanetsRoutes();
export default router;