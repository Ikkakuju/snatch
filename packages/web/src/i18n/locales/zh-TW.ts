import type { Messages } from "./en";

export const zhTW: Messages = {
	language: {
		label: "語言",
	},
	nav: {
		features: "功能特色",
		setup: "首次啟動",
		download: "下載",
		menu: "選單",
		skip: "跳至主要內容",
		issues: "問題回報",
	},
	errors: {
		generic: "發生錯誤，請再試一次。",
	},
	errorBoundary: {
		title: "發生錯誤",
		retry: "再試一次",
		reload: "重新載入頁面",
		details: "錯誤詳細資訊",
	},
	seo: {
		homeTitle: "Snatch – 免費的 Mac 影片下載器 | snatchvideos",
		homeDescription:
			"Snatch 是一款免費開源的 Mac 應用程式，可將 YouTube、X、TikTok、Instagram、Bilibili 等 1,800 個網站的影片下載為 MP4 或 MP3。",
	},
	home: {
		whatsNew: "新功能：內建瀏覽器",
		tagline: "貼上連結，\n即可儲存影片。",
		subtitle:
			"Snatch 能把 YouTube、X、TikTok、Instagram、Bilibili 以及其他 1,800 個網站的影片儲存到你的 Mac，格式支援 MP4 或 MP3。",
		download: "下載 Mac 版",
		requirements: "免費，適用於搭載 Apple 晶片且執行 macOS 14 或以上版本的 Mac。",
		unsignedNote: "未簽署版本：macOS 會在首次開啟時提示確認一次。",
		closingTitle: "貼上你的第一個連結。",
		stepsToggle: "查看操作步驟",
		demo: {
			get: "解析",
			downloadVideo: "下載影片",
			stream: "影片 1",
		},
		waysTitle: "兩種儲存影片的方式",
		ways: [
			{
				title: "貼上連結",
				body: "適用於 YouTube、X、TikTok、Instagram、Bilibili 以及 yt-dlp 支援的其他網站。Snatch 會列出影片提供的所有解析度，亦支援單獨擷取 MP3。",
			},
			{
				title: "開啟網頁",
				body: "適用於其他所有網站。在 Snatch 內建瀏覽器中開啟網頁並播放影片，Snatch 會自動辨識串流並儲存，直接沿用你目前的登入狀態。",
			},
		],
		featuresTitle: "特色細節",
		features: [
			{
				title: "隨處皆可播放的 MP4",
				body: "影片儲存為相容性極佳的 H.264 與 AAC 編碼，可在 QuickTime 和 iPhone 上直接順暢播放。也可以只保留音訊存為 MP3。",
			},
			{
				title: "隨時暫停、關閉，稍後繼續",
				body: "支援多個任務同時下載。暫停任一任務或結束 Snatch，下次啟動都會從中斷處斷點續傳。",
			},
			{
				title: "沿用你的登入狀態",
				body: "只有特定帳號才能觀看的私人影片也能下載：直接在內建瀏覽器中登入，或允許 Snatch 讀取 Safari、Chrome 或 Firefox 的登入狀態與 Cookie。",
			},
			{
				title: "資料絕不離開你的 Mac",
				body: "影片直接從來源網站存入你的「下載項目」檔案夾。無中繼伺服器，無需註冊帳號，絕不追蹤使用者資料。",
			},
			{
				title: "完全開源",
				body: "採用 MIT 開源授權，原始碼託管於 GitHub。核心引擎 yt-dlp 每日自動更新，隨時跟進各網站變更。",
			},
			{
				title: "關於不支援的受限內容",
				body: "受 DRM 數位版權保護的串流（如 Netflix、Disney+ 等）因加密限制無法儲存。若網頁使用了此類保護，Snatch 會主動提示你。",
			},
		],
		firstOpenIntro:
			"Snatch 是一款免費開源軟體，未經 Apple 公證，因此 macOS 在首次開啟時需要確認一次。",
		firstOpenSteps: [
			"開啟 Snatch.dmg，將 Snatch 拖移至「應用程式」檔案夾。",
			"開啟 Snatch。當 macOS 提示無法確認開發者身分時，按一下「完成」。",
			"前往「系統設定」→「隱私權與安全性」，按一下「強制打開」。",
			"Snatch 會提示安裝 yt-dlp（約 55 MB）。首次儲存影片時，還會提示安裝 ffmpeg。",
		],
		legal: "請僅下載你有合法保留權限的影片，並嚴格遵守各網站的使用條款。",
	},
};
