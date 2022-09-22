import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export const APP_NAME = 'Star Wars Universe';

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
const planetSkeletonData = {
  name: <Skeleton />,
  climate: <Skeleton />,
  gravity: <Skeleton />,
  terrain: <Skeleton />,
  population: <Skeleton />,
  view_more: <Skeleton />,
};
export const planetsSkeletonData = Array(10).fill(planetSkeletonData)

const residentSkeletonData = {
  name: <Skeleton />,
  height: <Skeleton />,
  mass: <Skeleton />,
  birth_year: <Skeleton />,
  gender: <Skeleton />,
  view_more: <Skeleton />,
};
export const residentsSkeletonData = Array(6).fill(residentSkeletonData)

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