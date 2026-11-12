import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Download,
  SkipForward,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCelebrationChime } from '../utils/sound';

export default function VideoPlayer({
  seriesTitle,
  episode,
  episodesList = [],
  onClose,
  onPlayEpisode,
  onDownload
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [hasVideoError, setHasVideoError] = useState(false);

  // Fallback simulated timer if video file is not yet provided by user
  const [simulatedTime, setSimulatedTime] = useState(0);

  // Find next episode if any
  const currentIndex = episodesList.findIndex(e => e.id === episode.id);
  const nextEpisode = currentIndex >= 0 && currentIndex < episodesList.length - 1 
    ? episodesList[currentIndex + 1] 
    : null;

  useEffect(() => {
    // Reset video state on episode change
    setHasVideoError(false);
    setCurrentTime(0);
    setSimulatedTime(0);
    setIsPlaying(true);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.playbackRate = playbackRate;
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted by browser until click
        setIsPlaying(false);
      });
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          onClose();
        }
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'ArrowLeft') {
        skipTime(-10);
      } else if (e.key === 'ArrowRight') {
        skipTime(10);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [episode]);

  // Handle controls auto-hide
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3200);
  };

  // Simulated timer for fallback mode
  useEffect(() => {
    let interval = null;
    if (hasVideoError && isPlaying) {
      interval = setInterval(() => {
        setSimulatedTime((prev) => (prev + 1) % 600); // 10 minutes loop
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [hasVideoError, isPlaying]);

  const togglePlay = () => {
    if (hasVideoError) {
      setIsPlaying(!isPlaying);
      return;
    }
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const skipTime = (seconds) => {
    if (hasVideoError) {
      setSimulatedTime((prev) => Math.max(0, prev + seconds));
      return;
    }
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.duration || 600, videoRef.current.currentTime + seconds));
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    if (hasVideoError) {
      setSimulatedTime(newTime);
      return;
    }
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = volume || 0.8;
      }
    } else {
      setIsMuted(true);
      if (videoRef.current) {
        videoRef.current.muted = true;
      }
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const cycleSpeed = () => {
    const speeds = [0.75, 1, 1.25, 1.5];
    const nextIdx = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackRate(nextSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
  };

  const triggerPlayerConfetti = () => {
    playCelebrationChime();
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.5, x: 0.5 }
    });
  };

  const formatSeconds = (sec) => {
    if (isNaN(sec) || sec < 0) return "00:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const activeCurTime = hasVideoError ? simulatedTime : currentTime;
  const activeDuration = hasVideoError ? 720 : (duration || 720); // default 12m

  return (
    <div 
      className="netflix-video-player-container"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onClick={handleMouseMove}
    >
      {/* Real HTML5 Video element */}
      <video
        ref={videoRef}
        src={episode.src}
        className={`main-video-element ${hasVideoError ? 'video-hidden' : ''}`}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={() => {
          setIsPlaying(false);
          if (nextEpisode) {
            onPlayEpisode(nextEpisode);
          }
        }}
        onError={() => {
          // If media file is not found, gracefully activate preview mode
          setHasVideoError(true);
          setIsPlaying(true);
        }}
        onClick={togglePlay}
        playsInline
      />

      {/* Fallback Animated Preview Player (Shown when video file is pending or absent) */}
      {hasVideoError && (
        <div className="player-fallback-screen" onClick={togglePlay}>
          <div className="fallback-cinema-card">
            <div className="fallback-badge">BIRTHDAY STREAM PREVIEW</div>
            <h2>{seriesTitle}</h2>
            <h3>Episode {episode.number}: {episode.title}</h3>
            <p className="fallback-desc">{episode.description}</p>

            <div className="fallback-helper-alert">
              <AlertCircle size={18} color="#ffd700" />
              <span>
                To play your personal video, place your MP4 video file in: 
                <code>public/{episode.src}</code>
              </span>
            </div>

            {/* Visualizer animation when playing */}
            <div className={`audio-visualizer ${isPlaying ? 'animating' : ''}`}>
              <div className="bar b1" />
              <div className="bar b2" />
              <div className="bar b3" />
              <div className="bar b4" />
              <div className="bar b5" />
            </div>

            <p className="playback-status-text">
              {isPlaying ? "▶ Streaming in Ultra HD 4K" : "⏸ Paused"}
            </p>
          </div>
        </div>
      )}

      {/* Top Header Overlay */}
      <div className={`player-top-bar ${showControls ? 'visible' : ''}`}>
        <div className="player-top-left">
          <button className="player-back-btn" onClick={onClose} title="Back to Browse">
            <ArrowLeft size={24} />
          </button>
          <div className="player-title-info">
            <span className="player-series-title">{seriesTitle}</span>
            <span className="player-episode-title">E{episode.number}: {episode.title}</span>
          </div>
        </div>

        <div className="player-top-right">
          <button 
            className="player-download-btn"
            onClick={() => onDownload(episode)}
            title="Download this episode to your laptop"
          >
            <Download size={18} />
            <span>Download Episode</span>
          </button>

          <button 
            className="player-confetti-btn"
            onClick={triggerPlayerConfetti}
            title="Shower Birthday Confetti!"
          >
            <Sparkles size={18} color="#ffd700" />
          </button>
        </div>
      </div>

      {/* Bottom Controls Overlay */}
      <div className={`player-bottom-bar ${showControls ? 'visible' : ''}`}>
        {/* Progress Timeline Scrubber */}
        <div className="player-timeline-wrapper">
          <input
            type="range"
            min={0}
            max={activeDuration || 100}
            step={0.1}
            value={activeCurTime}
            onChange={handleSeek}
            className="player-timeline-slider"
          />
          <div 
            className="player-timeline-progress"
            style={{ width: `${(activeCurTime / (activeDuration || 1)) * 100}%` }}
          />
        </div>

        {/* Controls Row */}
        <div className="player-controls-row">
          <div className="controls-left">
            {/* Play / Pause */}
            <button className="ctrl-btn" onClick={togglePlay} title={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
            </button>

            {/* Rewind 10s */}
            <button className="ctrl-btn" onClick={() => skipTime(-10)} title="Rewind 10 seconds">
              <RotateCcw size={22} />
              <span className="ctrl-subtext">10</span>
            </button>

            {/* Forward 10s */}
            <button className="ctrl-btn" onClick={() => skipTime(10)} title="Fast forward 10 seconds">
              <RotateCw size={22} />
              <span className="ctrl-subtext">10</span>
            </button>

            {/* Volume & Mute */}
            <div className="volume-control-wrap">
              <button className="ctrl-btn" onClick={toggleMute} title={isMuted ? "Unmute" : "Mute"}>
                {isMuted || volume === 0 ? <VolumeX size={22} /> : <Volume2 size={22} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="volume-slider"
              />
            </div>

            {/* Time Indicator */}
            <div className="time-display">
              <span>{formatSeconds(activeCurTime)}</span>
              <span className="time-sep">/</span>
              <span>{formatSeconds(activeDuration)}</span>
            </div>
          </div>

          <div className="controls-right">
            {/* Next Episode Button */}
            {nextEpisode && (
              <button 
                className="ctrl-btn next-ep-btn"
                onClick={() => onPlayEpisode(nextEpisode)}
                title={`Next: Episode ${nextEpisode.number} - ${nextEpisode.title}`}
              >
                <span>Next Ep</span>
                <SkipForward size={18} />
              </button>
            )}

            {/* Speed Toggle */}
            <button className="ctrl-btn speed-btn" onClick={cycleSpeed} title="Playback Speed">
              <span>{playbackRate}x</span>
            </button>

            {/* Direct Download button */}
            <button 
              className="ctrl-btn" 
              onClick={() => onDownload(episode)}
              title="Download to Laptop"
            >
              <Download size={20} />
            </button>

            {/* Fullscreen */}
            <button className="ctrl-btn" onClick={toggleFullscreen} title="Fullscreen">
              {isFullscreen ? <Minimize size={22} /> : <Maximize size={22} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

