import './AboutHistory.css';

export default function AboutHistory() {
  return (
    <section className="about-history">
      <div className="about-history__container">
        <h3 className="about-history__label">НАША ИСТОРИЯ</h3>
        <div className="about-history__content">
          <p className="about-history__text">
            Берущее начало в 1992 году,<br />
            агентство «ТрансМарин» прошло путь<br />
            от небольшой команды бывших моряков<br />
            до одного из ключевых игроков на рынке портового агентства и логистики Калининградского региона.<br />
            Наша история — это история надежности, профессионального роста и адаптации<br />
            к вызовам мирового судоходства.
          </p>
          <div className="about-history__image">
            <img 
              src="https://placehold.co/570x429" 
              alt="Наша история" 
            />
          </div>
        </div>
        <button className="about-history__button">наша история</button>
      </div>
    </section>
  );
}
