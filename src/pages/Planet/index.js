import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
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

const Planet = ({ StarWarsStore }) => {
  const { planetSelected, residents, setResidentSelected, setResidents, setPlanetSelected } = StarWarsStore;
  const { id } = useParams();

  useEffect(() => {
    const func = async() => {
      const p = await getPlanetbyId(id)
      setPlanetSelected(p);
    };

    if(!planetSelected) {
      func();
    }
  }, [id, planetSelected, setPlanetSelected]);

  useEffect(() => {
    const func = async() => {
      const residents = await getAllResidents(planetSelected.residents);
      setResidents(residents);
    };
    if(planetSelected && planetSelected.residents){
      func();
    }
  }, [planetSelected, setResidents]);

  
  console.log("StarWarsStore: ", {StarWarsStore});
  console.log("planet: ", {planetSelected});
  console.log("residents: ", {residents});

  const handleClick = resident => {
    console.log("resident selected:: ", resident);
    setResidentSelected(resident);
  }

  return (
    <>
      <div>Planet</div>
      <Table columns={columns} data={residents.length ? parseRows(residents, 'resident', handleClick) : []} />
    </>
  )
}

export default inject("StarWarsStore")(observer(Planet));
