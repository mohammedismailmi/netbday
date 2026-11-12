import React, { useEffect, useState } from 'react';
import { playTaDum } from '../utils/sound';
import { Volume2, VolumeX, FastForward } from 'lucide-react';

export default function NetflixIntro({ brandName = "KOLIFLIX", onComplete }) {
  const [hasStartedSound, setHasStartedSound] = useState(false);
  const [soundMuted, setSoundMuted] = useState(false);

  useEffect(() => {
    // Attempt to trigger the iconic Netflix Ta-Dum sound
    const timer = setTimeout(() => {
      if (!soundMuted) {
        playTaDum();
        setHasStartedSound(true);
      }
    }, 400);

    const finishTimer = setTimeout(() => {
      onComplete();
    }, 3800);

    return () => {
      clearTimeout(timer);
      clearTimeout(finishTimer);
    };
  }, [onComplete, soundMuted]);

  const handleManualSound = (e) => {
    e.stopPropagation();
    if (!hasStartedSound) {
      playTaDum();
      setHasStartedSound(true);
    }
    setSoundMuted(!soundMuted);
  };

  return (
    <div 
      className="netflix-intro-overlay"
      onClick={() => {
        if (!hasStartedSound) {
          playTaDum();
          setHasStartedSound(true);
        }
      }}
    >
      {/* Intro Sound & Skip Controls */}
      <div className="intro-controls">
        <button 
          className="intro-control-btn" 
          onClick={handleManualSound}
          title={soundMuted ? "Unmute Ta-Dum" : "Mute Sound"}
        >
          {soundMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          <span>{soundMuted ? "Sound Off" : "Ta-Dum Sound Active"}</span>
        </button>
        <button 
          className="intro-control-btn skip-btn"
          onClick={(e) => {
            e.stopPropagation();
            onComplete();
          }}
        >
          <span>Skip Intro</span>
          <FastForward size={16} />
        </button>
      </div>

      <div className="intro-center">
        {/* Animated Brand Typography */}
        <div className="intro-brand-logo">
          {brandName.split("").map((letter, index) => (
            <span
              key={index}
              className="intro-letter"
              style={{ animationDelay: `${0.15 + index * 0.12}s` }}
            >
              {letter}
            </span>
          ))}
        </div>
        <div className="intro-tagline">ORIGINAL SERIES</div>
      </div>
    </div>
  );
}
