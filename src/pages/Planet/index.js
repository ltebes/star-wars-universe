import { useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Table from '../../components/Table';
import { getPlanetbyId, getAllResidents } from '../../services';
import { getResidentId, parseRows } from '../../utils';
import { residentsColumns } from '../../config';

import './styles.scss';

const Planet = ({ StarWarsStore }) => {
  const { planetSelected, residents, setResidentSelected, setResidents, setPlanetAndResidents } = StarWarsStore;
  const { id } = useParams();
  const navigate = useNavigate();

  const getPlanetAndResidents = useCallback(async() => {
    const p = await getPlanetbyId(id)
    if(Boolean(p) || p.detail === 'Not found') {
      navigate("/not-found")
    }
    const r = await getAllResidents(p.residents);
    setPlanetAndResidents(p, r);
  }, [id, navigate, setPlanetAndResidents]);
  
  const getResidents = useCallback(async() => {
    const residents = await getAllResidents(planetSelected.residents);
    setResidents(residents);
  }, [planetSelected.residents, setResidents]);

  useEffect(() => {
    if(!planetSelected) {
      getPlanetAndResidents();
    } else if (planetSelected.residents){
      getResidents();
    }
  }, [getPlanetAndResidents, getResidents, planetSelected]);

  
  console.log("StarWarsStore: ", {StarWarsStore});
  console.log("planet: ", {planetSelected});
  console.log("residents: ", {residents});

  const handleClick = resident => {
    console.log("resident selected:: ", resident);
    setResidentSelected(resident);
    navigate(`/resident/${getResidentId(resident.url)}`)
  }

  return (
    <>
      {residents.length === 0 ? <h1>Sin Residentes</h1> :
        <Table columns={residentsColumns} data={residents.length ? parseRows(residents, handleClick) : []} />
      }
    </>
  )
}

export default inject("StarWarsStore")(observer(Planet));
