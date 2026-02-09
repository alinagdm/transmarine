import './ServiceBenefits.css';

interface ServiceBenefitsProps {
  title: string;
  benefits: string[];
}

export default function ServiceBenefits({ title, benefits }: ServiceBenefitsProps) {
  return (
    <section className="service-benefits">
      <div className="service-benefits__container">
        <div className="service-benefits__line-top"></div>
        <h2 className="service-benefits__title">{title}</h2>
        <div className="service-benefits__content">
          <div className="service-benefits__list">
            {benefits.map((benefit, index) => (
              <div key={index} className="service-benefits__item">
                {benefit.split('<br/>').map((line, lineIndex) => (
                  <span key={lineIndex}>
                    {line}
                    {lineIndex < benefit.split('<br/>').length - 1 && <br />}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="service-benefits__divider"></div>
      </div>
    </section>
  );
}
