import './ServiceDetail.css';

interface ServiceDetailProps {
  title: string;
  description: string;
  image?: string;
  features?: string[];
}

export default function ServiceDetail({ 
  title, 
  description, 
  image,
  features = []
}: ServiceDetailProps) {
  return (
    <section className="service-detail">
      <div className="service-detail__container">
        {image && (
          <div className="service-detail__image-wrapper">
            <img src={image} alt={title} className="service-detail__image" />
          </div>
        )}
        
        <div className="service-detail__content">
          <h2 className="service-detail__title">{title}</h2>
          <div className="service-detail__description">
            <p>{description}</p>
          </div>
          
          {features.length > 0 && (
            <div className="service-detail__features">
              <h3 className="service-detail__features-title">Основные услуги:</h3>
              <ul className="service-detail__features-list">
                {features.map((feature, index) => (
                  <li key={index} className="service-detail__feature-item">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
