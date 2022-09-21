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
};

const starWarsStore = new StarWarsStore();

export default starWarsStore;
