import Hero from '../components/Hero/Hero';
import Accordion from '../components/Accordion/Accordion';
import Weather from '../components/Weather/Weather';
import './PortInformationPage.css';

export default function PortInformationPage() {
  return (
    <>
      <Hero 
        title="ПОРТ КАЛИНИНГРАД"
        showBreadcrumbs={true}
      />
      <div className="app__container">
        <PortInformationPageContent />
      </div>
    </>
  );
}

function PortInformationPageContent() {
  const firstAccordionItems = [
    { title: 'Прибытие', content: 'Информация о процедурах прибытия судов в порт...' },
    { title: 'Ограничения', content: 'Ограничения по размерам судов, осадке и другим параметрам...' },
    { title: 'Документы', content: 'Необходимые документы для захода в порт...' },
    { title: 'Таможня', content: 'Таможенные процедуры и требования...' },
    { title: 'Поставки', content: 'Информация о поставках и снабжении судов...' },
    { title: 'Лихтеры', content: 'Услуги по работе с лихтерами...' },
    { title: 'Лёд', content: 'Информация о ледовой обстановке...' },
  ];

  const secondAccordionItems = [
    { title: 'Соблюдение требований Кодекса ОСПС', content: 'Информация о соблюдении требований Международного кодекса по охране судов и портовых средств...' },
    { title: 'Оборудование для обработки грузов', content: 'Доступное оборудование для обработки различных типов грузов...' },
    { title: 'Регулярные судоходные линии', content: 'Информация о регулярных судоходных линиях...' },
    { title: 'Руководство для моряков при входе в порт', content: 'Подробное руководство для капитанов и экипажей судов...' },
    { title: 'Здоровье и медицина', content: 'Медицинские услуги и требования...' },
    { title: 'Ремонтные сооружения', content: 'Доступные ремонтные мощности и услуги...' },
    { title: 'Прием отходов/мусора', content: 'Услуги по приему и утилизации отходов...' },
    { title: 'Пилотирование', content: 'Услуги лоцманской проводки...' },
    { title: 'Коммуникации', content: 'Средства связи и коммуникации в порту...' },
  ];

  return (
    <>
      <section className="port-information">
        <div className="port-information__container">
          <div className="port-information__content">
            <div className="port-information__image">
              <img 
                src="/images/STK-2.jpg" 
                alt="Порт Калининград" 
                className="port-information__image-placeholder"
                loading="lazy"
              />
            </div>
            <div className="port-information__accordions">
              {firstAccordionItems.map((item, index) => (
                <Accordion key={index} title={item.title}>
                  <p>{item.content}</p>
                </Accordion>
              ))}
            </div>
          </div>
          <div className="port-information__accordions-full">
            {secondAccordionItems.map((item, index) => (
              <Accordion key={index} title={item.title}>
                <p>{item.content}</p>
              </Accordion>
            ))}
          </div>
        </div>
      </section>
      <Weather />
    </>
  );
}
