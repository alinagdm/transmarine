import { Link } from 'react-router-dom';
import './History.css';

export default function History() {
  return (
    <section className="history">
      <div className="history__container">
        <div className="history__content">
          <div className="history__line"></div>
          <p className="history__label">история</p>
          <h2 className="history__title">
            Работа<br />с 1992 года
          </h2>
          <p className="history__text">
            с начала развития портового<br />
            агентирования<br />
            в регионе
          </p>
          <Link to="/history" className="history__button">ИСТОРИЯ</Link>
        </div>
        <div className="history__image">
          <img 
            src="/images/Линия.JPG" 
            alt="" 
          />
        </div>
      </div>
    </section>
  );
}
