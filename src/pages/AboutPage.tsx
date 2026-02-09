import Hero from '../components/Hero/Hero';
import AboutIntro from '../components/AboutIntro/AboutIntro';
import AboutMissionHistory from '../components/AboutMissionHistory/AboutMissionHistory';
import Footer from '../components/Footer/Footer';

export default function AboutPage() {
  return (
    <>
      <Hero 
        title="о нас"
        showBreadcrumbs={true}
      />
      <AboutIntro />
      <AboutMissionHistory />
      <Footer />
    </>
  );
}
