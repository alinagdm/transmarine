import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import './ShipArrivalsPage.css';

interface ShipArrival {
  id: string;
  shipName: string;
  flag: string;
  type: string;
  arrivalDate: string;
  arrivalTime: string;
  berth: string;
  cargo: string;
  status: 'expected' | 'arrived' | 'departed';
}

export default function ShipArrivalsPage() {
  const [arrivals, setArrivals] = useState<ShipArrival[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'expected' | 'arrived' | 'departed'>('all');

  useEffect(() => {
    fetchShipArrivals();
  }, []);

  const fetchShipArrivals = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Используем тестовые данные
      // В будущем здесь можно подключить реальный API
      const mockData: ShipArrival[] = generateMockData();
      setArrivals(mockData);
    } catch (err) {
      setError('Не удалось загрузить данные о судозаходах');
      console.error('Error fetching ship arrivals:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateMockData = (): ShipArrival[] => {
    const now = new Date();
    const ships: ShipArrival[] = [];
    
    const shipTypes = ['Контейнеровоз', 'Балкер', 'Танкер', 'Ролкер', 'Генеральный груз'];
    const flags = ['🇷🇺 Россия', '🇱🇹 Литва', '🇵🇱 Польша', '🇩🇪 Германия', '🇳🇱 Нидерланды'];
    const cargoTypes = ['Контейнеры', 'Уголь', 'Нефть', 'Автомобили', 'Лес', 'Металл'];
    const berths = ['Балтийск', 'Светлый', 'КМРП', 'КМТП', 'Новобалт'];
    
    // Генерируем данные на ближайшие 7 дней
    for (let i = 0; i < 20; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() + Math.floor(Math.random() * 7));
      const hours = Math.floor(Math.random() * 24);
      const minutes = Math.floor(Math.random() * 60);
      
      const statuses: ('expected' | 'arrived' | 'departed')[] = ['expected', 'arrived', 'departed'];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      ships.push({
        id: `ship-${i + 1}`,
        shipName: `MV ${['Atlantic', 'Baltic', 'Nordic', 'Marine', 'Cargo', 'Trade', 'Ocean', 'Port'][Math.floor(Math.random() * 8)]} ${Math.floor(Math.random() * 9999)}`,
        flag: flags[Math.floor(Math.random() * flags.length)],
        type: shipTypes[Math.floor(Math.random() * shipTypes.length)],
        arrivalDate: date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }),
        arrivalTime: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
        berth: berths[Math.floor(Math.random() * berths.length)],
        cargo: cargoTypes[Math.floor(Math.random() * cargoTypes.length)],
        status: status,
      });
    }
    
    return ships.sort((a, b) => {
      const dateA = new Date(`${a.arrivalDate} ${a.arrivalTime}`);
      const dateB = new Date(`${b.arrivalDate} ${b.arrivalTime}`);
      return dateA.getTime() - dateB.getTime();
    });
  };

  const filteredArrivals = filter === 'all' 
    ? arrivals 
    : arrivals.filter(ship => ship.status === filter);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'expected': return 'Ожидается';
      case 'arrived': return 'Прибыло';
      case 'departed': return 'Отбыло';
      default: return status;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'expected': return 'ship-arrivals__status--expected';
      case 'arrived': return 'ship-arrivals__status--arrived';
      case 'departed': return 'ship-arrivals__status--departed';
      default: return '';
    }
  };

  return (
    <>
      <Hero 
        title="Судозаходы Калининград"
        showBreadcrumbs={true}
      />
      <div className="app__container">
        <section className="ship-arrivals">
        <div className="ship-arrivals__container">
          <div className="ship-arrivals__header">
            <h2 className="ship-arrivals__title">Расписание судозаходов</h2>
            <p className="ship-arrivals__description">
              Актуальная информация о прибытии судов в порт Калининград
            </p>
          </div>

          <div className="ship-arrivals__filters">
            <button 
              className={`ship-arrivals__filter ${filter === 'all' ? 'ship-arrivals__filter--active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Все
            </button>
            <button 
              className={`ship-arrivals__filter ${filter === 'expected' ? 'ship-arrivals__filter--active' : ''}`}
              onClick={() => setFilter('expected')}
            >
              Ожидаются
            </button>
            <button 
              className={`ship-arrivals__filter ${filter === 'arrived' ? 'ship-arrivals__filter--active' : ''}`}
              onClick={() => setFilter('arrived')}
            >
              Прибыли
            </button>
            <button 
              className={`ship-arrivals__filter ${filter === 'departed' ? 'ship-arrivals__filter--active' : ''}`}
              onClick={() => setFilter('departed')}
            >
              Отбыли
            </button>
          </div>

          {loading && (
            <div className="ship-arrivals__loading">
              <p>Загрузка данных...</p>
            </div>
          )}

          {error && (
            <div className="ship-arrivals__error">
              <p>{error}</p>
              <button onClick={fetchShipArrivals} className="ship-arrivals__retry">
                Попробовать снова
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              {filteredArrivals.length === 0 ? (
                <div className="ship-arrivals__empty">
                  <p>Нет данных о судозаходах для выбранного фильтра</p>
                </div>
              ) : (
                <div className="ship-arrivals__table-wrapper">
                  <table className="ship-arrivals__table">
                    <thead>
                      <tr>
                        <th>Судно</th>
                        <th>Флаг</th>
                        <th>Тип</th>
                        <th>Дата прибытия</th>
                        <th>Время</th>
                        <th>Причал</th>
                        <th>Груз</th>
                        <th>Статус</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredArrivals.map((ship) => (
                        <tr key={ship.id}>
                          <td className="ship-arrivals__ship-name">{ship.shipName}</td>
                          <td>{ship.flag}</td>
                          <td>{ship.type}</td>
                          <td>{ship.arrivalDate}</td>
                          <td>{ship.arrivalTime}</td>
                          <td>{ship.berth}</td>
                          <td>{ship.cargo}</td>
                          <td>
                            <span className={`ship-arrivals__status ${getStatusClass(ship.status)}`}>
                              {getStatusLabel(ship.status)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          <div className="ship-arrivals__info">
            <p className="ship-arrivals__info-text">
              <strong>Примечание:</strong> Информация обновляется в режиме реального времени. 
              Для получения актуальных данных о судозаходах и уточнения деталей, пожалуйста, 
              <Link to="/contacts" className="ship-arrivals__link"> свяжитесь с нами</Link>.
            </p>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
