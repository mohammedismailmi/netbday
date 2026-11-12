import React, { useState, useEffect } from 'react';
import { X, Play, Download, Plus, Check, ThumbsUp, Star, Calendar, Clock, Film } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCelebrationChime } from '../utils/sound';

export default function EpisodeModal({
  series,
  isOpen,
  onClose,
  onPlayEpisode,
  onDownload,
  isInMyList,
  onToggleMyList,
  selectedEpisodeInitial = null
}) {
  const [activeTab, setActiveTab] = useState('episodes'); // 'episodes' | 'wishes' | 'details'
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLike = () => {
    setIsLiked(!isLiked);
    playCelebrationChime();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="netflix-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} title="Close (Esc)">
          <X size={22} />
        </button>

        {/* Modal Hero Section */}
        <div className="modal-hero">
          {series.bannerImage ? (
            <img 
              src={series.bannerImage} 
              alt={series.title} 
              className="modal-hero-img"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ) : null}
          <div className="modal-hero-vignette" />
          
          <div className="modal-hero-content">
            <h2 className="modal-hero-title">{series.title}</h2>
            <div className="modal-hero-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => onPlayEpisode(series.episodes[0])}
              >
                <Play size={20} fill="currentColor" />
                <span>Play Ep 1</span>
              </button>

              <button 
                className={`btn btn-circle ${isInMyList ? 'active' : ''}`}
                onClick={onToggleMyList}
                title={isInMyList ? "Remove from My List" : "Add to My List"}
              >
                {isInMyList ? <Check size={20} /> : <Plus size={20} />}
              </button>

              <button 
                className={`btn btn-circle ${isLiked ? 'liked' : ''}`}
                onClick={handleLike}
                title="Like"
              >
                <ThumbsUp size={19} fill={isLiked ? "#e50914" : "none"} color={isLiked ? "#e50914" : "#fff"} />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Metadata & Taglines */}
          <div className="modal-meta-grid">
            <div className="modal-meta-left">
              <div className="meta-badges-row">
                <span className="meta-match">{series.matchPercentage}</span>
                <span className="meta-year">{series.releaseYear}</span>
                <span className="meta-badge">{series.ageRating}</span>
                <span className="meta-badge">{series.episodes.length} Episodes</span>
                <span className="meta-badge ultra">{series.qualityBadge}</span>
              </div>
              <p className="modal-synopsis">{series.description}</p>
            </div>

            <div className="modal-meta-right">
              <div className="meta-detail-row">
                <span className="meta-label">Starring:</span>
                <span className="meta-val">Rakshitha (The Birthday Girl 👑)</span>
              </div>
              <div className="meta-detail-row">
                <span className="meta-label">Genres:</span>
                <span className="meta-val">{series.genres.join(", ")}</span>
              </div>
              <div className="meta-detail-row">
                <span className="meta-label">This show is:</span>
                <span className="meta-val">Heartwarming, Hilarious, Unforgettable</span>
              </div>
            </div>
          </div>

          {/* Modal Navigation Tabs */}
          <div className="modal-tabs">
            <button 
              className={`modal-tab ${activeTab === 'episodes' ? 'active' : ''}`}
              onClick={() => setActiveTab('episodes')}
            >
              Episodes ({series.episodes.length})
            </button>
            <button 
              className={`modal-tab ${activeTab === 'wishes' ? 'active' : ''}`}
              onClick={() => setActiveTab('wishes')}
            >
              Birthday Specials & Reviews ⭐
            </button>
            <button 
              className={`modal-tab ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              About {series.title}
            </button>
          </div>

          {/* TAB 1: EPISODES LIST (WITH WATCH & DOWNLOAD TO LAPTOP) */}
          {activeTab === 'episodes' && (
            <div className="modal-episodes-section">
              <div className="episodes-header-row">
                <h3 className="episodes-header-title">Season 1</h3>
                <span className="episodes-count">{series.episodes.length} Episodes available to watch and download</span>
              </div>

              <div className="episodes-list">
                {series.episodes.map((ep) => (
                  <div key={ep.id} className="episode-item">
                    <div className="episode-number">{ep.number}</div>

                    {/* Thumbnail with Play Hover */}
                    <div className="episode-thumb-wrap" onClick={() => onPlayEpisode(ep)}>
                      {ep.thumbnail ? (
                        <img 
                          src={ep.thumbnail} 
                          alt={ep.title} 
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : null}
                      <div className="episode-thumb-overlay">
                        <Play size={26} fill="#fff" />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="episode-info" onClick={() => onPlayEpisode(ep)}>
                      <div className="episode-title-bar">
                        <h4 className="episode-title">{ep.title}</h4>
                        <span className="episode-duration">{ep.duration}</span>
                      </div>
                      <p className="episode-desc">{ep.description}</p>
                    </div>

                    {/* Action buttons: Play & Download */}
                    <div className="episode-actions">
                      <button 
                        className="btn btn-sm btn-outline-play"
                        onClick={() => onPlayEpisode(ep)}
                        title="Watch Episode Now"
                      >
                        <Play size={16} fill="currentColor" />
                        <span>Watch</span>
                      </button>

                      <button 
                        className="btn btn-sm btn-download-laptop"
                        onClick={() => onDownload(ep)}
                        title="Download this episode to your laptop"
                      >
                        <Download size={16} />
                        <span>Download to Laptop</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: BIRTHDAY SPECIALS & REVIEWS */}
          {activeTab === 'wishes' && (
            <div className="modal-reviews-section">
              <div className="critic-reviews-grid">
                <div className="review-card">
                  <div className="review-stars">⭐⭐⭐⭐⭐</div>
                  <p className="review-quote">"The best laugh in the room. Life would be boring without Rakshitha in it!"</p>
                  <span className="review-author">— The Squad</span>
                </div>
                <div className="review-card">
                  <div className="review-stars">⭐⭐⭐⭐⭐</div>
                  <p className="review-quote">"100% Certified Legendary. Two episodes aren't enough, we demand Season 2 already!"</p>
                  <span className="review-author">— Besties Tribune</span>
                </div>
                <div className="review-card">
                  <div className="review-stars">⭐⭐⭐⭐⭐</div>
                  <p className="review-quote">"A masterclass in being awesome. Happy Birthday Rakshitha!"</p>
                  <span className="review-author">— Birthday Academy Awards</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ABOUT */}
          {activeTab === 'details' && (
            <div className="modal-about-section">
              <h3 className="about-heading">About {series.title}</h3>
              <div className="about-grid">
                <div>
                  <strong>Release Date:</strong> November 15th
                </div>
                <div>
                  <strong>Created For:</strong> Rakshitha
                </div>
                <div>
                  <strong>Producers:</strong> Your Best Friends
                </div>
                <div>
                  <strong>Audio Format:</strong> Ultra Surround Good Vibes
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

