import './HistoryTimeline.css';

interface HistoryTimelineProps {
  year: string | React.ReactNode;
  text: string | React.ReactNode;
  images: Array<{
    width: number;
    height: number;
    left: number;
    top: number;
    src?: string;
  }>;
}

export default function HistoryTimeline({ year, text, images }: HistoryTimelineProps) {
  return (
    <section className="history-timeline">
      <div className="history-timeline__container">
        <div className="history-timeline__content">
          <h2 className="history-timeline__year">{year}</h2>
          <p className="history-timeline__text">{text}</p>
        </div>
        <div className="history-timeline__images">
          {images.map((image, index) => (
            <div
              key={index}
              className="history-timeline__image-wrapper"
            >
              {image.src && !image.src.includes('placehold.co') ? (
                <img src={image.src} alt="" className="history-timeline__image" loading="lazy" />
              ) : (
                <div className="history-timeline__image--placeholder" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
