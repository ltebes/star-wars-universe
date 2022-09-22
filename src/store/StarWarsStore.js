import { makeObservable, observable, action, computed } from "mobx";

class StarWarsStore {
  planets = [];
  planetSelected = null;
  residents = [];
  residentSelected = null;
  search = '';
  searchField = 'name';
  filterFields = [];

  constructor() {
    makeObservable(this, {
      planets: observable,
      filteredPlanets: computed,
      planetSelected: observable,
      residents: observable,
      residentSelected: observable,
      search: observable,
      searchField: observable,
      filterFields: observable,
      setPlanets: action,
      setPlanetSelected: action,
      setResidentSelected: action,
      setPlanetAndResidents: action,
      setPlanetAndResidentSelected: action,
      setSearch: action,
      setSearchField: action,
      setFilterFields: action,
      deleteFilterFields: action,
    })
}

  setPlanets = planets => {
    this.planets = planets;
  }

  get filteredPlanets() {
    return [...this.filterFields, {key: this.searchField, value: this.search}].reduce((accumulator, current) => (
      accumulator.filter(planet => (
        planet[current.key].toLowerCase().includes(current.value.toLowerCase())
      ))
    ), this.planets)
  }
  
  setPlanetSelected = planet => {
    this.planetSelected = planet;
    this.residentSelected = null;
    this.residents = [];
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
  
  setSearchField = searchField => {
    this.searchField = searchField;
  }

  setFilterFields = searchField => {
    this.filterFields.push(searchField);
  }
  
  deleteFilterFields = ({ key, value }) => {
    this.filterFields = this.filterFields.filter(field => field.key !== key || field.value !== value);
  }
};

const starWarsStore = new StarWarsStore();

export default starWarsStore;
