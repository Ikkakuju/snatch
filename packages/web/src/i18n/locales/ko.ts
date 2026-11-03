import type { Messages } from "./en";

export const ko: Messages = {
	language: {
		label: "언어",
	},
	errors: {
		generic: "문제가 발생했습니다. 다시 시도해 주세요.",
	},
	errorBoundary: {
		title: "문제가 발생했습니다",
		retry: "다시 시도",
		reload: "페이지 새로고침",
		details: "오류 세부정보",
	},
	seo: {
		homeTitle: "Snatch – Mac용 무료 동영상 다운로더 | snatchvideos",
		homeDescription:
			"Snatch는 YouTube, X, TikTok, Instagram, Bilibili 등 수천 개 사이트의 동영상을 MP4 또는 MP3로 내려받는 무료 오픈 소스 Mac 앱입니다.",
	},
	home: {
		h1Suffix: "— Mac용 무료 동영상 다운로더",
		tagline: "어떤 동영상이든 Mac에 저장하세요.",
		subtitle:
			"YouTube, X, TikTok, Instagram, Bilibili 등 수천 개 사이트의 링크를 붙여 넣으면 Snatch가 MP4 또는 MP3로 저장합니다. 무료이며 오픈 소스입니다.",
		download: "Mac용 다운로드",
		requirements: "macOS 14 이상 · Apple 실리콘",
		source: "GitHub에서 소스 코드 보기",
		featuresTitle: "Snatch로 할 수 있는 일",
		features: [
			{
				title: "수천 개의 사이트",
				body: "1,800개 이상의 사이트를 지원하는 yt-dlp 기반으로, 사이트가 바뀌면 스스로 업데이트합니다.",
			},
			{
				title: "원하는 화질 선택",
				body: "동영상이 제공하는 모든 해상도를 어디서나 재생되는 MP4로 저장하거나, 오디오만 MP3로 저장할 수 있습니다.",
			},
			{
				title: "일시 정지와 이어 받기",
				body: "링크를 원하는 만큼 대기열에 넣으세요. 어떤 다운로드든 일시 정지했다가 앱을 종료한 뒤에도 나중에 이어 받을 수 있습니다.",
			},
			{
				title: "로그인이 필요한 동영상",
				body: "Snatch가 Safari, Chrome 또는 Firefox의 쿠키를 사용하도록 허용하면 내 계정으로만 볼 수 있는 동영상도 받을 수 있습니다.",
			},
			{
				title: "내 Mac에서 실행",
				body: "사이트에서 다운로드 폴더로 바로 저장됩니다. 중간 서버도 없고, 아무것도 업로드하지 않습니다.",
			},
			{
				title: "무료 오픈 소스",
				body: "MIT 라이선스. 계정도, 광고도, 앱 내 추적도 없습니다.",
			},
		],
		firstOpenTitle: "Snatch를 처음 열 때",
		firstOpenBody:
			"Snatch는 무료이며 Apple의 공증을 받지 않았기 때문에 macOS가 첫 실행을 차단합니다. Snatch를 응용 프로그램 폴더로 드래그해 한 번 연 다음, 시스템 설정 → 개인정보 보호 및 보안에서 '확인 없이 열기'(Open Anyway)를 클릭하세요. 그다음 Snatch가 yt-dlp 설치를, 처음 영상을 저장할 때 ffmpeg 설치를 물어봅니다(합계 약 110MB).",
		legal: "보관할 권리가 있는 동영상만 다운로드하고, 각 사이트의 이용 약관을 지켜 주세요.",
	},
};
