import Hero from '../components/Hero/Hero';
import People from '../components/People/People';

// Моковые данные для команды
const peopleData = [
  { name: 'Фамилия Имя', position: 'должность', image: 'https://placehold.co/285x428', department: 'management' },
  { name: 'Фамилия Имя', position: 'должность', image: 'https://placehold.co/285x428', department: 'operations' },
  { name: 'Фамилия Имя', position: 'должность', image: 'https://placehold.co/285x428', department: 'logistics' },
  { name: 'Фамилия Имя', position: 'должность', image: 'https://placehold.co/285x428', department: 'management' },
  { name: 'Фамилия Имя', position: 'должность', image: 'https://placehold.co/285x428', department: 'operations' },
  { name: 'Фамилия Имя', position: 'должность', image: 'https://placehold.co/285x428', department: 'logistics' },
  { name: 'Фамилия Имя', position: 'должность', image: 'https://placehold.co/285x428', department: 'management' },
  { name: 'Фамилия Имя', position: 'должность', image: 'https://placehold.co/285x428', department: 'operations' },
];

export default function PeoplePage() {
  return (
    <>
      <Hero 
        title="люди"
        showBreadcrumbs={true}
      />
      <div className="app__container">
        <People people={peopleData} />
      </div>
    </>
  );
}
