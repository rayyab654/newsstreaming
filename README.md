# Rayliziie Official Streaming — Fixed

Versi ini memperbaiki integrasi frontend dengan Worker API:

- endpoint Anime/Films/Drakor menggunakan `action=home`
- normalizer fleksibel untuk response nested
- Home benar-benar menampilkan Hero + carousel
- halaman Anime/Films/Drakor benar-benar mengambil data
- Detail menggunakan endpoint provider yang sesuai
- Episode dideteksi dari response detail
- Watch menggunakan endpoint play provider
- Search lintas Film/Anime/Drakor
- route detail memakai splat sehingga `path` yang mengandung `/` tidak rusak
- memperbaiki import hook `getAnime/getDrakor` yang tidak ada
- memperbaiki import `MovieCard` yang salah folder
- menghapus `node_modules` dan `.wrangler` dari paket distribusi

API:
https://streaming-rayliziie-official.rayyankrens0304.workers.dev

Run:
npm install
npm run dev

Build:
npm run build
