import { FiChevronRight as Chevron } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { inject, observer } from 'mobx-react';
import './styles.scss';

const Breadcrumb = ({ levels, className }) => {
  const innerLevels = levels.map((level, index) => {
    const isCurrentPage = index === levels.length - 1;

    return (
      <li className={`${className}__item`} key={level.id}>
        {
          (level.disabled)
            ? <span className={`${className}__label`}>{level.text}</span>
            : (
              <Link
                className={`${className}__link`}
                to={level.to}
              >{level.text}
              </Link>
            )
        }
        {!isCurrentPage ? <Chevron className={`${className}__chevron`} /> : null}
      </li>
    );
  });
  
  return (
    <nav>
      <ol className={className}>
        {innerLevels}
      </ol>
    </nav>
  )
};

const Header = ({ StarWarsStore ={} }) => {
  const { planetSelected, residentSelected } = StarWarsStore;
  let { pathname } = useLocation();

  const levels = [
    {text: 'All Planets', id: 0, to: '/dashboard', disabled: pathname.includes('dashboard') },
  ]

  console.log("falopita: ", {planetSelected, residentSelected});

  if(planetSelected && pathname.includes('planet')){
    levels.push({text: planetSelected.name, id: 1, to: '/planet/1', disabled: pathname.includes('planet') })
  } else if (residentSelected && pathname.includes('resident')){
    levels.push({text: planetSelected.name, id: 1, to: '/planet/1', disabled: pathname.includes('planet') })
    levels.push({text: residentSelected.name, id: 2, to: '/resident/1', disabled: pathname.includes('resident') });
  }

  return (
    <div className="header">
      <h1 className="header__title">Header</h1>
      <Breadcrumb className="header__breadcrumb" levels={levels} />
    </div>
  )
};

export default inject("StarWarsStore")(observer(Header));
