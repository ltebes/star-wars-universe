import { BsGithub, BsLinkedin } from "react-icons/bs";
import { APP_NAME } from '../../config';
import './styles.scss';

const Footer = () => {
  return (
    <div className="footer">
      <h2 className="footer__title">{APP_NAME}</h2>
      <h4>Made with ❤️ by Leandro Tebes</h4>
      <div className='footer__apps'>
        <a target="_blank" href='https://linkedin.com/in/leandro-tebes' rel="noreferrer"><BsLinkedin /></a>
        <a target="_blank" href='https://github.com/ltebes' rel="noreferrer"><BsGithub /></a>
      </div>
    </div>
  )
}

export default Footer;
