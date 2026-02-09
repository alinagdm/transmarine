import './AboutIntro.css';

export default function AboutIntro() {
  return (
    <section className="about-intro">
      <div className="about-intro__container">
        <h2 className="about-intro__title">
          Мы – старейшее независимое морское агентство Калининградского региона,
        </h2>
        <p className="about-intro__text">
          обладающее уникальным опытом и безупречной репутацией. На протяжении трех десятилетий мы обеспечиваем<br />
          полный комплекс услуг в порту Калининград: от линейного и трампового агентирования до экспедирования<br />
          грузов и логистического сопровождения сложных проектов.
        </p>
      </div>
    </section>
  );
}
