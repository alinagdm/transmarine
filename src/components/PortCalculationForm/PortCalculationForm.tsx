import { useState, useEffect } from 'react';
import './PortCalculationForm.css';

interface PortCalculationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PortCalculationForm({ isOpen, onClose }: PortCalculationFormProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    navigationType: '', // каботаж / загранплавание
    shipType: '', // контейнеровозы / накатные/наплавные/пассажирские / наливные / прочие
    operation: '', // только вход / только выход / вход + выход
    terminal: '', // Балтийск / Светлый / КМРП / КМТП / Новобалт
    hasThruster: '', // есть / нет
    shipLength: '', // 80-120 / 120-145 / 146-160 / 161-175
    berthsCount: '1', // 1 / 2
    name: '',
    email: '',
    phone: '',
    consent: false,
  });

  const totalSteps = 8;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
    console.log('Form submitted:', formData);
    alert('Форма отправлена! Мы свяжемся с Вами в ближайшее время.');
    // Сброс формы
    setCurrentStep(1);
    setFormData({
      navigationType: '',
      shipType: '',
      operation: '',
      terminal: '',
      hasThruster: '',
      shipLength: '',
      berthsCount: '1',
      name: '',
      email: '',
      phone: '',
      consent: false,
    });
    onClose();
  };

  const handleClose = () => {
    // Сброс формы при закрытии
    setCurrentStep(1);
    setFormData({
      navigationType: '',
      shipType: '',
      operation: '',
      terminal: '',
      hasThruster: '',
      shipLength: '',
      berthsCount: '1',
      name: '',
      email: '',
      phone: '',
      consent: false,
    });
    onClose();
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.navigationType !== '';
      case 2:
        return formData.shipType !== '';
      case 3:
        return formData.operation !== '';
      case 4:
        return formData.terminal !== '';
      case 5:
        return formData.hasThruster !== '';
      case 6:
        return formData.shipLength !== '';
      case 7:
        return formData.berthsCount !== '';
      case 8:
        return formData.name !== '' && formData.email !== '' && formData.phone !== '' && formData.consent;
      default:
        return false;
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`port-calculation-form ${isOpen ? 'port-calculation-form--open' : ''}`}>
      <div className="port-calculation-form__overlay" onClick={handleClose}></div>
      <div className="port-calculation-form__content">
        <button 
          className="port-calculation-form__close"
          onClick={handleClose}
          aria-label="Закрыть форму"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 20.9999L20.9999 0.999941" stroke="#111111" strokeWidth="2" strokeLinecap="round"/>
            <path d="M21 20.9999L1.00006 0.999941" stroke="#111111" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="port-calculation-form__header">
          <h2 className="port-calculation-form__title">Расчет портовых сборов</h2>
          <p className="port-calculation-form__description">
            Для получения расчета заполните форму. Мы свяжемся с Вами для уточнения деталей и пришлем документ с расчетом на указанную почту.
          </p>
        </div>

        <div className="port-calculation-form__progress">
          <div className="port-calculation-form__progress-bar">
            <div 
              className="port-calculation-form__progress-fill"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
          <span className="port-calculation-form__progress-text">
            Шаг {currentStep} из {totalSteps}
          </span>
        </div>

        <form className="port-calculation-form__form" onSubmit={handleSubmit}>
          {/* Шаг 1: Каботаж / Загранплавание */}
          {currentStep === 1 && (
            <div className="port-calculation-form__step">
              <label className="port-calculation-form__step-label">Тип плавания</label>
              <div className="port-calculation-form__options">
                <button
                  type="button"
                  className={`port-calculation-form__option ${formData.navigationType === 'каботаж' ? 'port-calculation-form__option--active' : ''}`}
                  onClick={() => handleInputChange('navigationType', 'каботаж')}
                >
                  Каботаж
                </button>
                <button
                  type="button"
                  className={`port-calculation-form__option ${formData.navigationType === 'загранплавание' ? 'port-calculation-form__option--active' : ''}`}
                  onClick={() => handleInputChange('navigationType', 'загранплавание')}
                >
                  Загранплавание
                </button>
              </div>
            </div>
          )}

          {/* Шаг 2: Тип судна */}
          {currentStep === 2 && (
            <div className="port-calculation-form__step">
              <label className="port-calculation-form__step-label">Тип судна</label>
              <div className="port-calculation-form__options">
                <button
                  type="button"
                  className={`port-calculation-form__option ${formData.shipType === 'контейнеровозы' ? 'port-calculation-form__option--active' : ''}`}
                  onClick={() => handleInputChange('shipType', 'контейнеровозы')}
                >
                  Контейнеровозы
                </button>
                <button
                  type="button"
                  className={`port-calculation-form__option ${formData.shipType === 'накатные' ? 'port-calculation-form__option--active' : ''}`}
                  onClick={() => handleInputChange('shipType', 'накатные')}
                >
                  Накатные/наплавные/пассажирские
                </button>
                <button
                  type="button"
                  className={`port-calculation-form__option ${formData.shipType === 'наливные' ? 'port-calculation-form__option--active' : ''}`}
                  onClick={() => handleInputChange('shipType', 'наливные')}
                >
                  Наливные
                </button>
                <button
                  type="button"
                  className={`port-calculation-form__option ${formData.shipType === 'прочие' ? 'port-calculation-form__option--active' : ''}`}
                  onClick={() => handleInputChange('shipType', 'прочие')}
                >
                  Прочие
                </button>
              </div>
            </div>
          )}

          {/* Шаг 3: Операция */}
          {currentStep === 3 && (
            <div className="port-calculation-form__step">
              <label className="port-calculation-form__step-label">Операция</label>
              <div className="port-calculation-form__options">
                <button
                  type="button"
                  className={`port-calculation-form__option ${formData.operation === 'только вход' ? 'port-calculation-form__option--active' : ''}`}
                  onClick={() => handleInputChange('operation', 'только вход')}
                >
                  Только вход
                </button>
                <button
                  type="button"
                  className={`port-calculation-form__option ${formData.operation === 'только выход' ? 'port-calculation-form__option--active' : ''}`}
                  onClick={() => handleInputChange('operation', 'только выход')}
                >
                  Только выход
                </button>
                <button
                  type="button"
                  className={`port-calculation-form__option ${formData.operation === 'вход + выход' ? 'port-calculation-form__option--active' : ''}`}
                  onClick={() => handleInputChange('operation', 'вход + выход')}
                >
                  Вход + выход
                </button>
              </div>
            </div>
          )}

          {/* Шаг 4: Терминал */}
          {currentStep === 4 && (
            <div className="port-calculation-form__step">
              <label className="port-calculation-form__step-label">Терминал</label>
              <div className="port-calculation-form__options">
                <button
                  type="button"
                  className={`port-calculation-form__option ${formData.terminal === 'Балтийск' ? 'port-calculation-form__option--active' : ''}`}
                  onClick={() => handleInputChange('terminal', 'Балтийск')}
                >
                  Балтийск
                </button>
                <button
                  type="button"
                  className={`port-calculation-form__option ${formData.terminal === 'Светлый' ? 'port-calculation-form__option--active' : ''}`}
                  onClick={() => handleInputChange('terminal', 'Светлый')}
                >
                  Светлый
                </button>
                <button
                  type="button"
                  className={`port-calculation-form__option ${formData.terminal === 'КМРП' ? 'port-calculation-form__option--active' : ''}`}
                  onClick={() => handleInputChange('terminal', 'КМРП')}
                >
                  КМРП
                </button>
                <button
                  type="button"
                  className={`port-calculation-form__option ${formData.terminal === 'КМТП' ? 'port-calculation-form__option--active' : ''}`}
                  onClick={() => handleInputChange('terminal', 'КМТП')}
                >
                  КМТП
                </button>
                <button
                  type="button"
                  className={`port-calculation-form__option ${formData.terminal === 'Новобалт' ? 'port-calculation-form__option--active' : ''}`}
                  onClick={() => handleInputChange('terminal', 'Новобалт')}
                >
                  Новобалт
                </button>
              </div>
            </div>
          )}

          {/* Шаг 5: Подруливающее устройство */}
          {currentStep === 5 && (
            <div className="port-calculation-form__step">
              <label className="port-calculation-form__step-label">Подруливающее устройство</label>
              <div className="port-calculation-form__options">
                <button
                  type="button"
                  className={`port-calculation-form__option ${formData.hasThruster === 'есть' ? 'port-calculation-form__option--active' : ''}`}
                  onClick={() => handleInputChange('hasThruster', 'есть')}
                >
                  Есть
                </button>
                <button
                  type="button"
                  className={`port-calculation-form__option ${formData.hasThruster === 'нет' ? 'port-calculation-form__option--active' : ''}`}
                  onClick={() => handleInputChange('hasThruster', 'нет')}
                >
                  Нет
                </button>
              </div>
            </div>
          )}

          {/* Шаг 6: Длина судна */}
          {currentStep === 6 && (
            <div className="port-calculation-form__step">
              <label className="port-calculation-form__step-label">Длина судна</label>
              <div className="port-calculation-form__options">
                <button
                  type="button"
                  className={`port-calculation-form__option ${formData.shipLength === '80-120' ? 'port-calculation-form__option--active' : ''}`}
                  onClick={() => handleInputChange('shipLength', '80-120')}
                >
                  80-120 м
                </button>
                <button
                  type="button"
                  className={`port-calculation-form__option ${formData.shipLength === '120-145' ? 'port-calculation-form__option--active' : ''}`}
                  onClick={() => handleInputChange('shipLength', '120-145')}
                >
                  120-145 м
                </button>
                <button
                  type="button"
                  className={`port-calculation-form__option ${formData.shipLength === '146-160' ? 'port-calculation-form__option--active' : ''}`}
                  onClick={() => handleInputChange('shipLength', '146-160')}
                >
                  146-160 м
                </button>
                <button
                  type="button"
                  className={`port-calculation-form__option ${formData.shipLength === '161-175' ? 'port-calculation-form__option--active' : ''}`}
                  onClick={() => handleInputChange('shipLength', '161-175')}
                >
                  161-175 м
                </button>
              </div>
            </div>
          )}

          {/* Шаг 7: Количество причалов */}
          {currentStep === 7 && (
            <div className="port-calculation-form__step">
              <label className="port-calculation-form__step-label">Количество причалов обработки</label>
              <div className="port-calculation-form__options">
                <button
                  type="button"
                  className={`port-calculation-form__option ${formData.berthsCount === '1' ? 'port-calculation-form__option--active' : ''}`}
                  onClick={() => handleInputChange('berthsCount', '1')}
                >
                  1 причал
                </button>
                <button
                  type="button"
                  className={`port-calculation-form__option ${formData.berthsCount === '2' ? 'port-calculation-form__option--active' : ''}`}
                  onClick={() => handleInputChange('berthsCount', '2')}
                >
                  2 причала (перешвартовка)
                </button>
              </div>
            </div>
          )}

          {/* Шаг 8: Контактные данные */}
          {currentStep === 8 && (
            <div className="port-calculation-form__step">
              <div className="port-calculation-form__fields">
                <div className="port-calculation-form__field">
                  <div className="port-calculation-form__input-wrapper">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM4 18V17.2C4 16.6333 4.146 16.1127 4.438 15.638C4.73 15.1633 5.11733 14.8007 5.6 14.55C6.63333 14.0333 7.68333 13.646 8.75 13.388C9.81667 13.13 10.9 13.0007 12 13C13.1 12.9993 14.1833 13.1287 15.25 13.388C16.3167 13.6473 17.3667 14.0347 18.4 14.55C18.8833 14.8 19.271 15.1627 19.563 15.638C19.855 16.1133 20.0007 16.634 20 17.2V18C20 18.55 19.8043 19.021 19.413 19.413C19.0217 19.805 18.5507 20.0007 18 20H6C5.45 20 4.97933 19.8043 4.588 19.413C4.19667 19.0217 4.00067 18.5507 4 18Z" fill="black"/>
                    </svg>
                    <input
                      type="text"
                      className="port-calculation-form__input"
                      placeholder="Имя"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="port-calculation-form__field">
                  <div className="port-calculation-form__input-wrapper">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M20.728 8.58777V16.9772C20.728 17.6555 20.4729 18.3081 20.0147 18.8016C19.5566 19.2951 18.9301 19.5921 18.2634 19.6319L18.1098 19.6363H5.89162C5.2238 19.6363 4.58121 19.3772 4.09532 18.9119C3.60943 18.4466 3.31698 17.8103 3.2778 17.1332L3.27344 16.9772V8.58777L11.5163 14.1692L11.6176 14.2277C11.7369 14.2869 11.8679 14.3177 12.0007 14.3177C12.1335 14.3177 12.2645 14.2869 12.3838 14.2277L12.4851 14.1692L20.728 8.58777Z" fill="#111111"/>
                      <path d="M18.1082 5.45459C19.0507 5.45459 19.8772 5.95982 20.338 6.71943L11.9991 12.3656L3.66016 6.71943C3.87903 6.35853 4.17968 6.05599 4.53705 5.83705C4.89441 5.61811 5.29814 5.4891 5.71456 5.46079L5.88997 5.45459H18.1082Z" fill="#111111"/>
                    </svg>
                    <input
                      type="email"
                      className="port-calculation-form__input"
                      placeholder="Почта"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="port-calculation-form__field">
                  <div className="port-calculation-form__input-wrapper">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M7.18 10.27L13.684 16.73C14.381 15.923 18.794 11.192 21 17.654C21 17.654 20.768 21 16.006 21C12.639 21 9.155 16.962 6.716 14.654C4.626 12.692 3 10.154 3 7.846C3 3.116 6.252 3 6.252 3C13.684 5.538 7.181 10.27 7.181 10.27" fill="#111111"/>
                    </svg>
                    <input
                      type="tel"
                      className="port-calculation-form__input"
                      placeholder="Телефон"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="port-calculation-form__consent">
                  <label className="port-calculation-form__checkbox-label">
                    <input
                      type="checkbox"
                      className="port-calculation-form__checkbox"
                      checked={formData.consent}
                      onChange={(e) => handleInputChange('consent', e.target.checked)}
                      required
                    />
                    <span>Согласие на обработку персональных данных</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="port-calculation-form__actions">
            {currentStep > 1 && (
              <button
                type="button"
                className="port-calculation-form__btn port-calculation-form__btn--secondary"
                onClick={handlePrev}
              >
                Назад
              </button>
            )}
            {currentStep < totalSteps ? (
              <button
                type="button"
                className="port-calculation-form__btn port-calculation-form__btn--primary"
                onClick={handleNext}
                disabled={!isStepValid()}
              >
                Далее
              </button>
            ) : (
              <button
                type="submit"
                className="port-calculation-form__btn port-calculation-form__btn--primary"
                disabled={!isStepValid()}
              >
                Отправить
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
