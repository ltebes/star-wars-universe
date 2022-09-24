import { useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Table } from '../../components';
import { getPlanetbyId, getAllResidents } from '../../services';
import { getResidentId, parseRows, promiseWithMinimumDelay } from '../../utils';
import { residentsColumns } from '../../config';
import Skeleton from 'react-loading-skeleton';
import './styles.scss';

const Planet = ({ StarWarsStore }) => {
  const { planetSelected, residents, setResidentSelected, setResidents, setPlanetAndResidents } = StarWarsStore;
  const { id } = useParams();
  const navigate = useNavigate();

  const getPlanetAndResidents = useCallback(async() => {
    const p = await getPlanetbyId(id)
    if(!Boolean(p) || p.detail === 'Not found') {
      navigate("/not-found");
    }
    const r = await getAllResidents(p.residents);
    setPlanetAndResidents(p, r);
  }, [id, navigate, setPlanetAndResidents]);
  
  const getResidents = useCallback(async() => {
    const residents = await promiseWithMinimumDelay(() => getAllResidents(planetSelected.residents), 2000);
    setResidents(residents);
  }, [planetSelected?.residents, setResidents]);

  useEffect(() => {
    if(!planetSelected) {
      getPlanetAndResidents();
    } else if (planetSelected.residents){
      getResidents();
    }
  }, [getPlanetAndResidents, getResidents, planetSelected]);


  const handleClick = resident => {
    setResidentSelected(resident);
    navigate(`/resident/${getResidentId(resident.url)}`)
  }

  return (
    <div className='planet'>
      {planetSelected ? 
        <>
          <h2>Planet {planetSelected.name}</h2>
          <div className='planet__info'>
            <div className='planet__info-column'>
                <div><h3>Climate: </h3><h5>{planetSelected.climate}</h5></div>
                <div><h3>Gravity: </h3><h5>{planetSelected.gravity}</h5></div>
                <div><h3>Terrain: </h3><h5>{planetSelected.terrain}</h5></div>
                <div><h3>Population: </h3><h5>{planetSelected.population}</h5></div>
            </div>
            <div className='planet__table'>
              {(planetSelected.residents.length === residents.length) ?
                <>
                  {planetSelected.residents.length === 0 ?
                    <h3>Without significative residents</h3> :
                    <>
                      <h3>Significative residents:</h3>
                      <Table columns={residentsColumns} data={parseRows(residents, handleClick)} />
                    </>
                  }
                </> :
                <div className="planet__skeleton-only-table">
                  <Skeleton className="planet__skeleton-only-table-first-row" />
                  <Table columns={residentsColumns} data={[]} />
                  <Skeleton className="planet__skeleton-only-table-rows" count={5} />
                </div>
              }
            </div>
          </div>
        </> : 
        <div className="planet__skeleton">
          <div className="planet__skeleton-title">
            <Skeleton className="planet__skeleton-title-row" />
          </div>
          <div className="planet__skeleton-info">
            <div className="planet__skeleton-info-column">
              <Skeleton className="planet__skeleton-info-column-row" count={4} />
            </div>
            <div className="planet__skeleton-table">
              <Skeleton className="planet__skeleton-table-first-row"/>
              <Table columns={residentsColumns} data={[]} />
              <Skeleton className="planet__skeleton-table-rows" count={5} />
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default inject("StarWarsStore")(observer(Planet));
