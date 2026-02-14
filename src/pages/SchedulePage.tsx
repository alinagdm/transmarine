import Hero from '../components/Hero/Hero';
import './SchedulePage.css';

interface ScheduleRoute {
  id: string;
  route: string;
  departurePort: string;
  arrivalPort: string;
  departureDays: string[];
  departureTime: string;
  arrivalTime: string;
  duration: string;
  vessel: string;
  frequency: string;
}

export default function SchedulePage() {
  // Расписание судоходной линии Санкт-Петербург / Калининград
  const schedules: ScheduleRoute[] = [
    {
      id: '1',
      route: 'Санкт-Петербург → Калининград',
      departurePort: 'Санкт-Петербург',
      arrivalPort: 'Калининград',
      departureDays: ['Понедельник', 'Среда', 'Пятница'],
      departureTime: '18:00',
      arrivalTime: '10:00',
      duration: '16 часов',
      vessel: 'MV TransMarine Express',
      frequency: '3 раза в неделю',
    },
    {
      id: '2',
      route: 'Калининград → Санкт-Петербург',
      departurePort: 'Калининград',
      arrivalPort: 'Санкт-Петербург',
      departureDays: ['Вторник', 'Четверг', 'Суббота'],
      departureTime: '20:00',
      arrivalTime: '12:00',
      duration: '16 часов',
      vessel: 'MV TransMarine Express',
      frequency: '3 раза в неделю',
    },
  ];

  const getDayAbbreviation = (day: string) => {
    const abbreviations: Record<string, string> = {
      'Понедельник': 'Пн',
      'Вторник': 'Вт',
      'Среда': 'Ср',
      'Четверг': 'Чт',
      'Пятница': 'Пт',
      'Суббота': 'Сб',
      'Воскресенье': 'Вс',
    };
    return abbreviations[day] || day;
  };

  return (
    <>
      <Hero 
        title="Расписание линий"
        showBreadcrumbs={true}
      />
      <section className="schedule">
        <div className="schedule__container">
          <div className="schedule__header">
            <h2 className="schedule__title">Расписание судоходной линии</h2>
            <p className="schedule__subtitle">Санкт-Петербург / Калининград</p>
            <p className="schedule__description">
              Регулярные рейсы между портами Санкт-Петербурга и Калининграда. 
              Надежная и быстрая доставка грузов с соблюдением расписания.
            </p>
          </div>

          <div className="schedule__routes">
            {schedules.map((schedule) => (
              <div key={schedule.id} className="schedule__route-card">
                <div className="schedule__route-header">
                  <h3 className="schedule__route-title">{schedule.route}</h3>
                  <span className="schedule__route-frequency">{schedule.frequency}</span>
                </div>

                <div className="schedule__route-content">
                  <div className="schedule__route-info">
                    <div className="schedule__info-item">
                      <span className="schedule__info-label">Отправление:</span>
                      <span className="schedule__info-value">{schedule.departurePort}</span>
                    </div>
                    <div className="schedule__info-item">
                      <span className="schedule__info-label">Прибытие:</span>
                      <span className="schedule__info-value">{schedule.arrivalPort}</span>
                    </div>
                    <div className="schedule__info-item">
                      <span className="schedule__info-label">Время отправления:</span>
                      <span className="schedule__info-value schedule__info-value--time">{schedule.departureTime}</span>
                    </div>
                    <div className="schedule__info-item">
                      <span className="schedule__info-label">Время прибытия:</span>
                      <span className="schedule__info-value schedule__info-value--time">{schedule.arrivalTime}</span>
                    </div>
                    <div className="schedule__info-item">
                      <span className="schedule__info-label">Длительность:</span>
                      <span className="schedule__info-value">{schedule.duration}</span>
                    </div>
                    <div className="schedule__info-item">
                      <span className="schedule__info-label">Судно:</span>
                      <span className="schedule__info-value">{schedule.vessel}</span>
                    </div>
                  </div>

                  <div className="schedule__route-days">
                    <span className="schedule__days-label">Дни отправления:</span>
                    <div className="schedule__days-list">
                      {schedule.departureDays.map((day, index) => (
                        <span key={index} className="schedule__day">
                          <span className="schedule__day-full">{day}</span>
                          <span className="schedule__day-short">{getDayAbbreviation(day)}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="schedule__notice">
            <div className="schedule__notice-icon">ℹ️</div>
            <div className="schedule__notice-content">
              <p className="schedule__notice-title">Важная информация:</p>
              <ul className="schedule__notice-list">
                <li>Расписание может изменяться в зависимости от погодных условий и загрузки порта</li>
                <li>Рекомендуется уточнять актуальное расписание перед отправкой груза</li>
                <li>Для бронирования места и получения дополнительной информации свяжитесь с нами</li>
              </ul>
            </div>
          </div>

          <div className="schedule__contact">
            <p className="schedule__contact-text">
              Для уточнения расписания и бронирования места обращайтесь:
            </p>
            <div className="schedule__contact-info">
              <a href="tel:+74012632256" className="schedule__contact-link">
                +7 (4012) 632-256
              </a>
              <a href="mailto:chartering@transmarine.ru" className="schedule__contact-link">
                chartering@transmarine.ru
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
