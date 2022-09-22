import { useEffect, useCallback } from 'react';
import { inject, observer } from 'mobx-react';
import { useNavigate } from "react-router-dom";
import Table from '../../components/Table';
import { getAllPlanets } from '../../services';
import { getPlanetId, parseRows } from '../../utils';
import { planetsColumns } from '../../config';
import Search from '../../components/Search';
import './styles.scss';

const Dashboard = ({ StarWarsStore }) => {
  const { filteredPlanets, setPlanets, setPlanetSelected } = StarWarsStore;
  const navigate = useNavigate();

  const getPlanets = useCallback(async() => {
    console.log("start")
    const p = getAllPlanets();
    console.log("finish")
    setPlanets(p);
  }, [setPlanets]);
  
  useEffect(() => {
    getPlanets();
  }, [getPlanets, setPlanets]);
  
  console.log("planets:: ", {filteredPlanets, planets: StarWarsStore.planets});

  const handleClick = planet => {
    console.log("planet selected:: ", planet);
    setPlanetSelected(planet);
    navigate(`/planet/${getPlanetId(planet.url)}`)
  }


  return (
    <>
      <Search />
      <Table paginated columns={planetsColumns} data={filteredPlanets.length ? parseRows(filteredPlanets, handleClick) : []} />
    </>
  )
}

export default inject("StarWarsStore")(observer(Dashboard));
