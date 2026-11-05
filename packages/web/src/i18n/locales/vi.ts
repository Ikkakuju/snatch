import type { Messages } from "./en";

export const vi: Messages = {
	language: {
		label: "Ngôn ngữ",
	},
	nav: {
		features: "Cách hoạt động",
		setup: "Lần chạy đầu",
		download: "Tải về",
		menu: "Menu",
		skip: "Chuyển đến nội dung",
		issues: "Sự cố",
	},
	errors: {
		generic: "Đã xảy ra lỗi. Hãy thử lại.",
	},
	errorBoundary: {
		title: "Đã xảy ra lỗi",
		retry: "Thử lại",
		reload: "Tải lại trang",
		details: "Chi tiết lỗi",
	},
	seo: {
		homeTitle: "Snatch – Trình tải video miễn phí cho Mac | snatchvideos",
		homeDescription:
			"Snatch là ứng dụng Mac miễn phí, mã nguồn mở, tải video từ YouTube, X, TikTok, Instagram, Bilibili và 1.800 trang khác dưới dạng MP4 hoặc MP3.",
	},
	home: {
		whatsNew: "Mới: trình duyệt tích hợp",
		tagline: "Dán liên kết. Giữ lại video.",
		subtitle:
			"Snatch lưu video từ YouTube, X, TikTok, Instagram, Bilibili và 1.800 trang khác về máy Mac của bạn, dưới dạng MP4 hoặc MP3.",
		download: "Tải về cho Mac",
		requirements: "Miễn phí, dành cho macOS 14 trở lên trên Apple Silicon.",
		unsignedNote: "Bản dựng chưa ký số: macOS sẽ yêu cầu bạn xác nhận ở lần mở đầu tiên.",
		closingTitle: "Dán liên kết đầu tiên của bạn.",
		stepsToggle: "Xem các bước",
		demo: {
			get: "Lấy",
			downloadVideo: "Tải video",
			stream: "Video 1",
		},
		waysTitle: "Hai cách lưu video",
		ways: [
			{
				title: "Dán liên kết",
				body: "Dành cho YouTube, X, TikTok, Instagram, Bilibili và hàng loạt trang web được yt-dlp hỗ trợ. Snatch hiển thị đầy đủ các độ phân giải có sẵn cùng tùy chọn xuất MP3.",
			},
			{
				title: "Mở trang",
				body: "Dành cho mọi trang web khác. Mở trang trực tiếp trong Snatch và phát video. Snatch sẽ nhận diện luồng phát và lưu lại theo đúng phiên đăng nhập của bạn.",
			},
		],
		featuresTitle: "Chi tiết",
		features: [
			{
				title: "MP4 phát được ở mọi nơi",
				body: "Video được lưu dưới dạng H.264 và AAC, nên mở trực tiếp trong QuickTime và trên iPhone. Hoặc chỉ giữ âm thanh, dưới dạng MP3.",
			},
			{
				title: "Tạm dừng, thoát, tiếp tục sau",
				body: "Hỗ trợ tải nhiều tác vụ cùng lúc. Tạm dừng hoặc thoát Snatch bất cứ lúc nào, quá trình tải sẽ tiếp tục từ đúng điểm dừng.",
			},
			{
				title: "Duy trì phiên đăng nhập",
				body: "Tải được cả những video riêng tư chỉ tài khoản của bạn xem được: đăng nhập trong trình duyệt tích hợp hoặc cấp quyền cho Snatch sử dụng phiên đăng nhập từ Safari, Chrome hoặc Firefox.",
			},
			{
				title: "Dữ liệu không rời khỏi máy Mac",
				body: "Video tải trực tiếp từ trang web về thư mục Tải về trên máy Mac. Hoàn toàn không qua máy chủ Snatch, không cần đăng ký tài khoản, không theo dõi dữ liệu.",
			},
			{
				title: "Mã nguồn mở hoàn toàn",
				body: "Giấy phép MIT trên GitHub. Công cụ cốt lõi yt-dlp được cập nhật tự động mỗi ngày theo sự thay đổi của các nền tảng.",
			},
			{
				title: "Nội dung không hỗ trợ",
				body: "Các luồng phát được bảo vệ bản quyền DRM (như Netflix, Disney+) luôn được mã hóa và không thể tải về. Snatch sẽ thông báo nếu trang web sử dụng chuẩn bảo vệ này.",
			},
		],
		firstOpenIntro:
			"Snatch miễn phí và chưa được Apple công chứng, nên macOS sẽ yêu cầu bạn xác nhận một lần.",
		firstOpenSteps: [
			"Mở tệp Snatch.dmg và kéo biểu tượng Snatch vào thư mục Ứng dụng (Applications).",
			"Mở Snatch. Khi macOS thông báo không thể xác minh nhà phát triển, bấm “Xong”.",
			"Vào Cài đặt hệ thống → Quyền riêng tư & Bảo mật, bấm “Vẫn mở”.",
			"Snatch sẽ yêu cầu cài đặt yt-dlp (khoảng 55 MB). Khi lưu video đầu tiên, ứng dụng sẽ tiếp tục yêu cầu cài đặt thêm ffmpeg.",
		],
		legal: "Chỉ tải những video bạn có quyền lưu giữ và tôn trọng điều khoản của từng trang.",
	},
};
