import { inject, observer } from 'mobx-react';

const Search = ({ StarWarsStore }) => {
  const { search, setSearch } = StarWarsStore;

  const handleChange = e => {
    setSearch(e.target.value);
  }

  return (
    <>
      <div>Search</div>
      <input value={search} onChange={handleChange} type="text" />
    </>
  )
}

export default inject("StarWarsStore")(observer(Search));
