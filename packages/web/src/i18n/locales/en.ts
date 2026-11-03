export const en = {
	language: {
		label: "Language",
	},
	nav: {
		features: "How it works",
		setup: "First launch",
		download: "Download",
		menu: "Menu",
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
		whatsNew: "New: the built-in browser",
		tagline: "Paste a link. Keep the video.",
		subtitle:
			"Snatch saves video from YouTube, X, TikTok, Instagram, Bilibili and 1,800 other sites to your Mac, as MP4 or MP3. For any other page, open it in the built-in browser and save what it plays.",
		download: "Download for Mac",
		requirements: "Free, for macOS 14 or later on Apple silicon.",
		source: "Source code on GitHub",
		waysTitle: "Two ways to save a video",
		ways: [
			{
				title: "Paste a link",
				body: "For YouTube, X, TikTok, Instagram, Bilibili and the other sites yt-dlp knows. Snatch lists every resolution the video comes in, plus MP3.",
			},
			{
				title: "Open the page",
				body: "For everything else. Browse to the page inside Snatch and play the video. Snatch spots the stream and saves it, signed in as you are.",
			},
		],
		featuresTitle: "The details",
		features: [
			{
				title: "MP4 that plays everywhere",
				body: "Video is saved as H.264 and AAC, so it opens in QuickTime and on iPhone. Or keep only the audio, as MP3.",
			},
			{
				title: "Pause, quit, pick up later",
				body: "Downloads run two at a time. Pause one or quit Snatch, and it carries on where it stopped.",
			},
			{
				title: "Your sign-ins",
				body: "Videos only your account can see download too: sign in inside the built-in browser, or let Snatch use Safari, Chrome or Firefox.",
			},
			{
				title: "Nothing leaves your Mac",
				body: "Video goes straight from the site to your Downloads folder. No Snatch server, no account, no tracking.",
			},
			{
				title: "Open source",
				body: "MIT licensed, on GitHub. yt-dlp, the engine underneath, is updated every day as sites change.",
			},
			{
				title: "What it can't save",
				body: "Copy-protected streams, like Netflix or Disney+, stay encrypted. Snatch tells you when a page uses them.",
			},
		],
		firstOpenTitle: "Opening Snatch the first time",
		firstOpenIntro:
			"Snatch is free and not notarized by Apple, so macOS asks you to confirm it once.",
		firstOpenSteps: [
			"Open Snatch.dmg and drag Snatch to Applications.",
			"Open Snatch. When macOS says it can't check it, click Done.",
			"In System Settings → Privacy & Security, click Open Anyway.",
			"Snatch asks to install yt-dlp, about 55 MB. The first time you save a video, it asks for ffmpeg too.",
		],
		legal: "Only download videos you have the right to keep, and respect each site's terms.",
	},
};

/** Every dictionary must implement this shape; a missing key fails the typecheck. */
export type Messages = typeof en;
