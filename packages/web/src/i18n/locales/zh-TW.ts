import type { Messages } from "./en";

export const zhTW: Messages = {
	language: {
		label: "語言",
	},
	nav: {
		features: "使用方式",
		setup: "首次啟動",
		download: "下載",
		menu: "選單",
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
		whatsNew: "新功能：內建瀏覽器",
		tagline: "貼上連結，留下影片。",
		subtitle:
			"Snatch 能把 YouTube、X、TikTok、Instagram、Bilibili 以及其他 1,800 個網站的影片存到你的 Mac，格式為 MP4 或 MP3。其他網頁可以在內建瀏覽器中打開，儲存正在播放的影片。",
		download: "下載 Mac 版",
		requirements: "免費，適用於搭載 Apple silicon 的 macOS 14 或以上版本。",
		source: "在 GitHub 上查看原始碼",
		waysTitle: "兩種儲存影片的方式",
		ways: [
			{
				title: "貼上連結",
				body: "適用於 YouTube、X、TikTok、Instagram、Bilibili 以及 yt-dlp 支援的其他網站。Snatch 會列出影片提供的所有解析度，另有 MP3。",
			},
			{
				title: "打開網頁",
				body: "適用於其他所有網站。在 Snatch 裡打開網頁並播放影片，Snatch 會偵測串流並儲存下來，登入狀態和你一樣。",
			},
		],
		featuresTitle: "細節",
		features: [
			{
				title: "到處都能播的 MP4",
				body: "影片儲存為 H.264 和 AAC，可在 QuickTime 和 iPhone 上直接打開。也可以只保留音訊，存成 MP3。",
			},
			{
				title: "暫停、結束，稍後繼續",
				body: "一次同時下載兩個。暫停其中一個或結束 Snatch，之後會從中斷處繼續。",
			},
			{
				title: "沿用你的登入",
				body: "只有你的帳號能看的影片也能下載：在內建瀏覽器中登入，或讓 Snatch 使用 Safari、Chrome 或 Firefox 的登入資訊。",
			},
			{
				title: "資料不離開你的 Mac",
				body: "影片直接從網站存進你的「下載項目」檔案夾。沒有 Snatch 伺服器，不需帳號，沒有追蹤。",
			},
			{
				title: "開放原始碼",
				body: "採用 MIT 授權，程式碼在 GitHub 上。底層引擎 yt-dlp 每天更新，緊跟網站變化。",
			},
			{
				title: "無法儲存的內容",
				body: "Netflix、Disney+ 等有防拷保護的串流始終是加密的。網頁使用這類保護時，Snatch 會告訴你。",
			},
		],
		firstOpenTitle: "第一次打開 Snatch",
		firstOpenIntro: "Snatch 是免費軟體，未經 Apple 公證，因此 macOS 會要求你確認一次。",
		firstOpenSteps: [
			"打開 Snatch.dmg，將 Snatch 拖到「應用程式」。",
			"打開 Snatch。當 macOS 提示無法檢查它時，按一下「完成」。",
			"在系統設定 → 隱私權與安全性中，按一下「強制打開」。",
			"Snatch 會提示安裝 yt-dlp（約 55 MB）。第一次儲存影片時，還會提示安裝 ffmpeg。",
		],
		legal: "請只下載你有權保留的影片，並遵守各網站的使用條款。",
	},
};
