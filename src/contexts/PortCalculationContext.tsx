import { createContext, useContext, useState, ReactNode } from 'react';

interface PortCalculationContextType {
  isOpen: boolean;
  openForm: () => void;
  closeForm: () => void;
}

const PortCalculationContext = createContext<PortCalculationContextType | undefined>(undefined);

export function PortCalculationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openForm = () => setIsOpen(true);
  const closeForm = () => setIsOpen(false);

  return (
    <PortCalculationContext.Provider value={{ isOpen, openForm, closeForm }}>
      {children}
    </PortCalculationContext.Provider>
  );
}

export function usePortCalculation() {
  const context = useContext(PortCalculationContext);
  if (context === undefined) {
    throw new Error('usePortCalculation must be used within a PortCalculationProvider');
  }
  return context;
}
