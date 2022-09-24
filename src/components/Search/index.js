import { inject, observer } from 'mobx-react';
import { FiX as Cross } from "react-icons/fi";
import { Button, Dropdown } from "../";
import { dropdownFields } from '../../config';
import './styles.scss';

const Search = ({ StarWarsStore }) => {
  const { search, setSearch, searchField, filterFields, setFilterFields, deleteFilterFields } = StarWarsStore;

  const handleChange = e => {
    setSearch(e.target.value);
  }

  const handleClick = () => {
    setFilterFields({ key: searchField, value: search });
    setSearch('');
  }

  return (
    <div className='search'>
      <div className='search__inputs'>
        <input placeholder='Filter planets...' value={search} onChange={handleChange} type="text" />
        <Dropdown items={dropdownFields}/>
        <Button className='search__button' disabled={search === ''} onClick={handleClick}>Add Filter</Button>
      </div>
      <div className='search__filter-tags'>
        {filterFields.map(({ key, value }) => (
          <div key={`${key}-${value}`} className='search__filter-tag'>
            <span>{key}: {value}</span>
            <Cross onClick={() => deleteFilterFields({ key, value })}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default inject("StarWarsStore")(observer(Search));
