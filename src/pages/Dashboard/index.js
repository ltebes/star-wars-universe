import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import Table from '../../components/Table';
import { getAllPlanets } from '../../services';
import { parseRows, planetsColumns } from '../../utils';
import './styles.scss';
import Search from '../../components/Search';

const Dashboard = ({ StarWarsStore }) => {
  const { filteredPlanets, setPlanets, setPlanetSelected } = StarWarsStore;
  useEffect(() => {
    const getPlanets = async() => {
      const p = await getAllPlanets();
      setPlanets(p);
    };
    getPlanets();
  }, [setPlanets]);
  
  console.log("planets:: ", {filteredPlanets, planets: StarWarsStore.planets});

  const handleClick = planet => {
    console.log("planet selected:: ", planet);
    setPlanetSelected(planet);
  }


  return (
    <>
      <div>Dashboard</div>
      <Search />
      <Table paginated columns={planetsColumns} data={filteredPlanets.length ? parseRows(filteredPlanets, 'planet', handleClick) : []} />
    </>
  )
}

export default inject("StarWarsStore")(observer(Dashboard));
