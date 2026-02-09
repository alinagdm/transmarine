import './Team.css';

interface TeamMember {
  name: string;
  position: string;
  image: string;
}

interface TeamProps {
  members: TeamMember[];
}

export default function Team({ members }: TeamProps) {
  return (
    <section className="team">
      <div className="team__container">
        <h2 className="team__title">команда</h2>
        <div className="team__grid">
          {members.map((member, index) => (
            <div key={index} className="team__card">
              <div className="team__image-wrapper">
                {member.image && !member.image.includes('placehold.co') ? (
                  <img src={member.image} alt={member.name} className="team__image" />
                ) : (
                  <div className="team__image team__image--placeholder"></div>
                )}
              </div>
              <div className="team__info">
                <div className="team__name">{member.name}</div>
                <div className="team__position">{member.position}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
