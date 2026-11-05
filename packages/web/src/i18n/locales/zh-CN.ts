import type { Messages } from "./en";

export const zhCN: Messages = {
	language: {
		label: "语言",
	},
	nav: {
		features: "功能特性",
		setup: "首次启动",
		download: "下载",
		menu: "菜单",
		skip: "跳至正文",
		issues: "问题反馈",
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
			"Snatch 是一款免费开源的 Mac 应用，可将 YouTube、X、TikTok、Instagram、Bilibili 等 1,800 个网站的视频下载为 MP4 或 MP3。",
	},
	home: {
		whatsNew: "新功能：内置浏览器",
		tagline: "粘贴链接，\n即可保存视频。",
		subtitle:
			"Snatch 能把 YouTube、X、TikTok、Instagram、Bilibili 以及其他 1,800 个网站的视频保存到你的 Mac，格式支持 MP4 或 MP3。",
		download: "下载 Mac 版",
		requirements: "免费，适用于搭载 Apple 芯片且运行 macOS 14 或更高版本的 Mac。",
		unsignedNote: "未签名构建版本：macOS 会在首次打开时提示确认一次。",
		closingTitle: "粘贴你的第一个链接。",
		stepsToggle: "查看操作步骤",
		demo: {
			get: "解析",
			downloadVideo: "下载视频",
			stream: "视频 1",
		},
		waysTitle: "两种保存视频的方式",
		ways: [
			{
				title: "粘贴链接",
				body: "适用于 YouTube、X、TikTok、Instagram、Bilibili 以及 yt-dlp 支持的其他网站。Snatch 会列出视频提供的所有分辨率，亦可单独提取 MP3。",
			},
			{
				title: "打开网页",
				body: "适用于其他所有网站。在 Snatch 内置浏览器中打开网页并播放视频，Snatch 会自动识别视频流并保存，直接沿用你当前的登录状态。",
			},
		],
		featuresTitle: "特性细节",
		features: [
			{
				title: "随处可播的 MP4",
				body: "视频保存为兼容性极佳的 H.264 和 AAC 编码，可在 QuickTime 和 iPhone 上直接流畅播放。也可仅保留音频并存为 MP3。",
			},
			{
				title: "随时暂停、退出，稍后继续",
				body: "支持多个任务同时下载。暂停任务或退出 Snatch，下次启动都能从断点处继续下载。",
			},
			{
				title: "沿用你的登录状态",
				body: "只有登录账号才能观看的专属视频也能下载：直接在内置浏览器中登录，或让 Snatch 读取 Safari、Chrome、Firefox 的登录状态与 Cookie。",
			},
			{
				title: "数据绝不离开你的 Mac",
				body: "视频直接从目标网站存入你的“下载”文件夹。无中转服务器，无需注册账号，绝无用户追踪。",
			},
			{
				title: "完全开源",
				body: "采用 MIT 开源协议，代码托管于 GitHub。底层引擎 yt-dlp 每天自动更新，紧跟各网站变动。",
			},
			{
				title: "关于不支持的内容",
				body: "受 DRM 版权保护的流媒体（如 Netflix、Disney+ 等）因加密限制无法下载。若网页使用了此类保护，Snatch 会主动提示你。",
			},
		],
		firstOpenIntro:
			"Snatch 是一款免费开源软件，尚未向 Apple 申请公证，因此 macOS 会在首次打开时提示确认。",
		firstOpenSteps: [
			"打开 Snatch.dmg，把 Snatch 拖移到“应用程序”文件夹。",
			"打开 Snatch。当 macOS 提示无法验证开发者时，点按“完成”。",
			"前往“系统设置”→“隐私与安全性”，点按“仍要打开”。",
			"Snatch 会提示安装 yt-dlp（约 55 MB）。首次保存视频时，还会提示安装 ffmpeg。",
		],
		legal: "请仅下载拥有合法保留权益的视频，并严格遵守各网站的服务条款。",
	},
};
