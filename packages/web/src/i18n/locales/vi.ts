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
			"Snatch là ứng dụng Mac miễn phí, mã nguồn mở, tải video từ YouTube, X, TikTok, Instagram, Bilibili và hàng nghìn trang khác dưới dạng MP4 hoặc MP3.",
	},
	home: {
		whatsNew: "Mới: trình duyệt tích hợp",
		tagline: "Dán liên kết. Giữ lại video.",
		subtitle:
			"Snatch lưu video từ YouTube, X, TikTok, Instagram, Bilibili và 1.800 trang khác về máy Mac của bạn, dưới dạng MP4 hoặc MP3. Với các trang còn lại, hãy mở bằng trình duyệt tích hợp và lưu những gì đang phát.",
		download: "Tải về cho Mac",
		requirements: "Miễn phí, cho macOS 14 trở lên trên Apple silicon.",
		unsignedNote: "Bản dựng chưa ký: macOS sẽ hỏi xác nhận một lần.",
		closingTitle: "Dán liên kết đầu tiên của bạn.",
		stepsToggle: "Xem các bước",
		source: "Mã nguồn trên GitHub",
		waysTitle: "Hai cách lưu video",
		ways: [
			{
				title: "Dán liên kết",
				body: "Dành cho YouTube, X, TikTok, Instagram, Bilibili và các trang khác mà yt-dlp hỗ trợ. Snatch liệt kê mọi độ phân giải của video, kèm MP3.",
			},
			{
				title: "Mở trang",
				body: "Dành cho mọi trang còn lại. Mở trang ngay trong Snatch và phát video. Snatch nhận ra luồng phát và lưu lại, với tài khoản bạn đang đăng nhập.",
			},
		],
		featuresTitle: "Chi tiết",
		features: [
			{
				title: "MP4 phát được ở mọi nơi",
				body: "Video được lưu dưới dạng H.264 và AAC, nên mở được trong QuickTime và trên iPhone. Hoặc chỉ giữ âm thanh, dưới dạng MP3.",
			},
			{
				title: "Tạm dừng, thoát, tiếp tục sau",
				body: "Mỗi lần tải hai video. Tạm dừng một video hoặc thoát Snatch, nó sẽ tiếp tục từ chỗ đã dừng.",
			},
			{
				title: "Tài khoản của bạn",
				body: "Video chỉ tài khoản của bạn xem được cũng tải được: đăng nhập trong trình duyệt tích hợp, hoặc cho phép Snatch dùng Safari, Chrome hay Firefox.",
			},
			{
				title: "Không gì rời khỏi máy Mac",
				body: "Video đi thẳng từ trang web vào thư mục Tải về. Không có máy chủ Snatch, không tài khoản, không theo dõi.",
			},
			{
				title: "Mã nguồn mở",
				body: "Giấy phép MIT, trên GitHub. yt-dlp, bộ máy bên dưới, được cập nhật mỗi ngày theo thay đổi của các trang.",
			},
			{
				title: "Những gì không lưu được",
				body: "Luồng có chống sao chép như Netflix hay Disney+ vẫn được mã hóa. Snatch sẽ báo khi một trang dùng chúng.",
			},
		],
		firstOpenTitle: "Mở Snatch lần đầu",
		firstOpenIntro:
			"Snatch miễn phí và chưa được Apple công chứng, nên macOS sẽ yêu cầu bạn xác nhận một lần.",
		firstOpenSteps: [
			"Mở Snatch.dmg và kéo Snatch vào thư mục Ứng dụng.",
			"Mở Snatch. Khi macOS báo không thể kiểm tra ứng dụng, bấm “Xong”.",
			"Trong Cài đặt hệ thống → Quyền riêng tư & Bảo mật, bấm “Vẫn mở”.",
			"Snatch sẽ hỏi để cài yt-dlp, khoảng 55 MB. Khi bạn lưu video đầu tiên, Snatch sẽ hỏi cài thêm ffmpeg.",
		],
		legal: "Chỉ tải những video bạn có quyền lưu giữ và tôn trọng điều khoản của từng trang.",
	},
};
