import { Link } from 'react-router-dom';
import './NotFoundPage.css';

export default function NotFoundPage() {
  return (
    <>
      <section className="not-found">
        <div className="not-found__container">
          <div className="not-found__content">
            <div className="not-found__number">404</div>
            <h1 className="not-found__title">Страница не найдена</h1>
            <p className="not-found__description">
              К сожалению, запрашиваемая страница не существует или была перемещена.
            </p>
            <div className="not-found__actions">
              <Link to="/" className="not-found__button not-found__button--primary">
                На главную
              </Link>
              <Link to="/contacts" className="not-found__button not-found__button--secondary">
                Связаться с нами
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
