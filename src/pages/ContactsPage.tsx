import Hero from '../components/Hero/Hero';
import Footer from '../components/Footer/Footer';
import './ContactsPage.css';

export default function ContactsPage() {

  return (
    <>
      <Hero 
        title="Свяжитесь с нами"
        showBreadcrumbs={true}
      />
      <section className="contacts">
        <div className="contacts__container">
          <div className="contacts__line"></div>
          <h2 className="contacts__title">контакты</h2>
          
          <div className="contacts__content">
            <div className="contacts__left">
              <div className="contacts__map">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=20.469965%2C54.702256&z=16&pt=20.469965%2C54.702256&l=map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0 }}
                  title="Карта TransMarine"
                ></iframe>
              </div>
            </div>

            <div className="contacts__right">
              <div className="contacts__info">
                <div className="contacts__info-row">
                  <div className="contacts__label">Адрес</div>
                  <div className="contacts__value">
                    Россия, 236003, Калининград, ул. Портовая 24
                  </div>
                </div>
                <div className="contacts__divider"></div>
                
                <div className="contacts__info-row">
                  <div className="contacts__label">Телефоны</div>
                  <div className="contacts__phones">
                    <a href="tel:+74012632256" className="contacts__phone">(+7 4012) 632-256</a>
                    <a href="tel:+74012632120" className="contacts__phone">(+7 4012) 632-120</a>
                  </div>
                </div>
                <div className="contacts__divider"></div>
                
                <div className="contacts__info-row">
                  <div className="contacts__label">Факс</div>
                  <div className="contacts__phones">
                    <span className="contacts__phone">(+7 4012) 632-210</span>
                    <span className="contacts__phone">(+7 4012) 632-420</span>
                  </div>
                </div>
                <div className="contacts__divider"></div>
                
                <div className="contacts__info-row">
                  <div className="contacts__label">Telex</div>
                  <div className="contacts__value">
                    262 025 TRANS RU
                  </div>
                </div>
              </div>

              <div className="contacts__departments">
                <div className="contacts__department">
                  <div className="contacts__label">Отдел агентирования</div>
                  <a href="mailto:agency@transmarine.ru" className="contacts__email">agency@transmarine.ru</a>
                </div>
                <div className="contacts__divider"></div>
                
                <div className="contacts__department">
                  <div className="contacts__label">Отдел экспедирования</div>
                  <a href="mailto:forwarding@transmarine.ru" className="contacts__email">forwarding@transmarine.ru</a>
                </div>
                <div className="contacts__divider"></div>
                
                <div className="contacts__department">
                  <div className="contacts__label">Фрахтование и линейный сервис</div>
                  <a href="mailto:chartering@transmarine.ru" className="contacts__email">chartering@transmarine.ru</a>
                </div>
                <div className="contacts__divider"></div>
                
                <div className="contacts__department">
                  <div className="contacts__label">Общие вопросы</div>
                  <a href="mailto:office@transmarine.ru" className="contacts__email">office@transmarine.ru</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
