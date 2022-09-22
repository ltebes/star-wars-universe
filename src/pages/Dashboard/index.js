import { useEffect, useCallback } from 'react';
import { inject, observer } from 'mobx-react';
import { useNavigate } from "react-router-dom";

import Table from '../../components/Table';
import { getAllPlanets } from '../../services';
import { delay, getPlanetId, parseRows } from '../../utils';
import { planetsColumns, planetsSkeletonData } from '../../config';
import Search from '../../components/Search';
import './styles.scss';

const Dashboard = ({ StarWarsStore }) => {
  const { planetSelected, filteredPlanets, setPlanets, setPlanetSelected } = StarWarsStore;
  const navigate = useNavigate();

  const getPlanets = useCallback(async() => {
    const [ p ] = await Promise.all([getAllPlanets(), delay(3000)]);
    console.log("finish")
    setPlanets(p);
  }, [setPlanets]);
  
  useEffect(() => {
    getPlanets();
  }, [getPlanets]);
  
  console.log("planets:: ", {filteredPlanets, planets: StarWarsStore.planets});

  const handleClick = planet => {
    if(!Boolean(planetSelected) || (planetSelected.name !== planet.name)) {
      setPlanetSelected(planet);
    }
    console.log("planet selected:: ", planet);
    navigate(`/planet/${getPlanetId(planet.url)}`)
  }


  return (
    <>
      <Search />
      <Table paginated columns={planetsColumns} data={filteredPlanets.length ? parseRows(filteredPlanets, handleClick) : planetsSkeletonData} />
    </>
  )
}

export default inject("StarWarsStore")(observer(Dashboard));
