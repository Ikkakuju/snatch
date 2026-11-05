import type { Messages } from "./en";

export const ja: Messages = {
	language: {
		label: "言語",
	},
	nav: {
		features: "機能と特徴",
		setup: "初回起動",
		download: "ダウンロード",
		menu: "メニュー",
		skip: "本文へスキップ",
		issues: "不具合報告",
	},
	errors: {
		generic: "問題が発生しました。もう一度お試しください。",
	},
	errorBoundary: {
		title: "問題が発生しました",
		retry: "再試行",
		reload: "ページを再読み込み",
		details: "エラーの詳細",
	},
	seo: {
		homeTitle: "Snatch – Mac用の無料動画ダウンローダー | snatchvideos",
		homeDescription:
			"Snatchは、YouTube、X、TikTok、Instagram、Bilibiliほか1,800のサイトから動画をMP4またはMP3で保存できる、無料・オープンソースのMacアプリです。",
	},
	home: {
		whatsNew: "新機能：内蔵ブラウザ",
		tagline: "リンクを貼るだけで、\n動画を手元に。",
		subtitle:
			"Snatchは、YouTube、X、TikTok、Instagram、Bilibiliほか1,800以上のサイトから動画を、MP4またはMP3形式でMacに保存します。",
		download: "Mac版をダウンロード",
		requirements: "無料。Apple Silicon 搭載、macOS 14 以降に対応。",
		unsignedNote: "未署名ビルド：初回起動時に macOS から確認が求められます。",
		closingTitle: "最初のリンクを貼り付けてみましょう。",
		stepsToggle: "操作手順を見る",
		demo: {
			get: "取得",
			downloadVideo: "動画を保存",
			stream: "動画 1",
		},
		waysTitle: "動画を保存する2つの方法",
		ways: [
			{
				title: "リンクを貼る",
				body: "YouTube、X、TikTok、Instagram、Bilibiliなど、yt-dlpが対応するサイト向け。動画のすべての解像度一覧に加え、MP3音声の抽出も可能です。",
			},
			{
				title: "ページを開く",
				body: "その他のあらゆるサイト向け。Snatchの内蔵ブラウザでページを開いて動画を再生するだけで、ストリームを検出して保存します。ログイン状態もそのまま引き継がれます。",
			},
		],
		featuresTitle: "詳しい特徴",
		features: [
			{
				title: "どこでも再生できるMP4",
				body: "互換性の高いH.264とAACで保存されるため、QuickTimeやiPhoneですぐに再生できます。音声のみをMP3として抽出することも可能です。",
			},
			{
				title: "一時停止・終了しても続きから",
				body: "複数本の同時ダウンロードに対応。一時停止やSnatchの終了を行っても、次回起動時に止まった箇所から再開できます。",
			},
			{
				title: "ログイン状態をそのまま活用",
				body: "ご自身のアカウントでしか視聴できない限定動画も保存可能。内蔵ブラウザでログインするか、Safari、Chrome、Firefoxの既存ログイン情報をSnatchに読み込ませることができます。",
			},
			{
				title: "Macの外には何も送信されません",
				body: "動画はサイトからMacの「ダウンロード」フォルダへ直接保存されます。Snatch専用サーバーはなく、アカウント登録もトラッキングも一切ありません。",
			},
			{
				title: "完全オープンソース",
				body: "MITライセンスのオープンソースとしてGitHubで公開。内蔵のyt-dlpエンジンは、各サイトの仕様変更に合わせて毎日自動更新されます。",
			},
			{
				title: "保存できないコンテンツについて",
				body: "NetflixやDisney+などのDRM（著作権保護技術）で暗号化されたストリームは保存できません。対象ページで保護が検出された場合、Snatchがお知らせします。",
			},
		],
		firstOpenIntro:
			"Snatchは無料のオープンソースアプリであり、Appleの公証を受けていないため、初回起動時のみmacOSのセキュリティ確認が必要です。",
		firstOpenSteps: [
			"Snatch.dmg を開き、Snatch を「アプリケーション」フォルダにドラッグ＆ドロップします。",
			"Snatch を開きます。macOS が開発元を確認できない旨を表示したら、「完了」をクリックします。",
			"「システム設定」→「プライバシーとセキュリティ」を開き、「このまま開く」をクリックします。",
			"Snatch が yt-dlp（約 55 MB）の自動ダウンロードを案内します。初回動画保存時には ffmpeg の追加も案内されます。",
		],
		legal:
			"保存する正当な権利を持つ動画のみをダウンロードし、各サイトの利用規約を遵守してください。",
	},
};
