export const getResidentId = url => (url.replace('https://swapi.dev/api/people/', '')).slice(0, -1);

export const getPlanetId = url => (url.replace('https://swapi.dev/api/planets/', '')).slice(0, -1);

export const parseRows = (objs, onClick) => (
  objs.map((obj) => ({
    ...obj, 
    view_more: (<button onClick={() => onClick(obj)}>View more...</button>)
  }))
);

export const planetsColumns = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Climate',
    accessor: 'climate',
  },
  {
    Header: 'Gravity',
    accessor: 'gravity',
  },
  {
    Header: 'Terrain',
    accessor: 'terrain',
  },
  {
    Header: 'Population',
    accessor: 'population',
  },
  {
    Header: '',
    accessor: 'view_more',
  },
];

export const residentsColumns = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Height',
    accessor: 'height',
  },
  {
    Header: 'Mass',
    accessor: 'mass',
  },
  {
    Header: 'Birth year',
    accessor: 'birth_year',
  },
  {
    Header: 'Gender',
    accessor: 'gender',
  },
  {
    Header: '',
    accessor: 'view_more',
  },
];