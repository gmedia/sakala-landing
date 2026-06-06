# Sakala Landing Project Design Context

Dokumen ini adalah guideline UI/UX khusus untuk `sakala-landing`. Gunakan
bersama guideline global pada `~/.codex/GLOBAL_UIUX_GUIDELINES.md` ketika
membuat, mengubah, atau meninjau antarmuka proyek ini.

Guideline global menjelaskan prinsip UI/UX umum. Dokumen ini menetapkan
bagaimana prinsip tersebut diterapkan untuk produk, brand, konten, dan
arsitektur Sakala Landing.

Urutan prioritas ketika aturan bertentangan:

```txt
1. Kejelasan dan kebutuhan pengguna
2. Kejujuran terhadap kematangan produk
3. Aksesibilitas dan responsivitas
4. Aturan brand dan desain Sakala di dokumen ini
5. Konsistensi dengan pola yang sudah ada
6. Eksperimen atau dekorasi visual
```

Jangan mengubah keputusan brand utama dalam dokumen ini tanpa persetujuan
eksplisit.

---

## 1. Product Summary

Sakala adalah platform deployment open-source yang sedang dibangun untuk
membantu project tugas, portfolio, demo, kelas, komunitas, dan tim kecil
berpindah dari repository Git menuju URL publik dengan proses yang mudah
dipahami.

`sakala-landing` memiliki tiga fungsi utama:

1. Menjelaskan masalah dan arah produk Sakala.
2. Menjadi pintu masuk menuju dokumentasi dan perkembangan proyek.
3. Menjadi entry point SEO publik untuk ekosistem Sakala.

Situs ini bukan dashboard, control plane, atau runtime deployment. Situs harus
tetap ringan, statis, dan fokus pada komunikasi.

Domain produk:

| Tujuan                    | Domain             |
| ------------------------- | ------------------ |
| Website dan dokumentasi   | `sakala.dev`       |
| Control plane / dashboard | `app.sakala.dev`   |
| Aplikasi hasil deployment | `*.run.sakala.dev` |

---

## 2. Product Maturity and Honesty

Sakala masih berada pada tahap pengembangan aktif. Landing page tidak boleh
membuat pengguna mengira bahwa layanan deployment production sudah tersedia.

Aturan wajib:

- Jelaskan status produk secara terlihat, bukan hanya di FAQ atau footer.
- Gunakan istilah seperti `masih dibangun`, `pengembangan aktif`,
  `sedang diuji`, atau `roadmap` sesuai konteks.
- Jangan memakai CTA seperti `Deploy Sekarang`, `Mulai Gratis`, atau
  `Buat Project` sebelum alurnya benar-benar tersedia.
- CTA utama saat ini harus mengarah pada tindakan yang benar-benar dapat
  dilakukan, terutama membaca dokumentasi, mengikuti perkembangan, atau
  melihat repository.
- Jangan mengklaim Sakala siap production, enterprise-grade, highly available,
  aman untuk workload sensitif, atau menggantikan cloud enterprise.
- Mockup produk harus terbaca sebagai ilustrasi arah atau konsep, bukan bukti
  fitur production yang sudah tersedia.

Kejujuran produk lebih penting daripada conversion copy yang agresif.

---

## 3. Target Users

### 3.1 Pengguna Utama

- Mahasiswa yang ingin membagikan tugas atau portfolio sebagai aplikasi hidup.
- Dosen dan pengajar yang ingin membuka hasil kerja tanpa clone dan setup
  repository satu per satu.
- Developer pemula yang ingin memahami deployment secara bertahap.

### 3.2 Pengguna Pendukung

- Komunitas yang mengadakan workshop atau sesi belajar.
- Builder dan tim kecil yang membutuhkan demo atau prototype publik.
- Contributor open-source yang ingin memahami dan membantu ekosistem Sakala.

### 3.3 Kondisi Pengguna

Asumsikan sebagian pengguna:

- memahami Git dan repository pada tingkat dasar;
- belum percaya diri dengan VPS, SSL, reverse proxy, Docker, atau networking;
- membuka situs melalui perangkat mobile;
- ingin tahu apakah produk sudah bisa dipakai sebelum membaca detail teknis;
- membutuhkan bahasa yang ramah tanpa dibuat merasa kurang teknis.

