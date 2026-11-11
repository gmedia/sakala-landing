---
title: Menyiapkan Dockerfile
description: Contoh Dockerfile yang sudah dicoba, cara mengujinya di laptop, dan aturan port serta variabel yang perlu dipenuhi supaya aplikasimu bisa dijalankan Sakala.
track: panduan
section: Panduan deploy
order: 3
---

# Menyiapkan Dockerfile

Di akhir panduan ini repository-mu punya Dockerfile yang berjalan di laptop dan memenuhi dua syarat Sakala: aplikasi mendengarkan di `0.0.0.0:$PORT`, dan alamat `/` menjawab dengan status di bawah 500.

> **Status per 6 November 2026.** Sakala belum dibuka untuk umum. Panduan ini untuk peserta pilot yang diundang dan untuk siapa pun yang ingin menyiapkan aplikasinya lebih dulu. Contoh di halaman ini sudah dibangun dan dijalankan secara lokal dengan Docker, memakai pembatasan yang sama dengan runtime Sakala, tetapi belum dicoba lewat Sakala di production.

## Untuk siapa

Panduan ini untuk kamu yang punya aplikasi web kecil dan ingin mengatur sendiri cara membangunnya. Kamu tidak perlu sudah mahir Docker. Kalau repository-mu tidak punya Dockerfile, Sakala memakai Railpack, yaitu alat yang menyusun cara build secara otomatis, jadi Dockerfile tidak wajib.

Kalau ada berkas bernama persis `Dockerfile` di root repository, atau di Root Directory project, Sakala selalu memakainya. Tidak ada pilihan lain yang menimpanya.

## Yang perlu disiapkan

- Docker di laptopmu. Cek dengan `docker version`.
- `curl` untuk mencoba aplikasinya.
- Repository GitHub tempat kode ini akan di-push.

## Contoh paling kecil: aplikasi Node

Contoh ini tidak punya dependency, jadi bisa langsung kamu salin ke folder kosong. Buat empat berkas berikut.

`server.js`:

```js
const http = require("node:http");

// Sakala mengisi PORT. Angka 3000 hanya cadangan saat dijalankan di laptop.
const port = Number(process.env.PORT) || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Halo dari Sakala\n");
});

// 0.0.0.0 berarti menerima koneksi dari luar container, bukan hanya dari dalam.
server.listen(port, "0.0.0.0", () => {
  console.log(`Listening on 0.0.0.0:${port}`);
});
```

`package.json`:

```json
{
  "name": "halo-sakala",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "node server.js"
  }
}
```

`Dockerfile`:

```dockerfile
FROM node:24-alpine
WORKDIR /app
COPY package.json server.js ./
USER node
CMD ["node", "server.js"]
```

`.dockerignore`:

```text
.git
node_modules
.env
.env.*
Dockerfile
.dockerignore
```

Berkas `.dockerignore` menjauhkan `.env` dan folder yang tidak perlu dari proses build. Ia menjadi penting begitu Dockerfile-mu memakai `COPY . .`.

## Kenapa alamat dan port itu penting

Sebelum mengalihkan trafik ke versi baru, Sakala mengirim permintaan HTTP ke `/` di aplikasimu dari luar container.

**Alamat.** `127.0.0.1` dan `localhost` berarti "hanya dari dalam container ini". Aplikasi yang mendengarkan di sana memang hidup, tetapi permintaan dari luar tidak pernah sampai. `0.0.0.0` berarti menerima koneksi dari luar juga.

**Port.** Sakala yang menentukan port, lalu memberikannya lewat environment variable `PORT` dan memeriksa aplikasimu di port itu. Urutannya:

1. Kolom **Port** yang kamu isi saat membuat proyek atau di tab **Pengaturan**.
2. Kalau kolom itu kosong, dan stage terakhir Dockerfile-mu menulis tepat satu port lewat `EXPOSE`, misalnya `EXPOSE 80`, port itulah yang dipakai.
3. Selain itu, 3000.

