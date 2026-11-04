import { useEffect, useRef } from "react";

/**
 * The page's backdrop: a planet limb filling the upper-right corner — a violet dust
 * surface, a cyan rim, sparse stars in the void — drawn on a canvas because it has to
 * rescale with the viewport and read as a photograph of something, not as a gradient.
 * Decorative only: the parent marks it hidden from assistive tech.
 */
export function Backdrop({ className = "" }: { className?: string }) {
	const ref = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = ref.current;
		const context = canvas?.getContext("2d");
		if (!canvas || !context) return;

		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
		const surface = document.createElement("canvas");
		const surfaceContext = surface.getContext("2d");
		if (!surfaceContext) return;

		let width = 0;
		let height = 0;
		let cx = 0;
		let cy = 0;
		let radius = 0;
		let frame = 0;
		let angle = 0;

		type Star = { x: number; y: number; r: number; alpha: number; glow: boolean };
		let stars: Star[] = [];

		/** A limb in the top-right corner: it must clear the centred headline. */
		const geometry = () => {
			cx = width * 1.1;
			cy = -width * 0.3;
			radius = width * 0.5;
		};

		const seedStars = () => {
			const count = Math.round((width * height) / 2600);
			stars = Array.from({ length: count }, () => {
				let x = Math.random() * width;
				let y = Math.random() * height;
				// Keep the void a void: no stars on the planet's face.
				for (let tries = 0; tries < 8 && Math.hypot(x - cx, y - cy) < radius; tries += 1) {
					x = Math.random() * width;
					y = Math.random() * height;
				}
				const bright = Math.random();
				return {
					x,
					y,
					r: 0.5 + bright * 1.1,
					alpha: 0.12 + bright * 0.42,
					glow: bright > 0.93,
				};
			});
		};

		const paintSurface = () => {
			surface.width = Math.round(width);
			surface.height = Math.round(height);
			surfaceContext.clearRect(0, 0, width, height);

			// Uniform over the visible disc, so the density is set by the canvas area and
			// not by how much of a much larger circle happens to fall inside it.
			const motes = Math.round(width * height * 0.012);
			const left = Math.max(0, cx - radius);
			const right = Math.min(width, cx + radius);
			const top = Math.max(0, cy - radius);
			const bottom = Math.min(height, cy + radius);
			let placed = 0;
			for (let tries = 0; placed < motes && tries < motes * 4; tries += 1) {
				const x = left + Math.random() * (right - left);
				const y = top + Math.random() * (bottom - top);
				const depth = radius - Math.hypot(x - cx, y - cy);
				if (depth < 0) continue;
				placed += 1;

				const closeness = 1 - Math.min(1, depth / (radius * 0.9));
				const roll = Math.random();
				if (closeness > 0.94 && roll > 0.35) {
					// The bright band hugging the limb.
					surfaceContext.fillStyle = `rgba(203, 242, 255, ${0.35 + Math.random() * 0.5})`;
				} else if (roll > 0.55) {
					surfaceContext.fillStyle = `rgba(196, 181, 253, ${0.1 + closeness * 0.55})`;
				} else if (roll > 0.22) {
					surfaceContext.fillStyle = `rgba(168, 85, 247, ${0.08 + closeness * 0.5})`;
				} else {
					surfaceContext.fillStyle = `rgba(217, 70, 239, ${0.05 + closeness * 0.4})`;
				}
				const size = closeness > 0.8 ? 1.4 : 1;
				surfaceContext.fillRect(x, y, size, size);
			}
		};

		/** Short streaks running inward from the limb, the way a lit atmosphere bleeds. */
		const paintStreaks = (ctx: CanvasRenderingContext2D) => {
			for (let i = 0; i < 46; i += 1) {
				const theta = Math.random() * Math.PI * 2;
				const length = 8 + Math.random() * 44;
				const start = radius - 3;
				const x1 = cx + Math.cos(theta) * start;
				const y1 = cy + Math.sin(theta) * start;
				const x2 = cx + Math.cos(theta) * (start - length);
				const y2 = cy + Math.sin(theta) * (start - length);
				if (Math.max(x1, y1) < 0 || Math.min(x1, y1) > width) continue;
				ctx.strokeStyle = `rgba(214, 240, 255, ${0.06 + Math.random() * 0.16})`;
				ctx.lineWidth = 0.6;
				ctx.beginPath();
				ctx.moveTo(x1, y1);
				ctx.lineTo(x2, y2);
				ctx.stroke();
			}
		};

		const paintRim = () => {
			const gradient = context.createLinearGradient(width * 0.3, 0, width, height * 0.85);
			gradient.addColorStop(0, "rgba(150, 240, 255, 0.9)");
			gradient.addColorStop(0.5, "rgba(214, 250, 255, 1)");
			gradient.addColorStop(1, "rgba(120, 226, 245, 0.75)");

			context.save();
			context.strokeStyle = gradient;
			context.shadowColor = "rgba(122, 231, 245, 0.75)";
			context.shadowBlur = 18;
			context.lineWidth = 1.6;
			context.beginPath();
			context.arc(cx, cy, radius, 0, Math.PI * 2);
			context.stroke();
			context.shadowBlur = 0;
			context.lineWidth = 6;
			context.globalAlpha = 0.18;
			context.stroke();
			context.restore();
		};

		const paintFrame = () => {
			context.clearRect(0, 0, width, height);

			for (const star of stars) {
				context.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
				if (star.glow) {
					context.save();
					context.shadowColor = "rgba(200, 225, 255, 0.8)";
					context.shadowBlur = 6;
					context.beginPath();
					context.arc(star.x, star.y, star.r, 0, Math.PI * 2);
					context.fill();
					context.restore();
				} else {
					context.fillRect(star.x, star.y, star.r, star.r);
				}
			}

			paintStreaks(context);

			// The surface turns under a fixed rim, so only the dust is redrawn rotated.
			context.save();
			context.translate(cx, cy);
			context.rotate(angle);
			context.translate(-cx, -cy);
			context.drawImage(surface, 0, 0);
			context.restore();

			paintRim();
		};

		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			width = canvas.clientWidth;
			height = canvas.clientHeight;
			if (!width || !height) return;
			canvas.width = Math.round(width * dpr);
			canvas.height = Math.round(height * dpr);
			context.setTransform(dpr, 0, 0, dpr, 0, 0);
			geometry();
			seedStars();
			paintSurface();
			paintFrame();
		};

		let previous = performance.now();
		const tick = (time: number) => {
			const delta = Math.min(80, time - previous);
			previous = time;
			angle += (delta / 1000) * 0.02;
			paintFrame();
			frame = requestAnimationFrame(tick);
		};

		const start = () => {
			if (reduced.matches) {
				paintFrame();
				return;
			}
			previous = performance.now();
			frame = requestAnimationFrame(tick);
		};
		const onResize = () => {
			cancelAnimationFrame(frame);
			resize();
			start();
		};
		const onMotionChange = () => {
			cancelAnimationFrame(frame);
			start();
		};
		const onVisibility = () => {
			cancelAnimationFrame(frame);
			if (!document.hidden) start();
		};

		const observer = new ResizeObserver(onResize);
		observer.observe(canvas);
		resize();
		start();
		window.addEventListener("resize", onResize);
		document.addEventListener("visibilitychange", onVisibility);
		reduced.addEventListener("change", onMotionChange);
		return () => {
			cancelAnimationFrame(frame);
			observer.disconnect();
			window.removeEventListener("resize", onResize);
			document.removeEventListener("visibilitychange", onVisibility);
			reduced.removeEventListener("change", onMotionChange);
		};
	}, []);

	return <canvas ref={ref} className={className} />;
}
