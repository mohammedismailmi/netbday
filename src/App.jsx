import React, { useState } from 'react';
import { BIRTHDAY_CONFIG } from './birthdayConfig';
import NetflixIntro from './components/NetflixIntro';
import ProfileSelect from './components/ProfileSelect';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import ContentRow from './components/ContentRow';
import EpisodeModal from './components/EpisodeModal';
import VideoPlayer from './components/VideoPlayer';
import BirthdayWishesModal from './components/BirthdayWishesModal';
import { Download, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCelebrationChime } from './utils/sound';

export default function App() {
  const [currentStep, setCurrentStep] = useState('intro'); // 'intro' | 'profile' | 'home'
  const [currentProfile, setCurrentProfile] = useState(BIRTHDAY_CONFIG.profiles[0]);
  
  // Navigation & search state
  const [searchQuery, setSearchQuery] = useState('');
  const [myList, setMyList] = useState([]);
  
  // Modals & player state
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isWishesOpen, setIsWishesOpen] = useState(false);
  const [activeEpisode, setActiveEpisode] = useState(null); // When set, VideoPlayer is opened
  const [downloadToast, setDownloadToast] = useState(null);

  const series = BIRTHDAY_CONFIG.series;

  // Toggle series in My List
  const isInMyList = myList.includes(series.title);
  const handleToggleMyList = () => {
    if (isInMyList) {
      setMyList(myList.filter(item => item !== series.title));
    } else {
      setMyList([...myList, series.title]);
      playCelebrationChime();
    }
  };

  // Download handler
  const handleDownload = (ep) => {
    playCelebrationChime();

    // Trigger browser file download
    const link = document.createElement('a');
    link.href = ep.src;
    link.download = ep.downloadFileName || `${series.title}_E${ep.number}_${ep.title}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show toast
    setDownloadToast(`Downloading Episode ${ep.number}: "${ep.title}" to your laptop!`);
    setTimeout(() => {
      setDownloadToast(null);
    }, 4500);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  // Filter episodes based on search
  const filteredEpisodes = series.episodes.filter(ep => 
    ep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ep.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="netflix-app">
      {/* 1. INTRO ANIMATION */}
      {currentStep === 'intro' && (
        <NetflixIntro
          brandName={BIRTHDAY_CONFIG.brandName}
          onComplete={() => setCurrentStep(prev => prev === 'intro' ? 'profile' : prev)}
        />
      )}

      {/* 2. WHO'S WATCHING SCREEN */}
      {currentStep === 'profile' && (
        <ProfileSelect
          profiles={BIRTHDAY_CONFIG.profiles}
          birthdayGirlName={BIRTHDAY_CONFIG.name}
          onSelectProfile={(profile) => {
            setCurrentProfile(profile);
            setCurrentStep('home');
          }}
        />
      )}

      {/* 3. NETFLIX BROWSE HOME */}
      {currentStep === 'home' && (
        <div className="home-container">
          {/* Top Navbar */}
          <Navbar
            brandName={BIRTHDAY_CONFIG.brandName}
            currentProfile={currentProfile}
            onSwitchProfile={() => setCurrentStep('profile')}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onOpenWishes={() => setIsWishesOpen(true)}
            onOpenMyList={() => {
              const el = document.getElementById('my-list-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            myListCount={myList.length}
          />

          {/* Search Results Row (when user types in search bar) */}
          {searchQuery ? (
            <div className="search-results-section">
              <h2 className="search-title">Search results for "{searchQuery}"</h2>
              {filteredEpisodes.length > 0 ? (
                <ContentRow
                  title="Matching Episodes"
                  items={filteredEpisodes}
                  type="episode"
                  onPlayEpisode={(ep) => setActiveEpisode(ep)}
                  onOpenDetails={() => setIsDetailsOpen(true)}
                  onDownload={handleDownload}
                />
              ) : (
                <div className="empty-search">
                  <p>No episodes matched your search. Showing all episodes below!</p>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Cinematic Hero Billboard */}
              <HeroBanner
                series={series}
                onPlayEpisode={(ep) => setActiveEpisode(ep)}
                onOpenDetails={() => setIsDetailsOpen(true)}
                isInMyList={isInMyList}
                onToggleMyList={handleToggleMyList}
              />

              {/* Rows of Content */}
              <div className="rows-container">
                {/* Row 1: Continue Watching */}
                <ContentRow
                  id="continue-watching-section"
                  title={`Continue Watching for ${currentProfile.name}`}
                  items={series.episodes}
                  type="episode"
                  onPlayEpisode={(ep) => setActiveEpisode(ep)}
                  onOpenDetails={() => setIsDetailsOpen(true)}
                  onDownload={handleDownload}
                />

                {/* Row 2: All Episodes with quick action */}
                <ContentRow
                  id="episodes-section"
                  title="Episodes & Special Features"
                  items={series.episodes}
                  type="episode"
                  onPlayEpisode={(ep) => setActiveEpisode(ep)}
                  onOpenDetails={() => setIsDetailsOpen(true)}
                  onDownload={handleDownload}
                />

                {/* Row 3: Upcoming Releases / Coming Soon */}
                <ContentRow
                  id="upcoming-section"
                  title="Coming Soon to KOLIFLIX"
                  items={BIRTHDAY_CONFIG.upcomingShows}
                  type="upcoming"
                />

                {/* Birthday Wish Strip / Call to Action */}
                <div className="birthday-interactive-strip">
                  <div className="strip-content">
                    <span className="strip-badge">SPECIAL EVENT</span>
                    <h3>Celebrating Rakshitha's Birthday on {BIRTHDAY_CONFIG.birthdayDate}!</h3>
                    <p>Leave a special birthday note or shower love with confetti!</p>
                  </div>
                  <button 
                    className="btn btn-primary strip-btn"
                    onClick={() => setIsWishesOpen(true)}
                  >
                    <Sparkles size={18} />
                    <span>Open Birthday Notes & Wishes</span>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Footer */}
          <footer className="netflix-footer">
            <div className="footer-links">
              <span>FAQ</span>
              <span>Help Center</span>
              <span>Terms of Friendship</span>
              <span>Privacy</span>
              <span>Cookie Preferences</span>
              <span>Corporate Info</span>
            </div>
            <p className="footer-copyright">
              © {BIRTHDAY_CONFIG.birthdayYear} {BIRTHDAY_CONFIG.brandName}, Inc. Made with ❤️ for {BIRTHDAY_CONFIG.name} ({BIRTHDAY_CONFIG.nickname}).
            </p>
          </footer>
        </div>
      )}

      {/* 4. MODALS & PLAYER */}
      <EpisodeModal
        series={series}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onPlayEpisode={(ep) => {
          setIsDetailsOpen(false);
          setActiveEpisode(ep);
        }}
        onDownload={handleDownload}
        isInMyList={isInMyList}
        onToggleMyList={handleToggleMyList}
      />

      {activeEpisode && (
        <VideoPlayer
          seriesTitle={series.title}
          episode={activeEpisode}
          episodesList={series.episodes}
          onClose={() => setActiveEpisode(null)}
          onPlayEpisode={(ep) => setActiveEpisode(ep)}
          onDownload={handleDownload}
        />
      )}

      <BirthdayWishesModal
        isOpen={isWishesOpen}
        onClose={() => setIsWishesOpen(false)}
        initialMessages={BIRTHDAY_CONFIG.birthdayMessages}
        birthdayGirlName={BIRTHDAY_CONFIG.name}
        birthdayDate={BIRTHDAY_CONFIG.birthdayDate}
      />

      {/* Download Toast Notification */}
      {downloadToast && (
        <div className="download-toast">
          <CheckCircle2 size={20} color="#46d369" />
          <span>{downloadToast}</span>
        </div>
      )}
    </div>
  );
}

