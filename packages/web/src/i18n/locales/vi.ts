import type { Messages } from "./en";

export const vi: Messages = {
	language: {
		label: "Ngôn ngữ",
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
		h1Suffix: "— trình tải video miễn phí cho Mac",
		tagline: "Tải mọi video về máy Mac của bạn.",
		subtitle:
			"Dán liên kết từ YouTube, X, TikTok, Instagram, Bilibili hoặc hàng nghìn trang khác, Snatch sẽ lưu thành MP4 hoặc MP3. Miễn phí và mã nguồn mở.",
		download: "Tải về cho Mac",
		requirements: "macOS 14 trở lên · Apple silicon",
		source: "Mã nguồn trên GitHub",
		featuresTitle: "Snatch làm được gì",
		features: [
			{
				title: "Hàng nghìn trang web",
				body: "Xây dựng trên yt-dlp, công cụ nhận biết hơn 1.800 trang và tự cập nhật khi các trang thay đổi.",
			},
			{
				title: "Tùy chọn chất lượng",
				body: "Mọi độ phân giải mà video có, lưu thành MP4 phát được ở mọi nơi, hoặc chỉ lấy âm thanh dạng MP3.",
			},
			{
				title: "Tạm dừng và tiếp tục",
				body: "Thêm bao nhiêu liên kết vào hàng chờ cũng được. Tạm dừng bất kỳ lượt tải nào và tiếp tục sau, kể cả khi đã thoát ứng dụng.",
			},
			{
				title: "Video cần đăng nhập",
				body: "Cho phép Snatch dùng cookie của Safari, Chrome hoặc Firefox để tải những video chỉ tài khoản của bạn xem được.",
			},
			{
				title: "Chạy trên máy Mac của bạn",
				body: "Video được tải thẳng từ trang web vào thư mục Tải về. Không có máy chủ trung gian, không tải lên thứ gì.",
			},
			{
				title: "Miễn phí và mã nguồn mở",
				body: "Giấy phép MIT. Không cần tài khoản, không quảng cáo, không theo dõi trong ứng dụng.",
			},
		],
		firstOpenTitle: "Mở Snatch lần đầu",
		firstOpenBody:
			"Snatch miễn phí và chưa được Apple công chứng, nên macOS sẽ chặn lần mở đầu tiên. Kéo Snatch vào thư mục Ứng dụng và mở một lần, sau đó vào Cài đặt hệ thống → Quyền riêng tư & Bảo mật và bấm “Vẫn mở” (“Open Anyway”). Sau đó Snatch sẽ hỏi để cài yt-dlp, và ffmpeg khi bạn lưu video đầu tiên, tổng cộng khoảng 110 MB.",
		legal: "Chỉ tải những video bạn có quyền lưu giữ và tôn trọng điều khoản của từng trang.",
	},
};
