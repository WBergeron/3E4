import express from "express";
import PLANETS from '../data/planets.js';
import HTTPERROR from 'http-errors';
import planetsRepository from '../repositories/planets-repository.js';

const router = express.Router();

class PlanetsRoutes {
    // Nous somme déja sous le path /planets
    constructor() {
        router.get('', this.getAll); // /planets
        router.get('/:idPlanet', this.getOne); // /planets/:idPlanet
        router.post('/', this.post); // /planets
        router.delete('/:idPlanet', this.deleteOne); // /planets/:idPlanet
    }

    async getAll(req, res, next) {
        try {
            const planets = await planetsRepository.retrieveAll();

            //Transformation
            

            res.status(200).json(planets);
        } catch (err) {
            return next(err);
        }
    }

    async getOne(req, res, next) {
        try {
            let planet = await planetsRepository.retrieveOne(req.params.idPlanet);

            if (!planet) 
            {
                return next(HTTPERROR.NotFound(`La planète avec l'identifiant ${req.params.idPlanet} n'existe pas.`));
            }
            //Transformer l'objet
            planet = planet.toObject({getters:false, virtuals:false});
            res.status(200).json(planet);
        } catch (err) {
            return next(err);
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

    async post(req, res, next) {
        try {
            //TODO: Validation S08
            let newPlanet = await planetsRepository.create(req.body);

            newPlanet = newPlanet.toObject({getters:false, virtuals:false});
            newPlanet = planetsRepository.transform(newPlanet);
            
            res.status(201).json(newPlanet);

        } catch (err) {
            return next(err);
        }
    }
}

new PlanetsRoutes();
export default router;