# Security Policy

## Pelaporan

Jangan membuka public issue untuk kerentanan keamanan. Laporkan secara privat kepada maintainer PT Media Sarana Data / GMEDIA dengan langkah reproduksi dan dampak yang diketahui.

## Boundary Foundation

`sakala-landing` adalah website statis. Repository ini tidak boleh menyimpan token, credential, secret, atau implementasi akses runtime Sakala.

- Jangan memasukkan secret ke environment yang diekspos sebagai `PUBLIC_*`.
- Jangan membuat koneksi langsung ke Docker socket atau agent.
- Tautan dashboard mengarah ke `app.sakala.dev`; autentikasi tidak ditangani landing site.
- Dependency baru harus ditinjau dan lockfile harus diperbarui.

Security untuk dashboard, agent, dan infra dikelola pada repository masing-masing.
