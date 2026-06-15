/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Snowflake, 
  Wind, 
  Play, 
  Sparkles, 
  Layers, 
  Clock, 
  HelpCircle,
  Activity,
  Maximize2
} from 'lucide-react';
import { Particle, EffectType } from './types';
import { ParticleCanvas } from './components/ParticleCanvas';

export default function App() {
  // State for all active particles on the screen
  const [particles, setParticles] = useState<Particle[]>([]);
  
  // Independent generation duration timers in milliseconds (5000ms = 5s)
  const [snowflakeTimeLeft, setSnowflakeTimeLeft] = useState<number>(0);
  const [balloonTimeLeft, setBalloonTimeLeft] = useState<number>(0);

  // Cumulative session tracking for formal metrics display
  const [sparkCount, setSparkCount] = useState<number>(0);

  // Keep tracking references to avoid closure stales in ticks
  const snowflakeTimeLeftRef = useRef(snowflakeTimeLeft);
  const balloonTimeLeftRef = useRef(balloonTimeLeft);
  
  useEffect(() => {
    snowflakeTimeLeftRef.current = snowflakeTimeLeft;
  }, [snowflakeTimeLeft]);

  useEffect(() => {
    balloonTimeLeftRef.current = balloonTimeLeft;
  }, [balloonTimeLeft]);

  // Unique ID generator for particles
  const generateId = (): string => Math.random().toString(36).substring(2, 11);

  // Spawns a single Snowflake
  const spawnSnowflake = useCallback(() => {
    const newSnowflake: Particle = {
      id: generateId(),
      type: 'snowflakes',
      x: Math.random() * 92 + 4, // keep standard safe horizontal padding (4% to 96%)
      size: Math.floor(Math.random() * 12) + 24, // 24px to 36px (Strictly calibrated medium size)
      duration: Math.random() * 1.5 + 3.2, // 3.2s to 4.7s descent
      delay: 0,
      drift: (Math.random() - 0.5) * 45, // gentle sway amplitude (up to 22px left or right)
      rotateSpeed: (Math.random() - 0.5) * 2, // smooth spin speed
      variantIndex: Math.floor(Math.random() * 3), // select 1 of 3 stunning snowflake shapes
      colorIndex: 0,
    };
    
    setParticles((prev) => [...prev, newSnowflake]);
    setSparkCount((prev) => prev + 1);
  }, []);

  // Spawns a single Balloon
  const spawnBalloon = useCallback(() => {
    const newBalloon: Particle = {
      id: generateId(),
      type: 'balloons',
      x: Math.random() * 88 + 6, // keep comfortable horizontal margins (6% to 94%)
      size: Math.floor(Math.random() * 14) + 32, // 32px to 46px (Strictly calibrated medium size relative to real screens)
      duration: Math.random() * 1.5 + 3.5, // 3.5s to 5.0s floating ascent
      delay: 0,
      drift: (Math.random() - 0.5) * 55, // air wave swaying (up to 27px)
      rotateSpeed: (Math.random() - 0.5) * 1.5, // gentle wobble tilt
      variantIndex: Math.floor(Math.random() * 3), // select 1 of 3 unique shapes/ratios
      colorIndex: Math.floor(Math.random() * 5), // select 1 of 5 rich, high-status formal colors
    };
    
    setParticles((prev) => [...prev, newBalloon]);
    setSparkCount((prev) => prev + 1);
  }, []);

  // Master central ticker running at 50ms intervals for precision timing and particle spawning schedules
  useEffect(() => {
    let lastSnowflakeSpawn = 0;
    let lastBalloonSpawn = 0;
    const spawnIntervalSnow = 120; // Release a snowflake every 120ms
    const spawnIntervalBalloon = 240; // Release a balloon every 240ms (clean, uncluttered presentation)

    const interval = setInterval(() => {
      const now = Date.now();

      // Snowflake spawning lifecycle
      if (snowflakeTimeLeftRef.current > 0) {
        setSnowflakeTimeLeft((prev) => Math.max(0, prev - 50));
        
        if (now - lastSnowflakeSpawn >= spawnIntervalSnow) {
          spawnSnowflake();
          lastSnowflakeSpawn = now;
        }
      }

      // Balloon spawning lifecycle
      if (balloonTimeLeftRef.current > 0) {
        setBalloonTimeLeft((prev) => Math.max(0, prev - 50));
        
        if (now - lastBalloonSpawn >= spawnIntervalBalloon) {
          spawnBalloon();
          lastBalloonSpawn = now;
        }
      }

    }, 50);

    return () => clearInterval(interval);
  }, [spawnSnowflake, spawnBalloon]);

  // Command handlers to launch the 5.0s active stream
  const triggerSnowflakes = () => {
    setSnowflakeTimeLeft(5000); // 5.0 seconds
  };

  const triggerBalloons = () => {
    setBalloonTimeLeft(5000); // 5.0 seconds
  };

  // Garbage collector callback to remove particles once they leave the viewport
  const handleRemoveParticle = useCallback((id: string) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // Soft Reset to restore pristine environment state
  const clearSlate = () => {
    setSnowflakeTimeLeft(0);
    setBalloonTimeLeft(0);
    setParticles([]);
  };

  // Compute active status descriptions (human-readable metric dashboard)
  const isSnowActive = snowflakeTimeLeft > 0;
  const isBalloonActive = balloonTimeLeft > 0;
  const isAnyActive = isSnowActive || isBalloonActive;

  return (
    <div id="app-wrapper" className="min-h-screen bg-gradient-to-br from-[#FAF9F5] via-[#F5F3ED] to-[#ECEAE1] text-slate-800 flex flex-col justify-between py-10 px-4 relative overflow-hidden transition-colors duration-500">
      
      {/* Decorative Elegant Background Frame Grid Lines */}
      <div className="absolute inset-x-8 inset-y-8 border border-amber-950/5 pointer-events-none rounded-2xl md:inset-x-12 md:inset-y-12" />
      <div className="absolute top-20 left-12 right-12 bottom-20 border-x border-amber-950/[0.02] pointer-events-none" />

      {/* Main Interactive Particle Canvas layer */}
      <ParticleCanvas particles={particles} onRemoveParticle={handleRemoveParticle} />

      {/* Header Container */}
      <header className="w-full max-w-4xl mx-auto text-center z-10 select-none pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-950/[0.03] border border-amber-950/[0.06] text-amber-950/60 font-medium tracking-widest text-[10px] uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
          Atmospheric Accent Controllers
        </div>
        
        {/* Elegant Prestige Serif Header */}
        <h1 className="font-serif text-3xl md:text-5xl font-medium tracking-tight text-slate-900 mb-3 block">
          Visual Accents Board
        </h1>
        
        <p className="max-w-xl mx-auto text-slate-500 text-xs md:text-sm leading-relaxed font-sans font-light">
          A ceremonial environment staging panel designed for premier venue projection. Engage a release mechanism below to stream beautifully calibrated medium-size accent elements across the screen for exactly five seconds.
        </p>
      </header>

      {/* Main Central Control Deck (Consolidated elegant control module) */}
      <main className="w-full max-w-2xl mx-auto my-8 z-10 flex flex-col gap-6">
        
        {/* Control Desk Main Frame Card */}
        <div className="bg-white/[0.85] backdrop-blur-md rounded-2xl border border-slate-200 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)] p-6 md:p-8 relative">
          
          {/* Subtle Corner Markers (Formal Architectural aesthetic) */}
          <div className="absolute top-3 left-3 w-1.5 h-1.5 border-t border-l border-slate-300 pointer-events-none" />
          <div className="absolute top-3 right-3 w-1.5 h-1.5 border-t border-r border-slate-300 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-1.5 h-1.5 border-b border-l border-slate-300 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-1.5 h-1.5 border-b border-r border-slate-300 pointer-events-none" />

          {/* Console Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[11px] font-mono tracking-wider uppercase text-slate-400 font-semibold flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-emerald-500" />
                ENVIRONMENT STATUS: {isAnyActive ? 'ACTIVE RELEASE' : 'IDLE / STANDBY'}
              </span>
            </div>
            {particles.length > 0 && (
              <button 
                onClick={clearSlate}
                className="text-[10px] font-mono font-medium text-slate-400 hover:text-rose-600 transition-colors uppercase tracking-wider px-2 py-1 rounded bg-slate-50 border border-slate-100 cursor-pointer"
              >
                Clear Canvas
              </button>
            )}
          </div>

          {/* The dual accent launch controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            
            {/* 1. Snowflakes Accent Launcher Control */}
            <div className="flex flex-col justify-between p-5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all duration-300 group">
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2.5 rounded-lg bg-sky-50 border border-sky-100 text-sky-600 group-hover:scale-110 transition-transform duration-300">
                    <Snowflake className="w-5 h-5" />
                  </div>
                  {isSnowActive && (
                    <span className="text-[10px] font-mono font-bold text-sky-600 bg-sky-50 border border-sky-100 px-2 py-0.5 rounded-full animate-pulse">
                      {(snowflakeTimeLeft / 1000).toFixed(1)}s Left
                    </span>
                  )}
                </div>
                
                <h3 className="text-sm font-medium text-slate-800 tracking-tight group-hover:text-slate-900 transition-colors font-sans">
                  Snowflakes Accent
                </h3>
                <p className="text-[11px] text-slate-500 leading-relaxed font-light mt-1.5 mb-4">
                  Triggers an organic flurry of medium crystalline snowflakes (24px - 36px) with customizable micro-rotational speed sliding from the heavens for 5 seconds.
                </p>
              </div>

              <div className="w-full">
                {/* Visual Accent countdown progress line */}
                <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden mb-3">
                  <div 
                    className="h-full bg-gradient-to-r from-sky-400 to-sky-500 transition-all duration-75 ease-linear" 
                    style={{ width: `${(snowflakeTimeLeft / 5000) * 100}%` }}
                  />
                </div>

                <button
                  id="btn-stream-snowflakes"
                  onClick={triggerSnowflakes}
                  disabled={isSnowActive}
                  className={`w-full py-2.5 px-4 rounded-lg font-sans text-xs font-medium tracking-wide flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                    isSnowActive 
                      ? 'bg-sky-50 border border-sky-100 text-sky-400 cursor-not-allowed shadow-none' 
                      : 'bg-slate-900 hover:bg-sky-600 text-white shadow-sm hover:shadow-md hover:translate-y-[-1px]'
                  }`}
                >
                  <Play className={`w-3.5 h-3.5 fill-current ${isSnowActive ? 'text-sky-300' : 'text-white'}`} />
                  {isSnowActive ? 'Snowflakes Streaming' : 'Launch Snowflakes'}
                </button>
              </div>
            </div>

            {/* 2. Balloons Accent Launcher Control */}
            <div className="flex flex-col justify-between p-5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all duration-300 group">
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-100 text-rose-500 group-hover:scale-110 transition-transform duration-300">
                    <Wind className="w-5 h-5 rotate-180" />
                  </div>
                  {isBalloonActive && (
                    <span className="text-[10px] font-mono font-bold text-rose-500 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-full animate-pulse">
                      {(balloonTimeLeft / 1000).toFixed(1)}s Left
                    </span>
                  )}
                </div>
                
                <h3 className="text-sm font-medium text-slate-800 tracking-tight group-hover:text-slate-900 transition-colors font-sans">
                  Balloons Accent
                </h3>
                <p className="text-[11px] text-slate-500 leading-relaxed font-light mt-1.5 mb-4">
                  Streams multi-colored medium air balloons (32px - 46px) featuring smooth atmospheric buoyancy rising from the ground level upwards for 5 seconds.
                </p>
              </div>

              <div className="w-full">
                {/* Visual Accent countdown progress line */}
                <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden mb-3">
                  <div 
                    className="h-full bg-gradient-to-r from-rose-400 to-rose-500 transition-all duration-75 ease-linear" 
                    style={{ width: `${(balloonTimeLeft / 5000) * 100}%` }}
                  />
                </div>

                <button
                  id="btn-stream-balloons"
                  onClick={triggerBalloons}
                  disabled={isBalloonActive}
                  className={`w-full py-2.5 px-4 rounded-lg font-sans text-xs font-medium tracking-wide flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                    isBalloonActive 
                      ? 'bg-rose-50 border border-rose-100 text-rose-400 cursor-not-allowed shadow-none' 
                      : 'bg-slate-900 hover:bg-rose-500 text-white shadow-sm hover:shadow-md hover:translate-y-[-1px]'
                  }`}
                >
                  <Play className={`w-3.5 h-3.5 fill-current ${isBalloonActive ? 'text-rose-300' : 'text-white'}`} />
                  {isBalloonActive ? 'Balloons Streaming' : 'Launch Balloons'}
                </button>
              </div>
            </div>

          </div>

          {/* Quick Realtime Environment Telemetry Board (Formal parameters list) */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 md:p-5">
            <h4 className="text-[10.5px] font-mono font-bold tracking-wider uppercase text-slate-400 mb-3.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              Calibrated Environmental Diagnostics
            </h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              
              <div className="p-3 bg-white rounded-lg border border-slate-150 flex flex-col items-center">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-tight">Active Render</span>
                <span className="text-lg font-serif font-semibold text-slate-800 mt-1">{particles.length}</span>
                <span className="text-[8px] font-mono text-slate-400 uppercase tracking-tight mt-0.5">items in play</span>
              </div>
              
              <div className="p-3 bg-white rounded-lg border border-slate-150 flex flex-col items-center">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-tight">Particle Size</span>
                <span className="text-lg font-serif font-semibold text-slate-800 mt-1">Medium</span>
                <span className="text-[8px] font-mono text-slate-400 uppercase tracking-tight mt-0.5">24px - 46px standard</span>
              </div>
              
              <div className="p-3 bg-white rounded-lg border border-slate-150 flex flex-col items-center">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-tight">Friction / Drift</span>
                <span className="text-lg font-serif font-semibold text-slate-800 mt-1">Dynamic</span>
                <span className="text-[8px] font-mono text-slate-400 uppercase tracking-tight mt-0.5">wind wave sway</span>
              </div>
              
              <div className="p-3 bg-white rounded-lg border border-slate-150 flex flex-col items-center">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-tight">Total Spawned</span>
                <span className="text-lg font-serif font-semibold text-slate-800 mt-1">{sparkCount}</span>
                <span className="text-[8px] font-mono text-slate-400 uppercase tracking-tight mt-0.5">launched items</span>
              </div>

            </div>
          </div>

        </div>

        {/* Elegant guide card on standard environment features */}
        <div className="flex items-start gap-3 p-4 bg-amber-50/50 border border-amber-950/5 rounded-xl text-amber-950/70">
          <HelpCircle className="w-5 h-5 text-amber-700/70 shrink-0 mt-0.5" />
          <div className="text-xs font-light leading-relaxed">
            <span className="font-semibold text-amber-800">Operational Guideline:</span> The system runs of a client-side frame interval. You may activate both effects simultaneously or run separate cycles. Discharged particles fade and disappear cleanly as soon as they reach their respect coordinates off-screen.
          </div>
        </div>

      </main>

      {/* Decorative Prestige Footer */}
      <footer className="w-full text-center z-10 py-4 select-none">
        <div className="text-[10px] font-mono text-slate-400 tracking-wider uppercase">
          Visual Accents Console • Calibrated Presentation
        </div>
      </footer>

    </div>
  );
}