Jangan mengasumsikan seluruh pengguna sudah memahami jargon infrastruktur.

---

## 4. User Goals

Setiap halaman harus membantu satu tujuan utama.

| Halaman            | Tujuan utama pengguna                              |
| ------------------ | -------------------------------------------------- |
| Landing page       | Memahami Sakala, statusnya, dan langkah berikutnya |
| Tentang Sakala     | Memahami tujuan, ownership, status, dan ekosistem  |
| Dokumentasi index  | Menentukan topik awal yang perlu dibaca            |
| Dokumentasi detail | Memahami satu konsep atau alur secara akurat       |
| Changelog          | Melihat perkembangan nyata dan terbaru             |
| 404                | Kembali ke halaman yang berguna tanpa kebingungan  |

Pertanyaan yang harus terjawab dari landing page:

```txt
Apa itu Sakala?
Masalah apa yang dibantu?
Untuk siapa produk ini?
Bagaimana arah cara kerjanya?
Apakah sudah bisa dipakai?
Apa yang dapat saya lakukan sekarang?
```

---

## 5. Primary Actions

Gunakan satu tindakan utama yang dominan per section.

Prioritas CTA Sakala Landing saat produk masih dikembangkan:

```txt
Primary   : Baca Dokumentasi
Secondary : Lihat Repository
Tertiary  : Masuk ke Dashboard
```

Aturan CTA:

- CTA harus menjelaskan tujuan, bukan memakai label generik seperti
  `Selengkapnya`, `Klik di sini`, atau `Mulai`.
- Jangan membuat beberapa tombol terlihat sama dominan.
- Jangan menonjolkan dashboard melebihi dokumentasi selama alur deployment
  publik belum siap.
- External link harus menggunakan perilaku dan atribut yang konsisten.
- Final CTA harus mengajak tindakan yang tersedia dan relevan dengan isi
  halaman.

---

## 6. Tone of Voice

Copy pengguna menggunakan Bahasa Indonesia, kecuali nama teknis, command,
domain, nama repository, atau badge yang memang perlu dipertahankan.

Karakter suara Sakala:

```txt
jelas
ramah
jujur
hangat
conversational
tidak menggurui
teknis saat diperlukan
```

Gunakan:

- kalimat pendek dan langsung;
- istilah teknis yang diberi konteks;
- kata `kamu` untuk komunikasi ringan;
- contoh konkret seperti tugas, portfolio, demo, repository, dan URL publik;
- penjelasan yang membedakan fitur tersedia, arah produk, dan rencana.

Hindari:

- hype seperti `revolusioner`, `tanpa batas`, `enterprise-ready`, atau
  `deployment dalam satu klik`;
- jargon SaaS tanpa makna;
- campuran Bahasa Indonesia dan Inggris yang tidak diperlukan;
- candaan yang mengurangi kejelasan;
- copy yang meremehkan pengguna pemula;
- klaim absolut seperti `tanpa konfigurasi`, bila tetap ada proses atau batasan.

Istilah yang perlu konsisten:

| Gunakan                           | Hindari bila tidak diperlukan |
| --------------------------------- | ----------------------------- |
| project                           | proyek/project bergantian     |
| deployment / deploy               | publish, release, launch      |
| repository atau repo              | source acak                   |
| URL publik atau link              | endpoint publik               |
| dashboard                         | panel/admin bergantian        |
| masih dibangun/pengembangan aktif | production-ready              |

---

## 7. Brand Personality

Sakala harus terasa seperti alat belajar dan developer tool yang terbuka,
bukan produk korporat yang dingin atau template SaaS generik.

Kepribadian brand:

```txt
terbuka
membumi
optimistis tetapi realistis
ramah untuk belajar
teknis tanpa intimidasi
rapi tanpa terasa steril
```

Pengguna harus merasa:

```txt
Saya memahami apa yang ditawarkan.
Saya tahu produk ini masih dibangun.
Saya bisa mempelajari prosesnya.
Saya tahu langkah yang bisa dilakukan sekarang.
```

---

## 8. Visual Direction

Arah visual wajib:

