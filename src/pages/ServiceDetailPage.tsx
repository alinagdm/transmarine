import { useParams } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import ServiceBenefits from '../components/ServiceBenefits/ServiceBenefits';
import Team from '../components/Team/Team';
import Footer from '../components/Footer/Footer';

const servicesData: Record<string, {
  title: string;
  description: string;
  image: string;
  features: string[];
  benefits: string[];
  teamMembers: Array<{
    name: string;
    position: string;
    image: string;
  }>;
}> = {
  '1': {
    title: 'ЭКСПЕДИРОВАНИЕ',
    description: 'Мы предоставляем полный спектр экспедиторских услуг для морских перевозок. Наша компания имеет многолетний опыт работы в сфере логистики и экспедирования грузов.',
    image: '/images/tild3364-6633-4964-b364-376136663461__85b4e65f6f0a22c360d6.jpg',
    features: [
      'Оформление всех необходимых документов',
      'Таможенное оформление грузов',
      'Организация доставки от двери до двери',
      'Страхование грузов',
      'Консультации по логистике',
      'Отслеживание грузов в режиме реального времени'
    ],
    benefits: [
      'Работа с 1996 года — многолетний опыт<br/>в сфере экспедирования грузов',
      'Опыт работы с различными типами грузов:<br/>генеральные, контейнерные, наливные',
      'Полный комплекс услуг от оформления документов<br/>до доставки от двери до двери',
      'Профессиональная команда специалистов<br/>с глубокими знаниями логистики'
    ],
    teamMembers: [
      {
        name: 'Фамилия Имя',
        position: 'должность',
        image: 'https://placehold.co/285x428'
      },
      {
        name: 'Фамилия Имя',
        position: 'должность',
        image: 'https://placehold.co/285x428'
      },
      {
        name: 'Фамилия Имя',
        position: 'должность',
        image: 'https://placehold.co/285x428'
      },
      {
        name: 'Фамилия Имя',
        position: 'должность',
        image: 'https://placehold.co/285x428'
      }
    ]
  },
  '2': {
    title: 'СУДОХОДНАЯ ЛИНИЯ САНКТ-ПЕТЕРБУРГ / КАЛИНИНГРАД',
    description: 'Регулярные рейсы между портами Санкт-Петербурга и Калининграда. Надежная и быстрая доставка грузов.',
    image: '/images/tild3833-3331-4438-b336-306236336432__adee9ebc5fc1597ebf51.jpg',
    features: [
      'Регулярные рейсы',
      'Быстрая доставка',
      'Надежное обслуживание',
      'Отслеживание грузов'
    ],
    benefits: [
      'Регулярные рейсы между портами<br/>Санкт-Петербурга и Калининграда',
      'Надежная и быстрая доставка грузов<br/>с соблюдением сроков',
      'Профессиональное обслуживание<br/>на всех этапах перевозки',
      'Возможность отслеживания грузов<br/>в режиме реального времени'
    ],
    teamMembers: [
      {
        name: 'Фамилия Имя',
        position: 'должность',
        image: 'https://placehold.co/285x428'
      },
      {
        name: 'Фамилия Имя',
        position: 'должность',
        image: 'https://placehold.co/285x428'
      },
      {
        name: 'Фамилия Имя',
        position: 'должность',
        image: 'https://placehold.co/285x428'
      },
      {
        name: 'Фамилия Имя',
        position: 'должность',
        image: 'https://placehold.co/285x428'
      }
    ]
  },
  '3': {
    title: 'ПОРТОВОЕ АГЕНТИРОВАНИЕ',
    description: 'Полный комплекс услуг портового агента в порту Калининград. Мы обеспечиваем профессиональное обслуживание судов и грузов.',
    image: '/images/tild3934-3437-4334-a435-633737353365__4fc9aa092f9274b44423.jpg',
    features: [
      'Встреча и проводы судов',
      'Оформление портовых документов',
      'Организация бункеровки и снабжения',
      'Таможенное оформление',
      'Координация грузовых операций',
      'Связь с портовыми службами'
    ],
    benefits: [
      'Работа с 1992 года — с начала развития портового агентирования<br/>в регионе',
      'Опыт с разными типами грузов: сухие, наливные,<br/>генеральные, контейнерные',
      'Организация обработки всех видов судов — от малых<br/>«река-море» до сложных самопогружающихся судов',
      'Решение нестандартных задач с учётом местных условий'
    ],
    teamMembers: [
      {
        name: 'Фамилия Имя',
        position: 'должность',
        image: 'https://placehold.co/285x428'
      },
      {
        name: 'Фамилия Имя',
        position: 'должность',
        image: 'https://placehold.co/285x428'
      },
      {
        name: 'Фамилия Имя',
        position: 'должность',
        image: 'https://placehold.co/285x428'
      },
      {
        name: 'Фамилия Имя',
        position: 'должность',
        image: 'https://placehold.co/285x428'
      }
    ]
  }
};

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const serviceData = id ? servicesData[id] : servicesData['1'];

  if (!serviceData) {
    return null;
  }

  return (
    <>
      <Hero 
        title={serviceData.title}
        showBreadcrumbs={true}
      />
      <ServiceBenefits 
        title={serviceData.title}
        benefits={serviceData.benefits}
      />
      <Team members={serviceData.teamMembers} />
      <Footer />
    </>
  );
}
