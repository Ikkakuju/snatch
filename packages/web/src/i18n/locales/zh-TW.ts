import type { Messages } from "./en";

export const zhTW: Messages = {
	language: {
		label: "語言",
	},
	errors: {
		generic: "發生錯誤，請再試一次。",
	},
	errorBoundary: {
		title: "發生錯誤",
		retry: "重試",
		reload: "重新載入頁面",
		details: "錯誤詳情",
	},
	seo: {
		homeTitle: "Snatch – 免費的 Mac 影片下載器 | snatchvideos",
		homeDescription:
			"Snatch 是一款免費開源的 Mac App，可將 YouTube、X、TikTok、Instagram、Bilibili 等數千個網站的影片下載為 MP4 或 MP3。",
	},
	home: {
		h1Suffix: "— 免費的 Mac 影片下載器",
		tagline: "在 Mac 上下載任何影片。",
		subtitle:
			"貼上來自 YouTube、X、TikTok、Instagram、Bilibili 或其他數千個網站的連結，Snatch 就會將它儲存為 MP4 或 MP3。免費且開源。",
		download: "下載 Mac 版",
		requirements: "macOS 14 或以上版本 · 僅支援 Apple 晶片",
		source: "在 GitHub 上查看原始碼",
		featuresTitle: "Snatch 能做什麼",
		features: [
			{
				title: "支援數千個網站",
				body: "以 yt-dlp 為基礎，支援超過 1,800 個網站，並會在網站改版時自動更新。",
			},
			{
				title: "畫質由你決定",
				body: "影片提供的每種解析度都能存成到處都能播放的 MP4，也可以只擷取音訊存成 MP3。",
			},
			{
				title: "暫停與繼續",
				body: "想排多少連結都可以。任何下載都能隨時暫停、稍後繼續，即使結束 App 也不受影響。",
			},
			{
				title: "需要登入的影片",
				body: "允許 Snatch 使用 Safari、Chrome 或 Firefox 的 Cookie，就能下載只有你的帳號才能觀看的影片。",
			},
			{
				title: "在你的 Mac 上執行",
				body: "影片直接從網站下載到你的「下載項目」檔案夾。中間沒有伺服器，不會上傳任何內容。",
			},
			{
				title: "免費開源",
				body: "採用 MIT 授權。不需帳號、沒有廣告，App 內也沒有任何追蹤。",
			},
		],
		firstOpenTitle: "第一次打開 Snatch",
		firstOpenBody:
			"Snatch 是免費軟體，未經 Apple 公證，因此 macOS 會阻擋第一次啟動。請將 Snatch 拖到「應用程式」檔案夾並打開一次，然後前往系統設定 → 隱私權與安全性，按一下「強制打開」。之後 Snatch 會提示安裝 yt-dlp，第一次儲存影片時再提示安裝 ffmpeg，共約 110 MB。",
		legal: "請只下載你有權保留的影片，並遵守各網站的使用條款。",
	},
};
