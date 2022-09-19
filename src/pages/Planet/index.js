import { Link, useLocation } from 'react-router-dom';
import './styles.scss';

const getResidentId = residentUrl => (residentUrl.replace('https://swapi.dev/api/people/', ''));

const Planet = () => {
  const { state: { planet } } = useLocation();
  const residentId = getResidentId(planet.residents[0]);

  return (
    <>
      <div>Planet</div>
      <Link to={`/resident/${residentId}`} state={{residentId}}>Vamo al residente</Link>
    </>
  )
}

export default Planet;
