import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getResidentById } from '../../services';

import './styles.scss';

const Resident = () => {
  const [resident, setResident] = useState({})
  const { state } = useLocation();
  const { id } = useParams();

  useEffect(() => {
    const func = async() => {
      const resident = await getResidentById(id);
      setResident(resident);
    };
    if(state && state.resident) {
      setResident(state.resident);
    } else {
      func();
    }
  }, [id, state]);

  console.log("resident:: ", {id, resident});

  return (
    <div>Resident</div>
  )
}

export default Resident;
