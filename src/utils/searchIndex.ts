// Полный индекс контента сайта для поиска
export interface SearchResult {
  path: string;
  title: string;
  content: string;
  keywords: string[];
  category?: string;
}

export const searchIndex: SearchResult[] = [
  {
    path: '/',
    title: 'Главная',
    category: 'Главная страница',
    keywords: ['главная', 'transmarine', 'трансмарин', 'линейные агенты', 'трамповые агенты', 'экспедиторы', '1996', 'портовое агентство', 'логистика', 'морское агентство', 'калининград'],
    content: 'TransMarine - морское агентство с 1996 года. Линейные и трамповые агенты, экспедиторы. Портовое агентство в Калининграде. Полный спектр услуг по логистике и экспедированию грузов.'
  },
  {
    path: '/about',
    title: 'О нас',
    category: 'О компании',
    keywords: ['о нас', 'компания', 'миссия', 'история', '1992', 'yanmarine', 'моряки', 'береговая карьера', 'трансмарин', 'команда', 'ценности', 'философия'],
    content: 'О компании TransMarine. Наша миссия и история. Команда бывших моряков с практическими знаниями флота и портовой работы. Начало с морского агентства YANMARINE в 1992 году.'
  },
  {
    path: '/services',
    title: 'Услуги',
    category: 'Услуги',
    keywords: ['услуги', 'экспедирование', 'судоходная линия', 'портовое агентство', 'калининград', 'санкт-петербург', 'киль', 'логистика', 'перевозки'],
    content: 'Услуги TransMarine: экспедирование грузов, судоходная линия Санкт-Петербург / Калининград, портовое агентство. Полный комплекс логистических услуг.'
  },
  {
    path: '/services/1',
    title: 'Экспедирование',
    category: 'Услуги',
    keywords: ['экспедирование', 'экспедитор', 'груз', 'логистика', 'таможня', 'документы', 'доставка', 'страхование', 'оформление', 'контейнеры'],
    content: 'Экспедирование грузов. Оформление всех необходимых документов, таможенное оформление, организация доставки от двери до двери, страхование грузов, консультации по логистике, отслеживание грузов в режиме реального времени.'
  },
  {
    path: '/services/2',
    title: 'Судоходная линия Санкт-Петербург / Калининград',
    category: 'Услуги',
    keywords: ['судоходная линия', 'санкт-петербург', 'калининград', 'киль', 'регулярная линия', 'контейнеры', 'бумага', 'рейс', 'расписание'],
    content: 'Судоходная линия Санкт-Петербург / Калининград. Регулярные рейсы, контейнерные перевозки, перевозка бумаги. Расписание рейсов, контакты для бронирования.'
  },
  {
    path: '/services/3',
    title: 'Портовое агентство',
    category: 'Услуги',
    keywords: ['портовое агентство', 'порт', 'судно', 'агентирование', 'калининградский порт', 'кмтп', 'портовые услуги', 'судозаход'],
    content: 'Портовое агентство в Калининградском порту. Полный комплекс услуг по агентированию судов, оформление документов, организация портовых операций, связь с портовыми службами.'
  },
  {
    path: '/people',
    title: 'Люди',
    category: 'Команда',
    keywords: ['люди', 'команда', 'специалисты', 'сотрудники', 'эксперты', 'персонал'],
    content: 'Команда TransMarine. Наши специалисты и эксперты в области морской логистики и портового агентства.'
  },
  {
    path: '/history',
    title: 'История',
    category: 'История',
    keywords: ['история', '1992', '1993', '1995', '1996', 'yanmarine', 'академик артоболевский', 'газетная бумага', 'киль', 'обучение', 'lloyd', 'bimco', 'моряки', 'береговая карьера'],
    content: 'История TransMarine с 1992 года. Начало с морского агентства YANMARINE. Первое судно под нашим агентированием - т/х Академик Артоболевский в марте 1993. Перевозка газетной бумаги, обучение специалистов в Lloyd\'s Maritime Academy и BIMCO.'
  },
  {
    path: '/contacts',
    title: 'Контакты',
    category: 'Контакты',
    keywords: ['контакты', 'адрес', 'телефон', 'почта', 'калининград', 'портовая', 'office@transmarine.ru', '632-256', '632-120', 'agency@transmarine.ru', 'forwarding@transmarine.ru', 'chartering@transmarine.ru'],
    content: 'Контакты TransMarine. Адрес: Россия 236003 Калининград Портовая ул. 24. Телефоны: (+7 4012) 632-256, 632-120. Email: office@transmarine.ru, agency@transmarine.ru, forwarding@transmarine.ru, chartering@transmarine.ru'
  },
  {
    path: '/port-information',
    title: 'Информация о Калининградском порте',
    category: 'Информация',
    keywords: ['порт', 'калининградский порт', 'прибытие', 'ограничения', 'документы', 'таможня', 'поставки', 'лихтеры', 'лед', 'оспс', 'оборудование', 'пилотирование', 'коммуникации', 'кмтп'],
    content: 'Информация о Калининградском порте. Процедуры прибытия судов, ограничения по размерам и осадке, необходимые документы, таможенные процедуры, поставки и снабжение, работа с лихтерами, ледовая обстановка, ОСПС, оборудование, пилотирование, коммуникации.'
  },
  {
    path: '/schedule',
    title: 'Расписание линий',
    category: 'Расписание',
    keywords: ['расписание', 'линия', 'рейс', 'отправление', 'прибытие', 'судно', 'судозаход', 'расписание рейсов'],
    content: 'Расписание линий. Регулярные рейсы судоходной линии Санкт-Петербург / Калининград. Расписание отправлений и прибытий, названия судов, контактная информация.'
  },
  {
    path: '/ship-arrivals',
    title: 'Судозаходы',
    category: 'Судозаходы',
    keywords: ['судозаходы', 'судно', 'прибытие', 'отправление', 'ожидается', 'прибыло', 'отправилось', 'судна', 'порт', 'рейс'],
    content: 'Судозаходы в Калининградский порт. Информация о прибывающих и отправляющихся судах, статусы рейсов, ожидаемые суда.'
  }
];

