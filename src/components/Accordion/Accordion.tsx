import { useState } from 'react';
import './Accordion.css';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  isActive?: boolean;
  onToggle?: () => void;
}

export default function Accordion({ title, children, isActive = false, onToggle }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(isActive);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (onToggle) {
      onToggle();
    }
  };

  return (
    <div className="accordion">
      <button 
        className={`accordion__header ${isOpen ? 'accordion__header--active' : ''}`}
        onClick={handleToggle}
      >
        <span className="accordion__title">{title}</span>
        <svg 
          className={`accordion__arrow ${isOpen ? 'accordion__arrow--open' : ''}`}
          width="22" 
          height="12" 
          viewBox="0 0 22 12" 
          fill="none"
        >
          <path 
            d="M0.566406 0.56543L10.5664 10.5654L20.5664 0.56543" 
            stroke="#131E39" 
            strokeWidth="1.6"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="accordion__content">
          {children}
        </div>
      )}
    </div>
  );
}
