/** The mark plus the "snatchvideos" wordmark; one size everywhere, scaled by font size. */
export function Logo() {
	return (
		<span className="inline-flex items-center gap-[0.2em] font-['Outfit'] font-extrabold tracking-tight text-[2rem] sm:text-5xl">
			<img src="/logo.svg" alt="" width={64} height={64} className="h-[1.6em] w-auto" />
			<span>
				snatch<span className="text-[#412ffa]">videos</span>
			</span>
		</span>
	);
}
