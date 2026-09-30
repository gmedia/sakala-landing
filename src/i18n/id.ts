export const id = {
  meta: {
    siteTitle: "Sakala — Platform Deployment Open-Source",
    siteDescription:
      "Sakala adalah platform deployment open-source yang membawa source dari repository menjadi aplikasi yang dapat dibuka dan dibagikan.",
    homeTitle: "Sakala — Platform Deployment Open-Source",
    homeDescription:
      "Sakala adalah platform deployment open-source: membawa project dari repository Git menjadi aplikasi yang dapat dibuka dan dibagikan. Dibangun secara terbuka.",
    ogAlt: "Logo Sakala dengan tagline Manifesting Code into Reality",
    skipToContent: "Lewati ke konten utama",
  },

  nav: {
    label: "Navigasi utama",
    philosophy: "Filosofi",
    product: "Produk",
    docs: "Dokumentasi",
    roadmap: "Roadmap",
    openSource: "Open Source",
    projectDocs: "Dokumen project",
    changelog: "Changelog",
    github: "GitHub",
    console: "Masuk",
    menu: "Menu",
    close: "Tutup",
    languageLabel: "Pilih bahasa",
    docsNoteForEnglish: null as string | null,
  },

  /** Tautan ke dokumen kanonik di jalur Proyek. Dipakai halaman adaptasi
   *  supaya pembaca selalu bisa menemukan sumbernya. */
  source: {
    label: "Sumber kanonik",
  },

  /** Label status dipakai bersama di seluruh situs. */
  status: {
    available: "tersedia",
    building: "sedang dibangun",
    testing: "sedang diuji",
    next: "berikutnya",
    direction: "arah",
    unavailable: "belum tersedia",
  },

  /** Homepage mengikuti satu project melewati hidupnya.
   *  Possibility → Presence → Continuation. Enam bab; tiap bab satu artefak
   *  yang berubah keadaan. Nama tahap deployment mengikuti Console Wave 1. */
  home: {
    status: {
      label: "Pre-launch",
      text: "Belum tersedia sebagai layanan publik. Dibangun terbuka.",
      link: "Lihat roadmap",
    },

    possibility: {
      eyebrow: "Sakala · Platform deployment open-source",
      title: "Setiap karya bermula sebagai kemungkinan.",
      sub: "Berjalan di laptop bukan berarti dapat dijangkau. Sakala membawa project dari repository Git menjadi aplikasi dengan alamat publiknya sendiri.",
      ctaPrimary: "Lihat cara kerjanya",
      ctaSecondary: "Lihat di GitHub",
      repoLabel: "Repository",
      branch: "main",
      commit: "a3f9c21",
      files: ["portfolio/", "├── src/", "├── public/", "├── package.json"],
      runCommand: "npm run dev",
      address: "localhost:5173",
      appTitle: "Halo, dunia.",
      appSub: "Berjalan baik di mesin ini.",
      reach: "dapat dibuka oleh: kamu",
      refrain: "I built this.",
      caption:
        "Repository menyimpan source, localhost membuktikan ia berjalan. Keduanya belum memberi karya ini alamat yang dapat dibuka orang lain.",
    },

    threshold: {
      eyebrow: "Ambang",
      title: "Sakala berdiri di antara kemungkinan dan wujud.",
      plain:
        "Alurnya nyata dan dapat dipelajari: repository GitHub publik dibaca, dibangun lewat Dockerfile atau Railpack, lalu menerima alamat publiknya sendiri di *.run.sakala.dev.",
      from: "Kemungkinan / Lokal",
      through: "Sakala",
      to: "Wujud / Publik",
      fromToken: "github.com/kamu/portfolio",
      toToken: "portfolio.run.sakala.dev",
      caption:
        "Bentuk atas mark adalah source, bentuk bawah adalah wujud. Sakala adalah ruang di antaranya.",
      forWhomTitle: "Untuk siapa",
      personas: [
        {
          name: "Mahasiswa & intern",
          text: "Tugas dan portfolio dapat dibuka dosen maupun perekrut, tanpa membangun infrastruktur dari nol.",
        },
        {
          name: "Dosen & mentor",
          text: "Meninjau hasil kerja tanpa menyiapkan environment untuk setiap project.",
        },
        {
          name: "Developer pemula & komunitas",
          text: "Belajar deployment dari alur yang setiap tahapnya bernama dan dapat dijelaskan.",
        },
      ],
    },

    journey: {
      eyebrow: "Perjalanan",
      title: "Wujud bukan sekadar build yang berhasil.",
      lead: "Perjalanan belum selesai sampai karya benar-benar dapat dijangkau. Setiap tahap punya nama, jadi kamu selalu tahu di mana posisinya.",
      analysisTitle: "Sakala membaca proyekmu",
      analysisSub:
        "Konfigurasi terdeteksi dari repository, dan dapat diubah sebelum build berjalan.",
      analysisRows: [
        { k: "Repository", v: "kamu/portfolio", ok: false },
        { k: "Branch", v: "main", ok: false },
        { k: "Builder", v: "Dockerfile terdeteksi", ok: true },
        { k: "Port", v: "3000", ok: false },
      ],
      builderLabel: "Urutan builder",
      builderSteps: ["Dockerfile milikmu", "Railpack", "Atur manual"],
      analysisCaption:
        "Stack dikenali dari Dockerfile milikmu atau lewat Railpack. Hasil pembacaannya dapat diperiksa, bukan disembunyikan.",
      deployLabel: "Deployment #1",
      meta: [
        { k: "Commit", v: "a3f9c21" },
        { k: "Branch", v: "main" },
        { k: "Trigger", v: "Deploy manual" },
        { k: "Dimulai", v: "08:41:02" },
      ],
      stages: [
        { name: "Mengambil repository", time: "08:41:02" },
        { name: "Membaca proyek", time: "08:41:05" },
        { name: "Membangun image", time: "08:41:32" },
        { name: "Menjalankan container", time: "08:41:42" },
        { name: "Memeriksa kesehatan", time: "08:41:49" },
      ],
      stateDone: "selesai",
      stateRunning: "sedang berjalan",
      statePending: "menunggu",
      arrivalTitle: "Proyekmu sudah hidup",
      arrivalSub: "Selesai dalam 47 detik. Dapat dibuka publik sekarang.",
      url: "https://portfolio.run.sakala.dev",
      open: "Buka situs",
      appTitle: "Halo, dunia.",
      refrain: "Here it is.",
      deployCaption:
        "Lima tahap bernama, dan akibatnya: karya yang sama, kini punya alamat.",
      note: "Tahap, waktu, dan alamat menggambarkan rancangan Console yang sedang dibangun, bukan layanan yang sudah berjalan.",
    },

    clarity: {
      eyebrow: "Terang",
      title: "Sederhana tidak harus berarti tersembunyi.",
      lead: "Magic boleh terjadi. Misteri tidak harus. Ketika sesuatu gagal, kamu berhak tahu di tahap mana, dan mengapa.",
      bannerTitle: "Deployment gagal",
      bannerSub:
        "Berhenti di tahap Memeriksa kesehatan. Penjelasan dan log ada di bawah.",
      stages: [
        { name: "Mengambil repository", time: "08:41:02", state: "done" },
        { name: "Membaca proyek", time: "08:41:05", state: "done" },
        { name: "Membangun image", time: "08:41:32", state: "done" },
        { name: "Menjalankan container", time: "08:41:42", state: "done" },
        { name: "Memeriksa kesehatan", time: "08:42:12", state: "failed" },
      ],
      stateDone: "selesai",
      stateFailed: "gagal",
      explainLabel: "Yang terjadi",
      explainTitle:
        "Aplikasi berjalan, tetapi mendengarkan di port 5173, bukan 3000 yang diharapkan.",
      checkLabel: "Periksa",
      checks: [
        "variabel PORT dan alamat bind",
        "port yang diekspos di Dockerfile",
        "log runtime di bawah",
      ],
      logLabel: "Log",
      logs: [
        {
          t: "08:41:42",
          m: "Container started · portfolio@a3f9c21",
          error: false,
        },
        {
          t: "08:41:42",
          m: "Health check → 127.0.0.1:31042 (port 3000), timeout 30s",
          error: false,
        },
        {
          t: "08:41:45",
          m: "app: listening on http://localhost:5173",
          error: false,
        },
        {
          t: "08:42:12",
          m: "Health check failed: no response on port 3000 after 30s",
          error: true,
        },
      ],
      caption:
        "Kegagalan ditunjuk pada satu tahap, dijelaskan dalam bahasa manusia, dan lognya ada di tempat yang sama.",
      note: "Bentuk penjelasan ini menggambarkan rancangan Console yang sedang dibangun.",
    },

    life: {
      eyebrow: "Kelanjutan",
      title: "Deployment bukan akhir perjalanan.",
      lead: "Karya yang hidup dapat dibuka, dibagikan, dipelajari, dan diperbaiki. Sebagiannya menjadi titik awal bagi orang lain.",
      root: "Karya yang hidup",
      branches: ["Dibuka", "Dibagikan", "Dipelajari", "Diperbaiki"],
      onward: "Menjadi template",
      newWork: "Karya baru",
      caption: "Sebuah karya yang hidup dapat melahirkan karya berikutnya.",
      note: "Showcase, template, dan pembelajaran adalah arah produk, belum tersedia.",
      more: "Lihat arah produk",
    },

    open: {
      eyebrow: "Terbuka",
      title: "Yang membantu orang belajar seharusnya dapat ikut dipelajari.",
      lead: "Alur, kontrak, dan trade-off teknis Sakala dibuka supaya dapat dibaca, dikoreksi, dan dikembangkan bersama.",
      facts: [
        { label: "Source", value: "Publik" },
        { label: "Lisensi", value: "Apache-2.0" },
        {
          label: "Arsitektur",
          value: "Terdokumentasi",
          href: "/docs/proyek/architecture",
        },
        { label: "Keputusan", value: "Tercatat", href: "/docs/proyek/adr" },
        { label: "Kontribusi", value: "Terbuka" },
        { label: "Runtime pilot", value: "Didukung GMEDIA" },
        { label: "Self-host", value: "Di roadmap" },
      ],
      factsCaption: "Bukti keterbukaan Sakala, bukan sekadar label.",
      human:
        "Teknologi adalah alat. Yang penting adalah apa yang akhirnya dapat diwujudkan manusia dengannya.",
      stewardship:
        "Sakala adalah project open-source yang diinisiasi oleh Sakala Maintainers dan didukung GMEDIA sebagai founding sponsor dan infrastructure supporter.",
      cta: "Pelajari governance",
    },

    finale: {
      title: "Apa yang akan kamu wujudkan?",
      lead: "Setiap karya bermula sebagai kemungkinan.",
      followTitle: "Ikuti perkembangan",
      followLead:
        "Sakala dibangun terbuka. Setiap langkahnya dapat diikuti dari sini.",
      follow: [
        {
          key: "github",
          label: "Ikuti di GitHub",
          note: "Star atau watch untuk kabar rilis",
        },
        {
          key: "rss",
          label: "Langganan RSS Changelog",
          note: "Setiap perubahan yang terlihat publik",
        },
        {
          key: "roadmap",
          label: "Lihat roadmap",
          note: "Arah, bukan janji tanggal",
        },
      ],
      latestTitle: "Perkembangan terbaru",
      latestAll: "Semua pembaruan",
      docs: "Baca dokumentasi",
    },
  },

  philosophy: {
    metaTitle: "Filosofi Sakala — Manifesting Code into Reality",
    metaDescription:
      "Tujuh prinsip Sakala, arti tagline Manifesting Code into Reality, dan alasan deployment dipandang sebagai perpindahan dari kemungkinan menuju wujud.",
    crumb: "Filosofi",
    eyebrow: "Filosofi",
    title: "Kode bukan akhir dari sebuah karya.",
    sourceTitle: "Filosofi Sakala (PHILOSOPHY)",
    lead: "Kode adalah kemungkinan: ide yang telah mendapat struktur, dan sesuatu yang menunggu untuk diwujudkan. Sakala hadir pada batas antara kemungkinan dan wujud.",
    arcTitle: "Tiga tahap yang menjadi dasar",
    arc: [
      {
        name: "Kemungkinan",
        text: "Sesuatu dapat ada. Source code adalah potensi yang sudah berstruktur.",
      },
      {
        name: "Wujud",
        text: "Sesuatu kini ada dalam bentuk yang dapat dijangkau orang lain.",
      },
      {
        name: "Kelanjutan",
        text: "Keberadaannya membuat karya berikutnya menjadi mungkin.",
      },
    ],
    principlesTitle: "Tujuh prinsip",
    principlesLead:
      "Prinsip ini bukan slogan. Tiap prinsip punya konsekuensi pada produk.",
    principles: [
      {
        name: "Wujud",
        text: "Kode menemukan maknanya ketika dapat menjadi sesuatu yang nyata.",
        consequence: "Perjalanan tidak berhenti pada build yang berhasil.",
      },
      {
        name: "Purna",
        text: "Perjalanan dibantu sampai tuntas, bukan ditinggalkan di tengah kompleksitas.",
        consequence:
          "Build, container, route, health check, sampai alamat publik.",
      },
      {
        name: "Sederhana",
        text: "Kompleksitas platform tidak seharusnya menjadi pajak yang dibayar setiap pengguna.",
        consequence: "Sederhana secara bawaan, transparan ketika dibutuhkan.",
      },
      {
        name: "Terang",
        text: "Otomasi boleh terjadi, tetapi harus dapat dijelaskan.",
        consequence:
          "Ketika deployment gagal, kamu berhak tahu tahap mana yang berhenti.",
      },
      {
        name: "Tumbuh",
        text: "Mulai kecil tanpa menutup kemungkinan menjadi lebih besar.",
        consequence:
          "Jangan bangun hari esok hari ini, jangan pula tutup jalannya.",
      },
      {
        name: "Berbagi",
        text: "Karya yang baik seharusnya dapat hidup lebih lama daripada tugas yang melahirkannya.",
        consequence:
          "Karya hidup dapat menjadi contoh, template, dan awal baru.",
      },
      {
        name: "Manusia",
        text: "Infrastruktur adalah alat. Manusia dan apa yang mereka ciptakan adalah tujuan.",
        consequence:
          "Sakala menang ketika seseorang berhasil membuat karyanya hidup.",
      },
    ],
    taglineTitle: "Manifesting Code into Reality",
    taglineBody:
      "Tagline ini bukan gaya bahasa. Ia menyebut pekerjaan yang sebenarnya: membantu sesuatu yang abstrak menjadi hadir, dapat dibuka, dan dapat diuji oleh dunia nyata.",
    filterTitle: "Saringan produk",
    filterLead:
      "Sebelum sebuah fitur besar masuk roadmap, pertanyaan berikut diajukan.",
    filter: [
      "Apakah fitur ini membantu karya menjadi nyata?",
      "Apakah ia membuat perjalanan pengguna lebih utuh?",
      "Apakah ia mengurangi kompleksitas tanpa menjadi kotak hitam?",
      "Apakah ia membantu pengguna memahami dan berkembang?",
      "Apakah ia membuat karya dapat hidup lebih lama?",
      "Apakah ia memberi ruang tumbuh tanpa memaksa kompleksitas sekarang?",
      "Apakah manfaatnya nyata bagi manusia, bukan hanya menyenangkan secara teknis?",
    ],
  },

  product: {
    metaTitle: "Produk Sakala — Kemampuan dan Arah",
    metaDescription:
      "Apa yang Sakala kerjakan sekarang, apa yang sedang dibangun, dan ke mana arahnya. Setiap kemampuan disertai status yang jujur.",
    crumb: "Produk",
    eyebrow: "Produk",
    title: "Apa yang Sakala kerjakan, dan sejauh mana.",
    lead: "Setiap kemampuan di halaman ini membawa status. Desain yang selesai tidak berarti fiturnya sudah berjalan.",
    disclaimer:
      "Sakala belum tersedia sebagai layanan publik. Fondasi produk dan runtime masih disusun secara terbuka.",
    pillarsTitle: "Perjalanan produk",
    pillars: [
      {
        name: "Create",
        question: "Dari mana karya ini dimulai?",
        status: "building",
        items: [
          "menghubungkan repository Git",
          "memilih branch",
          "template sebagai titik awal",
        ],
      },
      {
        name: "Manifest",
        question: "Bagaimana source ini menjadi sesuatu yang hidup?",
        status: "building",
        items: [
          "analisis repository dan deteksi stack",
          "build lewat Dockerfile atau Railpack",
          "deployment, health check, dan route publik",
          "redeploy",
        ],
      },
      {
        name: "Operate",
        question: "Setelah hidup, bagaimana aplikasi ini dijaga?",
        status: "next",
        items: [
          "variabel dan secret",
          "domain bawaan dan custom domain",
          "log dan health",
          "metrik dasar",
        ],
      },
      {
        name: "Explore",
        question: "Apa yang dapat lahir dari karya yang sudah hidup?",
        status: "direction",
        items: [
          "showcase project",
          "template",
          "profil creator",
          "koleksi dan silsilah karya",
        ],
      },
      {
        name: "Learn",
        question: "Bagaimana orang belajar mengirim software sungguhan?",
        status: "direction",
        items: [
          "kelas dan workshop",
          "penugasan",
          "alur magang",
          "tinjauan mentor",
        ],
      },
    ],
    cardsTitle: "Seperti apa di Console",
    cardsLead:
      "Rancangan Console mengutamakan status: setiap project langsung memperlihatkan apakah ia hidup, sedang dibangun, atau gagal.",
    cards: [
      {
        name: "portfolio",
        repo: "kamu/portfolio",
        state: "live",
        stateLabel: "Live",
        body: "Halo, dunia.",
        time: "2 jam lalu",
      },
      {
        name: "tugas-akhir",
        repo: "kamu/tugas-akhir",
        state: "deploying",
        stateLabel: "Deploying",
        body: "Membangun image…",
        time: "dimulai 1 menit lalu",
      },
      {
        name: "api-catatan",
        repo: "kamu/api-catatan",
        state: "failed",
        stateLabel: "Failed",
        body: "Health check gagal",
        time: "kemarin",
      },
    ],
    cardsAction: "Lihat detail",
    cardsCaption:
      "Kartu project di Dashboard: nama, repository, keadaan, pratinjau, dan satu aksi.",
    cardsNote:
      "Rancangan Console Wave 1, dibangun ulang sebagai ilustrasi. Bukan tangkapan layar produk yang berjalan.",
    boundaryTitle: "Yang sengaja tidak dikejar",
    boundaryLead:
      "Menjaga identitas lebih penting daripada mengejar kesetaraan fitur.",
    boundary: [
      "dashboard cloud generik",
      "UI Kubernetes dengan nama baru",
      "jejaring sosial developer",
      "LMS",
      "domain registrar",
      "pengganti suite observability",
      "cloud berlabel AI tanpa nilai inti",
    ],
    docsCta: "Baca dokumentasi",
    roadmapCta: "Lihat roadmap",
  },

  roadmapPage: {
    metaTitle: "Roadmap Sakala — Arah, Bukan Janji Tanggal",
    metaDescription:
      "Horizon produk Sakala, status desain dan engineering yang dipisah, serta syarat sebelum sebuah horizon boleh dimulai.",
    crumb: "Roadmap",
    eyebrow: "Roadmap",
    title: "Arah, bukan janji tanggal.",
    sourceTitle: "Roadmap Sakala (ROADMAP)",
    lead: "Sakala memakai tiga pandangan yang berjalan paralel dan tidak selalu sinkron: produk, desain, dan engineering.",
    horizonLabel: "Horizon",
    horizons: [
      {
        name: "Manifestasi",
        status: "testing",
        text: "Identitas, project, analisis repository, build, deploy, log, domain bawaan, health, redeploy, kuota pilot, dan kontrol admin.",
      },
      {
        name: "Gate pilot publik",
        status: "next",
        text: "Isolasi workload, sleep otomatis dan batas build, dokumen hukum, penanganan abuse, serta bukti dan biaya dari pilot.",
      },
      {
        name: "Learn minimal",
        status: "next",
        text: "Kelas, peserta lewat CSV, penugasan dengan tenggat, ringkasan untuk pengajar, dan siklus hidup project setelah kelas selesai.",
      },
      {
        name: "Self-host satu node",
        status: "direction",
        text: "Installer yang bisa diulang dengan gVisor aktif, supaya institusi bisa menjalankan Sakala di servernya sendiri.",
      },
      {
        name: "Operasi yang andal",
        status: "direction",
        text: "Custom domain, pemulihan dan rollback, metrik dasar, auto-deploy lewat webhook, dan repository privat.",
      },
      {
        name: "Explore dan ekosistem",
        status: "direction",
        text: "Dimulai dari koleksi terkurasi, lalu showcase, template, profil creator, dan silsilah project.",
      },
      {
        name: "Kolaborasi, layanan, platform",
        status: "direction",
        text: "Workspace dan peran, layanan data terkelola, CLI, API publik, dan runtime multi-node.",
      },
    ],
    designTitle: "Status desain dan engineering dipisah",
    designLead:
      "Desain yang siap tidak berarti engineering sudah berkomitmen membangunnya. Keduanya sengaja tidak disamakan.",
    tracks: [
      { name: "Desain alur produk inti", status: "available" },
      { name: "Fondasi console, API, agent", status: "building" },
      { name: "Runtime deployment", status: "testing" },
      { name: "Layanan publik", status: "unavailable" },
    ],
    gateTitle: "Kapan sebuah horizon boleh dimulai",
    gateLead:
      "Desain yang selesai bukan alasan yang cukup. Yang dipertimbangkan adalah kebutuhan pengguna, daya ungkit produk, biaya engineering, biaya operasional, dan kesiapan arsitektur.",
  },

  openSourcePage: {
    metaTitle: "Open Source Sakala — Governance, Sponsor, dan Ekosistem",
    metaDescription:
      "Bagaimana Sakala dikelola: stewardship maintainer, batas peran GMEDIA sebagai founding sponsor, lisensi Apache-2.0, dan ekosistem repository.",
    crumb: "Open Source",
    eyebrow: "Open Source",
    title: "Terbuka agar dapat dipelajari, diaudit, dan dikoreksi.",
    lead: "Deployment lebih bermanfaat untuk belajar bila alur, kontrak, dan trade-off teknisnya dapat dibaca serta diperbaiki bersama.",
    factsTitle: "Fakta project",
    facts: [
      { label: "Lisensi", value: "Apache License 2.0" },
      {
        label: "Stewardship",
        value: "Sakala Maintainers",
        href: "/docs/proyek/governance",
      },
      { label: "Founding sponsor", value: "GMEDIA · PT Media Sarana Data" },
      {
        label: "Dokumen project",
        value: "Terbit di situs ini",
        href: "/docs/proyek",
      },
    ],
    sponsorTitle: "Batas peran sponsor",
    sponsorLead:
      "GMEDIA mendukung infrastruktur, domain, ruang eksperimen, dan dukungan teknis agar Sakala mencapai MVP dan pilot awal.",
    sponsorBody:
      "Sponsor tidak otomatis mengontrol keputusan teknis, prioritas roadmap, perubahan lisensi, atau hak contributor. Sakala tetap dikembangkan dengan roadmap, dokumentasi, dan kontribusi publik.",
    stewardshipCards: [
      {
        role: "Stewardship",
        name: "Sakala Maintainers",
        text: "Memegang keputusan teknis, arsitektur, dan lisensi.",
      },
      {
        role: "Mendukung",
        name: "GMEDIA",
        text: "Founding sponsor dan infrastructure supporter. Tanpa kendali atas roadmap maupun lisensi.",
      },
      {
        role: "Berkontribusi",
        name: "Contributor publik",
        text: "Issue, pull request, dokumentasi, desain, dan pengujian.",
      },
    ],
    stewardshipCaption:
      "Hubungan antara stewardship, sponsor, dan contributor.",
    decisionsTitle: "Domain keputusan",
    decisions: [
      {
        area: "Produk",
        owner: "Maintainer bersama diskusi product dan design.",
      },
      {
        area: "Arsitektur",
        owner:
          "Dipimpin maintainer. Perubahan boundary besar dicatat sebagai keputusan arsitektur.",
      },
      {
        area: "Implementasi",
        owner: "Squad pemilik, di dalam arsitektur yang sudah ditetapkan.",
      },
      {
        area: "Keamanan",
        owner: "Tinjauan maintainer atau security dapat menahan rilis.",
      },
      {
        area: "Komunitas",
        owner: "Aturan terdokumentasi, dapat diaudit, dengan jalur peninjauan.",
      },
    ],
    ecosystemTitle: "Ekosistem repository",
    ecosystemLead:
      "Tanggung jawab dipisahkan supaya batas hak istimewa tetap jelas. Hanya Agent yang menjalankan operasi runtime.",
    ecosystemCaption:
      "Lima repository Sakala, dikelompokkan menurut hak istimewa yang dipegangnya.",
    publicLabel: "Publik",
    controlLabel: "Control plane",
    dataLabel: "Data plane",
    repoRoles: {
      landing: "Website, dokumentasi, dan pintu masuk SEO.",
      console: "Antarmuka pengguna untuk mengelola project.",
      api: "Control plane untuk auth, project, deployment, dan command.",
      agent: "Executor runtime yang menjalankan pekerjaan pada node.",
      infra: "Referensi runtime, networking, dan routing.",
    },
    contributeTitle: "Cara berkontribusi",
    contributeLead:
      "Tidak perlu menunggu produknya jadi. Tiga jalur ini terbuka hari ini, dan kontribusi bukan hanya kode.",
    contributePaths: [
      {
        key: "issues",
        label: "Buka issue atau diskusi",
        note: "Laporkan yang keliru, usulkan yang kurang, tanyakan yang belum jelas.",
      },
      {
        key: "docs",
        label: "Baca dan koreksi dokumentasi",
        note: "Dokumentasi teknis dibuka untuk dibaca, diuji, dan diperbaiki.",
      },
      {
        key: "build",
        label: "Jalankan situs ini secara lokal",
        note: "Repository landing dapat di-clone, dibangun, dan dikirimi pull request.",
      },
    ],
    topologyNote:
      "API tidak pernah menyentuh Docker socket. Hanya Agent yang menjalankan operasi runtime berhak istimewa.",
  },

  changelogPage: {
    metaTitle: "Changelog — Sakala",
    metaDescription:
      "Ikuti pembaruan publik Sakala, termasuk landing page, dokumentasi, console, API, agent, dan fondasi deployment open-source.",
    crumb: "Changelog",
    eyebrow: "Changelog",
    title: "Perkembangan yang bisa diperiksa.",
    lead: "Pembaruan penting website, dokumentasi, dan fondasi produk. Yang dicatat di sini adalah perubahan yang benar-benar sudah terlihat publik, bukan rencana.",
    rss: "Langganan RSS",
    empty: "Belum ada pembaruan yang dicatat untuk bahasa ini.",
  },

  notFound: {
    metaTitle: "Halaman tidak ditemukan — Sakala",
    metaDescription: "Halaman yang kamu cari tidak ditemukan.",
    eyebrow: "Error 404",
    title: "Alamat ini belum menuju ke mana-mana.",
    lead: "Tautannya mungkin sudah berubah, atau halamannya memang belum ada karena Sakala masih dibangun. Berikut tempat yang pasti bisa dibuka.",
    destinations: {
      home: { label: "Beranda", note: "Kembali ke awal" },
      docs: { label: "Dokumentasi", note: "Konsep dan alur deployment" },
      changelog: { label: "Changelog", note: "Perkembangan terbaru" },
    },
  },

  footer: {
    tagline: "Manifesting Code into Reality",
    blurb:
      "Platform deployment open-source yang membawa karya dari repository menjadi aplikasi yang hidup.",
    exploreLabel: "Jelajahi",
    projectLabel: "Project",
    rss: "RSS Changelog",
    rights: "Sakala Contributors",
    license: "Apache-2.0",
    sponsor: "Founding sponsor: GMEDIA",
  },
};

export type Dictionary = typeof id;
