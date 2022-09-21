import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { getResidentById } from '../../services';

import './styles.scss';

const Resident = ({ StarWarsStore }) => {
  const { residentSelected, planetSelected, setResidentSelected } = StarWarsStore;
  const { id } = useParams();

  useEffect(() => {
    const func = async() => {
      const r = await getResidentById(id);
      setResidentSelected(r);
    };
    if(!residentSelected) {
      func();
    }
  }, [id, residentSelected, setResidentSelected]);

  console.log("resident:: ", {id, residentSelected, planetSelected});

  return (
    <div>
      <h1>Planet: {planetSelected.name}</h1>
      <h1>Resident: {residentSelected.name}</h1>
    </div>
  )
}

export default inject("StarWarsStore")(observer(Resident));
