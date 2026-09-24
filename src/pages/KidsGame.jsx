import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crosshair, Shield, Zap, Flame, Trophy, RotateCcw, Copy, Check, ArrowRight, Skull, Target, Award, Heart, Sparkles, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useGamer } from '../context/GamerContext';
import { soundFX, WEAPONS_LIST } from '../utils/soundFX';
import toast from 'react-hot-toast';
import './KidsGame.css';

const WEAPON_CONFIGS = {
  ak47: { name: 'AK-47', magSize: 30, maxAmmo: 90, reloadTime: 1200, damage: 100 },
  m4a1s: { name: 'M4A1-S', magSize: 20, maxAmmo: 60, reloadTime: 1100, damage: 100 },
  awp: { name: 'AWP', magSize: 5, maxAmmo: 20, reloadTime: 1500, damage: 150 },
  deagle: { name: 'Desert Eagle', magSize: 7, maxAmmo: 28, reloadTime: 1000, damage: 100 },
  laser: { name: 'Plasma Laser', magSize: 25, maxAmmo: 75, reloadTime: 900, damage: 100 },
  classic: { name: 'Kiber Pistol', magSize: 15, maxAmmo: 45, reloadTime: 1000, damage: 100 }
};

const BOT_NAMES = [
  'Bot_S1mple', 'Bot_NiKo', 'Bot_ZywOo', 'Bot_m0NESY', 'Bot_Donk', 
  'Bot_B1t', 'Bot_Device', 'Bot_Fallen', 'Bot_KennyS', 'Bot_Ropz'
];

