import React, { useEffect, useState } from 'react';
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

const Dashboard = () => {
  const [planets, setPlanets] = useState([])
  
  useEffect(() => {
    const func = async() => {
      const planets = await getAllPlanets()
      setPlanets(planets);
    };
    func();
  }, []);
  console.log("planets:: ", planets);

  return (
    <>
      <div>Dashboard</div>
      <Table columns={columns} data={planets.length ? parseRows(planets, 'planet') : []} />
    </>
  )
}

export default Dashboard;
