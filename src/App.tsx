import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Services from './components/Services/Services'
import History from './components/History/History'
import Footer from './components/Footer/Footer'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import PeoplePage from './pages/PeoplePage'
import AboutPage from './pages/AboutPage'
import HistoryPage from './pages/HistoryPage'
import ContactsPage from './pages/ContactsPage'
import PortInformationPage from './pages/PortInformationPage'
import ShipArrivalsPage from './pages/ShipArrivalsPage'
import SchedulePage from './pages/SchedulePage'
import NotFoundPage from './pages/NotFoundPage'
import { PortCalculationProvider, usePortCalculation } from './contexts/PortCalculationContext'
import PortCalculationForm from './components/PortCalculationForm/PortCalculationForm'

function ScrollToTopButton() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Находим футер
      const footer = document.querySelector('.footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const footerTop = scrollPosition + footerRect.top;
        const footerPaddingTop = 100; // padding-top футера
        const offset = 100; // отступ от начала футера
        
        // Когда до начала футера остается 100px + padding сверху (100px) = 200px
        const threshold = footerTop - footerPaddingTop - offset;
        const currentBottom = scrollPosition + windowHeight;
        
        setIsScrolled(scrollPosition > 300);
        setIsFixed(currentBottom >= threshold);
      } else {
        setIsScrolled(scrollPosition > 300);
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Проверяем при загрузке
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isScrolled) return null;

  return (
    <button 
      className={`scroll-top ${isFixed ? 'scroll-top--fixed' : ''}`}
      onClick={scrollToTop}
      aria-label="Прокрутить вверх"
    >
      <img 
        src="/images/tild6661-3434-4461-a531-623331306564__arrow_1.svg" 
        alt="" 
        className="scroll-top__img"
      />
    </button>
  );
}

function HomePage() {
  return (
    <>
      <Hero showLogos={true} />
      <Services />
      <History />
      <Footer />
    </>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function AppContent() {
  const { isOpen, closeForm } = usePortCalculation();

  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:id" element={<ServiceDetailPage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/history" element={<HistoryPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/port-information" element={<PortInformationPage />} />
            <Route path="/ship-arrivals" element={<ShipArrivalsPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ScrollToTopButton />
      <PortCalculationForm isOpen={isOpen} onClose={closeForm} />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <PortCalculationProvider>
        <div className="app">
          <div className="app__container">
            <AppContent />
          </div>
        </div>
      </PortCalculationProvider>
    </BrowserRouter>
  )
}

export default App
