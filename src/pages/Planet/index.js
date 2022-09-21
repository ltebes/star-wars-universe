import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Table from '../../components/Table';
import { getPlanetbyId, getAllResidents } from '../../services';
import { parseRows, residentsColumns } from '../../utils';
import './styles.scss';

const Planet = ({ StarWarsStore }) => {
  const { planetSelected, residents, setResidentSelected, setResidents, setPlanetAndResidents } = StarWarsStore;
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getPlanetAndResidents = async() => {
      const p = await getPlanetbyId(id)
      if(p.detail === 'Not found') {
        navigate("/not-found")
      }
      const r = await getAllResidents(p.residents);
      setPlanetAndResidents(p, r);
    };

    const getResidents = async() => {
      const residents = await getAllResidents(planetSelected.residents);
      setResidents(residents);
    };

    if(!planetSelected) {
      getPlanetAndResidents();
      console.log("PASOOOOOOO");
    } else if (planetSelected.residents){
      getResidents();
    }
  }, [id, navigate, planetSelected, setPlanetAndResidents, setResidents]);

  
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
      {residents.length === 0 ? <h1>Sin Residentes</h1> :
        <Table columns={residentsColumns} data={residents.length ? parseRows(residents, 'resident', handleClick) : []} />
      }
    </>
  )
}

export default inject("StarWarsStore")(observer(Planet));
