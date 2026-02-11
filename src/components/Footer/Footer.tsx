import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__bg-wrapper">
        <img 
          src="/images/tild3734-6161-4531-b761-633263393233__ec9008f7260ce3d7b9b4.png" 
          alt="" 
          className="footer__bg"
          loading="lazy"
        />
      </div>
      
      <div className="footer__container">
        {/* Колонка 1: логотип, контакты, согласие */}
        <div className="footer__col footer__col--1">
          <div className="footer__logo-wrap">
            <div className="footer__logo-bg"></div>
            <img 
              src="/images/tild3734-3037-4431-b833-306630373132__mask_group.svg" 
              alt="TransMarine" 
              className="footer__logo"
              loading="lazy"
            />
          </div>
          <div className="footer__info">
            <div className="footer__info-row">
              <span className="footer__label">Адрес</span>
              <span className="footer__value">Россия, 236003, Калининград, ул. Портовая 24</span>
            </div>
            <div className="footer__divider"></div>
            <div className="footer__info-row footer__info-row--phones">
              <span className="footer__label">Телефоны</span>
              <span className="footer__value">+7 (4012) 632-256</span>
              <span className="footer__value">+7 (4012) 632-120</span>
            </div>
            <div className="footer__divider"></div>
            <div className="footer__info-row">
              <span className="footer__label">Почта</span>
              <span className="footer__value">office@transmarine.ru</span>
            </div>
          </div>
          <a href="#privacy" className="footer__privacy">
            Согласие на обработку персональных данных
          </a>
        </div>

        {/* Колонка 2: меню */}
        <nav className="footer__col footer__col--2 footer__menu">
          <Link to="/">Главная</Link>
          <a href="#news">Новости</a>
          <Link to="/services">Услуги</Link>
          <Link to="/about">О компании</Link>
          <Link to="/contacts">Контакты</Link>
          <a href="#contact">Связаться</a>
        </nav>

        {/* Колонка 3: копирайт и логотипы */}
        <div className="footer__col footer__col--3">
          <div className="footer__copyright">© 2026 TransMarine.</div>
          <div className="footer__logos">
            <img 
              src="/images/tild3663-3539-4861-b630-656133663233__bimco2016_logo-membe.svg" 
              alt="BIMCO" 
              className="footer__logo-bimco"
              loading="lazy"
            />
            <img 
              src="/images/tild6235-3665-4166-b039-383537363737__bvcer_sansqr-iso_900.svg" 
              alt="ISO 9001" 
              className="footer__logo-iso"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
