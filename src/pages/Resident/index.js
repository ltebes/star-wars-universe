import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { getPlanetbyId, getResidentById } from '../../services';
import { getPlanetId } from '../../utils';

import './styles.scss';

const Resident = ({ StarWarsStore }) => {
  const { residentSelected, planetSelected, setPlanetAndResidentSelected } = StarWarsStore;
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getResidentAndItsPlanet = async() => {
      const r = await getResidentById(id);
      if(r.detail === 'Not found') {
        navigate("/not-found")
      }
      const p = await getPlanetbyId(getPlanetId(r?.homeworld));
      setPlanetAndResidentSelected(r, p);
    };
    if(!residentSelected) {
      getResidentAndItsPlanet();
    }
  }, [id, navigate, residentSelected, setPlanetAndResidentSelected]);

  console.log("resident:: ", {id, residentSelected, planetSelected});

  return (
    <div>
      <h1>Planet: {planetSelected?.name}</h1>
      <h1>Resident: {residentSelected?.name}</h1>
    </div>
  )
}

export default inject("StarWarsStore")(observer(Resident));
