import { FiChevronRight as Chevron } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { inject, observer } from 'mobx-react';
import { APP_NAME } from "../../config";
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
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const conditionToShow = pathname === '/';
  const conditionToNotShowBreadcrumb = pathname === '/not-found' || pathname === '/dashboard';

  const levels = [
    {text: 'All Planets', id: 0, to: '/dashboard', disabled: pathname.includes('dashboard') },
  ];

  if(planetSelected && pathname.includes('planet')){
    levels.push({text: planetSelected.name, id: 1, to: '/planet/1', disabled: pathname.includes('planet') })
  } else if (residentSelected && pathname.includes('resident')){
    levels.push({text: planetSelected.name, id: 1, to: '/planet/1', disabled: pathname.includes('planet') })
    levels.push({text: residentSelected.name, id: 2, to: '/resident/1', disabled: pathname.includes('resident') });
  }

  return (
    <div className={`header ${conditionToShow ? 'not-show' : ''}`}>
      <div className="header__title-box">
        <h1 onClick={() => navigate('/')} className="header__title">{APP_NAME}</h1>
      </div>
      <Breadcrumb className={`header__breadcrumb${conditionToNotShowBreadcrumb ? ' not-show' : ''}`} levels={levels} />
    </div>
  )
};

export default inject("StarWarsStore")(observer(Header));
