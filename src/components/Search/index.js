import { inject, observer } from 'mobx-react';
import { FiX as Cross } from "react-icons/fi";
import Button from '../Button';
import Dropdown from '../Dropdown';

const Search = ({ StarWarsStore }) => {
  const { search, setSearch, searchField, filterFields, setFilterFields, deleteFilterFields } = StarWarsStore;

  const handleChange = e => {
    setSearch(e.target.value);
  }

  const handleClick = e => {
    e.preventDefault();
    setFilterFields({ key: searchField, value: search });
    setSearch('');
  }

  return (
    <>
      <div>Search</div>
      <input placeholder='Filter...' value={search} onChange={handleChange} type="text" />
      <Dropdown items={['name', 'climate', 'gravity', 'terrain']}/>
      <Button disabled={search === ''} onClick={handleClick}>Add Filter</Button>

      <div>
        {filterFields.map(({ key, value }) => (
          <div key={`${key}-${value}`} className='dropdown__filter-tag'>
            <span>{key}: {value}</span>
            <Cross onClick={() => deleteFilterFields({ key, value })}/>
          </div>
        ))}
      </div>
    </>
  )
}

export default inject("StarWarsStore")(observer(Search));
