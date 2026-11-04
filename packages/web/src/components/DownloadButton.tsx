import { AppleLogo } from "@phosphor-icons/react";
import type { ReactNode } from "react";
import { DOWNLOAD_URL } from "../config";

/** The page's one saturated surface: the action that puts the app on the Mac. */
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
			className={`label inline-flex items-center justify-center gap-2 rounded-full bg-brand text-black transition-colors hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${className}`}
		>
			{/* Outline weights read at 16px; the filled mark turns into a blob. */}
			<AppleLogo weight="bold" className="h-4 w-4 shrink-0" aria-hidden="true" />
			{children}
		</a>
	);
}
