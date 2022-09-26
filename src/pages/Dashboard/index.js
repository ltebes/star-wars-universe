import { useEffect, useCallback } from 'react';
import { inject, observer } from 'mobx-react';
import { useNavigate } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import { Table, Search } from '../../components';
import { getAllPlanets } from '../../services';
import { getPlanetId, parseRows, promiseWithMinimumDelay } from '../../utils';
import { planetsColumns } from '../../config';
import './styles.scss';

const Dashboard = ({ StarWarsStore }) => {
  const { planets, planetSelected, filteredPlanets, setPlanets, setPlanetSelected } = StarWarsStore;
  const navigate = useNavigate();

  const getPlanets = useCallback(async() => {
    const p = await promiseWithMinimumDelay(getAllPlanets, 2000);
    setPlanets(p);
  }, [setPlanets]);
  
  useEffect(() => {
    if(planets.length === 0) {
      getPlanets();
    }
  }, [getPlanets, planets]);
  
  const handleClick = planet => {
    if(planetSelected?.name !== planet.name) {
      setPlanetSelected(planet);
    }
    navigate(`/planet/${getPlanetId(planet.url)}`)
  }

  return (
    <div className="dashboard">
      <Search />
      <div className="dashboard__table">
      {planets.length && filteredPlanets.length === 0 ? <h3>No results for your search</h3> : 
        filteredPlanets.length ?
          <Table paginated columns={planetsColumns} data={parseRows(filteredPlanets, handleClick)} /> : (
            <>
              <Table columns={planetsColumns} data={[]} />
              <Skeleton className="dashboard__skeleton-row" count={10} />
              <Skeleton className="dashboard__skeleton-row last" />
            </>
        )}
      </div>
    </div>
  )
}

export default inject("StarWarsStore")(observer(Dashboard));
