import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import Table from '../../components/Table';
import { getAllPlanets } from '../../services';
import { parseRows, planetsColumns } from '../../utils';
import './styles.scss';

const Dashboard = ({ StarWarsStore }) => {
  const { planets, setPlanets, setPlanetSelected } = StarWarsStore;

  useEffect(() => {
    const getPlanets = async() => {
      const p = await getAllPlanets();
      setPlanets(p);
    };
    getPlanets();
  }, [setPlanets]);
  
  console.log("planets:: ", {planets});

  const handleClick = planet => {
    console.log("planet selected:: ", planet);
    setPlanetSelected(planet);
  }

  return (
    <>
      <div>Dashboard</div>
      <Table paginated columns={planetsColumns} data={planets.length ? parseRows(planets, 'planet', handleClick) : []} />
    </>
  )
}

export default inject("StarWarsStore")(observer(Dashboard));
