import Hero from '../components/Hero/Hero';
import Services from '../components/Services/Services';
import Footer from '../components/Footer/Footer';

export default function ServicesPage() {
  return (
    <>
      <Hero 
        title="УСЛУГИ"
        showBreadcrumbs={true}
      />
      <Services />
      <Footer />
    </>
  );
}
