import { Link } from 'react-router-dom';
import './AboutMissionHistory.css';

export default function AboutMissionHistory() {
  return (
    <section className="about-mission-history">
      <div className="about-mission-history__container">
        {/* Линия */}
        <svg 
          className="about-mission-history__line"
          width="490" 
          height="2" 
          viewBox="0 0 490 2" 
          fill="none"
        >
          <path d="M0 1H490" stroke="#111111" strokeWidth="2"/>
        </svg>

        {/* Наша миссия */}
        <div className="about-mission-history__mission-section">
          <h2 className="about-mission-history__mission-title">Наша миссия –</h2>
          <p className="about-mission-history__mission-text">
            быть для вас не просто агентом, а надежным звеном в цепочке поставок, партнером, на которого можно положиться.
          </p>
        </div>

        {/* Изображение и история */}
        <div className="about-mission-history__content-wrapper">
          <div className="about-mission-history__image">
            <img 
              src="/images/суда.JPG" 
              alt="Судно" 
            />
          </div>

          <h3 className="about-mission-history__history-label">НАША ИСТОРИЯ</h3>
          <p className="about-mission-history__history-text">
            Берущее начало в 1992 году,<br />
            агентство «ТрансМарин» прошло путь<br />
            от небольшой команды бывших моряков<br />
            до одного из ключевых игроков на рынке портового агентства и логистики Калининградского региона.<br />
            Наша история — это история надежности, профессионального роста и адаптации<br />
            к вызовам мирового судоходства.
          </p>

          <Link to="/history" className="about-mission-history__button">наша история</Link>
        </div>
      </div>
    </section>
  );
}
