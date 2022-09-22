import { inject, observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import Button from "../../components/Button"
import { APP_NAME } from '../../config';
import './styles.scss';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>{APP_NAME}</h1>
      <Button onClick={() => navigate('/dashboard')}>
        Begin..
      </Button>
    </>
  )
}

export default inject("StarWarsStore")(observer(Welcome));
