export const getResidentId = url => (url.replace('https://swapi.dev/api/people/', '')).slice(0, -1);

export const getPlanetId = url => (url.replace('https://swapi.dev/api/planets/', '')).slice(0, -1);

export const parseRows = (objs, onClick) => (
  objs.map((obj) => ({
    ...obj, 
    view_more: (<button onClick={() => onClick(obj)}>View more...</button>)
  }))
);
