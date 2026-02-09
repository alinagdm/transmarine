import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Breadcrumbs.css';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathname = location.pathname;
  const [currentPage, setCurrentPage] = useState('Услуги');
  
  useEffect(() => {
    // Пытаемся получить h1 со страницы
    const h1Element = document.querySelector('h1');
    if (h1Element && h1Element.textContent) {
      const h1Text = h1Element.textContent.trim();
      if (h1Text) {
        setCurrentPage(h1Text);
        return;
      }
    }
    
    // Fallback на старую логику
    let page = 'Услуги';
    if (pathname.includes('/services/')) {
      page = 'Детали услуги';
    } else if (pathname === '/people') {
      page = 'Люди';
    } else if (pathname === '/about') {
      page = 'О нас';
    } else if (pathname === '/history') {
      page = 'История';
    } else if (pathname === '/contacts') {
      page = 'Контакты';
    } else if (pathname === '/port-information') {
      page = 'Информация о Калининградском порте';
    } else if (pathname === '/schedule') {
      page = 'Расписание линий';
    } else if (pathname === '/ship-arrivals') {
      page = 'Судозаходы';
    }
    setCurrentPage(page);
  }, [pathname]);

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