- light-first;
- bersih dan hangat;
- aksen teal sebagai identitas utama;
- ritme editorial untuk developer muda;
- tekstur kertas dan grid yang halus;
- ilustrasi teknis sederhana berbasis HTML, CSS, atau SVG;
- card dan section dengan hierarki yang jelas;
- sedikit aksen warm untuk catatan atau perhatian non-kritis.

Visual khas Sakala:

- alur node menuju browser/app window;
- deployment receipt;
- status strip;
- paper card;
- editorial grid;
- garis putus-putus, label monospace, dan detail teknis kecil yang mendukung
  pemahaman.

Hindari:

- dark cyberpunk;
- neon atau AI glow;
- glassmorphism berlebihan;
- gradient warna-warni tanpa fungsi;
- dashboard palsu yang kompleks;
- ilustrasi stock generik;
- layout template SaaS yang dapat dipakai produk apa pun tanpa perubahan;
- dekorasi yang mengalahkan headline atau CTA;
- terlalu banyak card, rotasi, shadow, badge, atau elemen mengambang.

Visual harus membantu menjelaskan konsep deployment, bukan sekadar mengisi
ruang.

---

## 9. Color System

Gunakan token warna yang sudah didefinisikan di `src/styles/global.css`.
Jangan menambahkan warna hardcoded baru tanpa alasan yang jelas.

Peran warna utama:

| Peran        | Token utama                                                 |
| ------------ | ----------------------------------------------------------- |
| Background   | `background`, `background-soft`                             |
| Surface      | `surface`, `surface-elevated`                               |
| Teks         | `ink`, `muted`, `muted-2`                                   |
| Brand/CTA    | `primary`, `primary-dark`, `primary-soft`, `primary-soft-2` |
| Aksen hangat | `warm`, `accent-soft`                                       |
| Status       | `success`, `warning`, `error`, `info`                       |
| Kode gelap   | `terminal`, `terminal-soft`, `terminal-text`                |

Aturan:

- Teal adalah warna brand dan tindakan utama.
- Warm accent digunakan hemat untuk catatan atau perhatian, bukan CTA utama.
- Status selalu memiliki label teks; warna atau dot tidak boleh menjadi
  satu-satunya penjelas.
- Background gelap hanya untuk konteks teknis seperti code block atau terminal,
  bukan arah visual utama halaman.
- Pastikan teks penting tetap memiliki kontras yang kuat.

---

## 10. Typography

Gunakan font sans yang sudah ditetapkan proyek. Monospace hanya digunakan untuk:

- command;
- domain dan URL teknis;
- repository;
- status teknis ringkas;
- log, kode, ID, atau metadata.

Aturan hierarki:

- Hero headline boleh ekspresif dan besar, tetapi harus tetap terbaca pada
  layar 320px.
- Section title harus lebih dominan daripada eyebrow atau label.
- Body copy menggunakan line-height longgar dan lebar baca terbatas.
- Jangan membuat semua teks tebal.
- Jangan memakai monospace untuk paragraf biasa.
- Dokumentasi harus mengutamakan kenyamanan membaca dibanding ekspresi visual
  landing page.

---

## 11. Layout and Page Rhythm

### 11.1 Landing Page

Landing page mengikuti alur pemahaman berikut:

```txt
Hero dan arah produk
Status pengembangan
Masalah pengguna
Cara kerja
Use cases
Prinsip open source
Roadmap
FAQ
Final CTA
```

Perubahan urutan harus memiliki alasan user journey yang jelas.

Aturan:

- Gunakan whitespace untuk memisahkan perubahan topik.
- Variasi bento dan asymmetry boleh dipakai, tetapi tidak boleh mengganggu
  urutan baca.
- Jangan menambah section hanya untuk memenuhi panjang halaman.
- Proof atau status harus faktual; jangan menggunakan testimonial, logo
  pelanggan, atau metrik yang belum nyata.

### 11.2 Documentation

Dokumentasi menggunakan pola F dan harus terasa lebih tenang daripada landing
page.

- Prioritaskan judul, ringkasan, heading, prose, code block, tabel, dan
  previous/next navigation.
- Sidebar harus menunjukkan lokasi pengguna.
- Struktur heading harus berurutan.
- Line length harus nyaman.
- Tabel dan ordered list harus tetap terbaca pada mobile.
- Dekorasi editorial tidak boleh mengganggu pembacaan teknis.

