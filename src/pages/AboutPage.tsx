import Hero from '../components/Hero/Hero';
import AboutIntro from '../components/AboutIntro/AboutIntro';
import AboutMissionHistory from '../components/AboutMissionHistory/AboutMissionHistory';

export default function AboutPage() {
  return (
    <>
      <Hero 
        title="о нас"
        showBreadcrumbs={true}
      />
      <div className="app__container">
        <AboutIntro />
        <AboutMissionHistory />
      </div>
    </>
  );
}