Sakala membaca `EXPOSE` saat mendeteksi stack proyek, yaitu saat proyek dibuat dan saat Root Directory diganti. Yang dihitung hanya `EXPOSE` yang tertulis di Dockerfile-mu, bukan yang sudah ada di dalam base image seperti `nginx`. Nilai dari `ARG` atau `ENV` yang diisi di Dockerfile ikut terbaca. Dua port atau lebih, misalnya `EXPOSE 80 443`, membuat Sakala tetap memakai 3000, jadi isi kolom **Port**. Halaman proyek menampilkan port yang akan dipakai, dan perubahan di **Pengaturan** berlaku mulai deployment berikutnya.

Untuk kode yang kamu tulis sendiri, baca `PORT` dan jangan menulis angkanya secara tetap. Untuk image yang port-nya sudah tetap, seperti `nginx` di port 80, tulis `EXPOSE` dengan port itu.

Jangan menambahkan variabel `PORT` sendiri di project. Kalau nilainya berbeda dari port pilihan Sakala, deploy gagal dengan [`runtime_port_conflict`](/docs/deploy-gagal#runtime_port_conflict).

**Jawaban `/`.** Semua status di bawah 500 lolos, termasuk 404 atau halaman login, karena yang dipastikan hanya bahwa aplikasimu menjawab. Status 5xx terus dicoba sampai batas waktu start, yang secara default 2 menit, lalu dianggap gagal. Deploy yang gagal tidak mengganggu versi sebelumnya, yang tetap melayani pengunjung.

## Coba di laptop

Jalankan dari folder yang berisi Dockerfile. Flag `--cap-drop` dan `--security-opt` adalah pembatasan yang juga dipasang Sakala, sedangkan batas memory, CPU, dan jumlah proses adalah nilai default pilot. Lebih enak kalau masalahnya ketahuan di sini.

```bash
docker build -t halo-sakala .
docker run -d --name halo-sakala -e PORT=3000 -p 127.0.0.1:3000:3000 \
  --cap-drop ALL --cap-add CHOWN --cap-add DAC_OVERRIDE --cap-add FOWNER --cap-add FSETID \
  --cap-add KILL --cap-add SETGID --cap-add SETUID --cap-add NET_BIND_SERVICE \
  --security-opt no-new-privileges \
  --memory 256m --cpus 0.5 --pids-limit 128 \
  halo-sakala
curl -i http://127.0.0.1:3000/
```

Hasil yang benar seperti ini:

```text
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8

Halo dari Sakala
```

Lalu pastikan aplikasinya benar-benar membaca `PORT`, dengan menjalankannya di port lain:

```bash
docker rm -f halo-sakala
docker run -d --name halo-sakala -e PORT=8123 -p 127.0.0.1:8123:8123 \
  --cap-drop ALL --cap-add CHOWN --cap-add DAC_OVERRIDE --cap-add FOWNER --cap-add FSETID \
  --cap-add KILL --cap-add SETGID --cap-add SETUID --cap-add NET_BIND_SERVICE \
  --security-opt no-new-privileges \
  halo-sakala
curl -i http://127.0.0.1:8123/
docker rm -f halo-sakala
```

Kalau `curl` yang kedua juga menjawab `200 OK`, aplikasimu siap.

## Contoh kedua: situs statis dengan Vite

Contoh ini untuk project Vite yang hasil build-nya berupa berkas statis. Project-nya harus punya `package-lock.json`, yang dibuat otomatis oleh `npm install`. Di kode, nilainya dibaca lewat `import.meta.env.VITE_API_URL`.

`Dockerfile`:

```dockerfile
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN --mount=type=secret,id=VITE_API_URL,env=VITE_API_URL npm run build

FROM nginxinc/nginx-unprivileged:1-alpine
COPY default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html
```

`default.conf.template`, yang nilai `${PORT}`-nya diisi saat container mulai:

```nginx
server {
    listen 0.0.0.0:${PORT};
    root /usr/share/nginx/html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

`.dockerignore`:

```text
.git
node_modules
dist
.env
.env.*
Dockerfile
.dockerignore
```

Image `nginx` biasa juga bisa dipakai. Pakai template di atas supaya nginx mendengarkan di `${PORT}`, atau tanpa template, tulis `EXPOSE 80` di stage terakhir supaya Sakala memakai port 80. Tanpa keduanya, nginx mendengarkan di port 80 sementara Sakala memeriksa port 3000, dan deploy gagal dengan [`runtime_app_not_listening`](/docs/deploy-gagal#runtime_app_not_listening). Contoh ini memakai `nginxinc/nginx-unprivileged` karena prosesnya tidak berjalan sebagai root sama sekali.

Coba di laptop:

```bash
VITE_API_URL=https://api.contoh.test docker build --secret id=VITE_API_URL,env=VITE_API_URL -t halo-vite .
docker run -d --name halo-vite -e PORT=3000 -p 127.0.0.1:3000:3000 \
  --cap-drop ALL --cap-add CHOWN --cap-add DAC_OVERRIDE --cap-add FOWNER --cap-add FSETID \
  --cap-add KILL --cap-add SETGID --cap-add SETUID --cap-add NET_BIND_SERVICE \
  --security-opt no-new-privileges \
  --memory 256m --cpus 0.5 --pids-limit 128 \
  halo-vite
curl -i http://127.0.0.1:3000/
docker rm -f halo-vite
```

Jangan lupa `-e PORT=3000` saat mencoba image ini di laptop. Tanpa itu nginx berhenti dengan pesan `invalid port`. Di Sakala hal ini tidak terjadi, karena `PORT` selalu diisi.

## Stack lain

Per 6 November 2026 hanya dua contoh di atas yang sudah kami coba. Python, Go, PHP, dan stack lain boleh dipakai selama image-nya bisa dibangun, aplikasinya mendengarkan di `0.0.0.0:$PORT`, dan `/` menjawab di bawah 500. Hanya saja, belum ada contoh teruji untuk stack itu di sini, jadi pakai langkah di bagian "Coba di laptop" untuk memastikannya sendiri.

Saat ini Sakala menjalankan satu web service per project. Worker dan cron belum ada.

## Variabel yang dibutuhkan saat build

Variabel yang kamu isi di tab Environment Variables selalu tersedia saat aplikasi berjalan. Saat build, aturannya tergantung cara build-nya.

- **Tanpa Dockerfile (Railpack).** Variabel otomatis tersedia di setiap langkah build, tanpa pengaturan tambahan.
- **Dengan Dockerfile.** Kamu harus memintanya pada langkah yang membutuhkan, seperti baris `RUN --mount=type=secret,id=VITE_API_URL,env=VITE_API_URL npm run build` di atas.

Kalau kamu hanya menulis `--mount=type=secret,id=VITE_API_URL`, nilainya tersedia sebagai berkas `/run/secrets/VITE_API_URL`, bukan environment variable. `PORT` dan variabel yang kosong tidak diberikan saat build.

Tiga hal yang sering membingungkan pada Dockerfile:

- **`ARG` tetap kosong.** Sakala sengaja tidak mengisinya, karena nilai `ARG` tersimpan di riwayat image dan bisa dibaca siapa pun yang memegang image itu.
- **Variabel yang belum diisi tidak menggagalkan build.** Langkahnya tetap berjalan dengan nilai kosong. Dalam percobaan contoh Vite di atas, hasilnya tertulis `API: ` tanpa alamat.
- **Mengubah nilai tidak membangun ulang langkah yang sudah ter-cache.** Build berikutnya bisa tetap memakai nilai lama. Commit perubahan kode pada berkas yang disalin sebelum langkah itu supaya langkahnya dibangun ulang.

Nilai yang lewat cara ini tidak masuk layer atau riwayat image, kecuali langkah build-mu sendiri menulisnya ke berkas. Variabel publik seperti `VITE_*` dan `NEXT_PUBLIC_*` lain ceritanya: framework memasukkannya ke hasil build, sehingga terbaca oleh siapa pun yang membuka aplikasimu. Jangan menaruh secret di sana.

Jalur Dockerfile ini sudah diuji dengan BuildKit asli. Jalur Railpack baru diperiksa pada level argumen dan dokumentasinya, belum dengan build Railpack sungguhan.

## Jangan memasukkan secret ke image

Password, token, dan isi `.env` tidak boleh ada di Dockerfile maupun di repository. Hindari tiga pola ini:

```dockerfile
# Jangan ditiru.
ENV DATABASE_URL=postgresql://user:password@host/db
ARG API_TOKEN
COPY .env .
```

Isi nilainya di tab Environment Variables supaya hanya tersedia saat aplikasi berjalan. Untuk memastikan tidak ada yang terbawa, periksa riwayat image dan cari berkas `.env` di dalamnya. Perintah `find` berikut harus tidak menampilkan apa pun.

```bash
docker history --no-trunc halo-sakala
docker run --rm --entrypoint sh halo-sakala -c 'find / -name ".env*" 2>/dev/null'
```

Kalau secret terlanjur ter-commit, menghapus berkasnya saja tidak cukup, karena nilainya tetap ada di riwayat Git. Ganti secret itu di layanan asalnya.

## Push dan deploy

Sakala membangun image sendiri dari repository, jadi kamu tidak perlu push image ke registry. Cukup push kodenya:

```bash
git add Dockerfile .dockerignore package.json server.js
git commit -m "chore: add Dockerfile"
git push
```

Setelah itu buka project di Console, lalu tekan **Deploy sekarang** atau **Redeploy**. Kalau ini deploy pertamamu, ikuti [Deploy Pertamamu](/docs/deploy-pertama). Kalau `curl` di laptop sudah berhasil tetapi deploy tetap gagal, baca kodenya di halaman detail deployment.

## Kalau gagal

Deploy yang gagal tidak mengganti versi yang sedang melayani. Kalau project-mu pernah berhasil di-deploy, versi lama tetap bisa dibuka selama kamu memperbaikinya. Kesalahan yang paling sering:

| Yang terjadi                                                     | Kode                                                                                                   |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Aplikasi mendengarkan di `localhost` atau port tetap             | [`runtime_app_not_listening`](/docs/deploy-gagal#runtime_app_not_listening)                            |
| Ada variabel `PORT` di project dengan nilai yang berbeda         | [`runtime_port_conflict`](/docs/deploy-gagal#runtime_port_conflict)                                    |
| nginx di port 80, tanpa template `${PORT}` dan tanpa `EXPOSE 80` | [`runtime_app_not_listening`](/docs/deploy-gagal#runtime_app_not_listening)                            |
| Aplikasi berhenti saat mulai                                     | [`runtime_app_crashed`](/docs/deploy-gagal#runtime_app_crashed)                                        |
| `/` selalu menjawab 5xx                                          | [`runtime_app_unhealthy`](/docs/deploy-gagal#runtime_app_unhealthy)                                    |
| `npm ci` gagal karena `package-lock.json` tidak ter-commit       | [`runtime_build_failed`](/docs/deploy-gagal#runtime_build_failed)                                      |
| Berkas bernama `dockerfile` dengan huruf kecil                   | Tidak ada kode khusus. Lihat [Dockerfile tidak terpakai](/docs/deploy-gagal#dockerfile-tidak-terpakai) |

## Langkah berikutnya

Kalau aplikasimu butuh database, lanjut ke [Menghubungkan database eksternal](/docs/database-eksternal). Kalau deploy-mu gagal, buka [Saat deploy gagal](/docs/deploy-gagal).
