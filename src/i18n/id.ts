export const id = {
  meta: {
    siteTitle: "Sakala — Membawa Kode Menjadi Aplikasi yang Hidup",
    siteDescription:
      "Sakala adalah project deployment open-source yang membantu source dari repository menjadi aplikasi yang dapat berjalan, dibuka, dan dibagikan. Masih dalam pengembangan aktif.",
    homeTitle: "Sakala — Manifesting Code into Reality",
    homeDescription:
      "Sakala adalah project deployment open-source yang membantu membawa source dari repository menjadi aplikasi yang dapat berjalan, dibuka, dan dibagikan. Sedang dibangun secara terbuka.",
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
    changelog: "Changelog",
    github: "GitHub",
    console: "Masuk",
    menu: "Menu",
    close: "Tutup",
    languageLabel: "Pilih bahasa",
    docsNoteForEnglish: null as string | null,
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
   *  Possibility → Presence → Continuation. */
  home: {
    notice: {
      label: "Status",
      text: "Sakala belum tersedia sebagai layanan publik. Alur di halaman ini adalah pengalaman yang sedang dibangun.",
      link: "Lihat status pengembangan",
    },

    possibility: {
      title: "Setiap karya bermula sebagai kemungkinan.",
      lead: "Sebuah project bisa selesai ditulis, tersimpan rapi, dan berjalan di layar sendiri. Tetapi belum tentu ada seorang pun yang dapat membukanya.",
      artifactLabel: "Repository",
      branch: "main",
      commit: "commit a3f9c21",
      files: [
        "portfolio/",
        "├── src/",
        "├── public/",
        "├── package.json",
        "└── README.md",
      ],
      caption:
        "Sebuah repository menyimpan kemungkinan: ide yang sudah punya bentuk, tetapi belum punya alamat.",
      alt: "Artefak repository bernama portfolio pada branch main, berisi folder src dan public, serta berkas package.json dan README.md. Ia menggambarkan project yang lengkap sebagai source code.",
    },

    distance: {
      eyebrow: "Jarak",
      title: "Tidak semua yang selesai dibuat, selesai diwujudkan.",
      lead: "Berjalan di laptop membuktikan sesuatu bekerja. Bukan bahwa dunia dapat membukanya.",
      refrain: "I built this.",
      artifactLabel: "Berjalan secara lokal",
      address: "localhost:5173",
      appTitle: "Halo, dunia.",
      appSub: "Berjalan baik di mesin ini.",
      reach: "dapat dibuka oleh: kamu",
      observations: [
        "Repository menyimpan source. Dunia membutuhkan sesuatu yang dapat dibuka.",
        "Project ini tidak rusak. Ia hanya belum sampai.",
      ],
      caption:
        "Aplikasi berjalan pada alamat yang hanya menunjuk kembali ke perangkat yang menjalankannya.",
      alt: "Sebuah jendela aplikasi melayang di tengah bidang berkisi, menampilkan alamat localhost titik dua 5173 dan halaman yang sedang berjalan. Catatan di pojok menyebut bahwa alamat itu hanya dapat dibuka olehmu sendiri.",
    },

    threshold: {
      eyebrow: "Ambang",
      title: "Di antara kemungkinan dan wujud, ada sebuah perjalanan.",
      plain:
        "Sakala adalah project deployment open-source yang membantu membawa source dari repository menjadi aplikasi yang dapat berjalan, dibuka, dan dibagikan.",
      from: "Kemungkinan / Lokal",
      through: "Sakala",
      to: "Wujud / Publik",
      fromToken: "github.com/kamu/karya",
      toToken: "karya.run.sakala.dev",
      caption: "Sakala berada tepat pada perpindahan itu.",
      alt: "Diagram ambang. Source berada di atas, Sakala di tengah sebagai perpindahan, dan wujud di bawah sebagai aplikasi yang dapat dijangkau.",
    },

    manifestation: {
      eyebrow: "Perjalanan",
      title: "Wujud bukan sekadar build yang berhasil.",
      lead: "Perjalanan belum selesai sampai karya benar-benar dapat dijangkau. Setiap tahap punya nama, sehingga kamu tahu di mana posisinya.",
      steps: [
        {
          name: "Repository",
          text: "Source dan commit yang tepat menjadi titik berangkat.",
        },
        {
          name: "Analyze",
          text: "Stack dikenali, dan hasil pembacaannya ditampilkan untuk diperiksa.",
        },
        {
          name: "Build",
          text: "Source diubah menjadi image yang dapat dijalankan.",
        },
        {
          name: "Start",
          text: "Aplikasi dijalankan dengan batas resource yang jelas.",
        },
        {
          name: "Health",
          text: "Sakala memastikan aplikasi benar-benar menjawab.",
        },
        {
          name: "Reach",
          text: "Route publik diaktifkan, dan karya memiliki alamat.",
        },
      ],
      arrivalLabel: "Dapat dijangkau",
      domain: "portfolio.run.sakala.dev",
      healthy: "200 · sehat",
      arrivalTitle: "Halo, dunia.",
      arrivalSub: "Sekarang bukan lagi sekadar source. Sekarang ia hadir.",
      refrain: "Here it is.",
      deployCaption:
        "Enam tahap, dan akibatnya: karya yang sudah dapat dijangkau.",
      deployAlt:
        "Satu artefak deployment dengan dua sisi. Di kiri, enam tahap berurutan: Repository, Analyze, Build, Start, Health, dan Reach. Di kanan, jendela browser menampilkan alamat portfolio titik run titik sakala titik dev dalam keadaan sehat. Tiap tahap bernama sehingga kegagalan dapat ditunjuk secara spesifik.",
      note: "Alamat, tahap, dan status pada bagian ini menggambarkan alur yang sedang dibangun.",
    },

    clarity: {
      eyebrow: "Terang",
      title: "Sederhana tidak harus berarti tersembunyi.",
      lead: "Magic boleh terjadi. Misteri tidak harus. Ketika sesuatu gagal, kamu berhak tahu mengapa.",
      states: [
        { name: "Repository", ok: true },
        { name: "Build", ok: true },
        { name: "Start", ok: true },
        { name: "Health", ok: false },
      ],
      failureTitle: "Health Check gagal",
      failureBody:
        "Aplikasi berhasil dijalankan, tetapi tidak menjawab pada port yang diharapkan.",
      checkLabel: "Periksa",
      checks: ["alamat bind", "port yang diekspos", "log runtime"],
      caption:
        "Kegagalan ditunjuk pada tahap tertentu, bukan dilaporkan sebagai kesalahan umum.",
      alt: "Artefak diagnostik. Repository, Build, dan Start berhasil, sedangkan Health gagal. Penjelasannya menyebut bahwa aplikasi berjalan tetapi tidak menjawab pada port yang diharapkan, dengan tiga hal yang perlu diperiksa.",
      note: "Bentuk penjelasan ini menggambarkan arah yang dituju.",
    },

    life: {
      eyebrow: "Kelanjutan",
      title: "Deployment bukan akhir perjalanan.",
      lead: "Karya yang hidup dapat dibuka, dibagikan, dipelajari, dan diperbaiki. Sebagiannya menjadi titik awal bagi orang lain.",
      root: "Karya yang hidup",
      branches: [
        { name: "Dibuka", status: "available" },
        { name: "Dibagikan", status: "available" },
        { name: "Dipelajari", status: "direction" },
        { name: "Diperbaiki", status: "available" },
      ],
      onward: "Menjadi template",
      newWork: "Karya baru",
      caption:
        "Sebuah karya yang hidup dapat melahirkan karya berikutnya. Bagian bertanda arah belum tersedia.",
      alt: "Diagram kelanjutan. Karya yang hidup bercabang menjadi dibuka, dibagikan, dipelajari, dan diperbaiki. Dari sana ia dapat menjadi template, dan template menjadi titik awal karya baru.",
      more: "Lihat arah produk",
    },

    open: {
      eyebrow: "Terbuka",
      title: "Yang membantu orang belajar seharusnya dapat ikut dipelajari.",
      lead: "Alur, kontrak, dan trade-off teknis Sakala dibuka supaya dapat dibaca, dikoreksi, dan dikembangkan bersama.",
      facts: [
        { label: "Source", value: "Publik" },
        { label: "Lisensi", value: "Apache-2.0" },
        { label: "Arsitektur", value: "Terdokumentasi" },
        { label: "Keputusan", value: "Tercatat" },
        { label: "Kontribusi", value: "Terbuka" },
      ],
      factsCaption: "Bukti keterbukaan Sakala, bukan sekadar label.",
      factsAlt:
        "Daftar bukti keterbukaan: source publik, lisensi Apache 2.0, arsitektur terdokumentasi, keputusan tercatat, dan kontribusi terbuka.",
      human:
        "Teknologi adalah alat. Yang penting adalah apa yang akhirnya dapat diwujudkan manusia dengannya.",
      stewardship:
        "Sakala adalah project open-source yang diinisiasi oleh Sakala Maintainers dan didukung GMEDIA sebagai founding sponsor dan infrastructure supporter.",
      cta: "Pelajari governance",
    },

    finale: {
      title: "Apa yang akan kamu wujudkan?",
      lead: "Setiap karya bermula sebagai kemungkinan.",
      primary: "Jelajahi Sakala",
      secondary: "Baca Dokumentasi",
      tertiary: "Lihat di GitHub",
    },
  },

  philosophy: {
    metaTitle: "Filosofi Sakala — Manifesting Code into Reality",
    metaDescription:
      "Tujuh prinsip Sakala, arti tagline Manifesting Code into Reality, dan alasan deployment dipandang sebagai perpindahan dari kemungkinan menuju wujud.",
    crumb: "Filosofi",
    eyebrow: "Filosofi",
    title: "Kode bukan akhir dari sebuah karya.",
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
    lead: "Sakala memakai tiga pandangan yang berjalan paralel dan tidak selalu sinkron: produk, desain, dan engineering.",
    horizonLabel: "Horizon",
    horizons: [
      {
        name: "Manifestasi",
        status: "building",
        text: "Identitas, project, analisis repository, build, deploy, log, domain bawaan, health, dan redeploy.",
      },
      {
        name: "Operasi yang andal",
        status: "next",
        text: "Custom domain, pemulihan deployment, log runtime, metrik, dan auto-deploy lewat webhook.",
      },
      {
        name: "Explore dan ekosistem",
        status: "direction",
        text: "Showcase, profil creator, template, koleksi, dan silsilah project.",
      },
      {
        name: "Kolaborasi dan belajar",
        status: "direction",
        text: "Workspace, anggota, peran, kelas, penugasan, dan alur magang.",
      },
      {
        name: "Layanan pendukung",
        status: "direction",
        text: "PostgreSQL terkelola, Redis, object storage, worker, dan observability yang lebih kaya.",
      },
      {
        name: "Platform",
        status: "direction",
        text: "CLI, API publik, installer self-host, dan runtime multi-node.",
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
      { label: "Stewardship", value: "Sakala Maintainers" },
      { label: "Founding sponsor", value: "GMEDIA · PT Media Sarana Data" },
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
    stewardshipAlt:
      "Sakala Maintainers memegang stewardship dan keputusan teknis. GMEDIA berperan sebagai founding sponsor tanpa kendali atas roadmap maupun lisensi. Contributor publik berpartisipasi lewat issue dan pull request.",
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
    ecosystemAlt:
      "Kelompok publik berisi sakala-landing. Kelompok control plane berisi sakala-console dan sakala-api. Kelompok data plane berisi sakala-agent dan sakala-infra, satu-satunya kelompok yang menjalankan operasi runtime berhak istimewa.",
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
    contributorsTitle: "Contributor awal",
    contributorsLead:
      "Nama akan dicatat setelah kontribusinya nyata dan contributor menyetujui pencantumannya. Kontribusi bukan hanya kode.",
    contributorAreas: [
      "Product & Design",
      "Frontend",
      "Backend & Platform",
      "Dokumentasi",
      "Testing",
      "Komunitas",
    ],
    contributeCta: "Lihat ruang kontribusi",
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
      "Project deployment open-source yang membantu karya berpindah dari repository menjadi aplikasi yang hidup.",
    exploreLabel: "Jelajahi",
    projectLabel: "Project",
    rss: "RSS Changelog",
    rights: "Sakala Contributors",
    license: "Apache-2.0",
    sponsor: "Founding sponsor: GMEDIA",
  },
};

export type Dictionary = typeof id;
