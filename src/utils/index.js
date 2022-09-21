import { Link } from "react-router-dom";

export const getResidentId = url => (url.replace('https://swapi.dev/api/people/', ''));

export const getPlanetId = url => (url.replace('https://swapi.dev/api/planets/', ''));

const parseObj = {
  planet: getPlanetId,
  resident: getResidentId, 
}

export const parseRows = (objs, type, onClick) => (
  objs.map((obj) => {
    const { url, ...rest } = obj;
    return {
      ...rest, 
      details: (<Link to={`/${type}/${parseObj[type](url)}`} onClick={() => onClick(obj)}>Vamo</Link>)
    };
  })
);