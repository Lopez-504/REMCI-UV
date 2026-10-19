import { useTranslation } from "react-i18next";

import "./team.css";
//import { teamMembers } from "../constants/team";
import { teamMembers } from "../constants/team-ghp";

export default function Team() {

  const { t } = useTranslation("common");
    
  return (
    <section className="team-container">
      <div className="team-header">
        <h1>{t("OurTeam")}</h1>
        <p className="subtitle">{t("MeetTheMinds")}</p>
      </div>

      <div className="team-grid">
        {teamMembers.map((member) => (
          <div key={member.key || member.name} className="team-card">
            {/* Portrait Background */}
            <div 
              className="team-bg" 
              style={{ backgroundImage: `url(${member.image})` }}
              role="img"
              aria-label={member.name}
            />

            {/* Gradient Overlay */}
            <div className="team-overlay" />

            {/* Content Container */}
            <div className="team-content">
              <div className="team-info-top">
                <h3>{member.name}</h3>
                <span className="team-role">{member.role}</span>
              </div>

              {/* Hover description revealed smoothly */}
              <div className="team-bio-wrapper">
                <p className="team-bio">{member.description}</p>
                
                {member.link && (
                  <a 
                    href={member.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="team-link-btn"
                  >
                    View Profile
                    <svg className="arrow-icon" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}