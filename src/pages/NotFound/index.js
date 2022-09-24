import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';
import './styles.scss';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className='not-found'>
      <h1>The resource was not found</h1>
      <Button className='not-found__redirect-button' onClick={() => navigate('/')}>
          Go to main page
      </Button>
    </div>
  )
}

export default NotFound;
