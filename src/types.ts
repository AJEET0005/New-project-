/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type EffectType = 'snowflakes' | 'balloons';

export interface Particle {
  id: string;
  type: EffectType;
  x: number;          // Horizontal start position as percentage (0 to 100)
  size: number;       // Diameter/dimension in pixels (calibrated as medium)
  duration: number;   // Duration of travel animation in seconds
  delay: number;      // Small onset delay
  drift: number;      // Sway offset amplitude (translation on X axis)
  rotateSpeed: number;// Custom spin speed/swing
  variantIndex: number; // Selected design variant (0, 1, or 2 for diverse looks)
  colorIndex: number;  // Selected color scheme variant (especially for balloons)
}
