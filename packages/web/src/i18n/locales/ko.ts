import type { Messages } from "./en";

export const ko: Messages = {
	language: {
		label: "언어",
	},
	nav: {
		features: "사용 방법",
		setup: "첫 실행",
		download: "다운로드",
		menu: "메뉴",
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
		whatsNew: "새 기능: 내장 브라우저",
		tagline: "링크를 붙여 넣고, 영상을 간직하세요.",
		subtitle:
			"Snatch는 YouTube, X, TikTok, Instagram, Bilibili 그리고 1,800개의 다른 사이트에서 영상을 MP4나 MP3로 Mac에 저장합니다. 그 밖의 페이지는 내장 브라우저로 열어 재생 중인 영상을 저장하세요.",
		download: "Mac용 다운로드",
		requirements: "무료, Apple silicon 기반 macOS 14 이상.",
		unsignedNote: "서명하지 않은 빌드라 macOS가 한 번 확인을 요청합니다.",
		closingTitle: "첫 링크를 붙여 넣으세요.",
		stepsToggle: "단계 보기",
		source: "GitHub에서 소스 코드 보기",
		waysTitle: "영상을 저장하는 두 가지 방법",
		ways: [
			{
				title: "링크 붙여 넣기",
				body: "YouTube, X, TikTok, Instagram, Bilibili 등 yt-dlp가 지원하는 사이트용입니다. 영상이 제공하는 모든 해상도와 MP3가 목록에 표시됩니다.",
			},
			{
				title: "페이지 열기",
				body: "그 밖의 모든 사이트용입니다. Snatch 안에서 페이지를 열고 영상을 재생하면, Snatch가 스트림을 찾아 저장합니다. 로그인 상태도 그대로입니다.",
			},
		],
		featuresTitle: "세부 사항",
		features: [
			{
				title: "어디서나 재생되는 MP4",
				body: "영상은 H.264와 AAC로 저장되어 QuickTime과 iPhone에서 바로 열립니다. 오디오만 MP3로 저장할 수도 있습니다.",
			},
			{
				title: "일시 정지, 종료, 나중에 이어서",
				body: "다운로드는 두 개씩 동시에 진행됩니다. 하나를 일시 정지하거나 Snatch를 종료해도 멈춘 곳에서 이어집니다.",
			},
			{
				title: "내 로그인 그대로",
				body: "내 계정에서만 볼 수 있는 영상도 다운로드됩니다. 내장 브라우저에서 로그인하거나 Snatch가 Safari, Chrome, Firefox를 사용하도록 허용하세요.",
			},
			{
				title: "Mac 밖으로 나가는 것은 없습니다",
				body: "영상은 사이트에서 다운로드 폴더로 바로 저장됩니다. Snatch 서버도, 계정도, 추적도 없습니다.",
			},
			{
				title: "오픈 소스",
				body: "MIT 라이선스로 GitHub에 공개되어 있습니다. 엔진인 yt-dlp는 사이트 변화에 맞춰 매일 업데이트됩니다.",
			},
			{
				title: "저장할 수 없는 것",
				body: "Netflix나 Disney+처럼 복제 방지된 스트림은 암호화된 상태로 남습니다. 페이지가 이를 사용하면 Snatch가 알려 줍니다.",
			},
		],
		firstOpenTitle: "Snatch를 처음 열 때",
		firstOpenIntro:
			"Snatch는 무료이며 Apple의 공증을 받지 않았기 때문에 macOS에서 한 번 확인이 필요합니다.",
		firstOpenSteps: [
			"Snatch.dmg를 열고 Snatch를 응용 프로그램 폴더로 드래그하세요.",
			"Snatch를 여세요. macOS가 확인할 수 없다고 알리면 '완료'를 클릭하세요.",
			"시스템 설정 → 개인정보 보호 및 보안에서 '확인 없이 열기'를 클릭하세요.",
			"Snatch가 yt-dlp(약 55MB) 설치를 물어봅니다. 처음 영상을 저장할 때는 ffmpeg 설치도 물어봅니다.",
		],
		legal: "보관할 권리가 있는 동영상만 다운로드하고, 각 사이트의 이용 약관을 지켜 주세요.",
	},
};
