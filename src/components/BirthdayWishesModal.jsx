import React, { useState } from 'react';
import { X, Send, Heart, Sparkles, Cake } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCelebrationChime } from '../utils/sound';

export default function BirthdayWishesModal({
  isOpen,
  onClose,
  initialMessages = [],
  birthdayGirlName = "Rakshitha",
  birthdayDate = "November 15"
}) {
  const [messages, setMessages] = useState(initialMessages);
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  if (!isOpen) return null;

  const handleAddMessage = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newMsg = {
      from: author.trim() || 'A Secret Well-Wisher ✨',
      text: text.trim()
    };

    setMessages([newMsg, ...messages]);
    setAuthor('');
    setText('');

    playCelebrationChime();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const triggerLoveBurst = () => {
    playCelebrationChime();
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 }
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="netflix-modal-box wishes-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={22} />
        </button>

        <div className="wishes-header">
          <div className="wishes-header-icon">
            <Cake size={32} color="#e50914" />
          </div>
          <h2>Birthday Wishes for {birthdayGirlName}</h2>
          <p className="wishes-subtitle">Streaming Live • {birthdayDate} Special Edition</p>
          <button className="burst-love-btn" onClick={triggerLoveBurst}>
            <Sparkles size={16} />
            <span>Send Love & Confetti</span>
            <Heart size={16} fill="#e50914" color="#e50914" />
          </button>
        </div>

        <div className="wishes-body">
          {/* Add Message Form */}
          <form className="add-wish-form" onSubmit={handleAddMessage}>
            <div className="form-row">
              <input
                type="text"
                placeholder="Your Name (or Nickname)"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="wish-input"
              />
            </div>
            <div className="form-row">
              <textarea
                placeholder={`Write a sweet birthday wish or inside joke for ${birthdayGirlName}...`}
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={3}
                className="wish-textarea"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary send-wish-btn">
              <Send size={16} />
              <span>Post Birthday Wish</span>
            </button>
          </form>

          {/* Messages Feed */}
          <div className="wishes-list">
            <h3 className="wishes-feed-title">Wishes from Friends & Family ({messages.length})</h3>
            {messages.map((msg, index) => (
              <div key={index} className="wish-card">
                <div className="wish-card-header">
                  <span className="wish-author">{msg.from}</span>
                  <span className="wish-heart">💖</span>
                </div>
                <p className="wish-text">"{msg.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

