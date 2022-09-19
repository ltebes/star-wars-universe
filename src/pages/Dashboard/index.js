import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPlanets } from '../../services';
import './styles.scss';

const Dashboard = () => {
  const [planets, setPlanets] = useState([])
  
  useEffect(() => {
    const func = async() => {
      const planets = await getAllPlanets()
      setPlanets(planets);
    };
    func();
  }, []);
  console.log("planets:: ", planets);

  return (
    <>
      <div>Dashboard</div>
      <Link to='/planet/7' state={{planet: planets[7]}}>Vamo al planetita</Link>
    </>
  )
}

export default Dashboard;
