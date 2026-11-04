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
		skip: "Lompat ke konten",
		issues: "Masalah",
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
			"Snatch adalah aplikasi Mac gratis dan open source yang mengunduh video dari YouTube, X, TikTok, Instagram, Bilibili, dan 1.800 situs lain sebagai MP4 atau MP3.",
	},
	home: {
		whatsNew: "Baru: browser bawaan",
		tagline: "Tempel tautan. Simpan videonya.",
		subtitle:
			"Snatch menyimpan video dari YouTube, X, TikTok, Instagram, Bilibili, dan 1.800 situs lainnya ke Mac Anda, sebagai MP4 atau MP3.",
		download: "Unduh untuk Mac",
		requirements: "Gratis, untuk macOS 14 atau lebih baru di Apple Silicon.",
		unsignedNote:
			"Build tanpa sertifikat Apple: macOS akan meminta konfirmasi satu kali saat pertama dibuka.",
		closingTitle: "Tempel tautan pertama Anda.",
		stepsToggle: "Lihat langkah-langkahnya",
		source: "Kode sumber di GitHub",
		demo: {
			get: "Ambil",
			downloadVideo: "Unduh video",
			stream: "Video 1",
		},
		waysTitle: "Dua cara menyimpan video",
		ways: [
			{
				title: "Tempel tautan",
				body: "Untuk YouTube, X, TikTok, Instagram, Bilibili, dan ribuan situs lain yang didukung yt-dlp. Snatch menampilkan semua resolusi yang tersedia, beserta opsi ekstraksi audio MP3.",
			},
			{
				title: "Buka halamannya",
				body: "Untuk situs lainnya. Buka halaman di dalam browser bawaan Snatch dan putar videonya. Snatch akan mendeteksi stream dan menyimpannya menggunakan sesi login Anda saat ini.",
			},
		],
		featuresTitle: "Detailnya",
		features: [
			{
				title: "MP4 yang bisa diputar di mana saja",
				body: "Video disimpan sebagai H.264 dan AAC, jadi bisa dibuka langsung di QuickTime dan iPhone. Atau simpan audionya saja, sebagai MP3.",
			},
			{
				title: "Jeda, keluar, lanjutkan nanti",
				body: "Beberapa unduhan dapat berjalan sekaligus. Jeda salah satu unduhan atau tutup Snatch, proses akan dilanjutkan kembali tepat dari titik terakhir.",
			},
			{
				title: "Pertahankan sesi login",
				body: "Video privat yang hanya bisa dilihat akun Anda juga dapat diunduh: masuk melalui browser bawaan, atau izinkan Snatch membaca sesi login dari Safari, Chrome, atau Firefox.",
			},
			{
				title: "Tidak ada data yang keluar dari Mac Anda",
				body: "Video langsung diunduh dari situs web ke folder Unduhan di Mac Anda. Tanpa server perantara Snatch, tanpa perlu akun, dan tanpa pelacakan data.",
			},
			{
				title: "Sepenuhnya sumber terbuka",
				body: "Berlisensi MIT, di GitHub. Engine bawaan yt-dlp diperbarui setiap hari mengikuti perubahan pada setiap platform.",
			},
			{
				title: "Konten yang tidak didukung",
				body: "Stream dengan perlindungan DRM anticopy (seperti Netflix atau Disney+) tetap terenkripsi dan tidak dapat disimpan. Snatch akan memberi tahu jika suatu halaman menggunakannya.",
			},
		],
		firstOpenIntro:
			"Snatch gratis dan tidak dinotarisasi oleh Apple, jadi macOS meminta Anda mengonfirmasinya sekali saat pertama dibuka.",
		firstOpenSteps: [
			"Buka Snatch.dmg dan seret Snatch ke folder Aplikasi.",
			"Buka Snatch. Saat macOS menampilkan pesan tidak dapat memeriksa pengembang, klik “Selesai”.",
			"Di Pengaturan Sistem → Privasi & Keamanan, klik “Tetap Buka”.",
			"Snatch meminta izin memasang yt-dlp, sekitar 55 MB. Saat pertama kali menyimpan video, Snatch juga meminta ffmpeg.",
		],
		legal: "Unduh hanya video yang berhak Anda simpan, dan patuhi ketentuan setiap situs.",
	},
};
