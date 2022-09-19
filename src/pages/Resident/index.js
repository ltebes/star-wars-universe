import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getResident } from '../../services';

import './styles.scss';

const Resident = () => {
  const [resident, setResident] = useState({})
  const { id } = useParams();
  const { state: { residentId } } = useLocation();

  
  useEffect(() => {
    const func = async() => {
      const resident = await getResident(residentId)
      setResident(resident);
    };
    func();
  }, [residentId]);

  console.log("resident:: ", {id, resident});

  return (
    <div>Resident</div>
  )
}

export default Resident;
