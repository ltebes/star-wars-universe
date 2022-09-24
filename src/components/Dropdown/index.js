import { useState } from "react";
import { inject, observer } from 'mobx-react';
import { FiChevronDown as ChevronDown, FiChevronUp as ChevronUp } from "react-icons/fi";
import { Button } from "../";
import './styles.scss';

const Dropdown = ({ StarWarsStore, items }) => {
  const { searchField, setSearchField } = StarWarsStore;
  const [showItems, setShowItems] = useState(false);

  return (
    <div className='dropdown'>
      <Button className='dropdown__value' onClick={() => setShowItems(prev => !prev)}>
        {searchField}
        {showItems ? <ChevronUp /> : <ChevronDown />}
      </Button>
      <div className='dropdown__panel'>
        {showItems && 
          <div className='dropdown__items'>
          {items.map(item => (
            <div
              key={item} 
              disabled={searchField === item} 
              className="dropdown__item" 
              onClick={() => {setSearchField(item); setShowItems(false)}}
            >
              {item}
            </div>
          ))}
          </div>
        }
      </div>
    </div>
  )
}

export default inject("StarWarsStore")(observer(Dropdown));
