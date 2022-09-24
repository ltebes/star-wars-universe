import { useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { getPlanetbyId, getResidentById } from '../../services';
import { getPlanetId } from '../../utils';
import Skeleton from 'react-loading-skeleton';
import './styles.scss';

const Resident = ({ StarWarsStore }) => {
  const { residentSelected, planetSelected, setPlanetAndResidentSelected } = StarWarsStore;
  const { id } = useParams();
  const navigate = useNavigate();

  const getResidentAndItsPlanet = useCallback(async() => {
    const r = await getResidentById(id);
    if(!Boolean(r) || r.detail === 'Not found') {
      navigate("/not-found")
    }
    const p = await getPlanetbyId(getPlanetId(r.homeworld));
    setPlanetAndResidentSelected(r, p);
  }, [id, navigate, setPlanetAndResidentSelected]);

  useEffect(() => {
    if(!residentSelected) {
      getResidentAndItsPlanet();
    }
  }, [getResidentAndItsPlanet, residentSelected]);

  return (
    <div className='resident'>
      {planetSelected && residentSelected ? 
        <>
          <h1>Resident: {residentSelected.name}</h1>
          <div className='resident__info'>
            <div><h3>From planet: </h3><h5>{planetSelected.name}</h5></div>
            <div><h3>Height: </h3><h5>{residentSelected.height}</h5></div>
            <div><h3>Mass: </h3><h5>{residentSelected.mass}</h5></div>
            <div><h3>Birth year: </h3><h5>{residentSelected.birth_year}</h5></div>
            <div><h3>Gender: </h3><h5>{residentSelected.gender}</h5></div>
          </div>
        </> :
        <div className='resident__skeleton'>
          <Skeleton className="resident__skeleton-title" />
          <Skeleton className="resident__skeleton-info" count={5} />
        </div>
      }
    </div>
  )
}

export default inject("StarWarsStore")(observer(Resident));
