import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StarWarsApp } from './StarWarsApp';
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SkeletonTheme baseColor="#313131" highlightColor="#525252">
    <BrowserRouter>
      <StarWarsApp />
    </BrowserRouter>
  </SkeletonTheme>
);
