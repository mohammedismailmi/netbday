import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playCelebrationChime } from '../utils/sound';
import { Plus, Edit2, Crown } from 'lucide-react';

export default function ProfileSelect({ profiles, onSelectProfile, birthdayGirlName }) {
  const [isManaging, setIsManaging] = useState(false);
  const [imgError, setImgError] = useState({});

  const handleProfileClick = (profile) => {
    if (profile.isBirthdayGirl) {
      // Fire celebration confetti!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      playCelebrationChime();
    }
    onSelectProfile(profile);
  };

  return (
    <div className="who-container">
      <div className="who-content">
        <h1 className="who-title">Who's watching?</h1>

        <div className="profile-grid">
          {profiles.map((profile) => {
            const hasImgFailed = imgError[profile.id];
            return (
              <div
                key={profile.id}
                className="profile-card"
                onClick={() => handleProfileClick(profile)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleProfileClick(profile);
                }}
              >
                <div className={`avatar-wrapper ${profile.isBirthdayGirl ? 'birthday-avatar' : ''}`}>
                  {profile.isBirthdayGirl && (
                    <div className="crown-badge" title="Birthday Girl!">
                      <Crown size={22} color="#ffd700" fill="#ffd700" />
                    </div>
                  )}

                  {profile.avatar && !hasImgFailed ? (
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="profile-avatar-img"
                      onError={() => setImgError(prev => ({ ...prev, [profile.id]: true }))}
                    />
                  ) : (
                    <div 
                      className="avatar-placeholder"
                      style={{ 
                        background: profile.isBirthdayGirl 
                          ? 'linear-gradient(135deg, #e50914 0%, #b20710 50%, #4a0004 100%)' 
                          : (profile.avatarColor || '#333') 
                      }}
                    >
                      <span className="avatar-initials">
                        {profile.name.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}

                  {isManaging && (
                    <div className="profile-edit-overlay">
                      <Edit2 size={24} color="#fff" />
                    </div>
                  )}
                </div>

                <span className="profile-name">{profile.name}</span>
                {profile.tag && <span className="profile-tag">{profile.tag}</span>}
              </div>
            );
          })}

          {/* Add Profile Tile */}
          <div 
            className="profile-card add-profile-card"
            onClick={() => {
              alert("Only Rakshitha and her squad are VIP members today! 🥳");
            }}
          >
            <div className="avatar-wrapper add-avatar">
              <Plus size={44} color="#808080" />
            </div>
            <span className="profile-name text-muted">Add Profile</span>
          </div>
        </div>

        <div className="manage-profiles-wrap">
          <button 
            className="manage-profiles-btn"
            onClick={() => setIsManaging(!isManaging)}
          >
            {isManaging ? "Done" : "Manage Profiles"}
          </button>
        </div>
      </div>
    </div>
  );
}