### 11.3 Changelog

- Urutkan pembaruan terbaru terlebih dahulu.
- Tampilkan versi, tanggal, judul, dan deskripsi secara mudah dipindai.
- Gunakan changelog untuk perkembangan nyata, bukan copy promosi.

### 11.4 Error Page

- Jelaskan bahwa halaman tidak ditemukan.
- Berikan satu tindakan pemulihan yang jelas.
- Jangan menggunakan humor yang menyembunyikan masalah.

---

## 12. Component Rules

Gunakan komponen yang sudah ada sebelum membuat pola baru:

```txt
Button
Badge
Card
Container
SectionHeader
SiteHeader
SiteFooter
DocsSidebar
DocsMobileNav
DocsNav
```

Aturan komponen:

- Jangan membuat variasi button baru hanya untuk satu section bila variant yang
  ada sudah cukup.
- Gunakan `Container` untuk menjaga alignment horizontal konsisten.
- Gunakan `SectionHeader` untuk pola heading section standar.
- Card harus mengelompokkan konten yang benar-benar berdiri sendiri.
- Pertahankan radius, border, dan shadow ringan yang konsisten.
- Komponen visual produk seperti `DeploymentReceipt`, `FlowPath`, dan
  `StatusStrip` harus tetap menjelaskan konsep, bukan menjadi dekorasi abstrak.
- Interaksi sederhana menggunakan semantic HTML seperti `details` dan
  `summary`.

Sebelum menambah komponen, jawab:

```txt
Apakah pola ini sudah ada?
Apakah komponen baru mengurangi duplikasi nyata?
Apakah tetap dapat dirender statis?
Apakah bekerja dengan copy yang lebih panjang?
Apakah bekerja di mobile dan keyboard?
```

---

## 13. Navigation

Navigasi utama harus singkat dan stabil.

Prioritas saat ini:

```txt
Dokumentasi
Changelog
GitHub
Masuk
```

Aturan:

- Jangan menambah item navigasi untuk section landing yang tidak penting.
- Nama menu harus menjelaskan tujuan.
- Mobile navigation harus tetap dapat digunakan tanpa JavaScript client.
- Dokumentasi harus memiliki current state dan previous/next navigation yang
  konsisten.
- External destination harus jelas dari label atau konteksnya.

---

## 14. Status and Technical Information

Status Sakala harus spesifik dan mudah dipahami.

Gunakan status seperti:

```txt
siap
sedang dibangun
sedang diuji
berikutnya
belum tersedia
```

Hindari status yang ambigu seperti:

```txt
done
processing
soon
aktif
```

kecuali konteks komponen membuat artinya benar-benar jelas.

Informasi teknis seperti build time, mode idle, command, atau domain boleh
ditampilkan sebagai contoh. Pastikan tidak terbaca sebagai metrik atau jaminan
layanan nyata bila belum tersedia.

---

## 15. Accessibility

Minimum requirement untuk setiap perubahan UI:

- Gunakan semantic HTML yang sesuai.
- Struktur heading harus berurutan dan tidak dipilih hanya berdasarkan ukuran.
- Semua tindakan harus dapat digunakan dengan keyboard.
- Focus state harus terlihat.
- Tautan harus dapat dibedakan dari teks biasa.
- Status tidak boleh disampaikan melalui warna saja.
- Ilustrasi dekoratif memakai `aria-hidden="true"` atau alt kosong.
- Gambar informatif memiliki alt text Bahasa Indonesia yang bermakna.
- Target sentuh penting minimal sekitar 44px pada mobile.
- `details` dan `summary` harus memiliki label yang jelas.
- Animasi harus menghormati `prefers-reduced-motion`.
- Jangan menaruh informasi penting hanya pada hover.
- Kontras teks `muted` tetap harus diperiksa pada background yang digunakan.

Untuk perubahan besar, periksa alur menggunakan keyboard dan viewport mobile,
bukan hanya screenshot desktop.

---

## 16. Responsive Behavior

Situs harus berfungsi mulai dari lebar 320px.

Aturan:

