/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface SnowflakeProps {
  variantIndex: number;
  size: number;
}

export const SnowflakeVector: React.FC<SnowflakeProps> = ({ variantIndex, size }) => {
  // 3 distinct elegant vector configurations to make flakes look mathematically unique and stunning
  const renderPaths = () => {
    switch (variantIndex % 3) {
      case 0:
        // Elegant starry branching dendrite snowflake
        return (
          <>
            {/* 6 primary spokes */}
            <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="5" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="5" y1="19" x2="19" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            
            {/* Fine secondary chevron branchings */}
            <path d="M12 5l3 3M12 5l-3 3M12 19l3-3M12 19l-3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M5 12l3 3M5 12l3-3M19 12l-3 3M19 12l-3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="12" cy="12" r="1.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </>
        );
      case 1:
        // Multi-branch crystalline ice stellar flake
        return (
          <>
            <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="3.3" y1="7" x2="20.7" y2="17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="3.3" y1="17" x2="20.7" y2="7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            
            {/* Stellar branch ends */}
            <path d="M12 2l-2 2M12 2l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 22l-2-2M12 22l2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M3.3 7l1 3 M3.3 7l3-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20.7 17l-1-3 M20.7 17l-3 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            
            {/* Central ornate ring */}
            <polygon points="12,8 15.5,10 15.5,14 12,16 8.5,14 8.5,10" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </>
        );
      case 2:
      default:
        // Geometric simple stellar plate with diamond-like pointers
        return (
          <>
            <line x1="12" y1="3" x2="12" y2="21" stroke="currentColor" strokeWidth="1.2" />
            <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.2" />
            <path d="M12 3l-4 4h8z M12 21l-4-4h8z" fill="currentColor" opacity="0.15" />
            <path d="M3 12l4-4v8z M21 12l-4-4v8z" fill="currentColor" opacity="0.15" />
            {/* Structural spokes */}
            <path d="M7 7l10 10 M7 17l10-10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </>
        );
    }
  };

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className="text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.8)] filter opacity-85 hover:opacity-100 transition-opacity"
      style={{
        color: variantIndex % 3 === 0 ? '#E0F2FE' : variantIndex % 3 === 1 ? '#F0F9FF' : '#FFFFFF',
      }}
    >
      {renderPaths()}
    </svg>
  );
};


interface BalloonProps {
  colorIndex: number;
  variantIndex: number;
  size: number;
}

export const BalloonVector: React.FC<BalloonProps> = ({ colorIndex, variantIndex, size }) => {
  // Rich, elegant premium color combinations that look majestic and formal
  // Custom linear gradients are constructed for every balloon to ensure a high-end 3D metallic feel
  const getGradientColors = () => {
    switch (colorIndex % 5) {
      case 0:
        // Burgundy / Crimson Velvet
        return { start: '#881337', end: '#E11D48', highlight: '#FCA5A5' };
      case 1:
        // Satin Champagne / Soft Gold
        return { start: '#78350F', end: '#D97706', highlight: '#FDE68A' };
      case 2:
        // Royal Sapphire Blue
        return { start: '#1E3A8A', end: '#3B82F6', highlight: '#93C5FD' };
      case 3:
        // Forest Balsam Green
        return { start: '#064E3B', end: '#10B981', highlight: '#A7F3D0' };
      case 4:
      default:
        // Imperial Velvet Plum
        return { start: '#4C1D95', end: '#8B5CF6', highlight: '#DDD6FE' };
    }
  };

  const colors = getGradientColors();
  const gradId = `balloonGrad-${colorIndex}-${variantIndex}-${size}`;

  // Balloon shapes: subtle variance
  const widthRatio = variantIndex % 3 === 0 ? 0.85 : variantIndex % 3 === 1 ? 0.95 : 0.9;
  const heightRatio = variantIndex % 3 === 0 ? 1.15 : variantIndex % 3 === 1 ? 1.05 : 1.1;

  const actualWidth = size * widthRatio;
  const actualHeight = size * heightRatio;

  return (
    <div className="relative flex flex-col items-center select-none" style={{ width: actualWidth }}>
      {/* Balloon Body */}
      <svg
        viewBox="0 0 100 120"
        width={actualWidth}
        height={actualHeight}
        className="drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)] filter"
      >
        <defs>
          {/* Radial or linear gradient for volumetric look */}
          <radialGradient id={gradId} cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor={colors.highlight} />
            <stop offset="45%" stopColor={colors.end} />
            <stop offset="100%" stopColor={colors.start} />
          </radialGradient>
        </defs>

        {/* Elegant Teardrop Balloon main body */}
        <path
          d="M 50 10 
             C 85 10, 95 45, 88 75 
             C 82 98, 56 108, 50 112 
             C 44 108, 18 98, 12 75 
             C  5 45, 15 10, 50 10 Z"
          fill={`url(#${gradId})`}
        />

        {/* Dynamic elegant gloss reflection curve (gives glass-like shine) */}
        <path
          d="M 28 22 
             C 18 35, 18 55, 24 64
             C 25 66, 22 66, 21 64
             C 15 54, 15 35, 25 21
             C 26 19, 29 20, 28 22 Z"
          fill="#FFFFFF"
          opacity="0.35"
        />

        {/* Subtle circular glare highlight near top-left */}
        <circle cx="35" cy="30" r="6" fill="#FFFFFF" opacity="0.4" />

        {/* Tie Knot at base */}
        <path
          d="M 45 110 L 55 110 L 52 115 L 48 115 Z"
          fill={colors.start}
        />
      </svg>

      {/* Hanging Curly String (Handcrafting visually elegant string element) */}
      <svg
        viewBox="0 0 20 60"
        width={16}
        height={48}
        className="pointer-events-none -mt-1 opacity-70"
      >
        <path
          // Elegant sine wave string path starting from center top
          d="M 10 0 C 12 10, 4 15, 6 25 C 8 35, 14 40, 10 50 C 8 55, 10 58, 10 60"
          fill="none"
          stroke="#94A3B8"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