export default function KidsGame() {
  const { applyPromoCode, setIsCartOpen } = useCart();
  const { addXP, unlockBadge } = useGamer();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Current armed weapon
  const currentWeaponId = soundFX.getWeapon() || 'ak47';
  const weaponConfig = WEAPON_CONFIGS[currentWeaponId] || WEAPON_CONFIGS.ak47;
  const weaponMeta = WEAPONS_LIST.find(w => w.id === currentWeaponId) || WEAPONS_LIST[0];

  // Game states
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'victory' | 'defeat'
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(40);
  const [playerHp, setPlayerHp] = useState(100);
  const [ammo, setAmmo] = useState(weaponConfig.magSize);
  const [isReloading, setIsReloading] = useState(false);
  const [enemies, setEnemies] = useState([]);
  const [killfeed, setKillfeed] = useState([]);
  const [headshotsCount, setHeadshotsCount] = useState(0);
  const [streakBanner, setStreakBanner] = useState(null);
  const [sparks, setSparks] = useState([]);
  const [screenDamageFlash, setScreenDamageFlash] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    return Number(localStorage.getItem('nexus_rush_mid_high') || 0);
  });
  const [copied, setCopied] = useState(false);

  // Mouse Crosshair state
  const [crosshairPos, setCrosshairPos] = useState({ x: -100, y: -100 });
  const arenaRef = useRef(null);
  const killCountRef = useRef(0);
  const streakTimerRef = useRef(null);

  // 5 Tactical CS2 Mid Positions (percentages)
  const TACTICAL_POSITIONS = [
    { id: 'doors_left', name: 'Mid Doors (Left)', top: 48, left: 32 },
    { id: 'doors_right', name: 'Mid Doors (Right)', top: 46, left: 64 },
    { id: 'catwalk', name: 'Catwalk / Short', top: 28, left: 80 },
    { id: 'tunnel', name: 'Lower Tunnel', top: 58, left: 16 },
    { id: 'double_box', name: 'Xbox / B-Boxes', top: 32, left: 48 }
  ];

  // Reset ammo when weapon or game restarts
  useEffect(() => {
    setAmmo(weaponConfig.magSize);
  }, [currentWeaponId]);

  // Start Rush Mid Game
  const startGame = () => {
    soundFX.playClick();
    setScore(0);
    setTimeLeft(40);
    setPlayerHp(100);
    setAmmo(weaponConfig.magSize);
    setIsReloading(false);
    setEnemies([]);
    setKillfeed([]);
    setHeadshotsCount(0);
    killCountRef.current = 0;
    setGameState('playing');
  };

  // Reload weapon
  const handleReload = useCallback(() => {
    if (isReloading || ammo === weaponConfig.magSize) return;
    setIsReloading(true);
    soundFX.playReload();
    toast('O\'q yangilanmoqda...', { icon: '🔄', duration: 1000 });

    setTimeout(() => {
      setAmmo(weaponConfig.magSize);
      setIsReloading(false);
    }, weaponConfig.reloadTime);
  }, [isReloading, ammo, weaponConfig]);

  // Keyboard 'R' to reload
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'r' || e.key === 'R' || e.key === 'к' || e.key === 'К') {
        if (gameState === 'playing') handleReload();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, handleReload]);

  // Game countdown timer
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishGame(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // Spawner: Spawns enemies behind Mid cover
  useEffect(() => {
    if (gameState !== 'playing') return;

    const spawnInterval = setInterval(() => {
      setEnemies(prev => {
        if (prev.length >= 4) return prev; // max 4 enemies simultaneously

        // Choose position that has no enemy currently
        const occupiedPosIds = prev.map(e => e.posId);
        const freePositions = TACTICAL_POSITIONS.filter(p => !occupiedPosIds.includes(p.id));
        if (freePositions.length === 0) return prev;

        const pos = freePositions[Math.floor(Math.random() * freePositions.length)];
        const botName = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
        const threatTime = 1600; // ms before enemy shoots player

        const newEnemy = {
          id: Date.now() + Math.random(),
          posId: pos.id,
          posName: pos.name,
          x: pos.left,
          y: pos.top,
          botName,
          spawnedAt: Date.now(),
          threatDuration: threatTime,
          isShooting: false
        };

        return [...prev, newEnemy];
      });
    }, 900);

    return () => clearInterval(spawnInterval);
  }, [gameState]);

  // Enemy Threat Tick: If enemy timer reaches 0, enemy shoots the player!
  useEffect(() => {
    if (gameState !== 'playing') return;

    const threatCheck = setInterval(() => {
      const now = Date.now();

      setEnemies(prev => {
        let playerDamaged = false;

        const next = prev.filter(enemy => {
          const elapsed = now - enemy.spawnedAt;
          if (elapsed >= enemy.threatDuration) {
            // Enemy shoots player!
            playerDamaged = true;
            return false; // enemy disappears after shooting
          }
          return true;
        });

        if (playerDamaged) {
          soundFX.playPlayerHurt();
          setScreenDamageFlash(true);
          setTimeout(() => setScreenDamageFlash(false), 200);

          setPlayerHp(hp => {
            const nextHp = hp - 25;
            if (nextHp <= 0) {
              finishGame(false);
              return 0;
            }
            return nextHp;
          });
        }

        return next;
      });
    }, 100);

    return () => clearInterval(threatCheck);
  }, [gameState]);

  // Finish Game (Victory or Defeat)
  const finishGame = (survived) => {
    if (survived && playerHp > 0) {
      soundFX.playVictory();
      setGameState('victory');

      // Gamification rewards
      addXP(300 + score, "Rush Mid G'alabasi");
      unlockBadge('reflex_champ');
      if (score >= 300) unlockBadge('speed_demon');

      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('nexus_rush_mid_high', score.toString());
      }
    } else {
      soundFX.playPlayerHurt();
      setGameState('defeat');
    }
  };

  // Crosshair tracking
  const handleMouseMove = (e) => {
    if (!arenaRef.current) return;
    const rect = arenaRef.current.getBoundingClientRect();
    setCrosshairPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Arena Click (Shoot)
  const handleArenaClick = (e) => {
    if (gameState !== 'playing') return;

    // Check Ammo
    if (isReloading) return;
    if (ammo <= 0) {
      soundFX.playEmptyAmmo();
      toast.error('O\'q tugadi! [R] tugmasini bosing', { duration: 1500 });
      return;
    }

    // Fire weapon!
    soundFX.playClick();
    setAmmo(prev => prev - 1);

    // Muzzle spark animation at crosshair
    const rect = arenaRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    addSpark(clickX, clickY);
  };

  // Add spark effect
  const addSpark = (x, y) => {
    const sparkId = Date.now() + Math.random();
    setSparks(prev => [...prev.slice(-8), { id: sparkId, x, y }]);
    setTimeout(() => {
      setSparks(prev => prev.filter(s => s.id !== sparkId));
    }, 250);
  };

  // Kill Enemy
  const handleHitEnemy = (e, enemy, isHeadshot) => {
    e.stopPropagation(); // prevent empty arena click

    if (isReloading) return;
    if (ammo <= 0) {
      soundFX.playEmptyAmmo();
      toast.error('O\'q tugadi! [R] tugmasini bosing', { duration: 1500 });
      return;
    }

    // Decrement ammo and fire weapon
    soundFX.playClick();
    setAmmo(prev => prev - 1);

    // Spark effect
    const rect = arenaRef.current.getBoundingClientRect();
    addSpark(e.clientX - rect.left, e.clientY - rect.top);

    // Headshot vs Body shot
    let earnedPts = 25;
    if (isHeadshot) {
      soundFX.playHeadshot();
      earnedPts = 50;
      setHeadshotsCount(prev => prev + 1);
    }

    // Update score
    setScore(prev => prev + earnedPts);
    setEnemies(prev => prev.filter(item => item.id !== enemy.id));

    // Multi-kill streak detection
    killCountRef.current += 1;
    if (streakTimerRef.current) clearTimeout(streakTimerRef.current);
    streakTimerRef.current = setTimeout(() => {
      killCountRef.current = 0;
    }, 2500);

    if (killCountRef.current === 2) showStreak('DOUBLE KILL! ⚡');
    else if (killCountRef.current === 3) showStreak('TRIPLE KILL! 🔥');
    else if (killCountRef.current >= 4) showStreak('ACE! DOMINATING! 👑');

    // Add entry to CS2 Killfeed
    const newEntry = {
      id: Date.now() + Math.random(),
      killer: 'YOU',
      victim: enemy.botName,
      weapon: weaponConfig.name,
      isHeadshot
    };
    setKillfeed(prev => [newEntry, ...prev.slice(0, 4)]);
  };

  const showStreak = (text) => {
    setStreakBanner(text);
    setTimeout(() => setStreakBanner(null), 1800);
  };

  const promoCode = 'GAMERPRO15';
  const copyAndApply = () => {
    soundFX.playPowerUp();
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    applyPromoCode(promoCode);
    toast.success(`Promokod "${promoCode}" nusxalandi va savatga qo'llandi!`);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="rush-mid-page container">
      {/* Top Header */}
      <div className="game-header">
        <div className="game-title-group">
          <div className="game-icon-wrap">
            <Crosshair size={28} color="#00f0ff" />
          </div>
          <div>
            <div className="rush-mid-badge">
              <span>CS2 TACTICAL COMBAT</span>
            </div>
            <h1 className="game-title">RUSH MID</h1>
            <p className="game-subtitle">
              Mid koridoridan shiddatli hujum qiling, yashiringan dushmanlarni nishonga oling va Headshotlar qiling!
            </p>
          </div>
        </div>

        {/* Live Telemetry Scoreboard */}
        <div className="rush-scoreboard glass">
          <div className="rush-stat-box">
            <span className="rush-stat-label">SOG'LIQ (HP)</span>
            <div className="hp-bar-wrapper">
              <div 
                className={`hp-bar-fill ${playerHp <= 25 ? 'critical' : playerHp <= 50 ? 'warning' : ''}`}
                style={{ width: `${Math.max(0, playerHp)}%` }}
              />
              <span className="hp-text">{playerHp} HP</span>
            </div>
          </div>

          <div className="rush-stat-box">
            <span className="rush-stat-label">VAQT</span>
            <span className={`rush-stat-val ${timeLeft <= 10 && gameState === 'playing' ? 'hurry' : ''}`}>
              {timeLeft}s
            </span>
          </div>

          <div className="rush-stat-box">
            <span className="rush-stat-label">OCHKO</span>
            <span className="rush-stat-val text-neon">{score}</span>
          </div>

          <div className="rush-stat-box">
            <span className="rush-stat-label">HEADSHOT</span>
            <span className="rush-stat-val" style={{ color: '#fbbf24' }}>
              {headshotsCount}
            </span>
          </div>

          <div className="rush-stat-box weapon-box">
            <span className="rush-stat-label">QUROL</span>
            <span className="rush-stat-val" style={{ color: weaponMeta.color || '#00f0ff', fontSize: '0.95rem' }}>
              {weaponConfig.name}
            </span>
          </div>

          <div className="rush-stat-box ammo-box">
            <span className="rush-stat-label">O'Q (AMMO)</span>
            <div className="ammo-display">
              <span className={`ammo-num ${ammo <= 3 ? 'low-ammo' : ''}`}>{ammo}</span>
              <span className="ammo-max">/ {weaponConfig.magSize}</span>
              <button 
                type="button" 
                className="btn-quick-reload" 
                onClick={handleReload}
                disabled={isReloading || ammo === weaponConfig.magSize}
                title="Qayta o'qlash [R]"
              >
                <RefreshCw size={12} className={isReloading ? 'spin-anim' : ''} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Rush Mid Tactical Arena */}
      <div 
        className={`rush-arena ${screenDamageFlash ? 'damage-flash' : ''}`}
        ref={arenaRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleArenaClick}
      >
        {/* Custom CS2 Crosshair */}
        {gameState === 'playing' && (
          <div 
            className="cs2-crosshair"
            style={{ 
              transform: `translate(${crosshairPos.x}px, ${crosshairPos.y}px)` 
            }}
          >
            <div className="crosshair-ch ch-top"></div>
            <div className="crosshair-ch ch-bottom"></div>
            <div className="crosshair-ch ch-left"></div>
            <div className="crosshair-ch ch-right"></div>
            <div className="crosshair-dot"></div>
          </div>
        )}

        {/* CS2 Killfeed (Top Right) */}
        {gameState === 'playing' && killfeed.length > 0 && (
          <div className="cs2-killfeed">
            {killfeed.map(entry => (
              <div key={entry.id} className="killfeed-row animate-slide-left">
                <span className="kf-killer">{entry.killer}</span>
                <span className="kf-weapon">
                  {entry.isHeadshot ? '🎯 HEADSHOT' : '💥'} {entry.weapon}
                </span>
                <span className="kf-victim">{entry.victim}</span>
              </div>
            ))}
          </div>
        )}

        {/* Multi-Kill Streak Banner */}
        {streakBanner && (
          <div className="multi-kill-banner animate-bounce">
            {streakBanner}
          </div>
        )}

        {/* Reloading Alert */}
        {isReloading && (
          <div className="reloading-overlay">
            <RefreshCw size={24} className="spin-anim" color="#00f0ff" />
            <span>RELOADING...</span>
          </div>
        )}

        {/* Low Ammo / Empty Alert */}
        {gameState === 'playing' && ammo === 0 && !isReloading && (
          <div className="empty-ammo-alert pulse-fast">
            <span>⚠️ O'Q TUGADI! [R] TUGMASINI BOSING!</span>
          </div>
        )}

        {/* Muzzle Sparks / Bullet Impacts */}
        {sparks.map(s => (
          <div 
            key={s.id} 
            className="bullet-impact-spark"
            style={{ top: `${s.y}px`, left: `${s.x}px` }}
          />
        ))}

        {/* Tactical CS2 Ammo Counter (Bottom Left) */}
        {gameState === 'playing' && (
          <div 
            className={`cs2-bottom-ammo-hud ${ammo <= 3 ? 'hud-low-ammo' : ''} ${isReloading ? 'hud-is-reloading' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ammo-hud-header">
              <span className="ammo-hud-weapon-name">{weaponConfig.name}</span>
              <span className="ammo-hud-badge">
                {isReloading ? "YANGILANMOQDA" : ammo === 0 ? "O'Q TUGADI" : "O'Q"}
              </span>
            </div>

            <div className="ammo-hud-row">
              <div className="ammo-hud-digits">
                <span className="ammo-val-current">
                  {isReloading ? '—' : ammo}
                </span>
                <span className="ammo-val-divider">/</span>
                <span className="ammo-val-mag">{weaponConfig.magSize}</span>
              </div>

              <button 
                type="button"
                className="ammo-hud-reload-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleReload();
                }}
                onMouseDown={(e) => e.stopPropagation()}
                disabled={isReloading || ammo === weaponConfig.magSize}
                title="Qayta o'qlash (Klaviatura: [R])"
              >
                <RefreshCw size={13} className={isReloading ? 'spin-anim' : ''} />
                <span className="reload-key-hint">[R]</span>
              </button>
            </div>

            {/* Graphical Bullet Magazine Bar */}
            <div className="ammo-hud-bar-wrap">
              <div 
                className={`ammo-hud-bar-fill ${ammo <= 3 ? 'critical' : ammo <= weaponConfig.magSize / 2 ? 'warning' : ''}`}
                style={{ width: isReloading ? '0%' : `${(ammo / weaponConfig.magSize) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Start Screen */}
        {gameState === 'idle' && (
          <div className="arena-overlay">
            <div className="overlay-card glass">
              <div className="overlay-weapon-icon" style={{ borderColor: weaponMeta.color || '#00f0ff' }}>
                <Target size={52} color={weaponMeta.color || '#00f0ff'} className="pulse-glow" />
              </div>
              <h2 className="overlay-title">RUSH MID: CS2 ARENA</h2>
              <p className="overlay-desc">
                Sizning qurolingiz: <strong style={{ color: weaponMeta.color || '#00f0ff' }}>{weaponMeta.name}</strong> ({weaponMeta.desc})<br/>
                Dushmanlar Mid eshiklari va qutilar ortidan pistirmadan chiqadi. Ular sizga qarata o't ochmasdan oldin yo'q qiling!
              </p>

              <div className="game-tips-box">
                <div className="tip-item">
                  <span className="tip-badge">BOSH (HEAD)</span>
                  <span>+50 ball va tezkor Headshot!</span>
                </div>
                <div className="tip-item">
                  <span className="tip-badge">TANA (BODY)</span>
                  <span>+25 ball</span>
                </div>
                <div className="tip-item">
                  <span className="tip-badge">[R] TUGMASI</span>
                  <span>Qurolni qayta o'qlash</span>
                </div>
              </div>

              <button className="btn btn-cyber play-start-btn" onClick={startGame}>
                <Flame size={20} /> RUSH MID — JANGNI BOSHLASH
              </button>
            </div>
          </div>
        )}

        {/* Victory Screen */}
        {gameState === 'victory' && (
          <div className="arena-overlay">
            <div className="overlay-card glass win-card">
              <div className="win-trophy">
                <Trophy size={54} color="#fbbf24" />
              </div>
              <h2 className="win-title">MISSIYA BAJARILDI: MID EGALLANDI! 🎉</h2>
              <p className="win-score-line">
                To'plangan ball: <strong>{score}</strong> | Headshotlar: <strong>{headshotsCount}</strong>
              </p>

              <div className="xp-win-pill">
                <Zap size={16} /> +{score + 300} Gamer XP hisobingizga qo'shildi! ⚡
              </div>

              <div className="promo-reveal-box">
                <span className="reveal-label">G'alaba promokodingiz (-15% do'kondagi chegirma):</span>
                <div className="promo-code-pill">
                  <strong>{promoCode}</strong>
                  <button className="btn-copy" onClick={copyAndApply}>
                    {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                    <span>{copied ? 'Nusxalandi' : 'Nusxalash va Savatga'}</span>
                  </button>
                </div>
              </div>

              <div className="win-actions">
                <button 
                  className="btn btn-cyber"
                  onClick={() => {
                    applyPromoCode(promoCode);
                    setIsCartOpen(true);
                    navigate('/products');
                  }}
                >
                  <span>Do'konga O'tish</span>
                  <ArrowRight size={18} />
                </button>
                <button className="btn btn-outline" onClick={startGame}>
                  <RotateCcw size={16} /> Qayta O'ynash
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Defeat Screen */}
        {gameState === 'defeat' && (
          <div className="arena-overlay">
            <div className="overlay-card glass defeat-card">
              <div className="defeat-skull">
                <Skull size={54} color="#ef4444" />
              </div>
              <h2 className="defeat-title">SIZ YIQILDINGIZ (ELIMINATED) 💀</h2>
              <p className="defeat-desc">
                Sog'lig'ingiz tugadi. Terroristlar Mid koridorini to'xtatib qoldi.<br />
                To'plangan ball: <strong>{score}</strong> | Headshotlar: <strong>{headshotsCount}</strong>
              </p>

              <button className="btn btn-primary" onClick={startGame}>
                <RotateCcw size={18} /> Qaytadan Urinib Ko'rish
              </button>
            </div>
          </div>
        )}

        {/* Live Enemy Bots on Tactical Positions */}
        {gameState === 'playing' && (
          enemies.map(enemy => {
            const elapsed = Date.now() - enemy.spawnedAt;
            const threatPercent = Math.min(100, Math.round((elapsed / enemy.threatDuration) * 100));

            return (
              <div
                key={enemy.id}
                className="cs2-enemy-bot animate-pop-up"
                style={{
                  top: `${enemy.y}%`,
                  left: `${enemy.x}%`
                }}
              >
                {/* Enemy Threat / Alert Timer Bar */}
                <div className="enemy-threat-bar">
                  <div 
                    className="threat-fill" 
                    style={{ width: `${threatPercent}%` }} 
                  />
                </div>

                <div className="enemy-tag-label">{enemy.botName}</div>

                {/* Enemy Body Model with Head & Body Hitboxes */}
                <div className="enemy-model-container">
                  {/* Head Hitbox (+50 Headshot) */}
                  <div 
                    className="enemy-head-hitbox"
                    onMouseDown={(e) => handleHitEnemy(e, enemy, true)}
                    title="Bosh (Headshot +50)"
                  >
                    <div className="head-crosshair-hint">
                      <Target size={14} color="#ef4444" />
                    </div>
                  </div>

                  {/* Body Hitbox (+25) */}
                  <div 
                    className="enemy-body-hitbox"
                    onMouseDown={(e) => handleHitEnemy(e, enemy, false)}
                    title="Tana (+25)"
                  >
                    <div className="body-vest-lines">
                      <Shield size={18} color="rgba(255,255,255,0.7)" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