- Susun kolom menjadi vertikal pada layar kecil.
- Pertahankan urutan baca saat layout desktop berubah menjadi satu kolom.
- Pastikan headline besar tidak menyebabkan overflow.
- CTA utama harus tetap mudah ditemukan dan disentuh.
- Jangan bergantung pada hover untuk informasi atau tindakan.
- Card, status strip, dan navigation harus menampung copy Bahasa Indonesia yang
  lebih panjang.
- Code block dan tabel boleh horizontal scroll bila diperlukan, tetapi halaman
  tidak boleh overflow secara keseluruhan.
- Elemen dekoratif absolut tidak boleh menutupi teks atau tindakan.
- Periksa layout setidaknya pada 320px, 768px, dan 1280px.

---

## 17. Motion

Motion digunakan hanya untuk membantu perhatian atau menjelaskan alur.

Diizinkan:

- pulse halus pada titik alur;
- transisi warna, background, dan border pada link atau button;
- perubahan state sederhana pada `details`.

Hindari:

- entrance animation untuk setiap section;
- parallax;
- animasi mengambang terus-menerus pada banyak elemen;
- motion yang membuat konten sulit dibaca;
- library animasi client hanya untuk dekorasi.

Semua motion harus tetap masuk akal saat reduced motion aktif.

---

## 18. Images and Illustrations

- Prioritaskan HTML, CSS, dan SVG statis untuk visual konsep.
- Gambar raster harus memiliki tujuan komunikasi yang jelas dan ukuran yang
  wajar.
- Pertahankan motif brand dari source node menuju app/browser window.
- Jangan memakai screenshot dashboard palsu untuk menutupi kematangan produk.
- Jangan menggunakan ilustrasi generik yang tidak menjelaskan Sakala.
- Social preview harus tetap terbaca pada ukuran kecil dan sesuai metadata alt.

---

## 19. Static-First UI Constraints

Keputusan UI harus menghormati arsitektur Astro SSG/static-first.

- Utamakan Astro component untuk section statis.
- Utamakan semantic HTML dan CSS untuk interaksi ringan.
- Jangan menambah runtime server.
- Jangan menambah React, Vue, atau Svelte island tanpa persetujuan kebutuhan
  interaksi.
- Jangan menambah JavaScript client berat untuk menu, accordion, tabs, atau
  animasi yang dapat diselesaikan secara native.
- Setiap dependency UI baru harus memiliki manfaat yang terukur.
- Pertahankan output ringan dan dapat di-cache.
- Gunakan selective prefetch hanya pada jalur navigasi internal berintensi
  tinggi. Jangan mengaktifkan `prefetchAll`.
- Jangan menambahkan Astro `ClientRouter` hanya untuk animasi atau polish.

UI yang lebih kompleks bukan otomatis UI yang lebih baik.

---

## 20. Content and Data Ownership

- Copy landing yang digunakan ulang atau berupa daftar dapat ditempatkan di
  `src/data/`.
- Gunakan `src/data/links.ts` sebagai sumber utama URL dashboard, organisasi,
  repository, issue, dan repository ekosistem.
- Gunakan `developmentStatuses` pada `src/data/roadmap.ts` sebagai sumber utama
  status ringkas yang tampil pada landing.
- Dokumentasi dan changelog tetap menggunakan content collections.
- Jangan menduplikasi fakta status atau roadmap tanpa menentukan sumber
  utamanya.
- Saat route, navigasi, atau content collection berubah, perbarui dokumentasi
  proyek.
- Domain, nama repository, status produk, dan CTA harus konsisten di seluruh
  halaman.

---

## 21. Project-Specific Anti-Patterns

Jangan:

- mengubah landing menjadi dark developer tool;
- menambahkan AI-style glow atau visual futuristik generik;
- membuat semua section menjadi card grid;
- menambahkan banyak badge, sticker, rotasi, atau elemen mengambang;
- memakai terminal gelap sebagai visual utama seluruh section;
- menampilkan statistik, testimonial, logo pengguna, atau klaim trust yang
  belum nyata;
- menyembunyikan status pengembangan;
- membuat dashboard sebagai CTA utama sebelum alur produk tersedia;
- menggunakan jargon enterprise untuk memberi kesan matang;
- menambahkan JavaScript client hanya untuk polish;
- mengorbankan keterbacaan docs demi gaya editorial landing;
- membuat copy campuran Indonesia-Inggris tanpa kebutuhan teknis;
- membuat status color-only;
- menambahkan section, komponen, atau dependency tanpa tujuan pengguna yang
  jelas.

