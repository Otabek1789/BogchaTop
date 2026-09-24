import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Crosshair, Shield, Zap, Flame, Trophy, RotateCcw, Copy, Check, 
  ArrowRight, Skull, Target, Award, Heart, Sparkles, RefreshCw, 
  Plus, Users, Play, Coins, HelpCircle, Clock, ArrowLeft, Swords,
  Bomb, BriefcaseMedical
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useGamer } from '../context/GamerContext';
import { soundFX } from '../utils/soundFX';
import toast from 'react-hot-toast';
import './KidsGame.css';

// Initial Mock Rooms matching Screenshot 1
const INITIAL_ROOMS = [
  {
    id: 'room-1',
    bet: 100,
    modeText: '5 ga 5',
    maxWinText: "g'alaba uchun 500 🪙 gacha",
    map: 'INFERNO',
    mapImg: '/images/rushmid/inferno.jpg',
    team1Slots: [{ id: 1, name: '?', avatar: null }, { id: 2, empty: true }, { id: 3, empty: true }, { id: 4, empty: true }, { id: 5, empty: true }],
    team2Slots: [{ id: 6, empty: true }, { id: 7, empty: true }, { id: 8, empty: true }, { id: 9, empty: true }, { id: 10, empty: true }],
    status: 'open'
  },
  {
    id: 'room-2',
    bet: 500,
    modeText: '2 ga 2',
    maxWinText: "g'alaba uchun 2 500 🪙 gacha",
    map: 'INFERNO',
    mapImg: '/images/rushmid/inferno.jpg',
    team1Slots: [{ id: 1, empty: true }, { id: 2, empty: true }],
    team2Slots: [{ id: 3, name: 'Donk_01', avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&auto=format&fit=crop&q=80' }, { id: 4, empty: true }],
    status: 'open'
  },
  {
    id: 'room-3',
    bet: 100,
    modeText: '1 ga 1',
    maxWinText: "g'alaba uchun 500 🪙 gacha",
    map: 'INFERNO',
    mapImg: '/images/rushmid/inferno.jpg',
    team1Slots: [{ id: 1, name: 'NiKo_CS', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80' }],
    team2Slots: [{ id: 2, empty: true }],
    status: 'open'
  },
  {
    id: 'room-4',
    bet: 100,
    modeText: '1 ga 1',
    maxWinText: "g'alaba uchun 150 🪙 — 500 🪙",
    map: 'MIRAGE',
    mapImg: '/images/rushmid/mirage.jpg',
    team1Slots: [{ id: 1, name: 'Suicide', trophies: 997, avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80' }],
    team2Slots: [{ id: 2, empty: true }],
    status: 'open'
  }
];

export default function KidsGame() {
  const { applyPromoCode, setIsCartOpen } = useCart();
  const { addXP, unlockBadge } = useGamer();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // User Coins balance (default 405 matching screenshot)
  const [coins, setCoins] = useState(() => {
    try {
      const stored = localStorage.getItem('nexus_shot_coins');
      return stored ? Number(stored) : 405;
    } catch (_) {
      return 405;
    }
  });

  // Active top sub-nav tab: 'games' | 'fighter' | 'history' | 'rating' | 'rewards'
  const [activeSubTab, setActiveSubTab] = useState('games');
  const [roomFilter, setRoomFilter] = useState('open'); // 'open' | 'live'

  // Game flow stage: 'rooms' | 'room_lobby' | 'gear_buy' | 'battle'
  const [stage, setStage] = useState('rooms');
  const [selectedRoom, setSelectedRoom] = useState(INITIAL_ROOMS[3]); // default room-4 (Mirage 1v1)

  // Team selection: 'terrorists' | 'cts'
  const [myTeam, setMyTeam] = useState('cts');
  const [isPlayerSeated, setIsPlayerSeated] = useState(false);

  // Equipment buying budget ($100 starting budget)
  const [budgetRemaining, setBudgetRemaining] = useState(60);
  const [equippedWeapon, setEquippedWeapon] = useState({ id: 'avtomat', name: 'Avtomat', cost: 40, damage: 45 });
  const [equippedArmor, setEquippedArmor] = useState({ id: 'none', name: 'Zirhsiz', cost: 0, armor: 0 });
  const [equippedGrenade, setEquippedGrenade] = useState({ id: 'none', name: "Yo'q", cost: 0, count: 0 });
  const [equippedMedkit, setEquippedMedkit] = useState({ id: 'none', name: "Yo'q", cost: 0, count: 0 });
  const [buyCountdown, setBuyCountdown] = useState(15);

  // Battle Duel State
  const [round, setRound] = useState(1);
  const [turnTimer, setTurnTimer] = useState(8);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [playerHp, setPlayerHp] = useState(120);
  const [playerArmor, setPlayerArmor] = useState(80);
  const [enemyHp, setEnemyHp] = useState(120);
  const [enemyArmor, setEnemyArmor] = useState(40);
  const [floatingDamage, setFloatingDamage] = useState(null); // { text, target: 'player'|'enemy', type: 'crit'|'heal'|'normal' }
  const [actionEffect, setActionEffect] = useState(null); // 'shoot' | 'knife' | 'grenade' | 'heal'
  const [battleResult, setBattleResult] = useState(null); // 'victory' | 'defeat' | null
  const [copiedPromo, setCopiedPromo] = useState(false);

  // Create room modal & info modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRoomMap, setNewRoomMap] = useState('MIRAGE');
  const [newRoomMode, setNewRoomMode] = useState('1 ga 1');
  const [newRoomBet, setNewRoomBet] = useState(100);
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Save coins
  useEffect(() => {
    try {
      localStorage.setItem('nexus_shot_coins', coins.toString());
    } catch (_) {}
  }, [coins]);

  // Stage 3 (Gear Buy) auto-countdown
  useEffect(() => {
    if (stage !== 'gear_buy') return;
    setBuyCountdown(15);

    const timer = setInterval(() => {
      setBuyCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          startDuelBattle();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [stage]);

  // Stage 4 (Battle) turn countdown
  useEffect(() => {
    if (stage !== 'battle' || battleResult !== null) return;

    const timer = setInterval(() => {
      setTurnTimer(prev => {
        if (prev <= 1) {
          // Time expired! Auto-strike default
          if (isPlayerTurn) {
            handleActionShoot();
          } else {
            handleEnemyTurn();
          }
          return 8;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [stage, isPlayerTurn, battleResult]);

  // Enter a room from room list (Step 1 -> Step 2)
  const handleSelectRoom = (room) => {
    soundFX.playClick();
    setSelectedRoom(room);
    setIsPlayerSeated(false);
    setStage('room_lobby');
  };

  // Seat in Counter-Terrorists (Step 2)
  const handleTakeSeat = () => {
    soundFX.playPowerUp();
    setIsPlayerSeated(true);
    setMyTeam('cts');
    toast.success("Siz Kontr-terrorchilar safiga qo'shildingiz!", { icon: '🛡️' });
  };

  // Proceed from Room Lobby to Gear Buy Phase (Step 2 -> Step 3)
  const handleProceedToGear = () => {
    if (!isPlayerSeated) {
      toast.error("Iltimos, avval jamoaga qo'shiling (+ O'tirish)!");
      return;
    }
    if (coins < selectedRoom.bet) {
      toast.error(`Yetarli tanga yo'q! Bu o'yinga kirish uchun ${selectedRoom.bet} 🪙 kerak.`);
      return;
    }

    // Deduct room bet
    soundFX.playClick();
    setCoins(prev => Math.max(0, prev - selectedRoom.bet));
    setBudgetRemaining(60); // $100 starting budget - $40 Avtomat
    setEquippedWeapon({ id: 'avtomat', name: 'Avtomat', cost: 40, damage: 48 });
    setEquippedArmor({ id: 'none', name: 'Zirhsiz', cost: 0, armor: 0 });
    setEquippedGrenade({ id: 'none', name: "Yo'q", cost: 0, count: 0 });
    setEquippedMedkit({ id: 'none', name: "Yo'q", cost: 0, count: 0 });
    setStage('gear_buy');
  };

  // Gear Buy Actions
  const toggleWeapon = (weapon) => {
    soundFX.playClick();
    const currentCost = equippedWeapon.cost;
    const diff = weapon.cost - currentCost;
    if (budgetRemaining < diff) {
      toast.error("Mablag' yetarli emas!");
      return;
    }
    setBudgetRemaining(prev => prev - diff);
    setEquippedWeapon(weapon);
  };

  const toggleArmor = (armor) => {
    soundFX.playClick();
    const isEquipped = equippedArmor.id === armor.id;
    if (isEquipped) {
      setBudgetRemaining(prev => prev + armor.cost);
      setEquippedArmor({ id: 'none', name: 'Zirhsiz', cost: 0, armor: 0 });
    } else {
      if (budgetRemaining < armor.cost) {
        toast.error("Mablag' yetarli emas!");
        return;
      }
      setBudgetRemaining(prev => prev - armor.cost);
      setEquippedArmor(armor);
    }
  };

  const toggleGrenade = (grenade) => {
    soundFX.playClick();
    const hasGrenade = equippedGrenade.count > 0;
    if (hasGrenade) {
      setBudgetRemaining(prev => prev + grenade.cost);
      setEquippedGrenade({ id: 'none', name: "Yo'q", cost: 0, count: 0 });
    } else {
      if (budgetRemaining < grenade.cost) {
        toast.error("Mablag' yetarli emas!");
        return;
      }
      setBudgetRemaining(prev => prev - grenade.cost);
      setEquippedGrenade({ ...grenade, count: 1 });
    }
  };

  const toggleMedkit = (medkit) => {
    soundFX.playClick();
    const hasMedkit = equippedMedkit.count > 0;
    if (hasMedkit) {
      setBudgetRemaining(prev => prev + medkit.cost);
      setEquippedMedkit({ id: 'none', name: "Yo'q", cost: 0, count: 0 });
    } else {
      if (budgetRemaining < medkit.cost) {
        toast.error("Mablag' yetarli emas!");
        return;
      }
      setBudgetRemaining(prev => prev - medkit.cost);
      setEquippedMedkit({ ...medkit, count: 1 });
    }
  };

  // Start the 2D Arena Duel (Step 3 -> Step 4)
  const startDuelBattle = () => {
    soundFX.playPowerUp();
    setRound(1);
    setTurnTimer(8);
    setIsPlayerTurn(true);
    setPlayerHp(120);
    setPlayerArmor(equippedArmor.armor || 0);
    setEnemyHp(120);
    setEnemyArmor(40);
    setBattleResult(null);
    setFloatingDamage(null);
    setActionEffect(null);
    setStage('battle');
  };

  // Combat Actions in Step 4
  const triggerFloatingText = (text, target, type = 'normal') => {
    setFloatingDamage({ text, target, type, id: Date.now() });
    setTimeout(() => setFloatingDamage(null), 1200);
  };

  // Action 1: Shoot with Main Weapon
  const handleActionShoot = () => {
    if (!isPlayerTurn || battleResult) return;
    soundFX.playShot();
    setActionEffect('shoot');
    setTimeout(() => setActionEffect(null), 500);

    // Calculate damage & headshot chance
    const isHeadshot = Math.random() < 0.28;
    let baseDmg = equippedWeapon.damage + Math.floor(Math.random() * 14) - 5;
    if (isHeadshot) {
      baseDmg = Math.round(baseDmg * 1.6);
      soundFX.playHeadshot();
      triggerFloatingText(`💥 HEADSHOT -${baseDmg}!`, 'enemy', 'crit');
    } else {
      triggerFloatingText(`-${baseDmg}`, 'enemy', 'normal');
    }

    const nextEnemyHp = Math.max(0, enemyHp - baseDmg);
    setEnemyHp(nextEnemyHp);

    if (nextEnemyHp <= 0) {
      handleVictory();
      return;
    }

    // Switch turn to enemy
    setIsPlayerTurn(false);
    setTurnTimer(8);
    setTimeout(handleEnemyTurn, 1400);
  };

  // Action 2: Pichoq (Knife Strike)
  const handleActionKnife = () => {
    if (!isPlayerTurn || battleResult) return;
    soundFX.playClick(2000);
    setActionEffect('knife');
    setTimeout(() => setActionEffect(null), 400);

    const isCrit = Math.random() < 0.35;
    const baseDmg = isCrit ? 45 : 30;
    if (isCrit) {
      soundFX.playHeadshot();
      triggerFloatingText(`🗡️ KRITIK PICHOQ -${baseDmg}!`, 'enemy', 'crit');
    } else {
      triggerFloatingText(`🗡️ -${baseDmg}`, 'enemy', 'normal');
    }

    const nextEnemyHp = Math.max(0, enemyHp - baseDmg);
    setEnemyHp(nextEnemyHp);

    if (nextEnemyHp <= 0) {
      handleVictory();
      return;
    }

    setIsPlayerTurn(false);
    setTurnTimer(8);
    setTimeout(handleEnemyTurn, 1400);
  };

  // Action 3: Granata (HE Grenade)
  const handleActionGrenade = () => {
    if (!isPlayerTurn || battleResult) return;
    if (equippedGrenade.count <= 0) {
      toast.error("Sizda granata yo'q! Uni jihoz bosqichida sotib olish kerak.");
      return;
    }

    soundFX.playShot();
    setActionEffect('grenade');
    setTimeout(() => setActionEffect(null), 600);
    setEquippedGrenade(prev => ({ ...prev, count: prev.count - 1 }));

    const dmg = 55 + Math.floor(Math.random() * 15);
    triggerFloatingText(`💣 BOOM! -${dmg}`, 'enemy', 'crit');

    const nextEnemyHp = Math.max(0, enemyHp - dmg);
    setEnemyHp(nextEnemyHp);

    if (nextEnemyHp <= 0) {
      handleVictory();
      return;
    }

    setIsPlayerTurn(false);
    setTurnTimer(8);
    setTimeout(handleEnemyTurn, 1400);
  };

  // Action 4: Aptechka (Medkit)
  const handleActionMedkit = () => {
    if (!isPlayerTurn || battleResult) return;
    if (equippedMedkit.count <= 0) {
      toast.error("Sizda aptechka yo'q! Uni jihoz bosqichida sotib olish kerak.");
      return;
    }

    soundFX.playPowerUp();
    setActionEffect('heal');
    setTimeout(() => setActionEffect(null), 500);
    setEquippedMedkit(prev => ({ ...prev, count: prev.count - 1 }));

    const healAmount = 45;
    setPlayerHp(prev => Math.min(120, prev + healAmount));
    triggerFloatingText(`+${healAmount} HP ❤️`, 'player', 'heal');

    // Switch turn to enemy
    setIsPlayerTurn(false);
    setTurnTimer(8);
    setTimeout(handleEnemyTurn, 1400);
  };

  // Enemy Bot AI Turn
  const handleEnemyTurn = () => {
    if (stage !== 'battle' || battleResult) return;

    soundFX.playPlayerHurt();
    const enemyChoices = ['shoot', 'shoot', 'grenade', 'knife'];
    const choice = enemyChoices[Math.floor(Math.random() * enemyChoices.length)];

    let dmg = 25 + Math.floor(Math.random() * 15);
    if (choice === 'grenade') {
      dmg = 38 + Math.floor(Math.random() * 10);
      triggerFloatingText(`💣 Granata zarbasi: -${dmg}`, 'player', 'crit');
    } else {
      triggerFloatingText(`Suicide o't ochdi: -${dmg}`, 'player', 'normal');
    }

    setPlayerHp(prev => {
      const next = Math.max(0, prev - dmg);
      if (next <= 0) {
        handleDefeat();
        return 0;
      }
      return next;
    });

    setRound(prev => prev + 1);
    setIsPlayerTurn(true);
    setTurnTimer(8);
  };

  // Victory Handler
  const handleVictory = () => {
    soundFX.playVictory();
    setBattleResult('victory');
    const winPot = selectedRoom.bet * 2;
    setCoins(prev => prev + winPot);
    addXP(350, "Rush Mid G'alabasi");
    unlockBadge('reflex_champ');
    toast.success(`🎉 G'alaba! Siz ${winPot} 🪙 yutib oldingiz!`, { duration: 4000 });
  };

  // Defeat Handler
  const handleDefeat = () => {
    soundFX.playPlayerHurt();
    setBattleResult('defeat');
    toast.error("Mag'lubiyat! Suicide sizni yiqitdi.", { duration: 3000 });
  };

  // Promo copy & apply
  const promoCode = 'RUSHCHAMP15';
  const handleCopyPromo = () => {
    navigator.clipboard.writeText(promoCode);
    setCopiedPromo(true);
    applyPromoCode(promoCode);
    toast.success(`"${promoCode}" promokodi saqlandi va savatga qo'llandi! (-15%)`);
    setTimeout(() => setCopiedPromo(false), 2500);
  };

  // Create room modal action
  const handleCreateRoomSubmit = (e) => {
    e.preventDefault();
    soundFX.playSuccess();
    const newRoom = {
      id: `custom-${Date.now()}`,
      bet: newRoomBet,
      modeText: newRoomMode,
      maxWinText: `g'alaba uchun ${newRoomBet * 2} 🪙`,
      map: newRoomMap,
      mapImg: newRoomMap === 'MIRAGE' ? '/images/rushmid/mirage.jpg' : '/images/rushmid/inferno.jpg',
      team1Slots: [{ id: 1, name: 'Siz (Gamer)', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' }],
      team2Slots: [{ id: 2, empty: true }],
      status: 'open'
    };
    setSelectedRoom(newRoom);
    setShowCreateModal(false);
    setIsPlayerSeated(true);
    setMyTeam('terrorists');
    setStage('room_lobby');
    toast.success(`"${newRoomMap} ${newRoomMode}" xonasi yaratildi!`);
  };

  return (
    <div className="rush-mid-app-wrapper">
      {/* Top Shot CS Navigation Bar (matching Screenshot 3) */}
      <header className="shot-top-nav">
        <div className="shot-nav-left">
          <div className="shot-logo" onClick={() => setStage('rooms')}>
            <span className="shot-logo-text">SHOT</span>
            <div className="shot-online-badge">
              <span className="online-dot"></span>
              <span>online 1422</span>
            </div>
          </div>
        </div>

        <nav className="shot-sub-routes">
          <span className="route-item">BONUSLAR</span>
          <span className="route-item">KEYSLAR</span>
          <span className="route-item active">RUSH MID</span>
          <span className="route-item">RUS RULETKASI</span>
          <span className="route-item">CASE BATTLES</span>
          <span className="route-item">KONTRAKTLAR</span>
          <span className="route-item">UPGRADE</span>
          <span className="route-item" onClick={() => navigate('/products')}>DO'KON</span>
          <span className="route-item">INVENTAR</span>
          <span className="route-item">DO'STLAR</span>
        </nav>

        <div className="shot-nav-right">
          <span className="lang-selector">UZ ▾</span>
          <div className="shot-coin-pill">
            <span className="coin-icon">🪙</span>
            <span className="coin-val">{coins}</span>
            <button className="btn-add-coins" onClick={() => setCoins(c => c + 100)} title="Tanga qo'shish">+</button>
          </div>
          <div className="shot-user-avatar">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
              alt="Profile" 
            />
          </div>
        </div>
      </header>

      {/* Main Rush Mid Page Container */}
      <main className="rush-mid-main-container">

        {/* ========================================================
            SCREEN 1: ROOMS LIST (O'YINLAR)
            ======================================================== */}
        {stage === 'rooms' && (
          <div className="rush-rooms-screen">
            {/* Top Sub-Nav Pills */}
            <div className="rush-mode-tabs-pill">
              <button 
                className={`tab-pill-btn ${activeSubTab === 'games' ? 'active' : ''}`}
                onClick={() => setActiveSubTab('games')}
              >
                O'yinlar
              </button>
              <button 
                className={`tab-pill-btn ${activeSubTab === 'fighter' ? 'active' : ''}`}
                onClick={() => setActiveSubTab('fighter')}
              >
                Jangchi
              </button>
              <button 
                className={`tab-pill-btn ${activeSubTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveSubTab('history')}
              >
                Tarix
              </button>
              <button 
                className={`tab-pill-btn ${activeSubTab === 'rating' ? 'active' : ''}`}
                onClick={() => setActiveSubTab('rating')}
              >
                Reyting
              </button>
              <button 
                className={`tab-pill-btn ${activeSubTab === 'rewards' ? 'active' : ''}`}
                onClick={() => setActiveSubTab('rewards')}
              >
                Yutuq
              </button>
            </div>

            {/* Giant Create Game Blue Button */}
            <button 
              className="btn-create-game-giant"
              onClick={() => setShowCreateModal(true)}
            >
              <span className="gamepad-icon">🎮</span>
              <span>O'yin yaratish</span>
            </button>

            {/* Filter Bar (Qanday o'ynaladi / Ochiq / Hozir ketmoqda) */}
            <div className="rush-filter-row">
              <button className="link-how-to-play" onClick={() => setShowHelpModal(true)}>
                <span>qanday o'ynaladi</span>
                <HelpCircle size={17} />
              </button>

              <div className="filter-toggle-group">
                <button 
                  className={`filter-btn ${roomFilter === 'open' ? 'active' : ''}`}
                  onClick={() => setRoomFilter('open')}
                >
                  Ochiq o'yinlar
                </button>
                <button 
                  className={`filter-btn ${roomFilter === 'live' ? 'active' : ''}`}
                  onClick={() => setRoomFilter('live')}
                >
                  Hozir ketmoqda
                </button>
              </div>
            </div>

            {/* List of Room Cards (matching Screenshot 1) */}
            <div className="rush-room-cards-list">
              {INITIAL_ROOMS.map(room => (
                <div 
                  key={room.id} 
                  className="rush-room-card"
                  onClick={() => handleSelectRoom(room)}
                >
                  {/* Left Info Column */}
                  <div className="room-card-info-col">
                    <div className="room-bet-badge">
                      <span className="bet-amount">{room.bet} 🪙</span>
                      <span className="bet-dot">•</span>
                      <span className="bet-mode">{room.modeText}</span>
                    </div>
                    <div className="room-win-pill">
                      <span>{room.maxWinText}</span>
                    </div>
                  </div>

                  {/* Center Map Banner with Teams & VS */}
                  <div 
                    className="room-card-map-banner"
                    style={{ backgroundImage: `url(${room.mapImg})` }}
                  >
                    <div className="map-banner-overlay">
                      {/* Team 1 Slots */}
                      <div className="team-slots-box left">
                        {room.team1Slots.map((slot, i) => (
                          <div key={i} className="slot-avatar-circle">
                            {slot.avatar ? (
                              <img src={slot.avatar} alt="player" />
                            ) : slot.name === '?' ? (
                              <span className="slot-question">?</span>
                            ) : (
                              <span className="slot-empty-ring"></span>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Center VS Badge */}
                      <div className="room-vs-badge">VS</div>

                      {/* Team 2 Slots */}
                      <div className="team-slots-box right">
                        {room.team2Slots.map((slot, i) => (
                          <div key={i} className="slot-avatar-circle">
                            {slot.avatar ? (
                              <img src={slot.avatar} alt="player" />
                            ) : (
                              <span className="slot-empty-ring"></span>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Map Name Tag in Right Corner */}
                      <div className="room-map-name-tag">{room.map}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            SCREEN 2: ROOM LOBBY (TEAM SELECTION, matching Screenshot 2)
            ======================================================== */}
        {stage === 'room_lobby' && (
          <div className="rush-lobby-screen">
            {/* Top Room Banner */}
            <div 
              className="lobby-top-banner"
              style={{ backgroundImage: `url(${selectedRoom.mapImg})` }}
            >
              <div className="lobby-banner-overlay">
                <span className="lobby-map-pill">{selectedRoom.map}</span>
                <h2 className="lobby-match-title">
                  {selectedRoom.bet} 🪙 • {selectedRoom.modeText}
                </h2>
                <div className="lobby-win-range">
                  <span>{selectedRoom.maxWinText}</span>
                </div>
              </div>
            </div>

            {/* Team 1: Terrorchilar (Yellow Box) */}
            <div className="lobby-team-box terrorists">
              <div className="lobby-team-header">
                <span className="team-icon">⭐</span>
                <span className="team-title-text">Terrorchilar</span>
              </div>
              <div className="lobby-player-row">
                <div className="player-avatar-wrap">
                  <img 
                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80" 
                    alt="Suicide" 
                  />
                  <span className="player-lvl-badge">1</span>
                </div>
                <span className="player-username gothic">Suicide</span>
                <div className="player-trophies-badge">
                  <span>🏆</span>
                  <span>997</span>
                </div>
              </div>
            </div>

            {/* Center VS Circle */}
            <div className="lobby-center-vs-circle">VS</div>

            {/* Team 2: Kontr-terrorchilar (Blue Box) */}
            <div className="lobby-team-box cts">
              <div className="lobby-team-header">
                <span className="team-icon">🛡️</span>
                <span className="team-title-text">Kontr-terrorchilar</span>
              </div>

              {isPlayerSeated ? (
                <div className="lobby-player-row active-player">
                  <div className="player-avatar-wrap">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                      alt="Siz" 
                    />
                    <span className="player-lvl-badge">Pro</span>
                  </div>
                  <span className="player-username">Siz (Gamer)</span>
                  <div className="player-trophies-badge">
                    <span>🏆</span>
                    <span>1 050</span>
                  </div>
                </div>
              ) : (
                <button className="btn-take-seat-slot" onClick={handleTakeSeat}>
                  <Plus size={18} />
                  <span>O'tirish</span>
                </button>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="lobby-bottom-actions">
              <button 
                className="btn-back-rooms"
                onClick={() => setStage('rooms')}
              >
                <ArrowLeft size={18} />
                <span>Orqaga</span>
              </button>

              <button 
                className="btn-start-gear-prep"
                onClick={handleProceedToGear}
              >
                <span>{isPlayerSeated ? "Jangga Tayyorgarlik (Jihoz)" : "Taklif qilish"}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            SCREEN 3: EQUIPMENT BUY PHASE (matching Screenshot 3)
            ======================================================== */}
        {stage === 'gear_buy' && (
          <div className="rush-gear-screen">
            {/* Team & Budget Header */}
            <div className="gear-header-card">
              <div className="gear-team-info">
                <div className="gear-team-badge-circle">
                  <Shield size={28} color="#00f0ff" />
                </div>
                <div>
                  <h2 className="gear-team-title">Kontr-terrorchilar</h2>
                  <span className="gear-budget-label">Qoldi <strong className="green-money">$ {budgetRemaining}</strong></span>
                </div>
              </div>

              <button className="link-how-it-works" onClick={() => setShowHelpModal(true)}>
                <HelpCircle size={15} />
                <span>Qanday ishlaydi?</span>
              </button>
            </div>

            {/* Gear Items 2x2 Grid */}
            <div className="gear-items-grid">
              {/* 1. QUROL */}
              <div 
                className={`gear-item-card ${equippedWeapon.id !== 'none' ? 'equipped' : ''}`}
                onClick={() => {
                  if (equippedWeapon.id === 'avtomat') {
                    toggleWeapon({ id: 'awp', name: 'Snayper (AWP)', cost: 60, damage: 75 });
                  } else {
                    toggleWeapon({ id: 'avtomat', name: 'Avtomat (M4A1)', cost: 40, damage: 48 });
                  }
                }}
              >
                <div className="gear-card-left">
                  <span className="gear-cat-label">QUROL</span>
                  <div className="gear-choice-row">
                    <span className="gear-icon">🔫</span>
                    <span className="gear-choice-name">{equippedWeapon.name}</span>
                  </div>
                </div>
                <div className="gear-card-cost green-money">
                  ${equippedWeapon.cost}
                </div>
              </div>

              {/* 2. ZIRH */}
              <div 
                className={`gear-item-card ${equippedArmor.id !== 'none' ? 'equipped' : ''}`}
                onClick={() => toggleArmor({ id: 'kevlar', name: 'Kevlar Zirh', cost: 25, armor: 60 })}
              >
                <div className="gear-card-left">
                  <span className="gear-cat-label">ZIRH</span>
                  <div className="gear-choice-row">
                    <Shield size={18} color="#94a3b8" />
                    <span className="gear-choice-name">{equippedArmor.name}</span>
                  </div>
                </div>
                <div className="gear-card-cost green-money">
                  ${equippedArmor.cost}
                </div>
              </div>

              {/* 3. GRANATA */}
              <div 
                className={`gear-item-card ${equippedGrenade.count > 0 ? 'equipped' : ''}`}
                onClick={() => toggleGrenade({ id: 'he', name: 'Granata HE', cost: 20 })}
              >
                <div className="gear-card-left">
                  <span className="gear-cat-label">GRANATA</span>
                  <div className="gear-choice-row">
                    <Bomb size={18} color="#94a3b8" />
                    <span className="gear-choice-name">{equippedGrenade.name}</span>
                  </div>
                </div>
                <div className="gear-card-cost green-money">
                  ${equippedGrenade.cost} +
                </div>
              </div>

              {/* 4. APTECHKA */}
              <div 
                className={`gear-item-card ${equippedMedkit.count > 0 ? 'equipped' : ''}`}
                onClick={() => toggleMedkit({ id: 'medkit', name: 'Aptechka', cost: 15 })}
              >
                <div className="gear-card-left">
                  <span className="gear-cat-label">APTECHKA</span>
                  <div className="gear-choice-row">
                    <BriefcaseMedical size={18} color="#94a3b8" />
                    <span className="gear-choice-name">{equippedMedkit.name}</span>
                  </div>
                </div>
                <div className="gear-card-cost green-money">
                  ${equippedMedkit.cost} +
                </div>
              </div>
            </div>

            {/* Raqiblar (Opponents Box) */}
            <div className="gear-opponents-box">
              <span className="opponents-title">Raqiblar</span>
              <div className="opponent-pill">
                <img 
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80" 
                  alt="Suicide" 
                  className="opp-avatar"
                />
                <span className="opp-name gothic">Suicide</span>
                <span className="opp-trophies">🏆 997</span>
              </div>
            </div>

            {/* Big Blue Countdown Button */}
            <button 
              className="btn-launch-battle-countdown"
              onClick={startDuelBattle}
            >
              <span>{buyCountdown}s dan keyin jangga</span>
            </button>
          </div>
        )}

        {/* ========================================================
            SCREEN 4: 2D CS2 MID ARENA DUEL (matching Screenshot 4)
            ======================================================== */}
        {stage === 'battle' && (
          <div className="rush-duel-screen">
            {/* Top Duel Tug-of-War Health Bar */}
            <div className="duel-top-scoreboard">
              <div className="duel-team-icon-wrap left">
                <span className="team-duel-badge">⭐</span>
              </div>

              <div className="duel-dual-hp-bar">
                <div 
                  className="hp-fill-terrorist"
                  style={{ width: `${(enemyHp / 120) * 50}%` }}
                />
                <div 
                  className="hp-fill-ct"
                  style={{ width: `${(playerHp / 120) * 50}%` }}
                />
              </div>

              <div className="duel-team-icon-wrap right">
                <Shield size={18} color="#00f0ff" />
              </div>
            </div>

            {/* Round & Countdown Display */}
            <div className="duel-round-header">
              <div className="duel-round-badge">ROUND {round}</div>
              <div className={`duel-timer-badge ${turnTimer <= 3 ? 'urgent' : ''}`}>
                <span>{turnTimer}</span>
              </div>
            </div>

            {/* 2D Dust 2 Mid Arena Battlefield Viewport */}
            <div 
              className="duel-arena-viewport"
              style={{ backgroundImage: `url('/images/rushmid/arena.jpg')` }}
            >
              <div className="arena-inner-overlay">
                {/* Floating Damage Numbers */}
                {floatingDamage && (
                  <div 
                    className={`floating-damage-popup ${floatingDamage.target} ${floatingDamage.type}`}
                  >
                    {floatingDamage.text}
                  </div>
                )}

                {/* Left Fighter: Terrorist (Suicide) */}
                <div className={`duel-fighter-anchor left ${actionEffect === 'shoot' ? 'enemy-hit-flash' : ''}`}>
                  {/* Name, HP & Armor Bar */}
                  <div className="fighter-hud-tag">
                    <span className="fighter-hud-name gothic">Suicide</span>
                    <div className="fighter-bar-stack">
                      <div className="fighter-hp-bar">
                        <div 
                          className="fighter-hp-fill enemy" 
                          style={{ width: `${Math.max(0, (enemyHp / 120) * 100)}%` }}
                        />
                        <span className="fighter-hp-text">{enemyHp}</span>
                      </div>
                    </div>
                  </div>

                  {/* Target lock indicator */}
                  <div className="fighter-target-lock animate-pulse">
                    <Target size={24} color="#ef4444" />
                  </div>

                  {/* 2D Chibi Terrorist Sprite */}
                  <div className="fighter-sprite-wrap">
                    <img 
                      src="/images/rushmid/terrorist.jpg" 
                      alt="Terrorist" 
                      className="fighter-character-img"
                    />
                    {/* Red Circular Base Ring under feet */}
                    <div className="fighter-circular-base red"></div>
                  </div>
                </div>

                {/* Right Fighter: Counter-Terrorist (Siz / Gamer) */}
                <div className={`duel-fighter-anchor right ${actionEffect === 'shoot' ? 'player-shoot-recoil' : ''}`}>
                  {/* Name, HP & Armor Bar */}
                  <div className="fighter-hud-tag">
                    <span className="fighter-hud-name">Siz (CT)</span>
                    <div className="fighter-bar-stack">
                      <div className="fighter-hp-bar">
                        <div 
                          className="fighter-hp-fill player" 
                          style={{ width: `${Math.max(0, (playerHp / 120) * 100)}%` }}
                        />
                        <span className="fighter-hp-text">{playerHp}</span>
                      </div>
                      {playerArmor > 0 && (
                        <div className="fighter-armor-bar">
                          <div 
                            className="fighter-armor-fill" 
                            style={{ width: `${Math.max(0, (playerArmor / 80) * 100)}%` }}
                          />
                          <span className="fighter-armor-text">{playerArmor}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 2D Chibi CT Sprite */}
                  <div className="fighter-sprite-wrap">
                    <img 
                      src="/images/rushmid/ct.jpg" 
                      alt="Counter-Terrorist" 
                      className="fighter-character-img"
                    />
                    {/* Green Circular Base Ring under feet */}
                    <div className="fighter-circular-base green"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom 4 Circular Tactical Action Buttons (matching Screenshot 4) */}
            <div className="duel-bottom-controls-deck">
              {/* 1. PICHOQ (Knife) */}
              <button 
                className="deck-action-btn knife-btn"
                onClick={handleActionKnife}
                disabled={!isPlayerTurn || battleResult !== null}
                title="Pichoq bilan tezkor zarba"
              >
                <div className="action-circle-icon">
                  <Swords size={26} color="#ffffff" />
                </div>
                <span className="action-btn-label">PICHOQ</span>
              </button>

              {/* 2. HOLAT / OTISH (Center Red Glowing Crosshair) */}
              <button 
                className="deck-action-btn shoot-btn main-fire"
                onClick={handleActionShoot}
                disabled={!isPlayerTurn || battleResult !== null}
                title="Qurol bilan o't ochish (M4A1 / AK-47)"
              >
                <div className="action-circle-icon pulse-glow">
                  <Crosshair size={36} color="#ffffff" />
                </div>
                <span className="action-btn-label">HOLAT</span>
              </button>

              {/* 3. GRANATA */}
              <button 
                className={`deck-action-btn grenade-btn ${equippedGrenade.count <= 0 ? 'disabled' : ''}`}
                onClick={handleActionGrenade}
                disabled={!isPlayerTurn || battleResult !== null || equippedGrenade.count <= 0}
                title={equippedGrenade.count > 0 ? "Granata uloqtirish" : "Granata yo'q"}
              >
                <div className="action-circle-icon">
                  <Bomb size={26} color="#ffffff" />
                  {equippedGrenade.count > 0 && <span className="action-count-badge">1</span>}
                </div>
                <span className="action-btn-label">GRANATA</span>
              </button>

              {/* 4. APTECHKA */}
              <button 
                className={`deck-action-btn medkit-btn ${equippedMedkit.count <= 0 ? 'disabled' : ''}`}
                onClick={handleActionMedkit}
                disabled={!isPlayerTurn || battleResult !== null || equippedMedkit.count <= 0}
                title={equippedMedkit.count > 0 ? "Jonni tiklash" : "Aptechka yo'q"}
              >
                <div className="action-circle-icon">
                  <BriefcaseMedical size={26} color="#ffffff" />
                  {equippedMedkit.count > 0 && <span className="action-count-badge">1</span>}
                </div>
                <span className="action-btn-label">APTECHKA</span>
              </button>
            </div>

            {/* Duel End Overlay (Victory or Defeat) */}
            {battleResult && (
              <div className="duel-result-modal-backdrop">
                <div className={`duel-result-card ${battleResult}`}>
                  <div className="result-icon-wrap">
                    {battleResult === 'victory' ? (
                      <Trophy size={60} color="#fbbf24" className="animate-bounce" />
                    ) : (
                      <Skull size={60} color="#ef4444" />
                    )}
                  </div>

                  <h2 className="result-title">
                    {battleResult === 'victory' ? "G'ALABA! RUSH MID EGALLANDI! 🎉" : "MAG'LUBIYAT! 💀"}
                  </h2>

                  <p className="result-desc">
                    {battleResult === 'victory' ? (
                      <>Siz <strong>Suicide</strong> ustidan g'alaba qozondingiz va <strong>+{selectedRoom.bet * 2} 🪙</strong> tanga yutib oldingiz!</>
                    ) : (
                      <>Dushman sizni bartaraf etdi. Qaytadan urinib ko'ring!</>
                    )}
                  </p>

                  {battleResult === 'victory' && (
                    <div className="result-promo-box">
                      <span className="promo-tagline">G'alaba promokodingiz (-15% do'kondagi chegirma):</span>
                      <div className="promo-copy-row">
                        <strong>{promoCode}</strong>
                        <button className="btn-copy-promo" onClick={handleCopyPromo}>
                          {copiedPromo ? <Check size={16} /> : <Copy size={16} />}
                          <span>{copiedPromo ? 'Nusxalandi' : 'Nusxalash'}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="result-actions-row">
                    <button 
                      className="btn btn-cyber"
                      onClick={() => {
                        setStage('gear_buy');
                        setBattleResult(null);
                      }}
                    >
                      <RotateCcw size={16} />
                      <span>Qayta O'ynash</span>
                    </button>

                    <button 
                      className="btn btn-outline"
                      onClick={() => {
                        setStage('rooms');
                        setBattleResult(null);
                      }}
                    >
                      <ArrowLeft size={16} />
                      <span>Xonalar Ro'yxatiga</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* ========================================================
          CREATE GAME MODAL (O'yin yaratish)
          ======================================================== */}
      {showCreateModal && (
        <div className="rush-modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="rush-create-modal" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">🎮 Yangi O'yin Yaratish</h3>

            <form onSubmit={handleCreateRoomSubmit} className="create-room-form">
              <div className="form-group">
                <label>Xarita (Map)</label>
                <div className="map-picker-row">
                  <button 
                    type="button" 
                    className={`btn-choice-map ${newRoomMap === 'MIRAGE' ? 'active' : ''}`}
                    onClick={() => setNewRoomMap('MIRAGE')}
                  >
                    MIRAGE
                  </button>
                  <button 
                    type="button" 
                    className={`btn-choice-map ${newRoomMap === 'INFERNO' ? 'active' : ''}`}
                    onClick={() => setNewRoomMap('INFERNO')}
                  >
                    INFERNO
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>O'yin formati</label>
                <div className="mode-picker-row">
                  {['1 ga 1', '2 ga 2', '5 ga 5'].map(m => (
                    <button 
                      key={m}
                      type="button"
                      className={`btn-choice-mode ${newRoomMode === m ? 'active' : ''}`}
                      onClick={() => setNewRoomMode(m)}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Tikish summasi (Stavka)</label>
                <div className="bet-picker-row">
                  {[100, 250, 500, 1000].map(b => (
                    <button 
                      key={b}
                      type="button"
                      className={`btn-choice-bet ${newRoomBet === b ? 'active' : ''}`}
                      onClick={() => setNewRoomBet(b)}
                    >
                      {b} 🪙
                    </button>
                  ))}
                </div>
              </div>

              <div className="modal-actions-row">
                <button type="button" className="btn-cancel" onClick={() => setShowCreateModal(false)}>
                  Bekor qilish
                </button>
                <button type="submit" className="btn-submit-create">
                  Xonani ochish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          HOW TO PLAY MODAL (Qanday o'ynaladi)
          ======================================================== */}
      {showHelpModal && (
        <div className="rush-modal-overlay" onClick={() => setShowHelpModal(false)}>
          <div className="rush-help-modal" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">❓ RUSH MID Qanday O'ynaladi?</h3>
            <div className="help-content-list">
              <div className="help-item">
                <span className="help-number">1</span>
                <div>
                  <strong>Xona tanlash yoki yaratish:</strong>
                  <p>Ochiq o'yinlar ro'yxatidan 1v1, 2v2 yoki 5v5 xonaga kiring yoki o'zingiz yangi xona oching.</p>
                </div>
              </div>
              <div className="help-item">
                <span className="help-number">2</span>
                <div>
                  <strong>Jamoaga o'tirish:</strong>
                  <p>Kontr-terrorchilar yoki Terrorchilar bo'sh joyiga (+ O'tirish) bosing.</p>
                </div>
              </div>
              <div className="help-item">
                <span className="help-number">3</span>
                <div>
                  <strong>Jihoz sotib olish (Buy Menu):</strong>
                  <p>$100 byudjetingiz bilan Avtomat, Snayper, Zirh, Granata yoki Aptechka oling.</p>
                </div>
              </div>
              <div className="help-item">
                <span className="help-number">4</span>
                <div>
                  <strong>2D Jang maydonidagi taktik duel:</strong>
                  <p>Har bir raundda 8 soniya ichida Otish, Pichoq, Granata yoki Aptechkadan foydalanib raqibni yiqiting va tangalarni yutib oling!</p>
                </div>
              </div>
            </div>
            <button className="btn-close-help" onClick={() => setShowHelpModal(false)}>
              Tushundim
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
