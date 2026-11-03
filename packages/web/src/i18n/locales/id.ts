import type { Messages } from "./en";

export const id: Messages = {
	language: {
		label: "Bahasa",
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
		h1Suffix: "— pengunduh video gratis untuk Mac",
		tagline: "Unduh video apa pun di Mac Anda.",
		subtitle:
			"Tempel tautan dari YouTube, X, TikTok, Instagram, Bilibili, atau ribuan situs lain, dan Snatch menyimpannya sebagai MP4 atau MP3. Gratis dan open source.",
		download: "Unduh untuk Mac",
		requirements: "macOS 14 atau lebih baru · Apple silicon",
		source: "Kode sumber di GitHub",
		featuresTitle: "Yang bisa dilakukan Snatch",
		features: [
			{
				title: "Ribuan situs",
				body: "Dibangun di atas yt-dlp, yang mengenali lebih dari 1.800 situs dan memperbarui dirinya sendiri saat situs berubah.",
			},
			{
				title: "Kualitas sesuai pilihan",
				body: "Semua resolusi yang tersedia, disimpan sebagai MP4 yang bisa diputar di mana saja, atau audionya saja sebagai MP3.",
			},
			{
				title: "Jeda dan lanjutkan",
				body: "Antrekan tautan sebanyak yang Anda mau. Jeda unduhan mana pun dan lanjutkan nanti, bahkan setelah aplikasi ditutup.",
			},
			{
				title: "Video yang perlu masuk akun",
				body: "Izinkan Snatch memakai cookie Safari, Chrome, atau Firefox Anda untuk video yang hanya bisa dilihat akun Anda.",
			},
			{
				title: "Berjalan di Mac Anda",
				body: "Unduhan langsung dari situs ke folder Unduhan Anda. Tanpa server perantara, tidak ada yang diunggah.",
			},
			{
				title: "Gratis dan open source",
				body: "Berlisensi MIT. Tanpa akun, tanpa iklan, tanpa pelacakan di aplikasi.",
			},
		],
		firstOpenTitle: "Membuka Snatch untuk pertama kali",
		firstOpenBody:
			"Snatch gratis dan tidak dinotarisasi oleh Apple, jadi macOS memblokir peluncuran pertama. Seret Snatch ke Aplikasi dan buka sekali, lalu buka Pengaturan Sistem → Privasi & Keamanan dan klik “Tetap Buka” (“Open Anyway”). Setelah itu Snatch meminta izin memasang yt-dlp, lalu ffmpeg saat Anda pertama kali menyimpan video, total sekitar 110 MB.",
		legal: "Unduh hanya video yang berhak Anda simpan, dan patuhi ketentuan setiap situs.",
	},
};
