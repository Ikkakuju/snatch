import type { Messages } from "./en";

export const zhCN: Messages = {
	language: {
		label: "语言",
	},
	nav: {
		features: "使用方法",
		setup: "首次启动",
		download: "下载",
		menu: "菜单",
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
		whatsNew: "新功能：内置浏览器",
		tagline: "粘贴链接，留下视频。",
		subtitle:
			"Snatch 能把 YouTube、X、TikTok、Instagram、Bilibili 以及其他 1,800 个网站的视频保存到你的 Mac 上，格式为 MP4 或 MP3。其他网页可以在内置浏览器中打开，保存正在播放的视频。",
		download: "下载 Mac 版",
		requirements: "免费，适用于搭载 Apple silicon 的 macOS 14 或更高版本。",
		source: "在 GitHub 上查看源代码",
		waysTitle: "两种保存视频的方式",
		ways: [
			{
				title: "粘贴链接",
				body: "适用于 YouTube、X、TikTok、Instagram、Bilibili 以及 yt-dlp 支持的其他网站。Snatch 会列出视频提供的所有分辨率，另有 MP3。",
			},
			{
				title: "打开网页",
				body: "适用于其他所有网站。在 Snatch 里打开网页并播放视频，Snatch 会识别视频流并保存下来，登录状态和你一样。",
			},
		],
		featuresTitle: "细节",
		features: [
			{
				title: "随处可播的 MP4",
				body: "视频保存为 H.264 和 AAC，可在 QuickTime 和 iPhone 上直接打开。也可以只保留音频，存为 MP3。",
			},
			{
				title: "暂停、退出，稍后继续",
				body: "同时下载两个。暂停其中一个或退出 Snatch，之后会从中断处继续。",
			},
			{
				title: "沿用你的登录",
				body: "只有你的账号能看的视频也能下载：在内置浏览器中登录，或让 Snatch 使用 Safari、Chrome 或 Firefox 的登录信息。",
			},
			{
				title: "数据不离开你的 Mac",
				body: "视频直接从网站存进你的“下载”文件夹。没有 Snatch 服务器，无需账号，没有跟踪。",
			},
			{
				title: "开源",
				body: "采用 MIT 许可证，代码在 GitHub 上。底层引擎 yt-dlp 每天更新，紧跟网站变化。",
			},
			{
				title: "无法保存的内容",
				body: "Netflix、Disney+ 等有版权保护的视频流始终是加密的。网页使用这类保护时，Snatch 会告诉你。",
			},
		],
		firstOpenTitle: "首次打开 Snatch",
		firstOpenIntro: "Snatch 是免费软件，未经 Apple 公证，因此 macOS 会要求你确认一次。",
		firstOpenSteps: [
			"打开 Snatch.dmg，把 Snatch 拖到“应用程序”。",
			"打开 Snatch。当 macOS 提示无法检查它时，点按“完成”。",
			"在系统设置 → 隐私与安全性中，点按“仍要打开”。",
			"Snatch 会提示安装 yt-dlp（约 55 MB）。首次保存视频时，还会提示安装 ffmpeg。",
		],
		legal: "请只下载你有权保留的视频，并遵守各网站的条款。",
	},
};
