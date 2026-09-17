# Audit Landing & Arah Berikutnya — "Hidup"

> Status: **dieksekusi di branch `feat/landing-v4` (2026-09-17). Keputusan §8, temuan Figma §10, catatan eksekusi §11. Hasil build: `docs/PROJECT_LANDING_BUILD.md`.**  
> Tanggal audit: 2026-09-17  
> Cakupan: seluruh situs `sakala.dev` (bukan hanya homepage), aset, dan
> referensi desain untuk iterasi berikutnya  
> Penamaan: lapisan kejelasan di PR #18 sudah memakai label **v3**
> (`CLARITY_AMENDMENT.md`). Iterasi yang dibahas di sini disebut **v4** supaya
> tidak bertabrakan, walaupun secara percakapan ini "update ke v3".

Dokumen ini ditulis untuk direview, bukan untuk langsung dieksekusi. Setiap
rekomendasi diberi label **keputusan** bila butuh keputusan project lead, dan
**jalankan** bila cukup jelas untuk dikerjakan.

---

## 0. Ringkasan jujur

**Yang sudah benar dan jangan dirombak lagi:**

- Narasi _The Life of a Project_ bekerja. Empat reviewer eksternal dan audit
  ini setuju: identitasnya kuat.
- Kejujuran produk konsisten: tidak ada klaim palsu, metrik palsu, atau
  testimoni palsu. Ini langka dan bernilai.
- Fondasi teknis rapi: static-first, i18n tanpa kebocoran bahasa, SEO
  terstruktur, font self-hosted, reduced-motion, tanpa dependency berlebih.

**Yang membuat halaman terasa "kurang hidup":**

1. **Semua artefak diam.** Tidak ada satu pun artefak yang berubah keadaan.
   `MOTION_LANGUAGE.md` §3 meminta _signature sequence_ Source → Sakala →
   Presence; yang terbangun baru fade-in. Deployment tidak pernah terlihat
   "berjalan", health tidak pernah "berubah hijau", URL tidak pernah "muncul".
2. **Gerak salah sasaran.** 37 elemen `.becoming` di homepage — hampir setiap
   heading dan paragraf memudar masuk. `MOTION_LANGUAGE.md` §2 justru melarang
   itu. Gerak tersebar ke teks, padahal seharusnya terkonsentrasi di artefak.
3. **Sembilan bab dengan satu template.** Tiap bab = eyebrow + judul besar +
   lead + kartu berbingkai tiga titik. Setelah bab 05, empat bab berturut-turut
   (Untuk Siapa, Kelanjutan, Terbuka, Penutup) berbentuk sama dan energinya
   turun. 1.204 kata untuk sebuah homepage pre-launch terlalu panjang.
4. **Hero memperlihatkan hal paling tidak menarik**: pohon berkas. Strapi dan
   Lattice sama-sama menaruh _produk_ di hero. Sakala menaruh `package.json`.
5. **Tidak ada satu pun aset visual selain logo.** Semua ilustrasi adalah kotak
   CSS. Itu keputusan yang benar untuk menghindari screenshot palsu, tetapi ada
   ruang besar untuk artefak yang tetap jujur _dan_ punya kehadiran.

**Tiga keputusan terbesar yang menunggu project lead:**

