import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import Table from '../../components/Table';
import { getAllPlanets } from '../../services';
import { parseRows } from '../../utils';
import './styles.scss';

const columns = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Climate',
    accessor: 'climate',
  },
  {
    Header: 'Gravity',
    accessor: 'gravity',
  },
  {
    Header: 'Terrain',
    accessor: 'terrain',
  },
  {
    Header: 'Population',
    accessor: 'population',
  },
  {
    Header: 'View details',
    accessor: 'details',
  },
];

const Dashboard = ({ StarWarsStore }) => {
  const { planets, setPlanets, setPlanetSelected } = StarWarsStore;

  useEffect(() => {
    const func = async() => {
      const p = await getAllPlanets();
      setPlanets(p);
    };
    func();
  }, [setPlanets]);
  
  console.log("planets:: ", {planets});

  const handleClick = planet => {
    console.log("planet selected:: ", planet);
    setPlanetSelected(planet);
  }

  return (
    <>
      <div>Dashboard</div>
      <Table paginated columns={columns} data={planets.length ? parseRows(planets, 'planet', handleClick) : []} />
    </>
  )
}

export default inject("StarWarsStore")(observer(Dashboard));
