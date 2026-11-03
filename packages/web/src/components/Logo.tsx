/** The mark plus the "snatchvideos" wordmark; one size everywhere, scaled by font size. */
export function Logo({ className = "text-[2rem] sm:text-5xl" }: { className?: string }) {
	return (
		<span
			className={`inline-flex items-center gap-[0.2em] font-['Outfit'] font-extrabold tracking-tight ${className}`}
		>
			<img src="/logo.svg" alt="" width={64} height={64} className="h-[1.6em] w-auto" />
			<span className="max-[379px]:hidden">
				snatch<span className="text-brand">videos</span>
			</span>
		</span>
	);
}
