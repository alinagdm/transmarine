import { useEffect } from 'react';
import './Hero.css';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

interface HeroProps {
  title?: string | React.ReactNode;
  showBreadcrumbs?: boolean;
  showLogos?: boolean;
}

export default function Hero({ 
  title,
  showBreadcrumbs = false,
  showLogos = false
}: HeroProps) {

  useEffect(() => {
    const scrollBtn = document.querySelector('.hero__scroll');
    if (scrollBtn) {
      scrollBtn.addEventListener('click', () => {
        // Находим hero блок
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
          // Находим следующий элемент после hero
          const heroRect = heroSection.getBoundingClientRect();
          const heroBottom = window.scrollY + heroRect.bottom;
          
          // Ищем следующий элемент после hero
          const allSections = document.querySelectorAll('section, .history-page, .history-timeline, .services, .about-intro, .about-mission-history, .people, .team, .port-information');
          let nextSection: HTMLElement | null = null;
          
          for (let i = 0; i < allSections.length; i++) {
            const section = allSections[i];
            if (!(section instanceof HTMLElement)) continue;
            
            const sectionRect = section.getBoundingClientRect();
            const sectionTop = window.scrollY + sectionRect.top;
            
            // Если секция находится ниже hero и еще не нашли следующую
            if (sectionTop > heroBottom && !nextSection) {
              nextSection = section;
              break;
            }
          }
          
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            // Если не нашли следующую секцию, просто скроллим вниз на высоту экрана
            window.scrollTo({ top: heroBottom, behavior: 'smooth' });
          }
        }
      });
    }
  }, []);

  const defaultTitle = (
    <>
      TRANSMARINE - ЛИНЕЙНЫЕ<br />
      И ТРАМПОВЫЕ АГЕНТЫ / ЭКСПЕДИТОРЫ С 1996 ГОДА
    </>
  );

  return (
    <section className="hero">
      <div className="hero__bg-wrapper">
        <img 
          src={showLogos 
            ? "/images/BONTRUP PEARL (2).JPG"
            : "/images/суда.JPG"
          }
          alt="" 
          className="hero__bg"
          loading="eager"
          fetchPriority="high"
        />
        <div className="hero__overlay" />
      </div>
      {showBreadcrumbs && <Breadcrumbs />}
      <div className="hero__content">
        <h1 className="hero__title">
          {title || defaultTitle}
        </h1>
        <div className="hero__bottom">
          <button className="hero__scroll" aria-label="Прокрутить вниз">
            <img 
              src="/images/tild6661-3434-4461-a531-623331306564__arrow_1.svg" 
              alt="" 
              className="hero__scroll-img"
            />
          </button>
          {showLogos && (
            <div className="hero__logos">
              <img 
                src="/images/tild3663-3539-4861-b630-656133663233__bimco2016_logo-membe.svg" 
                alt="BIMCO" 
                className="hero__logo-bimco" 
              />
              <img 
                src="/images/tild6235-3665-4166-b039-383537363737__bvcer_sansqr-iso_900.svg" 
                alt="ISO 9001" 
                className="hero__logo-iso" 
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
