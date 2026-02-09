import { useState, useEffect, useRef } from 'react';
import './People.css';

interface Person {
  name: string;
  position: string;
  image: string;
  department?: string;
}

interface PeopleProps {
  people: Person[];
}

export default function People({ people }: PeopleProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Получаем уникальные отделы
  const departments = ['all', ...Array.from(new Set(people.map(p => p.department || 'other')))];
  
  // Фильтруем людей по отделу
  const filteredPeople = selectedDepartment === 'all' 
    ? people 
    : people.filter(p => (p.department || 'other') === selectedDepartment);

  // Закрытие dropdown при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Разделяем на строки по 4 карточки
  const rows: Person[][] = [];
  for (let i = 0; i < filteredPeople.length; i += 4) {
    rows.push(filteredPeople.slice(i, i + 4));
  }

  return (
    <section className="people">
      <div className="people__container">
        <div className="people__filter-section">
          <div className="people__filter-label">фильтр</div>
          <div className="people__dropdown-wrapper" ref={dropdownRef}>
            <button 
              className="people__dropdown-btn"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="people__dropdown-text">отдел</span>
              <svg 
                className={`people__dropdown-arrow ${isDropdownOpen ? 'people__dropdown-arrow--open' : ''}`}
                width="16" 
                height="9" 
                viewBox="0 0 16 9" 
                fill="none"
              >
                <path 
                  d="M0.566406 0.565674L7.56641 7.56567L14.5664 0.565674" 
                  stroke="#131E39" 
                  strokeWidth="1.6"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="people__dropdown-menu">
                <button
                  className={`people__dropdown-item ${selectedDepartment === 'all' ? 'people__dropdown-item--active' : ''}`}
                  onClick={() => {
                    setSelectedDepartment('all');
                    setIsDropdownOpen(false);
                  }}
                >
                  Все отделы
                </button>
                {departments.filter(d => d !== 'all').map((dept) => (
                  <button
                    key={dept}
                    className={`people__dropdown-item ${selectedDepartment === dept ? 'people__dropdown-item--active' : ''}`}
                    onClick={() => {
                      setSelectedDepartment(dept);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <h2 className="people__title">Команда</h2>

        <div className="people__grid">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="people__row">
              {row.map((person, index) => (
                <div key={index} className="people__card">
                  <div className="people__image-wrapper">
                    {person.image && !person.image.includes('placehold.co') ? (
                      <img src={person.image} alt={person.name} className="people__image" />
                    ) : (
                      <div className="people__image people__image--placeholder"></div>
                    )}
                  </div>
                  <div className="people__info">
                    <div className="people__name">{person.name}</div>
                    <div className="people__position">{person.position}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
