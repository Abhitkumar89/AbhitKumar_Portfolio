import { useEffect, useRef } from "react";

/**
 * Realistic full-screen night sky.
 * Deep space gradient, milky-way haze, layered stars, soft twinkle, scroll parallax.
 */
export default function NightSkyBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let time = 0;
    let scrollY = 0;
    let stars = [];
    let milky = [];
    let asteroids = [];
    let showerQueue = [];
    let nextShowerAt = 2.2;
    let isNight = document.documentElement.classList.contains("dark");

    const syncTheme = () => {
      isNight = document.documentElement.classList.contains("dark");
      if (!isNight) {
        asteroids = [];
        showerQueue = [];
      }
    };

    const rand = (a, b) => a + Math.random() * (b - a);

    const spawnAsteroid = (opts = {}) => {
      const fromLeft = opts.fromLeft ?? Math.random() > 0.4;
      const startX =
        opts.x ??
        (fromLeft ? rand(-60, w * 0.75) : rand(w * 0.25, w + 60));
      const startY = opts.y ?? rand(-100, h * 0.2);
      const speed = opts.speed ?? rand(340, 680);
      const angle =
        opts.angle ??
        (fromLeft
          ? rand(0.4, 0.9)
          : rand(Math.PI - 0.9, Math.PI - 0.4));
      const length = opts.length ?? rand(65, 170);
      const thick = opts.thick ?? rand(1.1, 2.8);

      asteroids.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length,
        thick,
        life: 1,
        decay: opts.decay ?? rand(0.16, 0.3),
        warm: opts.warm ?? Math.random() > 0.5,
      });
    };

    /** Burst of 5–6 asteroids spread across the full screen. */
    const spawnShower = () => {
      const count = 5 + Math.floor(Math.random() * 2); // 5 or 6
      // Pick a global fall direction for this shower, but spawn points span whole width
      const fromLeft = Math.random() > 0.5;
      const baseAngle = fromLeft
        ? rand(0.45, 0.95)
        : rand(Math.PI - 0.95, Math.PI - 0.45);

      for (let i = 0; i < count; i++) {
        // Spread spawn X across entire screen (not clustered mid)
        const slot = i / Math.max(1, count - 1); // 0 → 1
        const spreadX = slot * w + rand(-w * 0.08, w * 0.08);
        const startX = Math.max(-80, Math.min(w + 80, spreadX));
        // Vary start height across top band / upper third
        const startY = rand(-120, h * 0.35);

        showerQueue.push({
          at: time + i * rand(0.05, 0.14),
          fromLeft,
          x: startX,
          y: startY,
          angle: baseAngle + rand(-0.18, 0.18),
          speed: rand(380, 760),
          length: rand(80, 190),
          thick: rand(1.2, 2.9),
          decay: rand(0.12, 0.26),
          warm: Math.random() > 0.45,
        });
      }

      // Extra loners so edges get coverage too
      for (let i = 0; i < 2; i++) {
        showerQueue.push({
          at: time + rand(0.2, 0.6),
          x: Math.random() < 0.5 ? rand(-60, w * 0.2) : rand(w * 0.8, w + 60),
          y: rand(-100, h * 0.45),
          angle: rand(0.35, Math.PI - 0.35),
          speed: rand(400, 720),
          length: rand(70, 160),
          thick: rand(1.1, 2.5),
          decay: rand(0.14, 0.28),
          warm: Math.random() > 0.5,
        });
      }
    };

    const updateAsteroids = (dt) => {
      if (!isNight) {
        asteroids = [];
        showerQueue = [];
        return;
      }

      if (time >= nextShowerAt) {
        spawnShower();
        nextShowerAt = time + rand(4.5, 8.5);
      }

      for (let i = showerQueue.length - 1; i >= 0; i--) {
        if (time >= showerQueue[i].at) {
          spawnAsteroid(showerQueue[i]);
          showerQueue.splice(i, 1);
        }
      }

      for (let i = asteroids.length - 1; i >= 0; i--) {
        const a = asteroids[i];
        a.x += a.vx * dt;
        a.y += a.vy * dt;
        a.life -= a.decay * dt;

        const off =
          a.x < -220 ||
          a.x > w + 220 ||
          a.y < -220 ||
          a.y > h + 220 ||
          a.life <= 0;
        if (off) asteroids.splice(i, 1);
      }
    };

    const drawAsteroids = () => {
      for (const a of asteroids) {
        const speed = Math.hypot(a.vx, a.vy) || 1;
        const ux = a.vx / speed;
        const uy = a.vy / speed;
        const tx = a.x - ux * a.length;
        const ty = a.y - uy * a.length;
        const alpha = Math.max(0, Math.min(1, a.life));

        // Long glowing trail
        const trail = ctx.createLinearGradient(tx, ty, a.x, a.y);
        if (a.warm) {
          trail.addColorStop(0, "rgba(255,120,40,0)");
          trail.addColorStop(0.45, `rgba(255,180,90,${0.25 * alpha})`);
          trail.addColorStop(0.85, `rgba(255,240,200,${0.75 * alpha})`);
          trail.addColorStop(1, `rgba(255,255,255,${alpha})`);
        } else {
          trail.addColorStop(0, "rgba(120,170,255,0)");
          trail.addColorStop(0.45, `rgba(160,200,255,${0.22 * alpha})`);
          trail.addColorStop(0.85, `rgba(230,240,255,${0.7 * alpha})`);
          trail.addColorStop(1, `rgba(255,255,255,${alpha})`);
        }

        ctx.strokeStyle = trail;
        ctx.lineWidth = a.thick;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(a.x, a.y);
        ctx.stroke();

        // Hot head
        const head = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, a.thick * 4);
        head.addColorStop(0, `rgba(255,255,255,${0.9 * alpha})`);
        head.addColorStop(
          0.4,
          a.warm
            ? `rgba(255,200,120,${0.45 * alpha})`
            : `rgba(200,220,255,${0.4 * alpha})`,
        );
        head.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = head;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.thick * 4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const rebuildStars = () => {
      const area = w * h;
      const count = Math.min(4500, Math.floor(area / 350));
      stars = [];

      for (let i = 0; i < count; i++) {
        const bright = Math.pow(Math.random(), 3.2); // few bright, many faint
        const mag = 0.35 + bright * 2.4;
        // Slight spectral tint
        const temp = Math.random();
        let r = 255;
        let g = 255;
        let b = 255;
        if (temp < 0.18) {
          // cool blue-white
          r = 190 + rand(0, 40);
          g = 210 + rand(0, 35);
          b = 255;
        } else if (temp > 0.82) {
          // warm yellow/orange
          r = 255;
          g = 210 + rand(0, 35);
          b = 160 + rand(0, 40);
        }

        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r,
          g,
          b,
          mag,
          twinkleSpeed: rand(0.6, 2.2),
          twinklePhase: rand(0, Math.PI * 2),
          layer: bright > 0.55 ? 2 : bright > 0.25 ? 1 : 0, // parallax depth
        });
      }

      // Soft milky-way dust patches
      milky = Array.from({ length: 90 }, () => ({
        x: rand(-w * 0.1, w * 1.1),
        y: rand(h * 0.15, h * 0.85),
        rx: rand(w * 0.08, w * 0.28),
        ry: rand(h * 0.03, h * 0.1),
        rot: rand(-0.5, 0.5),
        alpha: rand(0.02, 0.07),
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rebuildStars();
      asteroids = [];
      showerQueue = [];
      nextShowerAt = time + rand(1.2, 2.8);
    };

    const onScroll = () => {
      scrollY = window.scrollY || 0;
    };

    const drawSky = () => {
      if (isNight) {
        const sky = ctx.createLinearGradient(0, 0, 0, h);
        sky.addColorStop(0, "#03040a");
        sky.addColorStop(0.45, "#070b16");
        sky.addColorStop(1, "#020308");
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, w, h);

        const wash = ctx.createRadialGradient(
          w * 0.5,
          h * 1.05,
          0,
          w * 0.5,
          h * 1.05,
          h * 0.7,
        );
        wash.addColorStop(0, "rgba(20, 40, 80, 0.18)");
        wash.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = wash;
        ctx.fillRect(0, 0, w, h);
        return;
      }

      // Calm morning sunrise
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, "#a8d4f0");
      sky.addColorStop(0.28, "#f3c9a0");
      sky.addColorStop(0.55, "#f0b27a");
      sky.addColorStop(0.8, "#f7e0c8");
      sky.addColorStop(1, "#fff6ee");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      // Soft sun
      const sunX = w * 0.76;
      const sunY = h * 0.26;
      const sun = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, h * 0.4);
      sun.addColorStop(0, "rgba(255,255,255,0.95)");
      sun.addColorStop(0.12, "rgba(255,236,190,0.75)");
      sun.addColorStop(0.35, "rgba(240,178,122,0.3)");
      sun.addColorStop(1, "rgba(240,178,122,0)");
      ctx.fillStyle = sun;
      ctx.beginPath();
      ctx.arc(sunX, sunY, h * 0.4, 0, Math.PI * 2);
      ctx.fill();

      // Soft haze near horizon
      const haze = ctx.createLinearGradient(0, h * 0.55, 0, h);
      haze.addColorStop(0, "rgba(255,246,238,0)");
      haze.addColorStop(1, "rgba(255,240,225,0.55)");
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, w, h);
    };

    const drawMorningClouds = () => {
      if (isNight) return;
      for (const p of milky) {
        ctx.save();
        ctx.translate(p.x, p.y * 0.7 + 40);
        ctx.rotate(p.rot * 0.4);
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, p.rx);
        g.addColorStop(0, `rgba(255,255,255,${0.16 + p.alpha})`);
        g.addColorStop(0.55, `rgba(255,237,213,${0.08 + p.alpha * 0.5})`);
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.scale(1, (p.ry / p.rx) * 0.8);
        ctx.beginPath();
        ctx.arc(0, 0, p.rx, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    const drawMilkyWay = (parallax) => {
      if (!isNight) return;
      ctx.save();
      for (const p of milky) {
        ctx.save();
        ctx.translate(p.x, p.y + parallax * 0.15);
        ctx.rotate(p.rot);
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, p.rx);
        g.addColorStop(0, `rgba(160,175,220,${p.alpha})`);
        g.addColorStop(0.5, `rgba(100,120,180,${p.alpha * 0.45})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.scale(1, p.ry / p.rx);
        ctx.beginPath();
        ctx.arc(0, 0, p.rx, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.restore();
    };

    const drawStars = () => {
      if (!isNight) return;
      for (const s of stars) {
        const flicker =
          0.65 +
          0.35 * Math.sin(time * s.twinkleSpeed + s.twinklePhase) *
            (0.4 + s.mag * 0.2);
        const parallax = scrollY * (0.02 + s.layer * 0.035);
        const y = ((s.y + parallax) % (h + 20)) - 10;
        const alpha = Math.min(1, (0.25 + s.mag * 0.35) * flicker);

        if (s.mag > 1.6) {
          const glow = ctx.createRadialGradient(s.x, y, 0, s.x, y, s.mag * 3.2);
          glow.addColorStop(0, `rgba(${s.r},${s.g},${s.b},${0.22 * flicker})`);
          glow.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(s.x, y, s.mag * 3.2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = `rgba(${s.r},${s.g},${s.b},${alpha})`;
        const size = s.mag > 1.8 ? 1.6 : s.mag > 1.1 ? 1.15 : 0.8;
        ctx.fillRect(s.x, y, size, size);

        if (s.mag > 2.1 && flicker > 0.85) {
          ctx.globalAlpha = 0.35 * flicker;
          ctx.fillRect(s.x - s.mag, y + 0.4, s.mag * 2.2, 0.6);
          ctx.fillRect(s.x + 0.4, y - s.mag, 0.6, s.mag * 2.2);
          ctx.globalAlpha = 1;
        }
      }
    };

    let lastTs = performance.now();

    const tick = (ts) => {
      const dt = Math.min(0.05, (ts - lastTs) / 1000);
      lastTs = ts;
      time += dt;
      updateAsteroids(dt);
      drawSky();
      if (isNight) {
        drawMilkyWay(scrollY);
        drawStars();
        drawAsteroids();
      } else {
        drawMorningClouds();
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    onScroll();
    syncTheme();
    lastTs = performance.now();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    const themeObserver = new MutationObserver(syncTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-20 bg-ink"
    />
  );
}
