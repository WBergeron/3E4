import Planet from '../models/planet-model.js';
import dayjs from 'dayjs';

class PlanetsRepository {
    retrieveAll() {
        return Planet.find(); // comme un SELECT * FROM planets
    }

    retrieveOne(idPlanet){
        return Planet.findById(idPlanet); // SELECT * FROM planets WHERE idPlanet = idPlanet
    }

    create(planet)
    {
        return Planet.create(planet); // INSERT () INTO planets VALUES()
    }

    transform(planet)
    {
        planet.discoveryDate = day.js(planet.discoveryDate).format('YYYY-MM-DD');

        delete planet.createAt;
        delete planet.updateAt;
        delete planet.__v;

        return planet;
    }
}

export default new PlanetsRepository();