# Rayliziie Official — Premium Streaming Frontend

Frontend React + Vite untuk Anime, Films, dan Drakor, terhubung ke Rayliziie Official API Worker.

## API
`https://streaming-rayliziie-official.rayyankrens0304.workers.dev`

## Fitur
- Premium dark UI dengan nuansa Netflix + Crunchyroll
- Home hero/banner
- Katalog Anime / Films / Drakor
- Search lintas provider
- Detail title
- Daftar episode adaptif
- Play melalui endpoint `/play`
- My List / Favorites menggunakan localStorage
- Continue watching menggunakan localStorage
- Responsive desktop/tablet/mobile
- Skeleton loading dan error state
- Provider badge dan rating
- Tidak mengunci struktur response API; parser dibuat fleksibel untuk variasi field provider

## Jalankan
```bash
npm install
npm run dev
```

Build:
```bash
npm run build
```

## Deploy
Bisa dideploy ke Netlify, Vercel, Cloudflare Pages, atau static hosting yang mendukung SPA.
