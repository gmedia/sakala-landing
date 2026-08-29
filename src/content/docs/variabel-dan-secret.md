---
title: Variabel dan Secret
description: Cara memisahkan konfigurasi dari kode, dan kenapa rahasia tidak boleh disimpan di repository.
track: panduan
section: Menyiapkan project
order: 4
---

# Variabel dan Secret

Aplikasi hampir selalu butuh nilai yang berbeda antara laptopmu dan lingkungan publik: alamat database, kunci API, alamat frontend, mode debug.

Nilai-nilai itu tidak boleh ditulis langsung di dalam kode. Kalau ditulis di kode, kamu harus mengubah kode setiap kali pindah lingkungan, dan rahasianya ikut tersimpan di riwayat Git selamanya.

## Variabel dan secret berbeda perlakuan

**Variabel** adalah konfigurasi biasa yang tidak berbahaya bila terlihat. Contohnya mode aplikasi, zona waktu, atau alamat publik frontend.

**Secret** adalah nilai yang membahayakan bila bocor. Contohnya password database, kunci API, dan token akses.

Sakala memperlakukan keduanya berbeda. Secret disimpan terenkripsi, nilainya disamarkan di antarmuka, dan disensor pada log supaya tidak ikut tercetak saat deployment berjalan.

## Aturan yang berlaku sekarang juga

1. Simpan nilai di environment variable, bukan di dalam kode.
2. Masukkan berkas `.env` ke `.gitignore`.
3. Sediakan `.env.example` berisi nama variabelnya saja, tanpa nilai asli, supaya orang lain tahu apa yang perlu diisi.
4. Jangan pernah menaruh secret di frontend. Apa pun yang dikirim ke browser dapat dibaca pengguna.

## Kalau secret pernah ter-commit

Menghapus berkasnya dan commit lagi **tidak menyelesaikan masalah**. Riwayat Git masih menyimpan nilai lamanya, dan siapa pun yang punya akses repository dapat membacanya.

Yang harus dilakukan adalah mencabut kredensial itu dan menerbitkan yang baru. Membersihkan riwayat Git adalah langkah tambahan, bukan pengganti.

## Yang akan disediakan Sakala

Bagian ini adalah arah, belum tersedia.

Sakala akan menyediakan pengelolaan variabel dan secret pada Console: menambah, mengubah, menghapus, serta menandai mana yang perlu disamarkan. Nilai secret hanya dapat dilihat kembali melalui tindakan yang disengaja, bukan tampil begitu saja di layar.

Karena perubahan konfigurasi memengaruhi aplikasi yang sedang berjalan, Sakala akan menyatakan secara jelas kapan perubahan tersebut baru berlaku setelah deployment ulang.

## Yang tetap menjadi tanggung jawabmu

Sakala dapat menjaga penyimpanan dan penyensoran secret, tetapi tidak dapat menilai apakah sebuah nilai layak dirahasiakan. Menentukan mana yang secret, dan menggantinya saat bocor, tetap ada di tanganmu.
