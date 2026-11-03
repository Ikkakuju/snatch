import type { Messages } from "./en";

export const id: Messages = {
	language: {
		label: "Bahasa",
	},
	nav: {
		features: "Cara kerja",
		setup: "Peluncuran pertama",
		download: "Unduh",
		menu: "Menu",
	},
	errors: {
		generic: "Terjadi kesalahan. Coba lagi.",
	},
	errorBoundary: {
		title: "Terjadi kesalahan",
		retry: "Coba lagi",
		reload: "Muat ulang halaman",
		details: "Detail kesalahan",
	},
	seo: {
		homeTitle: "Snatch – Pengunduh Video Gratis untuk Mac | snatchvideos",
		homeDescription:
			"Snatch adalah aplikasi Mac gratis dan open source yang mengunduh video dari YouTube, X, TikTok, Instagram, Bilibili, dan ribuan situs lain sebagai MP4 atau MP3.",
	},
	home: {
		whatsNew: "Baru: browser bawaan",
		tagline: "Tempel tautan. Simpan videonya.",
		subtitle:
			"Snatch menyimpan video dari YouTube, X, TikTok, Instagram, Bilibili, dan 1.800 situs lainnya ke Mac Anda, sebagai MP4 atau MP3. Untuk halaman lain, buka di browser bawaan dan simpan apa yang diputarnya.",
		download: "Unduh untuk Mac",
		requirements: "Gratis, untuk macOS 14 atau lebih baru di Apple silicon.",
		unsignedNote: "Build tanpa tanda tangan: macOS meminta konfirmasi sekali.",
		closingTitle: "Tempel tautan pertama Anda.",
		stepsToggle: "Lihat langkah-langkahnya",
		source: "Kode sumber di GitHub",
		waysTitle: "Dua cara menyimpan video",
		ways: [
			{
				title: "Tempel tautan",
				body: "Untuk YouTube, X, TikTok, Instagram, Bilibili, dan situs lain yang dikenal yt-dlp. Snatch menampilkan setiap resolusi video yang tersedia, plus MP3.",
			},
			{
				title: "Buka halamannya",
				body: "Untuk semua yang lain. Buka halamannya di dalam Snatch dan putar videonya. Snatch menemukan stream-nya dan menyimpannya, dengan akun yang sedang Anda pakai.",
			},
		],
		featuresTitle: "Detailnya",
		features: [
			{
				title: "MP4 yang bisa diputar di mana saja",
				body: "Video disimpan sebagai H.264 dan AAC, jadi bisa dibuka di QuickTime dan iPhone. Atau simpan audionya saja, sebagai MP3.",
			},
			{
				title: "Jeda, keluar, lanjutkan nanti",
				body: "Unduhan berjalan dua sekaligus. Jeda salah satunya atau keluar dari Snatch, dan unduhan berlanjut dari titik terakhir.",
			},
			{
				title: "Akun Anda",
				body: "Video yang hanya bisa dilihat akun Anda juga bisa diunduh: masuk di browser bawaan, atau izinkan Snatch memakai Safari, Chrome, atau Firefox.",
			},
			{
				title: "Tidak ada yang keluar dari Mac Anda",
				body: "Video langsung dari situs ke folder Unduhan Anda. Tanpa server Snatch, tanpa akun, tanpa pelacakan.",
			},
			{
				title: "Sumber terbuka",
				body: "Berlisensi MIT, di GitHub. yt-dlp, mesin di baliknya, diperbarui setiap hari mengikuti perubahan situs.",
			},
			{
				title: "Yang tidak bisa disimpan",
				body: "Stream yang dilindungi dari penyalinan, seperti Netflix atau Disney+, tetap terenkripsi. Snatch memberi tahu jika sebuah halaman memakainya.",
			},
		],
		firstOpenTitle: "Membuka Snatch untuk pertama kali",
		firstOpenIntro:
			"Snatch gratis dan tidak dinotarisasi oleh Apple, jadi macOS meminta Anda mengonfirmasinya sekali.",
		firstOpenSteps: [
			"Buka Snatch.dmg dan seret Snatch ke Aplikasi.",
			"Buka Snatch. Saat macOS bilang tidak bisa memeriksanya, klik “Selesai”.",
			"Di Pengaturan Sistem → Privasi & Keamanan, klik “Tetap Buka”.",
			"Snatch meminta izin memasang yt-dlp, sekitar 55 MB. Saat pertama kali menyimpan video, Snatch juga meminta ffmpeg.",
		],
		legal: "Unduh hanya video yang berhak Anda simpan, dan patuhi ketentuan setiap situs.",
	},
};
