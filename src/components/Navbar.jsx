import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Search, Bell, Sparkles, ChevronDown, Download, Users, X } from 'lucide-react';
import { playCelebrationChime } from '../utils/sound';

export default function Navbar({
  brandName,
  currentProfile,
  onSwitchProfile,
  onSearchChange,
  searchQuery,
  onOpenWishes,
  onOpenMyList,
  myListCount
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerConfetti = () => {
    playCelebrationChime();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.1, x: 0.85 }
    });
  };

  return (
    <nav className={`netflix-navbar ${isScrolled ? 'solid' : ''}`}>
      <div className="nav-left">
        <div className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          {brandName}
        </div>

        <ul className="nav-links">
          <li className="nav-item active" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Home
          </li>
          <li className="nav-item" onClick={() => {
            const el = document.getElementById('episodes-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}>
            Episodes
          </li>
          <li className="nav-item" onClick={onOpenWishes}>
            Birthday Wishes 💌
          </li>
          <li className="nav-item" onClick={onOpenMyList}>
            My List {myListCount > 0 && <span className="list-badge">({myListCount})</span>}
          </li>
        </ul>
      </div>

      <div className="nav-right">
        {/* Interactive Search Bar */}
        <div className={`nav-search ${isSearchOpen ? 'expanded' : ''}`}>
          <button 
            className="search-toggle-btn" 
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
              if (isSearchOpen && searchQuery) onSearchChange('');
            }}
            title="Search episodes & moments"
          >
            <Search size={19} />
          </button>
          {isSearchOpen && (
            <div className="search-input-wrap">
              <input
                type="text"
                placeholder="Search episodes, moments..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                autoFocus
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => onSearchChange('')}>
                  <X size={15} />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Celebration Confetti Poppers Button */}
        <button 
          className="nav-icon-btn celebration-btn" 
          onClick={triggerConfetti}
          title="Send Birthday Confetti! 🎉"
        >
          <Sparkles size={19} color="#ffd700" />
          <span className="celebration-label">Wish 🎂</span>
        </button>

        {/* Notification Bell */}
        <div className="nav-notif-wrap">
          <button 
            className="nav-icon-btn" 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            title="Notifications"
          >
            <Bell size={20} />
            <span className="notif-dot">1</span>
          </button>

          {notificationsOpen && (
            <div className="notif-dropdown">
              <div className="notif-header">
                <strong>Birthday Alerts</strong>
              </div>
              <div className="notif-item" onClick={() => { setNotificationsOpen(false); onOpenWishes(); }}>
                <span className="notif-icon">🎉</span>
                <div>
                  <p className="notif-text"><strong>Rakshitha's Birthday Special</strong> is now streaming!</p>
                  <span className="notif-time">Just now • 15th Nov Exclusive</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar & Menu */}
        <div 
          className="nav-profile-wrap"
          onMouseEnter={() => setShowProfileMenu(true)}
          onMouseLeave={() => setShowProfileMenu(false)}
        >
          <div className="nav-avatar">
            {currentProfile.avatar ? (
              <img src={currentProfile.avatar} alt={currentProfile.name} onError={(e) => { e.target.style.display = 'none'; }} />
            ) : (
              <div className="nav-avatar-fallback">
                {currentProfile.name ? currentProfile.name[0] : 'R'}
              </div>
            )}
            <ChevronDown size={14} className={`arrow-icon ${showProfileMenu ? 'open' : ''}`} />
          </div>

          {showProfileMenu && (
            <div className="profile-dropdown">
              <div className="dropdown-profile-header">
                <span className="bold">{currentProfile.name}</span>
                <span className="dropdown-tag">VIP Member</span>
              </div>
              <div className="dropdown-divider" />
              <button className="dropdown-item" onClick={onSwitchProfile}>
                <Users size={16} />
                <span>Switch Profile</span>
              </button>
              <button 
                className="dropdown-item" 
                onClick={() => {
                  const el = document.getElementById('episodes-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Download size={16} />
                <span>Download Episodes</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

