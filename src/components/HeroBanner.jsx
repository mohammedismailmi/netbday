import React, { useState } from 'react';
import { Play, Info, Plus, Check, ThumbsUp, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCelebrationChime } from '../utils/sound';

export default function HeroBanner({
  series,
  onPlayEpisode,
  onOpenDetails,
  isInMyList,
  onToggleMyList
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(999);
  const [isMuted, setIsMuted] = useState(true);
  const [imgFailed, setImgFailed] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    playCelebrationChime();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="hero-banner">
      {/* Hero Background Image with Gradient Overlay */}
      <div className="hero-backdrop-container">
        {!imgFailed && series.bannerImage ? (
          <img
            src={series.bannerImage}
            alt={series.title}
            className="hero-backdrop-img"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="hero-backdrop-placeholder">
            <div className="cinematic-glow"></div>
          </div>
        )}
        <div className="hero-vignette-left" />
        <div className="hero-vignette-bottom" />
      </div>

      {/* Hero Main Content */}
      <div className="hero-content">
        {/* Top 10 Badge */}
        <div className="top-10-badge">
          <span className="top-10-box">TOP 10</span>
          <span className="top-10-text">#1 in Birthday Series Today</span>
        </div>

        {/* Series Title */}
        <h1 className="hero-title">{series.title}</h1>

        {/* Metadata Badges */}
        <div className="hero-meta">
          <span className="meta-match">{series.matchPercentage}</span>
          <span className="meta-year">{series.releaseYear}</span>
          <span className="meta-badge">{series.ageRating}</span>
          <span className="meta-badge">{series.seasons}</span>
          <span className="meta-badge ultra">{series.qualityBadge}</span>
          <span className="meta-badge">{series.soundBadge}</span>
        </div>

        {/* Description */}
        <p className="hero-desc">{series.description}</p>

        {/* Action Buttons */}
        <div className="hero-actions">
          <button 
            className="btn btn-primary"
            onClick={() => onPlayEpisode(series.episodes[0])}
          >
            <Play size={22} fill="currentColor" />
            <span>Play Ep 1</span>
          </button>

          <button 
            className="btn btn-secondary"
            onClick={onOpenDetails}
          >
            <Info size={22} />
            <span>More Info</span>
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
            title="Like & Send Hearts"
          >
            <ThumbsUp size={19} fill={isLiked ? "#e50914" : "none"} color={isLiked ? "#e50914" : "#fff"} />
          </button>
        </div>
      </div>

      {/* Right side age & volume controls */}
      <div className="hero-side-controls">
        <button 
          className="sound-toggle-btn" 
          onClick={() => setIsMuted(!isMuted)}
          title={isMuted ? "Unmute preview" : "Mute preview"}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <span className="hero-age-rating">{series.ageRating}</span>
      </div>
    </div>
  );
}

