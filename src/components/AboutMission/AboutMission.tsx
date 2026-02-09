import './AboutMission.css';

export default function AboutMission() {
  return (
    <section className="about-mission">
      <div className="about-mission__container">
        <div className="about-mission__line"></div>
        <div className="about-mission__content">
          <h2 className="about-mission__title">Наша миссия –</h2>
          <p className="about-mission__text">
            быть для вас не просто агентом, а надежным звеном в цепочке поставок, партнером, на которого можно положиться.
          </p>
        </div>
        <div className="about-mission__image">
          <img 
            src="https://placehold.co/570x429" 
            alt="Наша миссия" 
          />
        </div>
      </div>
    </section>
  );
}
