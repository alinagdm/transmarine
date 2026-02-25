import Hero from '../components/Hero/Hero';
import Services from '../components/Services/Services';

export default function ServicesPage() {
  return (
    <>
      <Hero 
        title="УСЛУГИ"
        showBreadcrumbs={true}
      />
      <div className="app__container">
        <Services />
      </div>
    </>
  );
}
