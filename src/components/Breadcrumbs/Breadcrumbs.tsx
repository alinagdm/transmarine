import { useLocation, Link } from 'react-router-dom';
import './Breadcrumbs.css';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathname = location.pathname;
  
  let currentPage = 'Услуги';
  if (pathname.includes('/services/')) {
    currentPage = 'Детали услуги';
  } else if (pathname === '/people') {
    currentPage = 'Люди';
  } else if (pathname === '/about') {
    currentPage = 'О нас';
  } else if (pathname === '/history') {
    currentPage = 'История';
  } else if (pathname === '/contacts') {
    currentPage = 'Контакты';
  } else if (pathname === '/port-information') {
    currentPage = 'Информация о Калининградском порте';
  }

  return (
    <nav className="breadcrumbs">
      <div className="breadcrumbs__container">
        <Link to="/" className="breadcrumbs__link">Главная</Link>
        <span className="breadcrumbs__separator">/</span>
        {pathname !== '/services' && pathname !== '/people' && pathname.includes('/services') && (
          <>
            <Link to="/services" className="breadcrumbs__link">Услуги</Link>
            <span className="breadcrumbs__separator">/</span>
          </>
        )}
        <span className="breadcrumbs__current">{currentPage}</span>
      </div>
    </nav>
  );
}
