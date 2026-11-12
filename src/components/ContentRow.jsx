import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Download, Info } from 'lucide-react';

export default function ContentRow({
  id,
  title,
  items,
  type = 'episode', // 'episode' | 'upcoming' | 'memory'
  onPlayEpisode,
  onOpenDetails,
  onDownload
}) {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.clientWidth * 0.75;
      rowRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="content-row" id={id}>
      <h2 className="row-title">{title}</h2>

      <div className="row-wrapper">
        <button 
          className="slider-arrow arrow-left" 
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <ChevronLeft size={32} />
        </button>

        <div className="row-slider" ref={rowRef}>
          {items.map((item, index) => {
            if (type === 'episode') {
              return (
                <div 
                  key={item.id || index} 
                  className="netflix-card episode-card"
                  onClick={() => onOpenDetails(item)}
                >
                  <div className="card-thumb">
                    {item.thumbnail ? (
                      <img 
                        src={item.thumbnail} 
                        alt={item.title} 
                        onError={(e) => { e.target.style.display = 'none'; }} 
                      />
                    ) : null}
                    <div className="thumb-gradient" />
                    
                    {/* Badge */}
                    <div className="episode-badge">E{item.number} • {item.duration}</div>
                    
                    {/* Hover Overlay Controls */}
                    <div className="card-hover-actions">
                      <button 
                        className="card-action-circle play"
                        onClick={(e) => {
                          e.stopPropagation();
                          onPlayEpisode(item);
                        }}
                        title="Play Episode"
                      >
                        <Play size={18} fill="currentColor" />
                      </button>

                      <button 
                        className="card-action-circle dl"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDownload(item);
                        }}
                        title="Download to Laptop"
                      >
                        <Download size={16} />
                      </button>

                      <button 
                        className="card-action-circle info"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenDetails(item);
                        }}
                        title="Episode Details"
                      >
                        <Info size={16} />
                      </button>
                    </div>

                    {/* Progress Bar for "Continue Watching" look */}
                    <div className="card-progress-bar">
                      <div 
                        className="card-progress-fill" 
                        style={{ width: index === 0 ? '65%' : '15%' }} 
                      />
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="card-title-row">
                      <span className="card-title">Episode {item.number}: {item.title}</span>
                    </div>
                    <p className="card-snippet">{item.description}</p>
                  </div>
                </div>
              );
            }

            if (type === 'upcoming') {
              return (
                <div key={item.id || index} className="netflix-card upcoming-card">
                  <div className="card-thumb upcoming-thumb">
                    <div className="upcoming-badge">{item.badge}</div>
                    <div className="upcoming-title">{item.title}</div>
                  </div>
                  <div className="card-body">
                    <p className="card-snippet">{item.desc}</p>
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>

        <button 
          className="slider-arrow arrow-right" 
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
}

