import React, { useState, useEffect } from 'react';
import { PartyPopper, RefreshCw, Star } from 'lucide-react';
import './KidsGame.css';

const COLORS = [
  { name: { uz: 'Qizil', ru: 'Красный', en: 'Red' }, hex: '#EF4444' },
  { name: { uz: 'Yashil', ru: 'Зеленый', en: 'Green' }, hex: '#10B981' },
  { name: { uz: 'Ko\'k', ru: 'Синий', en: 'Blue' }, hex: '#3B82F6' },
  { name: { uz: 'Sariq', ru: 'Желтый', en: 'Yellow' }, hex: '#F59E0B' },
  { name: { uz: 'Siyohrang', ru: 'Фиолетовый', en: 'Purple' }, hex: '#8B5CF6' },
  { name: { uz: 'Pushti', ru: 'Розовый', en: 'Pink' }, hex: '#EC4899' },
  { name: { uz: 'To\'q sariq', ru: 'Оранжевый', en: 'Orange' }, hex: '#F97316' },
  { name: { uz: 'Qora', ru: 'Черный', en: 'Black' }, hex: '#111827' }
];

export default function KidsGame() {
  const [lang, setLang] = useState('uz');
  const [targetColor, setTargetColor] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  
  useEffect(() => {
    const savedLang = localStorage.getItem('appLang') || 'uz';
    setLang(savedLang);
    startNewRound();
  }, []);

  const startNewRound = () => {
    setShowSuccess(false);
    
    // Pick random target
    const randomTarget = COLORS[Math.floor(Math.random() * COLORS.length)];
    setTargetColor(randomTarget);
    
    // Pick 3 other random colors
    let otherColors = COLORS.filter(c => c.hex !== randomTarget.hex);
    otherColors.sort(() => 0.5 - Math.random());
    
    // Combine and shuffle
    let newOptions = [randomTarget, otherColors[0], otherColors[1], otherColors[2]];
    newOptions.sort(() => 0.5 - Math.random());
    
    setOptions(newOptions);
  };

  const handleGuess = (color) => {
    if (color.hex === targetColor.hex) {
      setScore(prev => prev + 10);
      setShowSuccess(true);
      setTimeout(() => {
        startNewRound();
      }, 1500);
    } else {
      // Wrong guess animation can be added here
      const el = document.getElementById(`color-btn-${color.hex}`);
      if(el) {
        el.classList.add('shake');
        setTimeout(() => el.classList.remove('shake'), 500);
      }
    }
  };

  if (!targetColor) return null;

  return (
    <div className="kids-game-container container">
      <div className="kids-game-header">
        <h1 className="kids-game-title">
          <Star className="text-yellow-400" fill="currentColor" size={32} />
          {lang === 'uz' ? 'Ranglarni Toping!' : lang === 'ru' ? 'Найди цвета!' : 'Find the Colors!'}
          <Star className="text-yellow-400" fill="currentColor" size={32} />
        </h1>
        <div className="kids-game-score">
          <span>{lang === 'uz' ? 'Ball' : lang === 'ru' ? 'Очки' : 'Score'}:</span>
          <span className="score-number">{score}</span>
        </div>
      </div>

      <div className="kids-game-board card">
        <div className="target-color-section">
          <h2>{lang === 'uz' ? 'Qaysi rang?' : lang === 'ru' ? 'Какой цвет?' : 'Which color?'}</h2>
          <div 
            className="target-color-box" 
            style={{ backgroundColor: targetColor.hex }}
          ></div>
        </div>

        <div className="color-options">
          {options.map((color, index) => (
            <button
              key={index}
              id={`color-btn-${color.hex}`}
              className="color-btn"
              style={{ backgroundColor: color.hex }}
              onClick={() => handleGuess(color)}
              disabled={showSuccess}
            >
              <span className="color-btn-text">{color.name[lang]}</span>
            </button>
          ))}
        </div>

        {showSuccess && (
          <div className="success-overlay">
            <PartyPopper size={64} color="#F59E0B" />
            <h2 className="success-text">
              {lang === 'uz' ? 'Barakalla!' : lang === 'ru' ? 'Молодец!' : 'Good Job!'}
            </h2>
            <div className="confetti-container">
              {/* Simple CSS Confetti */}
              {[...Array(20)].map((_, i) => (
                <div key={i} className={`confetti piece-${i}`}></div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button className="btn btn-outline" onClick={() => { setScore(0); startNewRound(); }}>
          <RefreshCw size={18} />
          {lang === 'uz' ? 'Boshidan boshlash' : lang === 'ru' ? 'Начать заново' : 'Restart'}
        </button>
      </div>
    </div>
  );
}
