import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import { usePortCalculation } from '../../contexts/PortCalculationContext';
import { searchInIndex, highlightText, SearchResult } from '../../utils/searchIndex';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHistoryPage = location.pathname === '/history';
  const { openForm } = usePortCalculation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [foundOnCurrentPage, setFoundOnCurrentPage] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isMobileServicesSubmenuOpen, setIsMobileServicesSubmenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const menuStateRef = useRef({ isMenuOpen: false, isSearchOpen: false });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, isSearchOpen]);

  // Обновляем ref при изменении состояния меню
  useEffect(() => {
    menuStateRef.current = { isMenuOpen, isSearchOpen };
  }, [isMenuOpen, isSearchOpen]);

  // Проверяем, выходят ли элементы навигации за пределы контейнера
  // Мобильная версия начинается с 1200px и ниже
  useEffect(() => {
    const checkNavigationOverflow = () => {
      const windowWidth = window.innerWidth;
      
      // Мобильная версия для header начинается с 1200px и ниже
      const shouldBeMobile = windowWidth <= 1200;

      if (shouldBeMobile !== isMobileView) {
        console.log('🔄 Адаптация меню:', {
          'Ширина окна': `${windowWidth}px`,
          'Режим': shouldBeMobile ? 'Мобильный' : 'Десктоп'
        });
      }

      setIsMobileView(shouldBeMobile);

      // Закрываем мобильное меню, если вернулись на десктоп (только при изменении размера окна)
      const currentMenuState = menuStateRef.current;
      if (!shouldBeMobile && (currentMenuState.isMenuOpen || currentMenuState.isSearchOpen)) {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
        setIsMobileServicesSubmenuOpen(false);
      }
    };

    // Проверяем при загрузке с небольшой задержкой для стабильности
    const initialTimeout = setTimeout(checkNavigationOverflow, 100);
    
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkNavigationOverflow, 150);
    };

    // Используем только resize события окна, не ResizeObserver для контейнера
    // чтобы избежать срабатывания при открытии меню
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsMobileServicesSubmenuOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  // AJAX поиск по индексу с debounce
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      setIsSearching(true);
      
      const timeoutId = setTimeout(() => {
        const searchText = searchQuery.toLowerCase().trim();
        
        // Проверка на текущей странице
        const elements = document.querySelectorAll('h1, h2, h3, h4, p, a, span, li, td, th, .hero__title, .services__card-title');
        let found = false;
        elements.forEach((el) => {
          if (el.textContent?.toLowerCase().includes(searchText)) {
            found = true;
          }
        });
        setFoundOnCurrentPage(found);
        
        // AJAX поиск по индексу (симуляция асинхронного запроса)
        setTimeout(() => {
          const results = searchInIndex(searchQuery, location.pathname);
          setSearchResults(results);
          setIsSearching(false);
        }, 100); // Небольшая задержка для имитации AJAX
      }, 300); // Debounce 300ms

      return () => {
        clearTimeout(timeoutId);
        setIsSearching(false);
      };
    } else {
      setSearchResults([]);
      setFoundOnCurrentPage(false);
      setIsSearching(false);
    }
  }, [searchQuery, location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const searchText = searchQuery.toLowerCase().trim();
      
      // Сначала проверяем, есть ли контент на текущей странице
      const elements = document.querySelectorAll('h1, h2, h3, h4, p, a, span, li, td, th, .hero__title, .services__card-title');
      let foundOnCurrentPage = false;
      let bestMatch: Element | null = null;
      let bestScore = 0;
      
      elements.forEach((el) => {
        const text = el.textContent?.toLowerCase() || '';
        if (text.includes(searchText)) {
          const score = text.indexOf(searchText);
          if (score >= 0 && (!bestMatch || score < bestScore)) {
            bestMatch = el;
            bestScore = score;
            foundOnCurrentPage = true;
          }
        }
      });
      
      if (foundOnCurrentPage && bestMatch) {
        // Найдено на текущей странице - показываем
        const element = bestMatch as HTMLElement;
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.style.backgroundColor = 'rgba(255, 255, 0, 0.3)';
        setTimeout(() => {
          element.style.backgroundColor = '';
        }, 2000);
        closeSearch();
      } else if (searchResults.length > 0) {
        // Переходим на первую найденную страницу
        navigate(searchResults[0].path);
        closeSearch();
        
        // После перехода ищем текст на странице
        setTimeout(() => {
          const newElements = document.querySelectorAll('h1, h2, h3, h4, p, a, span, li, td, th, .hero__title, .services__card-title');
          let newBestMatch: Element | null = null;
          let newBestScore = 0;
          
          newElements.forEach((el) => {
            const text = el.textContent?.toLowerCase() || '';
            if (text.includes(searchText)) {
              const score = text.indexOf(searchText);
              if (score >= 0 && (!newBestMatch || score < newBestScore)) {
                newBestMatch = el;
                newBestScore = score;
              }
            }
          });
          
          if (newBestMatch) {
            const element = newBestMatch as HTMLElement;
            setTimeout(() => {
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
              element.style.backgroundColor = 'rgba(255, 255, 0, 0.3)';
              setTimeout(() => {
                element.style.backgroundColor = '';
              }, 2000);
            }, 300);
          }
        }, 100);
      } else {
        alert('Ничего не найдено. Попробуйте другой запрос.');
      }
    }
  };

  const handleResultClick = (path: string) => {
    navigate(path);
    closeSearch();
    setSearchQuery('');
  };

  const toggleMobileServicesSubmenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileServicesSubmenuOpen(!isMobileServicesSubmenuOpen);
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'header--scrolled' : ''} ${isHistoryPage ? 'header--history' : ''}`}>
        <div className="header__container">
          <Link to="/" className="header__logo-wrapper">
            <div className="header__logo-bg"></div>
            <div className="header__logo">
              {isHistoryPage ? (
                <img src="/images/frame-427-history.png" alt="TransMarine" loading="lazy" />
              ) : (
                <img src="/images/tild3230-3835-4330-b439-353734393834__frame_427.svg" alt="TransMarine" loading="lazy" />
              )}
            </div>
          </Link>
          <nav className={`header__nav ${isMobileView ? 'header__nav--hidden' : ''}`}>
            <Link to="/about">о нас</Link>
            <Link to="/services">услуги</Link>
            <Link to="/people">люди</Link>
            <Link to="/contacts">контакты</Link>
            <Link to="/port-information">ПОРТ КАЛИНИНГРАД</Link>
            <Link to="/schedule">РАСПИСАНИЕ ЛИНиИ</Link>
            <Link to="/ship-arrivals">СУДОЗАХОДЫ</Link>
            <button 
              onClick={(e) => {
                e.preventDefault();
                openForm();
                if (isMenuOpen) closeMenu();
              }}
              className="header__nav-link-button"
            >
              РАСЧЕТ СТОИМОСТИ
            </button>
          </nav>
          <div className="header__actions">
            <button 
              className="header__search" 
              onClick={toggleSearch}
              aria-label="Поиск"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M19 19L13.0001 13M15 8C15 11.866 11.866 15 8 15C4.134 15 1 11.866 1 8C1 4.134 4.134 1 8 1C11.866 1 15 4.134 15 8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              className={`header__menu ${isMenuOpen ? 'header__menu--active' : ''}`}
              onClick={toggleMenu}
              aria-label="Меню"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Мобильное меню */}
      <div className={`mobile-menu ${isMenuOpen ? 'mobile-menu--open' : ''}`}>
        <div className="mobile-menu__overlay" onClick={closeMenu}></div>
        <div className="mobile-menu__content">
          <button 
            className="mobile-menu__close"
            onClick={closeMenu}
            aria-label="Закрыть меню"
          >
            <span></span>
            <span></span>
          </button>
          <nav className="mobile-menu__nav">
            <Link to="/about" onClick={closeMenu}>о нас</Link>
            <div className="mobile-menu__nav-item mobile-menu__nav-item--has-submenu">
              <button 
                className="mobile-menu__nav-link mobile-menu__nav-link--submenu"
                onClick={toggleMobileServicesSubmenu}
              >
                услуги
                <svg 
                  className={`mobile-menu__nav-arrow ${isMobileServicesSubmenuOpen ? 'mobile-menu__nav-arrow--open' : ''}`}
                  width="8" 
                  height="5" 
                  viewBox="0 0 8 5" 
                  fill="none"
                >
                  <path d="M1 1L4 4L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {isMobileServicesSubmenuOpen && (
                <div className="mobile-menu__submenu">
                  <Link to="/services/1" className="mobile-menu__submenu-item" onClick={closeMenu}>ЭКСПЕДИРОВАНИЕ</Link>
                  <Link to="/services/2" className="mobile-menu__submenu-item" onClick={closeMenu}>СУДОХОДНАЯ ЛИНИЯ</Link>
                  <Link to="/services/3" className="mobile-menu__submenu-item" onClick={closeMenu}>ПОРТОВОЕ АГЕНТИРОВАНИЕ</Link>
                </div>
              )}
            </div>
            <Link to="/people" onClick={closeMenu}>люди</Link>
            <Link to="/contacts" onClick={closeMenu}>контакты</Link>
            <Link to="/port-information" onClick={closeMenu}>ПОРТ КАЛИНИНГРАД</Link>
            <Link to="/schedule" onClick={closeMenu}>РАСПИСАНИЕ ЛИНиИ</Link>
            <Link to="/ship-arrivals" onClick={closeMenu}>СУДОЗАХОДЫ</Link>
            <button 
              onClick={(e) => {
                e.preventDefault();
                openForm();
                closeMenu();
              }}
              className="mobile-menu__nav-link-button"
            >
              РАСЧЕТ СТОИМОСТИ
            </button>
          </nav>
          <div className="mobile-menu__contacts">
            <div className="mobile-menu__contact-item">
              <span className="mobile-menu__contact-label">Адрес</span>
              <a 
                href="https://yandex.ru/maps/?text=Россия,+236003,+Калининград,+ул.+Портовая+24" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mobile-menu__contact-value"
                onClick={closeMenu}
              >
                Россия, 236003, Калининград, ул. Портовая 24
              </a>
            </div>
            <div className="mobile-menu__contact-item">
              <span className="mobile-menu__contact-label">Телефоны</span>
              <a href="tel:+74012632256" className="mobile-menu__contact-value" onClick={closeMenu}>
                +7 (4012) 632-256
              </a>
              <a href="tel:+74012632120" className="mobile-menu__contact-value" onClick={closeMenu}>
                +7 (4012) 632-120
              </a>
            </div>
            <div className="mobile-menu__contact-item">
              <span className="mobile-menu__contact-label">Telex</span>
              <span className="mobile-menu__contact-value">262 025 TRANS RU</span>
            </div>
            <div className="mobile-menu__contact-item">
              <span className="mobile-menu__contact-label">Почта</span>
              <a 
                href="mailto:office@transmarine.ru" 
                className="mobile-menu__contact-value"
                onClick={closeMenu}
              >
                office@transmarine.ru
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Поиск */}
      <div className={`search-popup ${isSearchOpen ? 'search-popup--open' : ''}`}>
        <div className="search-popup__overlay" onClick={closeSearch}></div>
        <div className="search-popup__content">
          <button 
            className="search-popup__close"
            onClick={closeSearch}
            aria-label="Закрыть поиск"
          >
            <span></span>
            <span></span>
          </button>
          <form className="search-popup__form" onSubmit={handleSearch}>
            <div className="search-popup__input-wrapper">
              <svg className="search-popup__icon" width="24" height="24" viewBox="0 0 20 20" fill="none">
                <path d="M19 19L13.0001 13M15 8C15 11.866 11.866 15 8 15C4.134 15 1 11.866 1 8C1 4.134 4.134 1 8 1C11.866 1 15 4.134 15 8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type="text"
                className="search-popup__input"
                placeholder="Поиск по сайту..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
            <button type="submit" className="search-popup__submit">
              Найти
            </button>
          </form>
          
          {/* Результаты поиска */}
          {searchQuery.trim().length >= 2 && (
            <>
              {/* Проверка на текущей странице */}
              {foundOnCurrentPage && (
                <div className="search-popup__current-page-result">
                  <div className="search-popup__results-title">Найдено на текущей странице:</div>
                  <div className="search-popup__current-page-badge">
                    ✓ Контент найден на этой странице
                  </div>
                </div>
              )}
              
              {/* Индикатор загрузки */}
              {isSearching && searchQuery.trim().length >= 2 && (
                <div className="search-popup__loading">
                  <div className="search-popup__spinner"></div>
                  <span>Поиск...</span>
                </div>
              )}

              {/* Результаты по другим страницам */}
              {!isSearching && searchResults.length > 0 && (
                <div className="search-popup__results">
                  <div className="search-popup__results-title">
                    {foundOnCurrentPage ? 'Также найдено на других страницах:' : 'Найдено на страницах:'}
                  </div>
                  {searchResults.map((result, index) => (
                    <button
                      key={index}
                      type="button"
                      className="search-popup__result-item"
                      onClick={() => handleResultClick(result.path)}
                    >
                      <div className="search-popup__result-header">
                        <span 
                          className="search-popup__result-title"
                          dangerouslySetInnerHTML={{ __html: highlightText(result.title, searchQuery) }}
                        />
                        {result.category && (
                          <span className="search-popup__result-category">{result.category}</span>
                        )}
                      </div>
                      <span 
                        className="search-popup__result-path"
                        dangerouslySetInnerHTML={{ __html: highlightText(result.path, searchQuery) }}
                      />
                      {result.content && (
                        <p 
                          className="search-popup__result-preview"
                          dangerouslySetInnerHTML={{ __html: highlightText(result.content.substring(0, 100) + '...', searchQuery) }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
              
              {!isSearching && searchResults.length === 0 && !foundOnCurrentPage && searchQuery.trim().length >= 2 && (
                <div className="search-popup__no-results">
                  Ничего не найдено. Попробуйте другой запрос.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