| #   | Keputusan                                                                                                   | Rekomendasi saya                                                                                             |
| --- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| 1   | Bagian **Contributor awal** di `/open-source`                                                               | **Hapus dari situs**, ganti "Cara berkontribusi". Simpan `CONTRIBUTORS.md`. Lihat §3.5.                      |
| 2   | Boleh tidak **UI Console dari Figma Wave 1** tampil di landing sebagai artefak berlabel _design direction_? | **Boleh dan sebaiknya** — ini pengungkit "hidup" terbesar. Butuh akses Figma yang benar. Lihat §6 #4.        |
| 3   | Homepage v4 = **edit terarah** atau **rebuild keempat**?                                                    | **Edit terarah.** Tiga rebuild dalam tiga bulan (#16, #17, #18) cukup. Struktur 9 bab dipadatkan jadi 6. §5. |

---

## 1. Metode dan batasnya

Dibaca: seluruh `docs/landing/`, `docs/PROJECT_*.md`, 16 dokumen sakala-docs
(baseline 2026-08-15), seluruh `src/`, HTML hasil `npm run build`, lockfile,
riwayat git. Diukur: jumlah kata per halaman, ukuran HTML, jumlah elemen gerak.

Tidak bisa dilakukan di sesi ini:

- **Screenshot render.** Chromium headless butuh `libnspr4` yang tidak
  terpasang di mesin ini. Audit visual dilakukan dari kode dan HTML; komposisi
  aktual di 320px belum kulihat dengan mata.
- **Figma.** File `Z1sQo5QuxoVpO8hYEltCQV` (dirujuk `DESIGN_STRATEGY.md`) hanya
  memperlihatkan satu halaman _Cover_ "GMEDIA X UTY". Layar Wave 1 tidak
  terlihat. Kemungkinan ada di file lain atau halaman yang dibatasi.
- **Data pengunjung.** Situs tidak punya analytics sama sekali, jadi tidak ada
  satu pun angka perilaku yang bisa dipakai. Semua penilaian di sini kualitatif.

---

## 2. Audit homepage, bab per bab

Skala: ✅ pertahankan · ⚠️ perbaiki · ❌ ganti

| Bab            | Nilai | Temuan                                                                                                                                                                                                                                                                                                                                                                   |
| -------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Pita status    | ⚠️    | Jujur dan wajib ada, tetapi ia kalimat _pertama_ yang dibaca pengunjung dan memakan ~80px di mobile sebelum brand terlihat. Pindahkan ke dalam hero sebagai chip ("Pre-launch · dibangun terbuka") dan ulangi di penutup.                                                                                                                                                |
| 01 Kemungkinan | ⚠️    | Headline, subheadline, dan pasangan CTA sudah benar. Artefaknya tidak. Pohon berkas tidak memberi tahu apa pun tentang produk. CTA primer "Ikuti perkembangan" hanya menggulir ke bawah halaman — aksi primer yang tidak ke mana-mana. Hero tidak bernomor sementara bab lain 02–08; mark raksasa opacity 4,5% di kanan hanya tampil ≥1280px.                            |
| 02 Jarak       | ✅    | Ide terkuat di halaman ("belum rusak, hanya belum sampai"). Artefak localhost dengan pill "dapat dibuka oleh: kamu" cerdas. Lead dua kalimat dengan em-dash — `VOICE_AND_LANGUAGE.md` §11. Kandidat digabung ke hero (lihat §5).                                                                                                                                         |
| 03 Ambang      | ⚠️    | Satu-satunya momen dramatis, tetapi artefaknya tumpukan statis: token → mark → token. `LANDING_PHILOSOPHY.md` §4 mengizinkan mark _berpartisipasi dalam transformasi_. Belum. Ini tempat mark seharusnya "merakit diri" (geometri asli: bentuk atas = source, ruang negatif = transformasi, bentuk bawah = wujud).                                                       |
| 04 Perjalanan  | ⚠️    | Bab bukti produk utama, komposisinya benar (sebab di kiri, akibat di kanan). Tetapi enam tahap hanya memudar masuk berurutan; tidak ada tahap yang "berjalan", health tidak "menjawab", URL tidak "muncul". Inilah _signature sequence_ yang belum dibangun. Panel analisis di atasnya bagus, tetapi menambah tinggi bab.                                                |
| 05 Terang      | ✅    | Diferensiator terkuat Sakala dan bab terbaik di halaman. Eerie Black beralasan. Tambahan yang layak: potongan log runtime di balik `<details>` supaya "Terang" terbukti, bukan diceritakan.                                                                                                                                                                              |
| 06 Untuk siapa | ⚠️    | Diikat `CLARITY_AMENDMENT.md` #3 — jangan dihapus. Tetapi sebagai bab penuh ia teks belaka. Persona akan lebih hidup sebagai tiga skenario manusia dengan artefak mini (mahasiswa: URL yang dibuka dosen; mentor: satu daftar project peserta) — atau dipadatkan jadi strip tiga kolom tepat setelah kalimat polos di Ambang, supaya "ini untukku?" terjawab lebih awal. |
| 07 Kelanjutan  | ⚠️    | Grafik silsilah bagus. Masalah halus: cabang Dibuka/Dibagikan/Diperbaiki berstatus `available` sementara layanan belum publik; caption "bagian bertanda menyusul belum tersedia" menyiratkan sisanya tersedia. Tidak ada yang tersedia hari ini. Ubah menjadi konsekuensi tanpa status, dengan satu catatan kematangan. Komentar kode masih bilang "Bab 06".             |
| 08 Terbuka     | ✅    | Tujuh fakta sebagai bukti — tepat. Framing sponsor sudah benar dan sekunder. Komentar kode bilang "Bab 07".                                                                                                                                                                                                                                                              |
| 09 Penutup     | ⚠️    | Blok follow jujur dan tanpa dependency. Yang hilang: bukti bahwa project ini _bergerak_. Changelog sudah ada di repo — tiga entri terbaru di sini nol biaya, jujur, dan menjawab "masih hidup nggak project ini?". Evil Martians menemukan _changelog preview_ sebagai sinyal pengembangan aktif yang paling murah.                                                      |

**Angka pembanding:** homepage 1.204 kata, 65 KB HTML, 37 elemen reveal.
Halaman lain 380–520 kata. Target v4: ±800 kata, ≤12 elemen reveal (hanya
artefak), 6 bab.

---

## 3. Audit halaman lain

### 3.1 `/produk` — ✅ cukup, belum hidup

Status per pilar jujur dan berguna. Ia daftar dari daftar; tanpa satu pun
visual. Kandidat utama untuk menerima artefak _design direction_ dari Wave 1
(Create Project, Deployment Detail, Build Logs) begitu aksesnya ada.

### 3.2 `/filosofi` — ✅

Tepat: tujuh prinsip dijelaskan di sini, bukan di homepage. Tidak perlu diubah.

### 3.3 `/roadmap` — ⚠️ verifikasi satu klaim

"Runtime deployment: **sedang diuji**". `MVP.md` menyatakan MVP belum keluar
gate. Bila runtime end-to-end memang sudah dalam pengujian di pilot, status ini
benar; bila belum, ia satu-satunya klaim di situs yang mendahului kenyataan.
**Keputusan (2026-09-17): dikonfirmasi project lead — runtime memang sedang
diuji. Status dibiarkan.**

### 3.4 `/open-source` — ✅ struktur, ⚠️ satu bagian

Stewardship, batas sponsor, domain keputusan, topologi repo: semuanya benar dan
merupakan sinyal entitas SEO terbaik yang dimiliki situs.

Satu temuan struktural dari audit statis: `RepoTopology` memakai `<h4>` di
bawah `<h2>` tanpa `<h3>` — lompatan heading (WCAG 1.3.1, praktik outline).
Ganti ke `<h3>` atau `<p>` berlabel; **jalankan**.

### 3.5 Bagian "Contributor awal" — ❌ hapus dari situs

Jawaban jujur atas pertanyaan project lead: **bagian ini tidak perlu ada di
situs sekarang.**

Alasannya:

- Ia bagian tentang _ketiadaan_. Judulnya "Contributor awal", isinya "nama akan
  dicatat nanti", lalu enam chip area. Pengunjung tidak mendapat apa-apa.
- Ia menjanjikan sesuatu yang tergantung dua hal di luar kendali situs:
  kontribusi nyata dan persetujuan orang.
- `GOVERNANCE.md` di sakala-docs sudah menyebut nama tim secara publik. Jadi
  landing bukan tempat pertama nama itu muncul; ia tidak perlu memikul beban
  itu.

Yang kusarankan:

1. **Simpan `CONTRIBUTORS.md`** di repo. Ia murah, menetapkan kebijakan yang
   baik (nyata + jujur + persetujuan), dan tidak menjanjikan apa pun ke publik.
2. **Ganti bagian di `/open-source` menjadi "Cara berkontribusi"**: tiga jalur
   konkret yang bisa dilakukan hari ini — issue di repo, dokumentasi, uji
   build lokal — masing-masing dengan tautan. Itu bagian tentang _tindakan_,
   bukan tentang daftar yang belum ada.
3. **Nanti**, ketika MVP keluar gate dan ada nama dengan persetujuan, buat
   halaman sendiri "Orang di balik Sakala" — bukan sekadar daftar, tetapi
   peran dan area, sesuai prinsip _Manusia_ dan _Karya memiliki pencipta_.

**Keputusan:** apakah nama tim di `GOVERNANCE.md` sakala-docs dianggap sudah
menyetujui pencantuman publik? Jika ya, langkah 3 bisa lebih cepat.

### 3.6 `/docs` — ✅ struktur, ⚠️ volume

Dua jalur (Pengantar / Teknis) benar. Sepuluh halaman cukup untuk fondasi,
belum cukup untuk query non-brand. `PROJECT_SEO_AUDIT.md` P1 sudah menyebutkan
ini; belum ada yang ditambah sejak Juni. Tiga judul yang layak ditulis lebih
dulu (semuanya jujur tanpa produk jadi):

- "Dari Git ke URL publik: apa saja yang terjadi di antaranya" (intent
  edukasi, memakai enam tahap yang sama dengan homepage).
- "Dockerfile, Railpack, atau manual: bagaimana Sakala memilih builder"
  (ADR-008, sudah punya dasar dokumen).
- "Mengapa health check gagal padahal build berhasil" (Terang sebagai konten).

### 3.7 `/changelog`, `/404`, header, footer — ✅

Tidak ada temuan berarti. Header tanpa CTA "Masuk" adalah keputusan yang
benar. Satu catatan: link GitHub di nav mengarah ke `github.com/gmedia`,
lihat §4.4.

---

## 4. Audit lintas halaman

### 4.1 Kejujuran klaim — ✅ dengan dua catatan

Tidak ada klaim dari daftar larangan `CLARITY_AMENDMENT.md`. Dua hal halus:
status cabang di bab Kelanjutan (§2, bab 07) dan "sedang diuji" di roadmap
(§3.3).

### 4.2 Copy — ✅ suara benar, ⚠️ panjang

Suara sudah Sakala: observasi, bukan slogan. Rasio 70/20/10 terpenuhi. Yang
perlu dipangkas: lead dua kalimat di Jarak, tiga paragraf berturut di Terbuka
(lead + position + human + stewardship — empat blok teks untuk satu bab).
Bahasa Inggris ditulis natif, bukan terjemahan — bagus, pertahankan.

### 4.3 Gerak — ❌ salah sasaran

Sudah dibahas di §0. Ringkas aturannya untuk v4:

```txt
Teks       → tampil statis, tanpa reveal
Artefak    → reveal, lalu berubah keadaan (progress / emerge / transform)
Satu bab   → paling banyak satu hal yang "menjadi"
```

`becoming.ts` sudah benar sebagai mesin; yang berubah hanya _siapa_ yang
memakainya. Ini pekerjaan pengurangan, bukan penambahan.

### 4.4 Entitas dan SEO — ⚠️ satu keputusan governance

- Organisasi GitHub `gmedia` menjadi rumah lima repo Sakala. Ini berlawanan
  halus dengan framing "bukan Sakala by GMEDIA" (`PRD.md` §3) dan melemahkan
  sinyal entitas yang dikejar `PROJECT_SEO_AUDIT.md` P0. Organisasi sendiri
  (`sakala-dev` atau serupa) menyelesaikan keduanya. **Keputusan** project
  lead + GMEDIA; bukan pekerjaan landing.
- Social preview per halaman masih ditunda sejak Juni. Kini halaman sudah
  stabil (6 halaman + docs), satu template statis per halaman murah. Lihat §6.
- FAQ schema tidak perlu dikejar; Google membatasi rich result FAQ sejak 2023.

### 4.5 Aset — ❌ hampir tidak ada

Inventaris `public/`: 3 SVG brand, 1 favicon, 1 OG default, 1 logo sponsor
PNG 720×259 (60 KB — minta SVG). Itu saja. Lihat §6 untuk apa yang bisa
ditambah tanpa melanggar aturan kejujuran.

### 4.6 Performa, aksesibilitas, i18n — ✅

HTML homepage 65 KB, lima berkas font subset, nol dependency runtime. Skip
link, fokus terlihat, status tidak hanya warna, `figure`/`figcaption`,
reduced-motion. Tidak ada temuan yang mendesak. Catatan kecil: 37 elemen
disembunyikan sampai JS berjalan — dengan JS lambat, halaman sesaat "kosong";
memindahkan reveal hanya ke artefak (§4.3) sekaligus menyelesaikan ini.

### 4.7 Pengukuran — ❌ nol

Tanpa analytics, tidak ada cara mengetahui apakah pengunjung sampai ke bab
Perjalanan, mengeklik follow, atau berhenti di hero. **Keputusan:** analytics
self-hosted tanpa cookie (Umami / Plausible) — sejalan dengan prinsip
_Terang_, tidak butuh banner cookie, dan bisa berjalan di runtime yang sama.
Bukan pekerjaan landing, tetapi landing tidak bisa dievaluasi tanpanya.

---

## 5. Arah v4: "Hidup"

Tesis satu baris:

```txt
Identitas tetap. Halaman lebih pendek. Bukti lebih hidup.
```

Tiga prinsip yang menambah paket kreatif (bukan menggantinya):

1. **Artefak berubah keadaan.** Setiap bab punya satu artefak yang, saat masuk
   viewport, _menjadi_ sesuatu — bukan sekadar muncul.
2. **Tingkat abstraksi menurun sepanjang halaman** (dipinjam dari Lattice, §7):
   hero paling abstrak (metafora + satu perjalanan mini), tengah paling teknis
   (tahap, log, port), akhir kembali ke manusia. `NARRATIVE_ARCHITECTURE.md` §6
   sudah menyiratkan ini; v4 menjadikannya eksplisit per bab.
3. **Sembilan bab menjadi enam.** Bab tidak dihapus, tetapi digabung ketika
   dua bab memakai satu artefak.

### 5.1 Struktur yang diusulkan

| v3 (sekarang)         | v4                              | Artefak yang "menjadi"                                                                                                                                                            | Abstraksi     |
| --------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Pita status + 01 + 02 | **01 Kemungkinan**              | Satu artefak dua keadaan: repository → localhost dengan pill "dapat dibuka oleh: kamu". Status jadi chip di hero.                                                                 | tinggi        |
| 03                    | **02 Ambang**                   | Mark **merakit diri** dari geometri aslinya: bentuk atas (source) → ruang negatif → bentuk bawah (wujud). Kalimat polos tetap. Strip persona tiga kolom di bawahnya (§2, bab 06). | tinggi→sedang |
| 04                    | **03 Perjalanan**               | _Signature sequence_: tahap berjalan satu per satu, health berubah `200 · sehat`, URL muncul, halaman mekar. Panel analisis pindah ke `<details>` "lihat hasil analisis".         | rendah        |
| 05                    | **04 Terang**                   | Tetap. Tambah `<details>` potongan log runtime yang menunjuk baris penyebab.                                                                                                      | rendah        |
| 06 + 07               | **05 Kelanjutan**               | Silsilah; cabang tanpa status palsu. Persona sudah naik ke bab 02, atau tetap di sini sebagai tiga skenario mini — **keputusan**.                                                 | sedang        |
| 08 + 09               | **06 Terbuka & apa berikutnya** | Bukti keterbukaan + tiga entri changelog terbaru + blok follow + "Apa yang akan kamu wujudkan?"                                                                                   | tinggi        |

Hero CTA: **primer "Lihat cara kerjanya"** (anchor ke bab 03 — aksi yang
memberi sesuatu segera) · **sekunder "GitHub ↗"**. Blok follow tetap di bab 06
sebagai jaring pengaman (pola _final CTA_ Evil Martians). "Ikuti perkembangan"
sebagai CTA primer dipindah, bukan dihapus.

### 5.2 Kandidat copy (arah, bukan final)

Bahasa Indonesia ditulis dulu; Inggris ditulis natif, bukan diterjemahkan.

| Bab | ID                                                                                                                                       | EN                                                                                                                                            |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 01  | Setiap karya bermula sebagai kemungkinan. _(tetap)_                                                                                      | Every project begins as a possibility.                                                                                                        |
| 01  | sub: Berjalan di laptop bukan berarti dapat dijangkau. Sakala membawa project dari repository Git menjadi aplikasi dengan alamat publik. | Running on a laptop is not the same as being reachable. Sakala takes a project from a Git repository to an application with a public address. |
| 02  | Sakala berdiri di antara kemungkinan dan wujud. _(tetap, membawa brand)_                                                                 | Sakala stands between possibility and presence.                                                                                               |
| 03  | Wujud bukan sekadar build yang berhasil. _(tetap)_                                                                                       | Being live is more than a green build.                                                                                                        |
| 04  | Sederhana tidak harus berarti tersembunyi. _(tetap)_                                                                                     | Simple does not have to mean hidden.                                                                                                          |
| 05  | Deployment bukan akhir perjalanan. _(tetap)_                                                                                             | Deployment is not the end of the story.                                                                                                       |
| 06  | Apa yang akan kamu wujudkan? _(tetap)_                                                                                                   | What will you bring to life?                                                                                                                  |

Headline tidak perlu diganti — reviewer dan audit sepakat headline sudah
tepat. Yang berubah adalah _apa yang ada di bawahnya_.

### 5.3 Yang sengaja tidak diusulkan

- Testimoni, logo institusi, angka pengguna — tidak ada faktanya.
- Waitlist email — butuh layanan eksternal; blok follow sudah jujur.
- Mode gelap penuh — permukaan gelap Sakala ditentukan narasi, bukan
  preferensi.
- Mascot — karakter Sakala datang dari mark dan cara bicara, bukan tokoh.
- Video hero, WebGL, scroll-jacking — dilarang paket kreatif, dan Evil
  Martians tidak menemukannya di halaman berkinerja tinggi mana pun.

### 5.4 Soal gradient dan "berani" (masukan UI/UX)

Saran UI/UX untuk lebih berani bermain gradient **tidak bertabrakan** dengan
arah kreatif. Yang dilarang `ART_DIRECTION.md` §12 spesifik: _gradient blob_
ala SaaS generik, _dark gradient + glow everywhere_ ala Linear, dan _lime eco
gradient_. Situs pun sudah memakai gradient — `threshold-glow`, bloom
_arrival_, Green Line yang memudar — hanya pada opacity 3–12 %.

Prinsipnya: **gradient = sesuatu sedang menjadi.** Gradient adalah transisi
antara dua keadaan, dan itu persis konsep halaman ini.

| Tempat          | Sekarang                                  | Versi berani yang tetap bermakna                                                                                      |
| --------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Ambang          | Dibelah keras di 48 % (`threshold-split`) | Gradient vertikal full-bleed canvas → deep teal; penyeberangan terlihat sebagai warna sebelum dibaca                  |
| Perjalanan      | Garis tahap abu statis                    | Garis yang _terisi_ teal mengikuti tahap; di bab Terang berhenti pada tahap yang gagal                                |
| Wujud / arrival | Bloom radial samar                        | Bloom lebih tegas; satu-satunya tempat teal paling terang muncul                                                      |
| Mark            | Satu warna                                | Stroke gradient ink → teal dari bentuk atas (source) ke bentuk bawah (wujud), sesuai Filosofi Mark di `PHILOSOPHY.md` |
| Burnt Orange    | Hampir tak terlihat                       | Percikan kecil bergradien di titik niat manusia: commit pertama, "I built this."                                      |

Yang tetap tidak: mesh gradient di hero (Kemungkinan harus netral, teal
_masuk_ di Ambang), gradient pada teks, dan gradient dari ramp yang belum ada
di Figma (orange dan black) — jadi hanya keluarga teal + netral.

Catatan untuk diskusi dengan UI/UX: **berani ≠ ramai.** Lattice "lead
confidently" lewat _skala_ (hero besar, satu momen full-bleed) dan _kontras_
(bab gelap vs terang), bukan lewat jumlah efek. Bila tiap bab bergradien,
Ambang berhenti menjadi momen.

---

## 6. Aset yang membuat hidup — semuanya jujur

Diurutkan menurut dampak ÷ usaha. Klasifikasi mengikuti
`PRODUCT_ARTIFACTS.md` §9.

| #   | Aset                                                                                                             | Klasifikasi      | Usaha | Butuh dari project lead                                                          |
| --- | ---------------------------------------------------------------------------------------------------------------- | ---------------- | ----- | -------------------------------------------------------------------------------- |
| 1   | **Signature sequence** deployment (CSS keyframes bertahap; reduced-motion → keadaan akhir statis)                | conceptual       | S     | —                                                                                |
| 2   | **Mark yang merakit diri** di Ambang, dari geometri `sakala-mark.svg` yang sebenarnya                            | conceptual       | S     | Konfirmasi boleh memakai mark dalam animasi (`ART_DIRECTION.md` §10 mengizinkan) |
| 3   | **Changelog terbaru** di bab penutup (3 entri dari collection)                                                   | actual           | XS    | —                                                                                |
| 4   | **Artefak UI Console** dari Figma Wave 1, dibangun ulang sebagai HTML/SVG sederhana, berlabel _design direction_ | design direction | M     | **Akses Figma yang benar** — file yang tercantum hanya berisi cover              |
| 5   | **Potongan log** build/runtime dengan bentuk keluaran Railpack yang realistis                                    | conceptual       | S     | Satu contoh keluaran nyata dari tim runtime jika sudah ada                       |
| 6   | **OG image per halaman** (template statis: judul + mark + kisi kemungkinan)                                      | actual           | S     | —                                                                                |
| 7   | **Logo sponsor SVG** pengganti PNG 60 KB                                                                         | actual           | XS    | Berkas SVG dari GMEDIA                                                           |
| 8   | **Ilustrasi dari sistem mark**: bracket `<` `>` dan dua node sebagai penanda bab, pengganti angka 01–06          | conceptual       | S     | —                                                                                |
| 9   | Foto nyata (workshop, tim)                                                                                       | actual           | —     | Hanya jika ada dan disetujui; **jangan** stok foto                               |

Aset 4 adalah yang paling mengubah rasa halaman — pola yang sama dipakai
Strapi dan Lattice. Syaratnya keras: label _design direction_ terlihat, bukan
screenshot mentah, dan tidak pernah tampil seolah produk sudah berjalan.

---

## 7. Referensi desain

Format mengikuti `REFERENCE_NOTES.md`. Asumsi: "lattchi" yang disebut project
lead = **Lattice** (lattice.com). Bila yang dimaksud lain, bagian itu diganti.

### 7.1 Strapi — strapi.io

Struktur saat ini: hero "Open-Source Content Framework…" + CTA perintah CLI
`npx create-strapi-app@latest` + demo; lalu "More than a CMS" (tiga pilar),
screenshot produk dalam bingkai, kartu fitur berikon, deployment/hosting,
enterprise, tiga testimoni, lencana kepercayaan (MIT, SOC 2, GDPR).

**Prinsip yang dipinjam:**

- Satu kalimat kategori yang tegas ("More than a CMS") tepat setelah hero —
  Sakala sudah punya kalimat polos di Ambang; v4 menaikkannya ke subheadline
  hero.
- Screenshot produk dalam bingkai browser sebagai bukti — untuk Sakala hanya
  sebagai _design direction_ berlabel.
- Lencana kepercayaan yang faktual (lisensi, keterbukaan) — Sakala sudah
  punya tujuh fakta; pertahankan.
- Terang, satu aksen, banyak ruang — sudah sejalan.

**Yang sengaja tidak ditiru:** CTA perintah CLI (CLI Sakala belum ada —
Horizon F), testimoni, logo pelanggan, bagian enterprise, ungu.

### 7.2 Lattice — lattice.com dan design.lattice.com

Redesign 2023 (artikel "Redesigning Lattice.com"): empat prinsip — _tell a
better-together story_, _show in addition to tell_, _storytelling guides
navigation_, _lead confidently_. Hero diganti "staircase modular grid" yang
memperlihatkan seluruh platform sekaligus, dengan animasi produk. 85 layar
produk dibangun ulang dengan **tingkat abstraksi**: sangat abstrak untuk
konten pembuka, makin teknis saat pesan mendalam. Halaman dipendekkan, copy
lebih tajam. Hijau sebagai warna jangkar.

**Prinsip yang dipinjam:**

- **Tingkat abstraksi yang menurun** — jadi prinsip 2 di §5.
- **Show in addition to tell** — jadi prinsip 1 di §5.
- Hero memperlihatkan **keseluruhan** sekilas — hero v4 memuat perjalanan
  mini, bukan satu berkas.
- Halaman lebih pendek dengan pesan lebih tajam — 9 → 6 bab.
- Hijau sebagai jangkar tanpa membanjiri — sudah sejalan dengan
  `ART_DIRECTION.md` §4.

**Yang sengaja tidak ditiru:** palet yang diperluas ke seluruh roda warna
(Sakala hanya memakai ramp kanonik), testimoni bermetrik, navigasi 19 produk,
fotografi korporat.

### 7.3 Evil Martians — studi 100 landing dev tool (2025)

Temuan yang relevan dan terukur:

- Hero terpusat mendominasi; dual CTA dengan kata kerja spesifik ("Start
  building" mengalahkan "Get started").
- Storytelling berorientasi masalah paling efektif; daftar fungsi paling
  lemah. Sakala sudah di kategori terkuat.
- _Changelog preview_ sebagai sinyal pengembangan aktif — aset #3.
- Final CTA sebagai jaring pengaman, blok penuh lebar terpisah — bab 06.
- Tidak ada animasi mencolok di halaman berkinerja tinggi.

### 7.4 Laws of UX — lawsofux.com

Disebut UI/UX sebagai acuan. Ia bukan gaya visual, melainkan 30 heuristik
psikologi yang cocok dipakai untuk _memilih_ antar opsi. Yang paling relevan
untuk v4:

- **Von Restorff** — satu hal yang berbeda per viewport; alasan 9 → 6 bab
  dan satu momen gradient, bukan lima.
- **Hick's Law** — satu CTA primer; "Ikuti perkembangan" tidak boleh bersaing
  dengan tiga tautan lain di hero.
- **Selective Attention** — pita status di atas header diabaikan seperti
  banner; chip di dalam hero lebih terbaca.
- **Peak-End** — bab Wujud ("Here it is.") dan penutup adalah puncak dan
  akhir; di sanalah gerak dan kehangatan dibelanjakan.
- **Doherty Threshold** — 37 elemen reveal yang menunggu JS membuat halaman
  sesaat kosong; teks harus tampil statis.
- **Jakob's Law** — nav Produk/Dokumentasi/GitHub di posisi konvensional
  sudah benar; jangan diinovasi.

Skill `uiux-research-backed` di `~/.agents/skills` kini memuat ke-30 hukum
ini dengan penerapannya (`references/01_LAWS_OF_UX.md`).

### 7.5 Referensi kategori tambahan

| Situs       | Pelajari                                                                      | Jangan tiru                                       |
| ----------- | ----------------------------------------------------------------------------- | ------------------------------------------------- |
| Coolify     | Framing open-source berbasis nilai ("free forever, backed by our philosophy") | 14 blok fitur tanpa visual; menyebut pesaing      |
| PostHog     | Kejujuran sebagai brand ("97% pay $0"); karakter lewat suara                  | Mascot; humor yang tidak cocok dengan nada Sakala |
| Astro       | Situs OSS yang ramah, docs-first, komunitas di depan                          | Ilustrasi luar angkasa                            |
| Railway     | Produk (canvas) sebagai visual hero                                           | Gelap penuh, gradien                              |
| Resend, Zed | Sudah ada di `REFERENCE_NOTES.md`; tetap relevan                              | —                                                 |

Sumber:

- https://strapi.io/
- https://lattice.com/
- https://design.lattice.com/articles/redesigning-lattice-com
- https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025
- https://coolify.io/
- https://posthog.com/
- https://lawsofux.com/

---

## 8. Daftar keputusan project lead

Dijawab 2026-09-17.

- [x] **Contributor awal**: hapus dari situs, ganti "Cara berkontribusi",
      simpan `CONTRIBUTORS.md` (§3.5)
- [ ] Nama tim di `GOVERNANCE.md` sakala-docs = sudah setuju tampil publik?
      — belum relevan selama bagian contributor dihapus; ditunda
- [x] UI Console Wave 1 boleh tampil sebagai _design direction_ berlabel —
      **ya**; link Figma menyusul (lihat §10)
- [x] Persona: **strip tiga kolom di Ambang**, tepat setelah kalimat polos
      (§5.1)
- [x] "Runtime deployment: sedang diuji" di roadmap — **benar**, dibiarkan
      (§3.3)
- [ ] Organisasi GitHub sendiri untuk Sakala (§4.4) — belum diputuskan
- [ ] Analytics self-hosted tanpa cookie (§4.7) — belum diputuskan
- [x] "lattchi" = **Lattice** — dikonfirmasi (§7)
- [x] v4 = **edit terarah** 9 → 6 bab, bukan rebuild (§0)
- [x] **Mulai eksekusi** — dimulai 2026-09-17 di branch `feat/landing-v4`
      setelah aset Figma dibaca (§10)

## 9. Urutan pengerjaan bila disetujui

Mengikuti `AI_AGENT_PLAYBOOK.md`; dokumen ini adalah Phase 0 (Audit).

```txt
1. Gerak dipindah dari teks ke artefak          (pengurangan; ½ hari)
2. Struktur 9 → 6 bab, copy dipangkas           (1 hari)
3. Aset #1 signature sequence + #2 mark          (1–2 hari)
4. Aset #3 changelog terbaru + #6 OG per halaman (½ hari)
5. Contributor awal → Cara berkontribusi        (½ hari)
6. Aset #4 UI Console design direction          (setelah akses Figma; 2 hari)
7. Verifikasi: format:check, check, build,
   320/768/1280, keyboard, reduced-motion, ID/EN
8. Perbarui PROJECT_LANDING_BUILD.md + changelog
```

Setelah langkah 1–5, homepage sudah terasa berbeda tanpa satu pun aset baru
dari luar repo. Langkah 6 adalah lompatan berikutnya dan bergantung pada
keputusan #3.

---

## 10. Figma Wave 1 — sudah dibaca (2026-09-17)

Empat section diberikan project lead dan dibaca lewat Figma MCP. Node ID
dicatat supaya bisa dibuka ulang tanpa ekspor manual.

| Section           | Node        | Isi                                                                                                        |
| ----------------- | ----------- | ---------------------------------------------------------------------------------------------------------- |
| Deployment detail | `724:1713`  | 3 layar: sedang berjalan (`724:1714`), berhasil (`724:2078`), gagal (`724:2443`)                           |
| Create Project    | `1259:1491` | Alur 3 langkah: Repository → Auto detect (`1259:2398`) → Deploy sukses (`1259:2918`) / gagal (`1259:3070`) |
| Dashboard         | `1037:2984` | Empty state, error state, daftar project berkartu dengan status Live/Failed/Deploying/Belum deploy         |
| Project detail    | `1493:4172` | Header project + URL, tab Riwayat Deployment / Environment Variables / Settings, dialog hapus              |

### 10.1 Grammar Console yang akan dipinjam landing

Inilah yang membuat artefak landing dan Console "terasa satu keluarga"
(`ART_DIRECTION.md` §2):

```txt
Banner status     lingkaran ikon berwarna + judul tebal + satu baris penjelas
                  (hijau ✓ berhasil · oranye ↻ berjalan · merah ✕ gagal)
Strip meta        Commit a3f21c9 · Branch main · Trigger … · Dimulai/Selesai/Gagal pada hh:mm:ss
Timeline          lingkaran 32px (✓ hijau / ✕ merah / abu kosong) + nama tahap + timestamp
Panel log         latar #1E1E1D, baris [hh:mm:ss] pesan; timestamp merah pada baris error
Kartu analisis    baris label/nilai, nilai monospace tebal; "Dockerfile terdeteksi" dengan ✓
Kotak URL         latar primary-50 #E7F1F1, ikon link, teks monospace teal
Momen live        ✓ besar di kotak teal muda, "Proyekmu sudah live", URL + tombol salin,
                  "Lihat detail proyek" / "Buka situs →"
```

Token yang terbaca dari file: primary `#0F766E`, primary-50 `#E7F1F1`,
BG `#F1F3F2` / `#FBFBFB`, black `#1E1E1D`, success `#39DA8A` / `#248A57`,
error BG `#F9E5E1` / darker `#833222`, border `#EDEDED`. Tipografi:
Montserrat untuk semua peran, termasuk body dan log.

### 10.2 Pemetaan ke bab v4 dan klasifikasinya

| Bab v4         | Artefak                                                                                | Sumber Figma             | Klasifikasi      |
| -------------- | -------------------------------------------------------------------------------------- | ------------------------ | ---------------- |
| 01 Kemungkinan | Repository → localhost (tetap milik landing)                                           | —                        | conceptual       |
| 02 Ambang      | Mark merakit diri                                                                      | —                        | conceptual       |
| 03 Perjalanan  | **Timeline deployment** yang berjalan tahap demi tahap, lalu **momen live** dengan URL | `724:1714` → `1259:2918` | design direction |
| 03 (details)   | **Kartu analisis** "Sakala membaca proyekmu": Repository / Branch / Builder / Port     | `1259:2398`              | design direction |
| 04 Terang      | **Banner gagal + timeline ✕ pada satu tahap + panel log** dengan baris merah           | `724:2443`, `1259:3070`  | design direction |
| 05 Kelanjutan  | Silsilah (tetap milik landing)                                                         | —                        | conceptual       |
| `/produk`      | Kartu project dashboard (Live / Failed / Deploying) dan header project + URL           | `1037:2984`, `1493:4172` | design direction |

Setiap artefak berlabel _design direction_ dibangun ulang sebagai HTML/CSS
dengan token landing (bukan screenshot), diberi `note` di `ArtifactFigure`,
dan tidak pernah tampil sebagai produk yang sudah berjalan. Chrome Console
(sidebar, profil, breadcrumb) **tidak** ikut — hanya inti artefaknya.

### 10.3 Ketidaksesuaian yang perlu diselaraskan

Ditemukan saat membaca; bukan penghalang, tetapi harus diputuskan supaya
landing dan Console tidak saling bertentangan di depan pengunjung.

| #   | Temuan                                                                                                                                                                                                                                                                                    | Usulan                                                                                                                                                                                                                                         | Siapa              |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| 1   | **Nama tahap berbeda.** Console: 5 tahap (Cloning repository · Menganalisis proyek · Building image · Deploy container · Health check - live). Landing: 6 (Repository · Analyze · Build · Start · Health · Reach). PRD §6.2 memakai queue/clone/analyze/prepare/build/start/route/health. | Landing v4 memakai **nama tahap Console** supaya pengunjung melihat kata yang sama saat nanti memakai produk. "Reach" tetap ada sebagai _hasil_ (momen URL), bukan tahap.                                                                      | landing (kerjakan) |
| 2   | **Bahasa campur di Console**: "Cloning repository" / "Menganalisis proyek" / "Health check - live" dalam satu daftar.                                                                                                                                                                     | Landing menulis natif per bahasa (ID: "Mengambil repository / Membaca proyek / Membangun image / Menjalankan container / Memeriksa kesehatan"; EN: "Clone / Analyze / Build / Start / Health check"). Sarankan UI/UX menyeragamkan di Console. | UI/UX              |
| 3   | **Log memakai Montserrat**, bukan monospace.                                                                                                                                                                                                                                              | Landing tetap monospace untuk log (`PRODUCT_ARTIFACTS.md` §2, `ART_DIRECTION.md` §6). Sarankan UI/UX mempertimbangkan mono untuk log di Console.                                                                                               | UI/UX              |
| 4   | **Teks sekunder `#A2A2A2`** di atas `#FBFBFB` ≈ 2,5:1 — gagal WCAG AA (butuh 4,5:1). Dipakai untuk timestamp dan label.                                                                                                                                                                   | Landing memakai `--color-muted` (`#5C5C58`, 6,5:1). Sarankan UI/UX menaikkan token _Secondary - Text Color_ di Console.                                                                                                                        | UI/UX              |
| 5   | **Slug dengan spasi**: `Sakala 2.run.sakala.dev` di mockup.                                                                                                                                                                                                                               | Landing memakai `portfolio.run.sakala.dev` (sudah). Catatan kecil untuk UI/UX: slug harus `sakala-2`.                                                                                                                                          | UI/UX              |
| 6   | **Ramp Burnt Orange belum ada**; oranye di Console (status "Deploying") memakai nilai yang tidak terlihat sebagai token bernama.                                                                                                                                                          | Gradient §5.4 tetap keluarga teal + netral. Tidak ada shade oranye yang dikarang.                                                                                                                                                              | —                  |

### 10.4 Status kesiapan

Dengan §8 terjawab dan §10 terisi, **eksekusi langkah 1–5 di §9 tidak lagi
menunggu apa pun**, dan artefak _design direction_ (langkah 6) kini bisa
dikerjakan di iterasi yang sama. Menunggu aba-aba project lead untuk
membuka branch `feat/landing-v4`.

---

## 11. Catatan eksekusi (2026-09-17)

Semua langkah §9 dikerjakan dalam satu iterasi di branch `feat/landing-v4`,
karena aset Figma sudah tersedia sebelum eksekusi dimulai.

| Langkah                                  | Status | Catatan                                                                                                                                                                                                                                                                                   |
| ---------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 Gerak dipindah dari teks ke artefak    | ✓      | 37 → 8 elemen `.becoming`, 3 urutan                                                                                                                                                                                                                                                       |
| 2 Struktur 9 → 6 bab, copy dipangkas     | ✓      | Kamus `home` ditulis ulang di dua bahasa; jumlah kata tidak turun karena artefak membawa teks produk                                                                                                                                                                                      |
| 3 Signature sequence + mark merakit diri | ✓      | CSS + `data-sequence`; keadaan tahap dihitung dari urutan; tanpa JS semua selesai                                                                                                                                                                                                         |
| 4 Changelog terbaru + OG per halaman     | ✓      | `scripts/og/generate.mjs`, 12 PNG, `src/data/og.ts`                                                                                                                                                                                                                                       |
| 5 Cara berkontribusi + heading fix       | ✓      | Sekaligus memperbaiki kebocoran bahasa di `/en/open-source`                                                                                                                                                                                                                               |
| 6 Artefak UI Console design direction    | ✓      | Analisis, deployment, kegagalan (beranda); kartu project (`/produk`)                                                                                                                                                                                                                      |
| 7 Verifikasi                             | ✓      | `format:check`, `check`, `build`, `audit_html.py`, `contrast.py` lulus; screenshot headless 1440/390 px + keadaan tengah animasi diperiksa. Temuan visual (bloom bocor ke kotak URL, overflow kolom arrival di mobile, kisi penutup terpotong, centang di tahap belum selesai) diperbaiki |
| 8 Dokumentasi + changelog                | ✓      | `PROJECT_LANDING_BUILD.md` ditulis ulang; entri changelog 0.7.0 dua bahasa                                                                                                                                                                                                                |

Yang berubah dari rencana §5.1: panel analisis tetap terlihat di samping
lead, bukan di balik `<details>` — ia menjawab pertanyaan "stack apa" yang
diikat `CLARITY_AMENDMENT.md` #4 dan tidak layak disembunyikan.

Yang tersisa sebelum PR di-merge: uji di perangkat nyata, keyboard, dan
pembaca layar; screenshot headless tidak menggantikan itu.
