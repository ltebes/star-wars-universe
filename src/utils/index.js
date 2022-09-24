import { Button } from '../components';

export const getResidentId = url => (url.replace('https://swapi.dev/api/people/', '')).slice(0, -1);

export const getPlanetId = url => (url.replace('https://swapi.dev/api/planets/', '')).slice(0, -1);

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const parseRows = (objs, onClick) => (
  objs.map((obj) => ({
    ...obj, 
    view_more: (<Button className='table-button' onClick={() => onClick(obj)}>View more...</Button>)
  }))
);

export const promiseWithMinimumDelay  = async(func, d) => {
  const promise = await Promise.all([func(), delay(d)]);
  return promise[0];
};
