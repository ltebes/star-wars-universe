import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Table from '../../components/Table';
import { getPlanetbyId, getAllResidents } from '../../services';
import { parseRows } from '../../utils';
import './styles.scss';

const columns = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Height',
    accessor: 'height',
  },
  {
    Header: 'Mass',
    accessor: 'mass',
  },
  {
    Header: 'Birth_year',
    accessor: 'birth_year',
  },
  {
    Header: 'Gender',
    accessor: 'gender',
  },
  {
    Header: 'View details',
    accessor: 'details',
  },
];

const Planet = () => {
  const [planet, setPlanet] = useState({});
  const [residents, setResidents] = useState([]);
  const { state } = useLocation();
  const { id } = useParams();

  console.log("state: ", state);


  useEffect(() => {
    const func = async() => {
      const planets = await getPlanetbyId(id)
      setPlanet(planets);
    };
    if(state && state.planet) {
      setPlanet(state.planet);
    } else {
      func();
    }
  }, [id, state]);

  useEffect(() => {
    const func = async() => {
      const residents = await getAllResidents(planet.residents);
      setResidents(residents);
    };
    if(planet.residents){
      func();
    }
  }, [planet]);

  console.log("planet: ", planet);
  console.log("residents: ", residents);

  return (
    <>
      <div>Planet</div>
      <Table columns={columns} data={residents.length ? parseRows(residents, 'resident') : []} />
    </>
  )
}

export default Planet;
