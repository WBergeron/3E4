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
            const transformsOptions = {};
            const filter = {};

            if (req.query.explorer) {
                filter.discoveredBy = req.query.explorer;
            }

            if (req.query.unit) {
                const unit = req.query.unit;
                if (unit === 'c') {
                    transformsOptions.unit = unit;
                } else {
                    return next(HTTPERROR.BadRequest('Le paramètre unit doit avoir comme valeur c pour Celsius'));
                }
            }

            let planets = await planetsRepository.retrieveAll(filter);

            //Transformation
            //Map == boucle
            planets = planets.map(p =>{
                p = p.toObject({getters:false, virtuals:false});
                p = planetsRepository.transform(p, transformsOptions);
                return p;
            });

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
            planet = planetsRepository.transform(planet);
            res.status(200).json(planet);
        } catch (err) {
            return next(err);
        }
        
    }


    async deleteOne(req, res, next) {
        try {
            const idPlanet = req.params.idPlanet;
            const deleteResult = await planetsRepository.deleteOne(idPlanet);
            if (deleteResult) {
                //J'ai supprimé une planète
                res.status(204).end();
            } else {
                //La planète n''existait pas
                return next(HTTPERROR.NotFound(`La planète avec l'identifiant ${req.params.idPlanet} n'existe pas.`));
            }
        } catch (err) {
            return next(err);
        }
        
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