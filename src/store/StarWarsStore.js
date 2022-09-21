import { makeObservable, observable, action } from "mobx";

class StarWarsStore {
  planets = [];
  planetSelected = null;
  residents = [];
  residentSelected = null;

  constructor() {
    makeObservable(this, {
        planets: observable,
        planetSelected: observable,
        residents: observable,
        residentSelected: observable,
        setPlanets: action,
        setPlanetSelected: action,
        setResidentSelected: action,
        setPlanetAndResidents: action,
        setPlanetAndResidentSelected: action,
    })
}

  setPlanets = planets => {
    this.planets = planets;
  }
  
  setPlanetSelected = planet => {
    this.planetSelected = planet;
  }
  
  setResidents = residents => {
    this.residents = residents;
  }

  setResidentSelected = resident => {
    this.residentSelected = resident;
  }
 
  setPlanetAndResidents = (planet, residents) => {
    this.planetSelected = planet;
    this.residents = residents;
  }

  setPlanetAndResidentSelected = (resident, planet) => {
    this.residentSelected = resident;
    this.planetSelected = planet;
  }
};

const starWarsStore = new StarWarsStore();

export default starWarsStore;
