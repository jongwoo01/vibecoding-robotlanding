'use client';

import * as React from 'react';

type Vector2D = {
  x: number;
  y: number;
};

class Particle {
  pos: Vector2D = { x: 0, y: 0 };
  vel: Vector2D = { x: 0, y: 0 };
  acc: Vector2D = { x: 0, y: 0 };
  target: Vector2D = { x: 0, y: 0 };
  opacity = 0;
  targetOpacity = 1;
  maxSpeed = 6.4;
  maxForce = 0.24;
  size = 2.2;
  closeEnoughTarget = 80;
  isKilled = false;

  move() {
    let proximityMultiplier = 1;
    const distance = Math.hypot(this.pos.x - this.target.x, this.pos.y - this.target.y);

    if (distance < this.closeEnoughTarget) {
      proximityMultiplier = distance / this.closeEnoughTarget;
    }

    const desired = {
      x: this.target.x - this.pos.x,
      y: this.target.y - this.pos.y,
    };

    const magnitude = Math.hypot(desired.x, desired.y);
    if (magnitude > 0) {
      desired.x = (desired.x / magnitude) * this.maxSpeed * proximityMultiplier;
      desired.y = (desired.y / magnitude) * this.maxSpeed * proximityMultiplier;
    }

    const steer = {
      x: desired.x - this.vel.x,
      y: desired.y - this.vel.y,
    };

    const steerMagnitude = Math.hypot(steer.x, steer.y);
    if (steerMagnitude > 0) {
      steer.x = (steer.x / steerMagnitude) * this.maxForce;
      steer.y = (steer.y / steerMagnitude) * this.maxForce;
    }

    this.acc.x += steer.x;
    this.acc.y += steer.y;

    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.acc.x = 0;
    this.acc.y = 0;

    this.opacity += (this.targetOpacity - this.opacity) * 0.14;
  }

  draw(ctx: CanvasRenderingContext2D, color: string) {
    if (this.opacity <= 0.01) {
      return;
    }

    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = color;
    ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
    ctx.globalAlpha = 1;
  }

  kill(width: number, height: number) {
    if (this.isKilled) {
      return;
    }

    const randomPos = generateRandomPos(width * 0.5, height * 0.5, Math.max(width, height) * 0.7);
    this.target.x = randomPos.x;
    this.target.y = randomPos.y;
    this.targetOpacity = 0;
    this.isKilled = true;
  }
}

type ParticleHeadlineProps = {
  words: string[];
  className?: string;
  color?: string;
  intervalMs?: number;
};

const FONT_STACK = 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

function generateRandomPos(x: number, y: number, magnitude: number): Vector2D {
  const angle = Math.random() * Math.PI * 2;
  const distance = magnitude * (0.65 + Math.random() * 0.35);

  return {
    x: x + Math.cos(angle) * distance,
    y: y + Math.sin(angle) * distance,
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function ParticleHeadline({
  words,
  className = '',
  color = '#22283A',
  intervalMs = 3100,
}: ParticleHeadlineProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const particlesRef = React.useRef<Particle[]>([]);
  const animationFrameRef = React.useRef<number | null>(null);
  const wordIndexRef = React.useRef(0);
  const lastWordSwitchRef = React.useRef(0);
  const metricsRef = React.useRef({ width: 0, height: 0, dpr: 1, paddingX: 10, fontSize: 56 });

  React.useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || words.length === 0) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(Math.floor(rect.width), 1);
      const height = Math.max(Math.floor(rect.height), 1);
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const paddingX = clamp(width * 0.02, 8, 18);
      const baseFontSize = clamp(width * 0.14, 48, 108);

      metricsRef.current = {
        width,
        height,
        dpr,
        paddingX,
        fontSize: baseFontSize,
      };

      updateWord(words[wordIndexRef.current]);
    };

    const updateWord = (word: string) => {
      const { width, height, paddingX } = metricsRef.current;

      if (!width || !height) {
        return;
      }

      const offscreenCanvas = document.createElement('canvas');
      offscreenCanvas.width = width;
      offscreenCanvas.height = height;
      const offscreenContext = offscreenCanvas.getContext('2d');

      if (!offscreenContext) {
        return;
      }

      let fontSize = metricsRef.current.fontSize;
      offscreenContext.textBaseline = 'middle';
      offscreenContext.textAlign = 'left';

      do {
        offscreenContext.font = `800 ${fontSize}px ${FONT_STACK}`;
        fontSize -= 2;
      } while (fontSize > 36 && offscreenContext.measureText(word).width > width - paddingX * 2);

      metricsRef.current.fontSize = fontSize + 2;

      offscreenContext.clearRect(0, 0, width, height);
      offscreenContext.fillStyle = '#111111';
      offscreenContext.textBaseline = 'middle';
      offscreenContext.textAlign = 'left';
      offscreenContext.font = `800 ${metricsRef.current.fontSize}px ${FONT_STACK}`;
      offscreenContext.fillText(word, paddingX, height * 0.52);

      const imageData = offscreenContext.getImageData(0, 0, width, height);
      const pixels = imageData.data;
      const step = width < 420 ? 4 : 3;
      const activeParticles = particlesRef.current;
      let particleIndex = 0;

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          const alpha = pixels[index + 3];

          if (alpha < 80) {
            continue;
          }

          let particle: Particle;

          if (particleIndex < activeParticles.length) {
            particle = activeParticles[particleIndex];
          } else {
            particle = new Particle();
            const randomPos = generateRandomPos(width * 0.5, height * 0.5, Math.max(width, height) * 0.55);
            particle.pos.x = randomPos.x;
            particle.pos.y = randomPos.y;
            particle.opacity = 0;
            particle.size = width < 420 ? 1.9 : 2.3;
            particle.maxSpeed = 5.4 + Math.random() * 2.8;
            particle.maxForce = 0.16 + Math.random() * 0.1;
            activeParticles.push(particle);
          }

          particle.target.x = x;
          particle.target.y = y;
          particle.targetOpacity = 1;
          particle.isKilled = false;
          particleIndex += 1;
        }
      }

      for (let i = particleIndex; i < activeParticles.length; i += 1) {
        activeParticles[i].kill(width, height);
      }
    };

    const animate = (timestamp: number) => {
      const { width, height } = metricsRef.current;

      context.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const particle = particles[i];
        particle.move();
        particle.draw(context, color);

        if (
          particle.isKilled &&
          particle.opacity < 0.03 &&
          (particle.pos.x < -20 || particle.pos.x > width + 20 || particle.pos.y < -20 || particle.pos.y > height + 20)
        ) {
          particles.splice(i, 1);
        }
      }

      if (timestamp - lastWordSwitchRef.current > intervalMs) {
        wordIndexRef.current = (wordIndexRef.current + 1) % words.length;
        updateWord(words[wordIndexRef.current]);
        lastWordSwitchRef.current = timestamp;
      }

      animationFrameRef.current = window.requestAnimationFrame(animate);
    };

    resizeCanvas();
    lastWordSwitchRef.current = performance.now();
    animationFrameRef.current = window.requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [color, intervalMs, words]);

  return (
    <div ref={containerRef} className={className}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
