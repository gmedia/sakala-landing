# Security Policy

## Pelaporan

Jangan membuka public issue untuk kerentanan keamanan. Laporkan secara privat kepada maintainer Sakala melalui security policy repository dengan langkah reproduksi dan dampak yang diketahui. Pada fase MVP, GMEDIA dapat membantu triage keamanan sebagai sponsor pendiri dan infrastructure supporter.

## Boundary Foundation

`sakala-landing` adalah website statis. Repository ini tidak boleh menyimpan token, credential, secret, atau implementasi akses runtime Sakala.

- Jangan memasukkan secret ke environment yang diekspos sebagai `PUBLIC_*`.
- Jangan membuat koneksi langsung ke Docker socket atau agent.
- Tautan console mengarah ke `app.sakala.dev`; autentikasi tidak ditangani landing site.
- Dependency baru harus ditinjau dan lockfile harus diperbarui.

Security untuk console, API, agent, dan infra dikelola pada repository masing-masing.
