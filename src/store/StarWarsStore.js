import { makeObservable, observable, action, computed } from "mobx";

class StarWarsStore {
  planets = [];
  planetSelected = null;
  residents = [];
  residentSelected = null;
  search = '';

  constructor() {
    makeObservable(this, {
        planets: observable,
        filteredPlanets: computed,
        planetSelected: observable,
        residents: observable,
        residentSelected: observable,
        search: observable,
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

  get filteredPlanets() {
    return this.planets.filter(planet => planet.name.toLowerCase().includes(this.search.toLowerCase()));
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

  setSearch = search => {
    this.search = search;
  }
};

const starWarsStore = new StarWarsStore();

export default starWarsStore;