---

## 22. UI Review Workflow

Sebelum membuat atau mengubah UI:

```txt
1. Baca GLOBAL_UIUX_GUIDELINES.md.
2. Baca dokumen ini, AGENTS.md, dan ARCHITECTURE.md.
3. Tentukan pengguna, tujuan halaman, dan tindakan utama.
4. Periksa komponen, token, copy, dan pattern yang sudah ada.
5. Pisahkan fakta produk dari konsep atau roadmap.
```

Saat mengimplementasikan:

```txt
1. Pertahankan hierarchy dan urutan baca.
2. Gunakan komponen dan token yang sudah ada.
3. Tulis copy Bahasa Indonesia yang jelas dan jujur.
4. Implementasikan responsive behavior secara sengaja.
5. Gunakan semantic HTML dan interaksi native.
6. Hindari dekorasi atau dependency yang tidak diperlukan.
```

Setelah mengimplementasikan:

```txt
1. Periksa halaman pada mobile, tablet, dan desktop.
2. Periksa keyboard, focus state, contrast, heading, dan alt text.
3. Pastikan CTA tersedia dan tidak overpromise.
4. Pastikan tidak ada JavaScript client yang tidak diperlukan.
5. Periksa metadata dan tautan bila halaman publik berubah.
6. Jalankan seluruh verification command proyek.
```

---

## 23. Project UI Checklist

Gunakan checklist ini untuk review landing page dan perubahan UI berikutnya.

### Purpose and Content

- [ ] Tujuan halaman langsung dapat dipahami.
- [ ] Pengguna utama dan masalahnya terlihat jelas.
- [ ] Status kematangan Sakala disampaikan dengan jujur.
- [ ] Fakta, contoh konsep, dan roadmap tidak tercampur.
- [ ] Copy pengguna menggunakan Bahasa Indonesia yang jelas dan konsisten.
- [ ] Istilah teknis memiliki konteks yang cukup.

### Actions and Hierarchy

- [ ] Setiap section memiliki satu fokus utama.
- [ ] CTA utama mengarah ke tindakan yang benar-benar tersedia.
- [ ] Dokumentasi lebih dominan daripada dashboard selama produk belum siap.
- [ ] Visual hierarchy ditentukan oleh posisi, ukuran, spacing, dan kontras
      sebelum dekorasi.
- [ ] Tidak semua button atau link dibuat dominan.

### Brand and Visual

- [ ] Tampilan tetap light-first, hangat, dan beraksen teal.
- [ ] Visual terasa spesifik untuk Sakala, bukan template SaaS generik.
- [ ] Motif editorial, paper, grid, dan teknis digunakan secara hemat.
- [ ] Tidak ada dekorasi yang bersaing dengan konten atau CTA.
- [ ] Token dan komponen existing digunakan secara konsisten.

### Usability and Accessibility

- [ ] Urutan baca tetap jelas pada mobile.
- [ ] Tidak ada overflow pada viewport 320px.
- [ ] Tindakan penting dapat digunakan dengan keyboard.
- [ ] Focus state terlihat.
- [ ] Heading tersusun semantik.
- [ ] Status memiliki label teks.
- [ ] Link, button, gambar, dan ilustrasi memiliki treatment aksesibilitas yang
      benar.
- [ ] Motion menghormati reduced motion.

### Architecture and Quality

- [ ] Solusi tetap Astro SSG/static-first.
- [ ] Tidak ada JavaScript client atau dependency baru tanpa kebutuhan terukur.
- [ ] Prefetch tetap selektif dan tidak mengambil semua link secara otomatis.
- [ ] Dokumentasi diperbarui bila struktur atau pattern berubah.
- [ ] Metadata dan link diperiksa bila halaman publik berubah.
- [ ] `npm run format:check`, `npm run check`, dan `npm run build` lulus.

---

## 24. Final Decision Rule

Ketika ragu, pilih keputusan yang:

```txt
lebih jelas daripada clever
lebih jujur daripada menjual berlebihan
lebih ringan daripada kompleks
lebih konsisten daripada baru
lebih mudah dibaca daripada dekoratif
lebih berguna untuk belajar daripada terlihat enterprise
```