// Функция поиска по индексу
export function searchInIndex(query: string, currentPath?: string): SearchResult[] {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const searchText = query.toLowerCase().trim();
  const words = searchText.split(/\s+/).filter(word => word.length > 1);

  const results = searchIndex
    .filter(page => !currentPath || page.path !== currentPath)
    .map(page => {
      let score = 0;
      const searchableText = `${page.title} ${page.content} ${page.keywords.join(' ')}`.toLowerCase();

      // Точное совпадение в заголовке
      if (page.title.toLowerCase().includes(searchText)) {
        score += 10;
      }

      // Точное совпадение в контенте
      if (page.content.toLowerCase().includes(searchText)) {
        score += 5;
      }

      // Совпадение в ключевых словах
      page.keywords.forEach(keyword => {
        if (keyword.toLowerCase().includes(searchText)) {
          score += 3;
        } else if (words.some(word => keyword.toLowerCase().includes(word))) {
          score += 1;
        }
      });

      // Поиск по словам
      words.forEach(word => {
        if (searchableText.includes(word)) {
          score += 1;
        }
      });

      // Начало слова
      if (page.title.toLowerCase().startsWith(searchText)) {
        score += 5;
      }

      return { ...page, score };
    })
    .filter(page => page.score > 0)
    .sort((a, b) => (b as any).score - (a as any).score)
    .slice(0, 8)
    .map(page => {
      const { score, ...rest } = page as any;
      return rest;
    });

  return results;
}

// Функция подсветки найденного текста
export function highlightText(text: string, query: string): string {
  if (!query || query.trim().length < 2) {
    return text;
  }

  const searchText = query.trim();
  const regex = new RegExp(`(${searchText})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}
