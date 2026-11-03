import type { Messages } from "./en";

export const zhCN: Messages = {
	language: {
		label: "语言",
	},
	errors: {
		generic: "出了点问题，请重试。",
	},
	errorBoundary: {
		title: "出错了",
		retry: "重试",
		reload: "重新加载页面",
		details: "错误详情",
	},
	seo: {
		homeTitle: "Snatch – 免费的 Mac 视频下载器 | snatchvideos",
		homeDescription:
			"Snatch 是一款免费开源的 Mac 应用，可将 YouTube、X、TikTok、Instagram、Bilibili 等数千个网站的视频下载为 MP4 或 MP3。",
	},
	home: {
		h1Suffix: "— 免费的 Mac 视频下载器",
		tagline: "在 Mac 上下载任何视频。",
		subtitle:
			"粘贴来自 YouTube、X、TikTok、Instagram、Bilibili 或其他数千个网站的链接，Snatch 就会把它保存为 MP4 或 MP3。免费且开源。",
		download: "下载 Mac 版",
		requirements: "macOS 14 或更高版本 · 仅支持 Apple 芯片",
		source: "在 GitHub 上查看源代码",
		featuresTitle: "Snatch 能做什么",
		features: [
			{
				title: "支持数千个网站",
				body: "基于 yt-dlp 构建，支持 1,800 多个网站，并会在网站变化时自动更新。",
			},
			{
				title: "画质随你选",
				body: "视频提供的每种分辨率都可保存为随处可播的 MP4，也可以只提取音频保存为 MP3。",
			},
			{
				title: "暂停与继续",
				body: "想排多少链接都行。任何下载都能随时暂停，稍后继续，即使退出应用也不受影响。",
			},
			{
				title: "需要登录的视频",
				body: "允许 Snatch 使用 Safari、Chrome 或 Firefox 的 Cookie，下载只有你的账号才能看的视频。",
			},
			{
				title: "在你的 Mac 上运行",
				body: "视频直接从网站下载到你的“下载”文件夹。中间没有服务器，不会上传任何内容。",
			},
			{
				title: "免费开源",
				body: "采用 MIT 许可证。无需账号，没有广告，应用内没有任何跟踪。",
			},
		],
		firstOpenTitle: "首次打开 Snatch",
		firstOpenBody:
			"Snatch 是免费软件，未经 Apple 公证，因此 macOS 会阻止首次启动。请将 Snatch 拖到“应用程序”文件夹并打开一次，然后前往系统设置 → 隐私与安全性，点按「仍要打开」。之后 Snatch 会提示安装 yt-dlp，首次保存视频时再提示安装 ffmpeg，共约 110 MB。",
		legal: "请只下载你有权保留的视频，并遵守各网站的条款。",
	},
};
