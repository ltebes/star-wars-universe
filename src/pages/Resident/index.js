import { useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { getPlanetbyId, getResidentById } from '../../services';
import { getPlanetId } from '../../utils';

import './styles.scss';

const Resident = ({ StarWarsStore }) => {
  const { setLoading, residentSelected, planetSelected, setPlanetAndResidentSelected } = StarWarsStore;
  const { id } = useParams();
  const navigate = useNavigate();

  const getResidentAndItsPlanet = useCallback(async() => {
    setLoading(true);
    const r = await getResidentById(id);
    if(Boolean(r) || r.detail === 'Not found') {
      navigate("/not-found")
    }
    const p = await getPlanetbyId(getPlanetId(r.homeworld));
    setPlanetAndResidentSelected(r, p);
    setLoading(false);
  }, [id, navigate, setLoading, setPlanetAndResidentSelected]);

  useEffect(() => {
    if(!residentSelected) {
      getResidentAndItsPlanet();
    }
  }, [getResidentAndItsPlanet, residentSelected]);

  console.log("resident:: ", {id, residentSelected, planetSelected});

  return (
    <div>
      <h1>Planet: {planetSelected?.name}</h1>
      <h1>Resident: {residentSelected?.name}</h1>
    </div>
  )
}

export default inject("StarWarsStore")(observer(Resident));
