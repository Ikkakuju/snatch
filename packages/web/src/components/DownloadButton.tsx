import { Apple } from "lucide-react";
import type { ReactNode } from "react";
import { DOWNLOAD_URL } from "../config";

/** The page's one gradient, the logo's, on its one action: downloading the app. */
export function DownloadButton({
	className,
	label,
	children,
}: {
	className: string;
	label?: string;
	children: ReactNode;
}) {
	return (
		<a
			href={DOWNLOAD_URL}
			aria-label={label}
			className={`inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,#2f52ff,#6d4bff_55%,#8b4cf4)] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-[filter] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${className}`}
		>
			<Apple className="h-[1.15em] w-[1.15em]" aria-hidden="true" />
			{children}
		</a>
	);
}
