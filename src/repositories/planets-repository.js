import Planet from '../models/planet-model.js';
import dayjs from 'dayjs';

const ZERO_KELVIN = -273.15;

class PlanetsRepository {
    retrieveAll(filter = {}) {

        const filterSansWhere = {};

        const testFiltre = { discoveredBy : 'Skadex' }; // WHERE discoveredBy = 'Skadex'

        const testFiltreAnd = { temperature : {$gt: 240}, 'position.y':{$lt:500}}; // ($lt <) ($gt >) ($lte <=) ($gte >=)

        return Planet.find(filter); // comme un SELECT * FROM planets
    }

    retrieveOne(idPlanet){
        return Planet.findById(idPlanet); // SELECT * FROM planets WHERE idPlanet = idPlanet
    }

    create(planet)
    {
        return Planet.create(planet); // INSERT () INTO planets VALUES()
    }

    deleteOne(idPlanet)
    {
        return Planet.findByIdAndDelete(idPlanet);
    }

    transform(planet, transformsOptions = {})
    {

        if (transformsOptions) {
            //Changer les unités
            if (transformsOptions.unit === 'c') {
                planet.temperature += ZERO_KELVIN;
            }
        }


        //TODO TP - HexMatrix
        this.calculateHexMatrix();
        //TODO TP - Wind Direction

        planet.discoveryDate = dayjs(planet.discoveryDate).format('YYYY-MM-DD');

        delete planet.createAt;
        delete planet.updateAt;
        delete planet.__v;

        return planet;
    }

    calculateHexMatrix(HexMatrix) {

    }
}

export default new PlanetsRepository();