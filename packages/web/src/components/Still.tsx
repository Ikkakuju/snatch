/** A still as a violet duotone, so the photographs sit inside the page's palette. */
export function Still({ src, className = "" }: { src: string; className?: string }) {
	return (
		<span className={`relative block overflow-hidden bg-brand/80 ${className}`}>
			<img
				src={src}
				alt=""
				className="h-full w-full object-cover opacity-90 mix-blend-luminosity grayscale brightness-[0.78] contrast-[1.08]"
			/>
		</span>
	);
}
