---
title: Saat Deploy Gagal
description: Cara membaca kode kegagalan Sakala, membedakan masalah di aplikasimu dari gangguan di sisi Sakala, lalu memperbaikinya sendiri.
track: panduan
section: Panduan deploy
order: 5
---

# Saat Deploy Gagal

Deploy yang gagal hampir selalu bisa ditelusuri dari dua tempat: ringkasan di halaman detail deployment dan panel Logs di bawahnya. Halaman ini memandumu dari kode kegagalan ke penyebab, cara mengecek, dan cara memperbaikinya.

Versi lama tidak ikut rusak. Sakala baru mengalihkan trafik setelah versi baru menjawab, jadi kalau project-mu pernah berhasil di-deploy, versi terakhir yang berhasil tetap melayani pengunjung selama kamu memperbaiki.

> **Status per 6 November 2026.** Sakala belum dibuka untuk umum, dan panduan ini belum diuji bersama pengguna pilot. Daftar kode di bawah mengikuti `DeploymentFailureClassifier` di `sakala-api`.

## Untuk siapa

Panduan ini untuk kamu yang baru saja melihat deployment berstatus gagal. Yang kamu butuhkan hanya akses ke project di Console. Untuk mencoba ulang di laptop, kamu perlu Git dan Docker. Di akhir panduan, kamu tahu apa yang rusak dan siapa yang bisa memperbaikinya.

## Mulai dari sini

1. **Baca ringkasannya.** Buka tab **Riwayat Deployment**, pilih deployment yang gagal, lalu tekan **Lihat detail error**. Kamu akan melihat kode kegagalan, **Ringkasan**, **Detail error**, dan saran di bawahnya. **Detail error** memuat fakta konkret seperti port, status terakhir, exit code, atau batas memory, kadang dalam bahasa Inggris.
2. **Baca panel Logs.** Mulai dari baris terakhir sebelum berhenti. Log disimpan 7 hari.
3. **Cari kodenya di halaman ini.** Tekan Ctrl+F lalu tempel kodenya, misalnya `runtime_build_failed`.
4. **Perbaiki, commit, lalu deploy ulang.** Deploy ulang tanpa perubahan apa pun jarang menolong kalau penyebabnya ada di aplikasimu.

Kalau kamu meminta bantuan, kirim kode, ringkasan, dan potongan log yang relevan. Periksa dulu potongan itu, dan jangan kirim nilai environment variable, token, `DATABASE_URL`, atau isi `.env`. Kalau secret terlihat di log, anggap sudah bocor dan ganti di layanan asalnya.

## Masalahnya di mana

Untuk gangguan di sisi Sakala, saran di bawah ringkasan berjudul **Yang bisa kamu lakukan** dan dibuka dengan kalimat "Ini gangguan di sisi Sakala, bukan kesalahan di aplikasimu." Kalau judulnya **Cara memperbaiki**, biasanya ada yang bisa kamu perbaiki.

