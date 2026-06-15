/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Particle } from '../types';
import { SnowflakeVector, BalloonVector } from './ParticleRenderers';

interface ParticleCanvasProps {
  particles: Particle[];
  onRemoveParticle: (id: string) => void;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ particles, onRemoveParticle }) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[40]">
      <AnimatePresence mode="popLayout">
        {particles.map((particle) => {
          const isSnow = particle.type === 'snowflakes';

          if (isSnow) {
            // Snowflake falling journey
            return (
              <motion.div
                key={particle.id}
                initial={{ 
                  y: '-10vh', 
                  x: 0,
                  opacity: 0, 
                  rotate: particle.rotateSpeed * 45 
                }}
                animate={{ 
                  y: '105vh',
                  // Gentle undulating sway back and forth
                  x: [0, particle.drift, -particle.drift, 0],
                  opacity: [0, 0.9, 0.9, 0],
                  rotate: [
                    particle.rotateSpeed * 45, 
                    particle.rotateSpeed * 45 + (particle.rotateSpeed > 0 ? 360 : -360)
                  ],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: particle.duration,
                  ease: 'linear',
                  delay: particle.delay,
                  times: [0, 0.15, 0.85, 1],
                }}
                onAnimationComplete={() => onRemoveParticle(particle.id)}
                className="absolute"
                style={{
                  left: `${particle.x}%`,
                  // To avoid layout shifts during complex animations
                  willChange: 'transform, opacity',
                }}
              >
                <SnowflakeVector variantIndex={particle.variantIndex} size={particle.size} />
              </motion.div>
            );
          } else {
            // Balloon floating rising journey
            return (
              <motion.div
                key={particle.id}
                initial={{ 
                  y: '110vh', 
                  x: 0,
                  opacity: 0, 
                  scale: 0.8,
                  rotate: 0 
                }}
                animate={{ 
                  y: '-25vh',
                  // Soft floating sway wave
                  x: [0, particle.drift, -particle.drift * 0.7, 0],
                  opacity: [0, 1, 1, 0],
                  // Delicate rotational tilt to mimic air current wiggling
                  rotate: [0, particle.rotateSpeed * 8, -particle.rotateSpeed * 6, 0],
                  // Subtle visual flexing scales as if reacting gas-expanded under atmospheric ascent
                  scale: [1, 1.04, 0.96, 1],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: particle.duration,
                  ease: 'easeInOut',
                  delay: particle.delay,
                  times: [0, 0.08, 0.92, 1],
                }}
                onAnimationComplete={() => onRemoveParticle(particle.id)}
                className="absolute"
                style={{
                  left: `${particle.x}%`,
                  willChange: 'transform, opacity',
                }}
              >
                <BalloonVector 
                  variantIndex={particle.variantIndex} 
                  colorIndex={particle.colorIndex} 
                  size={particle.size} 
                />
              </motion.div>
            );
          }
        })}
      </AnimatePresence>
    </div>
  );
};
