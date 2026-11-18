---
title: Console, workspace tim, dan dokumen hukum berjalan di production
description: Console Sakala kini berjalan di production dengan workspace pribadi dan tim, peran, kuota per workspace, dan persetujuan syarat layanan saat mendaftar.
publishedAt: 2026-11-12
lang: id
---

Console di `app.sakala.dev` kini berjalan di production. Akun bisa dibuat
lewat email, GitHub, atau Google, dan pendaftar diminta menyetujui
[Syarat Layanan](/syarat) dan [Kebijakan Penggunaan Wajar](/penggunaan-wajar).
Akun juga bisa diekspor dan dihapus dari Console.

Project kini dimiliki workspace. Setiap akun punya workspace pribadi, dan bisa
membuat workspace tim, mengundang anggota lewat email, serta memberi peran
Owner, Member, atau Viewer. Kuota dihitung per workspace dan terlihat saat
membuat project.

Aplikasi pengguna berjalan di host runtime yang terpisah dari control plane,
di dalam sandbox gVisor. Maintainer punya area admin untuk melihat node,
workspace, dan masukan, serta menangguhkan project dengan alasan yang tercatat.
