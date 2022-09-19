const BASE_PATH = 'https://swapi.dev/api';

const parseResponse = data => (
  data.map(({ name, diameter, climate, gravity, terrain, population, residents, url }) => ({
    name, diameter, climate, gravity, terrain, population, residents, url
  }))
);

const getNumberOfPages = (countPerPage, totalCount) => {
  return totalCount/countPerPage;
}

export const getAllPlanets = async() => {
  const { planets, count } = await getFirstPagePlanets();
  const restPlanets = await parallelGetPlanets(getNumberOfPages(planets.length, count));
  return [...planets, ...restPlanets];
}


export const getFirstPagePlanets = async() => {
  const url = `${BASE_PATH}/planets`;
  const resp = await fetch(url);
  
  const { results, count } = await resp.json();
  const planets = parseResponse(results);
  
  return { planets, count };
}

export const parallelGetPlanets = async( numberOfPages ) => {
  let promisesArr = []
  for (let index = 2; index <= numberOfPages; index++) {
    promisesArr.push(fetch(`${BASE_PATH}/planets/?page=${index}`))
  };

  const resps = await Promise.all(promisesArr);
  const plainResponses = await Promise.all(resps.map(resp => (resp.json())));

  const planets = plainResponses.reduce((accumulator, { results }) => accumulator.concat(parseResponse(results)), []);

  return planets;
}

/**
 * @deprecated because parallel is more efficient
 */
export const recursiveGetPlanets = async( currentPage ) => {
  const url = currentPage ?? `${BASE_PATH}/planets/?page=2`
  const resp = await fetch(url);
  const { results, next } = await resp.json();
  let nextPage = [];
  
  const planets = parseResponse(results);
  console.log("resulttt2:: ", {url, results, planets});
  
  if (next) {
    nextPage = await recursiveGetPlanets(next);
    console.log("nextPage:: ", nextPage);
  }
  
  return [...planets, ...nextPage];
}

export const getResident = async( id ) => {
  const url = `${BASE_PATH}/people/${id}`;
  const resp = await fetch(url);
  const resident = await resp.json();

  return resident;
}