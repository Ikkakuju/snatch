export const en = {
	language: {
		label: "Language",
	},
	errors: {
		generic: "Something went wrong. Try again.",
	},
	errorBoundary: {
		title: "Something went wrong",
		retry: "Try again",
		reload: "Reload page",
		details: "Error details",
	},
	seo: {
		homeTitle: "Snatch – Free Video Downloader for Mac | snatchvideos",
		homeDescription:
			"Snatch is a free, open-source Mac app that downloads video from YouTube, X, TikTok, Instagram, Bilibili and thousands of other sites as MP4 or MP3.",
	},
	home: {
		h1Suffix: "— free video downloader for Mac",
		tagline: "Download any video on your Mac.",
		subtitle:
			"Paste a link from YouTube, X, TikTok, Instagram, Bilibili or thousands of other sites, and Snatch saves it as MP4 or MP3. Free and open source.",
		download: "Download for Mac",
		requirements: "macOS 14 or later · Apple silicon",
		source: "Source code on GitHub",
		featuresTitle: "What Snatch does",
		features: [
			{
				title: "Thousands of sites",
				body: "Built on yt-dlp, which knows more than 1,800 sites and updates itself as they change.",
			},
			{
				title: "Your choice of quality",
				body: "Every resolution the video offers, saved as an MP4 that plays everywhere, or the audio alone as MP3.",
			},
			{
				title: "Pause and resume",
				body: "Queue as many links as you like. Pause any download and pick it up later, even after quitting.",
			},
			{
				title: "Videos behind a sign-in",
				body: "Let Snatch use your Safari, Chrome or Firefox cookies for videos only your account can see.",
			},
			{
				title: "Runs on your Mac",
				body: "Downloads go straight from the site to your Downloads folder. No server in between, nothing uploaded.",
			},
			{
				title: "Free and open source",
				body: "MIT licensed. No account, no ads, no tracking in the app.",
			},
		],
		firstOpenTitle: "Opening Snatch for the first time",
		firstOpenBody:
			"Snatch is free and not notarized by Apple, so macOS stops the first launch. Drag Snatch to Applications and open it once, then go to System Settings → Privacy & Security and click Open Anyway. Snatch then asks to install yt-dlp, and ffmpeg when you first save a video, about 110 MB in all.",
		legal: "Only download videos you have the right to keep, and respect each site's terms.",
	},
};

/** Every dictionary must implement this shape; a missing key fails the typecheck. */
export type Messages = typeof en;
