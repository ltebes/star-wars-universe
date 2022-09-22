const BASE_PATH = 'https://swapi.dev/api';

const getNumberOfPages = (countPerPage, totalCount) => {
  return totalCount/countPerPage;
}

export const getAllPlanets = async() => {
  try {
    const { planets, count } = await getFirstPagePlanets();
    const restPlanets = await parallelGetPlanets(getNumberOfPages(planets.length, count));
    return [...planets, ...restPlanets];
  } catch(err) {
    handleError(err);
  }
}

export const getPlanetbyId = async( id ) => {
  try {
    const url = `${BASE_PATH}/planets/${id}`;
    const resp = await fetch(url);
    const planet = await resp.json();

    return planet;
  } catch(err) {
    handleError(err);
  }
}

const getFirstPagePlanets = async() => {
  const url = `${BASE_PATH}/planets`;
  const resp = await fetch(url);
  
  const { results: planets, count } = await resp.json();
  
  return { planets, count };
}

const parallelGetPlanets = async( numberOfPages ) => {
  let promisesArr = []
  for (let index = 2; index <= numberOfPages; index++) {
    promisesArr.push(fetch(`${BASE_PATH}/planets/?page=${index}`))
  };

  const resps = await Promise.all(promisesArr);
  const plainResponses = await Promise.all(resps.map(resp => (resp.json())));

  const planets = plainResponses.reduce((accumulator, { results }) => accumulator.concat(results), []);

  return planets;
}

/**
 * @deprecated because parallel is more efficient
 */
export const recursiveGetPlanets = async( currentPage ) => {
  try {
    const url = currentPage ?? `${BASE_PATH}/planets/?page=2`
    const resp = await fetch(url);
    const { results: planets, next } = await resp.json();
    let nextPage = [];
    
    if (next) {
      nextPage = await recursiveGetPlanets(next);
    }
    
    return [...planets, ...nextPage];
  } catch(err) {
    handleError(err);
  }
}

export const getResidentById = async( id ) => {
  try {
    const url = `${BASE_PATH}/people/${id}`;
    const resp = await fetch(url);
    const resident = await resp.json();
  
    return resident;
  } catch(err) {
    handleError(err);
  }
}

export const getAllResidents = async( residentsArr ) => {
  try {
    const promisesArr = residentsArr.map(res => fetch(res));
  
    const resps = await Promise.all(promisesArr);
    const residents = await Promise.all(resps.map(resp => (resp.json())));
  
    return residents;
  } catch(err) {
    handleError(err);
  }
}

const handleError = err => {
  console.error(err);
}