| Kategori     | Arti singkat                                       | Yang biasanya perlu dilakukan                                         |
| ------------ | -------------------------------------------------- | --------------------------------------------------------------------- |
| `checkout`   | Source code tidak bisa diambil dari GitHub         | Periksa repository dan akses GitHub                                   |
| `build`      | Image tidak berhasil dibangun                      | Perbaiki Dockerfile atau dependency                                   |
| `start`      | Image jadi, tetapi aplikasinya tidak bertahan      | Baca log aplikasi                                                     |
| `health`     | Aplikasi hidup, tetapi tidak menjawab dengan benar | Periksa port dan alamat `/`                                           |
| `route`      | Alamat publik gagal disiapkan                      | Gangguan di sisi Sakala                                               |
| `timeout`    | Melewati batas waktu                               | Percepat build atau start                                             |
| `resource`   | Kehabisan memory, atau server penuh                | Kurangi pemakaian memory, atau tunggu                                 |
| `node`       | Server Sakala belum siap                           | Gangguan di sisi Sakala                                               |
| `scheduling` | Belum ada server yang mengerjakan                  | Coba lagi nanti                                                       |
| `unknown`    | Belum dikenali                                     | Lihat [Kegagalan yang belum dikenali](#kegagalan-yang-belum-dikenali) |

Yang paling sering tertukar adalah kegagalan build dan kegagalan saat aplikasi berjalan. **Kegagalan build** berarti image belum pernah jadi, jadi jawabannya ada di output `docker build`. **Kegagalan start atau health** berarti image sudah jadi, jadi jawabannya ada di log aplikasi dan perilakunya saat dijalankan.

## Mencoba ulang di laptop

Perintah-perintah ini mengulang yang dilakukan Sakala. Clone repository ke folder baru supaya kamu menguji isi repository, bukan berkas di laptop yang belum ter-commit. Ganti `NAMA/REPO` dengan repository-mu.

```bash
git clone https://github.com/NAMA/REPO.git coba-sakala
cd coba-sakala
docker build -t coba-sakala .
docker run -d --name coba-sakala -e PORT=3000 -p 127.0.0.1:3000:3000 \
  --cap-drop ALL --security-opt no-new-privileges \
  --memory 256m --cpus 0.5 --pids-limit 128 \
  coba-sakala
curl -i http://127.0.0.1:3000/
docker logs coba-sakala
docker rm -f coba-sakala
```

Kalau `docker build` gagal, itu kegagalan build. Kalau `curl` gagal atau menjawab 5xx, itu kegagalan start atau health. Perintah ini hanya berlaku untuk project dengan Dockerfile. Tanpa Dockerfile, Railpack yang menyusun build-nya dan hasilnya bisa berbeda.

## Masalah yang bisa kamu perbaiki

### Repository dan GitHub

#### `repository_not_found`

- **Yang terlihat:** "Repository tidak ditemukan di GitHub."
- **Penyebab:** Repository dihapus, namanya berubah, atau repository-nya private dan belum terhubung lewat GitHub App.
- **Cek:** Jalankan `GIT_TERMINAL_PROMPT=0 git ls-remote https://github.com/NAMA/REPO.git HEAD`, yang mencoba tanpa meminta login. Kalau gagal, GitHub tidak mengizinkan akses publik ke repository itu.
- **Perbaiki:** Kembalikan namanya, atau hubungkan repository private lewat GitHub App, lalu deploy ulang.

#### `repository_access_denied`

- **Yang terlihat:** "Sakala tidak punya izin untuk membaca repository ini."
- **Penyebab:** GitHub App Sakala tidak diberi akses ke repository ini.
- **Cek:** Di GitHub, buka **Settings**, lalu **Applications**, lalu GitHub App Sakala, dan lihat daftar repository yang diizinkan.
- **Perbaiki:** Tambahkan repository-nya ke daftar itu, lalu deploy ulang.

#### `repository_access_revoked`

- **Yang terlihat:** "Pemilik project tidak lagi punya akses ke repository ini di GitHub."
- **Penyebab:** Sakala memeriksa ulang akses sebelum deployment, dan pemilik project sudah tidak punya akses ke repository private ini.
- **Cek:** Buka repository itu di GitHub dengan akun pemilik project.
- **Perbaiki:** Minta pemilik repository memulihkan aksesnya, lalu deploy ulang. Kalau aksesnya sudah benar, masuk ulang dengan GitHub supaya Sakala bisa memeriksanya lagi.

#### `repository_auth_failed`

- **Yang terlihat:** "GitHub menolak akses ke repository ini."
- **Penyebab:** Repository private belum terhubung, atau pemasangan GitHub App sudah tidak berlaku.
- **Cek:** Periksa apakah repository-nya private dan apakah GitHub App Sakala masih terpasang.
- **Perbaiki:** Hubungkan lewat GitHub App, atau pasang ulang kalau sudah terhubung, lalu deploy ulang.

#### `repository_credential_unavailable`

- **Yang terlihat:** "Sakala tidak mendapat akses sementara ke repository dari GitHub."
- **Penyebab:** GitHub App dilepas atau tidak lagi punya akses, sehingga GitHub tidak memberi izin sementara.
- **Cek:** Lihat daftar repository di pengaturan GitHub App Sakala.
- **Perbaiki:** Pasang ulang atau beri akses lagi, lalu deploy ulang.

#### `repository_commit_not_found`

- **Yang terlihat:** "Commit yang mau di-deploy sudah tidak ada di repository, biasanya karena force push."
- **Penyebab:** Commit itu hilang dari branch setelah deployment dibuat.
- **Cek:** Jalankan `git log --oneline -5 origin/NAMA-BRANCH` setelah `git fetch`, lalu bandingkan dengan commit di detail deployment.
- **Perbaiki:** Deploy ulang supaya Sakala mengambil commit terbaru dari branch project.

### Build

#### `runtime_build_failed`

- **Yang terlihat:** "Deployment gagal saat proses build aplikasi."
- **Penyebab:** Salah satu langkah build berhenti dengan error. Yang sering terjadi: `package-lock.json` tidak ter-commit, dependency tidak bisa diunduh, nama berkas di `COPY` salah, atau script build gagal. `Dockerfile` berupa symlink ke luar repository juga berakhir di sini.
- **Cek:** Baca baris terakhir di panel Logs, lalu ulangi dengan [perintah di laptop](#mencoba-ulang-di-laptop). `git status --short` menunjukkan berkas yang belum ter-commit.
- **Perbaiki:** Perbaiki di repository, commit, lalu deploy ulang. Lihat [Menyiapkan Dockerfile](/docs/dockerfile).

#### Dockerfile tidak terpakai

Kasus ini tidak punya kode sendiri. Kalau Sakala tidak menemukan berkas bernama persis `Dockerfile`, ia memakai Railpack, jadi yang kamu lihat adalah hasil build yang tidak sesuai harapan, atau `runtime_build_failed`.

- **Penyebab:** Namanya `dockerfile` dengan huruf kecil, berkasnya belum ter-commit, atau letaknya bukan di root repository maupun di Root Directory project.
- **Cek:** Lihat baris **Builder** di tahap Auto Detect, yang harus berbunyi **Dockerfile terdeteksi**. Lalu jalankan `git ls-files | grep -i dockerfile` dan pastikan ejaan serta letaknya.
- **Perbaiki:** Ganti nama atau pindahkan berkasnya, commit, lalu deploy ulang.

#### `runtime_root_directory_invalid`

- **Yang terlihat:** "Direktori root project tidak menunjuk folder yang bisa dipakai di repository."
- **Penyebab:** Root Directory project menunjuk folder yang tidak ada di branch ini, bukan folder, atau berupa symlink ke luar repository.
- **Cek:** Jalankan `git ls-tree -d HEAD apps/web`, dengan `apps/web` diganti folder yang kamu isi. Kalau tidak ada hasil, foldernya tidak ada di commit itu.
- **Perbaiki:** Di tab **Pengaturan**, perbaiki kolom **Root Directory**, misalnya `apps/web`, atau kosongkan untuk memakai root repository. Simpan, lalu tekan **Redeploy**.

Repository-mu berisi beberapa aplikasi? Lihat [Men-deploy monorepo](/docs/monorepo), termasuk batasnya: build hanya melihat isi Root Directory, jadi lockfile dan package workspace di root repository tidak ikut.

### Aplikasi saat mulai

#### `runtime_app_crashed`

- **Yang terlihat:** "Aplikasi berhenti sendiri sesaat setelah dijalankan."
- **Penyebab:** Proses aplikasi berhenti selama tahap start, dan satu kali restart saja sudah dihitung crash. Yang sering terjadi: environment variable belum diisi, koneksi ke database gagal saat mulai, image butuh izin yang dibatasi Sakala seperti image `nginx` biasa, atau start command dipakai pada image tanpa `sh`.
- **Cek:** Baca baris terakhir di panel Logs. Di laptop, jalankan `docker inspect --format '{{.State.ExitCode}}' coba-sakala` sebelum menghapus container.
- **Perbaiki:** Lengkapi variabel di tab **Environment Variables**, jangan biarkan aplikasi berhenti hanya karena database belum tersambung, atau kosongkan **Start command** di tab **Pengaturan** kalau image-mu tidak punya `sh`. Lalu deploy ulang. Lihat [Menghubungkan database eksternal](/docs/database-eksternal).

#### `runtime_port_conflict`

- **Yang terlihat:** "Environment variable `PORT` di project ini berbeda dengan port yang dipakai Sakala untuk aplikasimu."
- **Penyebab:** Ada variabel `PORT` di project yang nilainya tidak sama dengan port pilihan Sakala, atau nilainya bukan nomor port.
- **Cek:** Lihat tab **Environment Variables** dan **Detail error**, yang menyebut kedua nilainya. Port pilihan Sakala adalah 3000, kecuali kolom **Port** di tab **Pengaturan** diisi. Halaman proyek menampilkan port yang sedang dipakai, dan port baru kalau baru berlaku di deploy berikutnya.
- **Perbaiki:** Hapus variabel `PORT`, karena Sakala sudah mengisinya. Kalau aplikasimu memang butuh port lain, isi kolom **Port** di tab **Pengaturan**. Lalu deploy ulang.

### Aplikasi tidak menjawab

#### `runtime_app_not_listening`

- **Yang terlihat:** "Aplikasi berjalan, tetapi tidak menerima koneksi di port yang ditentukan Sakala."
- **Penyebab:** Sampai batas waktu start, yang secara default 2 menit, tidak ada yang menjawab di port itu. Biasanya aplikasi mendengarkan di `localhost` atau `127.0.0.1`, memakai port tetap, atau mulainya terlalu lambat.
- **Cek:** Jalankan [perintah di laptop](#mencoba-ulang-di-laptop) dan lihat alamat yang tercatat di log. Selama container berjalan, `docker exec coba-sakala netstat -ltn` menunjukkan alamat yang didengarkan pada image Alpine. Yang benar adalah `0.0.0.0:3000` atau `:::3000`.
- **Perbaiki:** Dengarkan di `0.0.0.0` dan baca port dari `PORT`, lalu deploy ulang. Kalau port aplikasimu sulit diubah, samakan kolom **Port** di tab **Pengaturan** dengan port itu. Lihat [Kenapa alamat dan port itu penting](/docs/dockerfile#kenapa-alamat-dan-port-itu-penting).

#### `runtime_app_unhealthy`

- **Yang terlihat:** "Aplikasi merespons pengecekan dari Sakala dengan error server (status 500 ke atas)."
- **Penyebab:** `/` terus menjawab 5xx sampai batas waktu. Biasanya halaman itu memanggil database atau layanan lain yang gagal.
- **Cek:** Jalankan `curl -i http://127.0.0.1:3000/` di laptop, lalu baca error-nya di panel Logs. Status di bawah 500, termasuk 404, sudah lolos.
- **Perbaiki:** Perbaiki error-nya, atau buat `/` tidak bergantung pada layanan lain, lalu deploy ulang.

#### `runtime_health_check_failed`

- **Yang terlihat:** "Aplikasi berjalan, tetapi tidak menerima koneksi di port yang ditentukan Sakala." Ringkasannya sama dengan `runtime_app_not_listening`, tetapi penyebabnya lain.
- **Penyebab:** Kode ini muncul saat `HEALTHCHECK` di Dockerfile-mu melaporkan `unhealthy`, atau masih `starting` sampai batas waktu. Bisa juga karena perintahnya memakai alat yang tidak ada di image, misalnya `curl` pada image Alpine.
- **Cek:** Selama container berjalan di laptop, jalankan `docker inspect --format '{{json .State.Health}}' coba-sakala`.
- **Perbaiki:** Perbaiki perintah `HEALTHCHECK`-nya atau hapus barisnya, karena Sakala sudah memeriksa `/`, lalu deploy ulang.

### Batas waktu dan memory

#### `runtime_timeout`

- **Yang terlihat:** "Build atau start aplikasi melewati batas waktu yang ditetapkan Sakala."
- **Penyebab:** Nilai default pilot adalah 10 menit untuk build, 2 menit untuk start sampai menjawab, dan 15 menit untuk keseluruhan. Batas ini tidak bisa diubah dari project.
- **Cek:** Lihat tahap yang lambat di panel Logs, lalu ukur dengan `time docker build --no-cache -t coba-sakala .` di laptop. Laptopmu bisa lebih cepat dari server, karena CPU di Sakala dibatasi.
- **Perbaiki:** Kurangi dependency dan langkah build, atau percepat start aplikasi, lalu deploy ulang.

#### `runtime_app_out_of_memory`

- **Yang terlihat:** "Aplikasi dihentikan karena memakai memory melebihi batas."
- **Penyebab:** Aplikasi melewati batas memory project, yang tertulis di **Detail error**. Nilai default pilot adalah 256 MB, dengan maksimum 512 MB.
- **Cek:** Jalankan aplikasinya di laptop dengan `--memory 256m`, lalu lihat `docker stats --no-stream coba-sakala`. Sesudah berhenti, `docker inspect --format '{{.State.OOMKilled}}' coba-sakala` menjawab `true` kalau sebabnya memory.
- **Perbaiki:** Kurangi jumlah worker, ukuran cache, atau data yang dimuat saat mulai, lalu deploy ulang.

## Gangguan di sisi Sakala

Untuk kode di bawah, tidak ada yang perlu kamu ubah di repository. Kamu tidak bisa memeriksa server Sakala dari luar, jadi cara mengeceknya sama: pastikan kodenya memang ada di daftar ini, lalu lihat apakah versi lama masih melayani.

Yang bisa kamu lakukan adalah deploy ulang. Cara ini sering menolong, tetapi tidak dijamin berhasil. Kalau kode yang sama muncul lagi, jangan terus mengulang. Laporkan seperti di bagian [Kegagalan yang belum dikenali](#kegagalan-yang-belum-dikenali).

| Kode                                                                                                                                                                          | Yang terlihat                                                                                     | Penyebab                                                            | Yang bisa dilakukan                               |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------- |
| `repository_credential_expired`                                                                                                                                               | "Akses sementara Sakala ke repository habis masa berlakunya sebelum source code selesai diambil." | Pengambilan source terlalu lama, sampai izinnya habis               | Deploy ulang. Sakala meminta akses baru ke GitHub |
| `repository_access_check_failed`                                                                                                                                              | "Sakala tidak bisa memeriksa akses repository ke GitHub saat ini."                                |
| `repository_checkout_failed`, `runtime_repository_failed`                                                                                                                     | "Sakala gagal mengambil source code dari GitHub."                                                 | Proses Git gagal di server, misalnya karena jaringan                | Deploy ulang. Kalau terulang, laporkan            |
| `runtime_execution_failed`, `runtime_container_failed`, `runtime_workload_not_found`, `runtime_workload_not_running`, `runtime_reporting_failed`, `runtime_filesystem_failed` | "Sakala gagal menjalankan container aplikasi."                                                    | Perintah Docker, berkas kerja, atau pelaporan gagal di server       | Deploy ulang. Kalau terulang, laporkan            |
| `runtime_routing_failed`                                                                                                                                                      | "Sakala gagal menyiapkan alamat publik untuk aplikasi."                                           | Route ke aplikasi tidak bisa diaktifkan                             | Deploy ulang. Kalau terulang, laporkan            |
| `command_lease_expired`                                                                                                                                                       | "Server Sakala berhenti merespons sebelum deployment selesai."                                    | Server tidak melapor sampai batas waktu                             | Deploy ulang. Kalau terulang, laporkan            |
| `command_expired`                                                                                                                                                             | "Belum ada server Sakala yang tersedia untuk menjalankan deployment."                             | Tidak ada server yang mengambil pekerjaan ini                       | Deploy ulang beberapa menit lagi                  |
| `runtime_capacity_exceeded`                                                                                                                                                   | "Kapasitas server Sakala sedang penuh."                                                           | Server sudah menjalankan terlalu banyak aplikasi                    | Deploy ulang beberapa menit lagi                  |
| `runtime_disk_pressure`                                                                                                                                                       | "Ruang disk server Sakala sedang hampir penuh."                                                   | Disk server hampir penuh                                            | Deploy ulang beberapa menit lagi                  |
| `runtime_preflight_failed`, `runtime_dependency_failed`, `invalid_runtime_configuration`, `invalid_runtime_command`, `unsupported_runtime_command`                            | "Server Sakala belum siap menjalankan deployment."                                                | Pemeriksaan server gagal, atau perintah dari API tidak bisa dipakai | Deploy ulang. Kalau terulang, laporkan            |
| `runtime_cancelled`                                                                                                                                                           | "Deployment dibatalkan karena server Sakala sedang berhenti atau dialihkan."                      | Deployment dihentikan, oleh server atau oleh permintaan batal       | Deploy ulang. Tidak ada yang perlu diubah         |

## Deployment tertahan di antrean

Deployment yang menunggu server tidak punya batas waktu, jadi ia bisa bertahan di **Deployment mengantre** tanpa kode kegagalan apa pun. Selama itu, batas deployment aktif bisa menolak deploy berikutnya. Tidak ada yang perlu kamu ubah di repository. Kamu bisa menekan **Batalkan deployment**. Kalau antreannya tidak bergerak, sampaikan seperti di bagian berikut.

## Kegagalan yang belum dikenali

Kode apa pun yang tidak tercantum di halaman ini masuk kategori `unknown`, dengan ringkasan "Deployment gagal karena terjadi kesalahan yang belum dikenali." Sakala belum tahu apakah sebabnya ada di aplikasimu atau di server.

1. Baca panel Logs, karena jawabannya mungkin ada di sana.
2. Deploy ulang sekali. Hasilnya tidak dijamin.
3. Kalau gagal lagi, catat kode kegagalan, nama project, waktu kejadian, dan baris log yang relevan, tanpa nilai secret.
4. Sampaikan ke maintainer atau mentor yang mengundangmu ke pilot, atau buka [issue di `sakala-api`](https://github.com/gmedia/sakala-api/issues). Issue bersifat publik, jadi periksa lagi isinya.

Form **Kirim Masukan** di Console, juga tautan **Kirim masukan** di halaman deployment yang sudah selesai, membantu tim memperbaiki Sakala. Form itu bukan jalur bantuan, jadi kamu belum tentu mendapat balasan. Jangan menulis secret di sana. Belum ada janji waktu respons atau layanan dukungan resmi, karena Sakala masih dalam tahap pengembangan.

## Pastikan sudah pulih

Deploy dianggap pulih kalau statusnya berhasil dan alamat publiknya menjawab. Dari terminal, ganti alamat berikut dengan URL project-mu:

```bash
curl -I https://NAMA-PROJECT.run.sakala.dev/
```

Status di bawah 500 berarti aplikasinya menjawab. Tetap buka halamannya di browser, karena pengecekan Sakala hanya memastikan aplikasinya menjawab, bukan bahwa setiap fiturnya benar.

## Langkah berikutnya

Untuk mengulang dari awal, ikuti [Deploy Pertamamu](/docs/deploy-pertama). Untuk contoh yang sudah dicoba, buka [Menyiapkan Dockerfile](/docs/dockerfile). Kalau masalahnya ada di koneksi data, buka [Menghubungkan database eksternal](/docs/database-eksternal). Kalau repository-mu berisi beberapa aplikasi, buka [Men-deploy monorepo](/docs/monorepo). Untuk urutan tahap di balik layar, baca [Alur Deployment](/docs/teknis/alur-deployment).
