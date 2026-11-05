/** The mark alone. The name is the headline's job, not the lockup's. */
export function Logo({ className = "h-7" }: { className?: string }) {
	return <img src="/logo.svg" alt="" width={64} height={64} className={`w-auto ${className}`} />;
}
