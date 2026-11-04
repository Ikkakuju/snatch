import type { Messages } from "./en";

export const ko: Messages = {
	language: {
		label: "언어",
	},
	nav: {
		features: "기능 소개",
		setup: "첫 실행",
		download: "다운로드",
		menu: "메뉴",
		skip: "본문으로 이동",
		issues: "문제 신고",
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
			"Snatch는 YouTube, X, TikTok, Instagram, Bilibili 등 1,800개 사이트의 동영상을 MP4 또는 MP3로 내려받는 무료 오픈 소스 Mac 앱입니다.",
	},
	home: {
		whatsNew: "새 기능: 내장 브라우저",
		tagline: "링크를 붙여넣고,\n영상을 간직하세요.",
		subtitle:
			"Snatch는 YouTube, X, TikTok, Instagram, Bilibili 및 1,800개 이상의 사이트에서 영상을 MP4 또는 MP3로 Mac에 저장합니다.",
		download: "Mac용 다운로드",
		requirements: "무료, Apple Silicon 탑재 macOS 14 이상 지원.",
		unsignedNote: "미서명 빌드: 최초 실행 시 macOS에서 한 번 확인을 요청합니다.",
		closingTitle: "첫 링크를 붙여넣어 보세요.",
		stepsToggle: "설치 단계 보기",
		source: "GitHub에서 소스 코드 보기",
		demo: {
			get: "가져오기",
			downloadVideo: "동영상 저장",
			stream: "동영상 1",
		},
		waysTitle: "영상을 저장하는 두 가지 방법",
		ways: [
			{
				title: "링크 붙여넣기",
				body: "YouTube, X, TikTok, Instagram, Bilibili 등 yt-dlp가 지원하는 사이트에 적합합니다. 영상이 제공하는 모든 해상도 목록과 함께 MP3 추출도 지원합니다.",
			},
			{
				title: "페이지 열기",
				body: "그 외 모든 사이트에 적합합니다. Snatch 내장 브라우저에서 페이지를 열고 영상을 재생하면 스트림을 감지하여 저장하며, 현재 로그인 상태도 그대로 유지됩니다.",
			},
		],
		featuresTitle: "주요 특징",
		features: [
			{
				title: "어디서나 재생되는 MP4",
				body: "호환성이 뛰어난 H.264 및 AAC 코덱으로 저장되어 QuickTime과 iPhone에서 바로 재생할 수 있습니다. 오디오만 MP3로 추출하여 보관할 수도 있습니다.",
			},
			{
				title: "일시 정지, 종료 후 이어서 다운로드",
				body: "여러 개의 다운로드가 동시에 진행됩니다. 다운로드를 일시 정지하거나 Snatch를 종료해도 멈춘 지점부터 언제든 이어받을 수 있습니다.",
			},
			{
				title: "로그인 상태 유지",
				body: "내 계정으로만 볼 수 있는 비공개 영상도 다운로드할 수 있습니다. 내장 브라우저에서 직접 로그인하거나, Snatch가 Safari, Chrome, Firefox의 로그인 세션을 활용하도록 설정할 수 있습니다.",
			},
			{
				title: "Mac 외부로 데이터가 전송되지 않습니다",
				body: "영상은 웹사이트에서 Mac의 '다운로드' 폴더로 바로 저장됩니다. Snatch 중계 서버도, 회원가입도, 사용자 추적도 없습니다.",
			},
			{
				title: "완전한 오픈 소스",
				body: "MIT 라이선스 기반의 오픈 소스로 GitHub에 공개되어 있습니다. 핵심 엔진인 yt-dlp는 사이트 변경 사항에 맞춰 매일 자동 업데이트됩니다.",
			},
			{
				title: "저장할 수 없는 콘텐츠 안내",
				body: "Netflix, Disney+ 등 DRM(디지털 저작권 관리) 복제 방지 기술이 적용된 스트림은 암호화되어 저장할 수 없습니다. 웹페이지가 DRM을 사용하는 경우 Snatch가 미리 알려 드립니다.",
			},
		],
		firstOpenIntro:
			"Snatch는 무료 오픈 소스 앱이며 Apple 공증을 받지 않아, 최초 실행 시 macOS에서 확인이 필요합니다.",
		firstOpenSteps: [
			"Snatch.dmg를 열고 Snatch를 '응용 프로그램' 폴더로 드래그합니다.",
			"Snatch를 실행합니다. macOS가 확인할 수 없다고 표시하면 '완료'를 클릭합니다.",
			"시스템 설정 → 개인정보 보호 및 보안에서 '확인 없이 열기'를 클릭합니다.",
			"Snatch가 yt-dlp(약 55MB) 설치 여부를 확인합니다. 처음 영상을 저장할 때는 ffmpeg 설치도 함께 안내합니다.",
		],
		legal:
			"저작권 및 소장 권리가 있는 영상만 다운로드하고, 각 사이트의 서비스 이용약관을 준수해 주세요.",
	},
};
