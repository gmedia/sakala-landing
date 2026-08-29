export const id = {
  meta: {
    siteTitle: "Sakala — Membawa Kode Menjadi Aplikasi yang Hidup",
    siteDescription:
      "Sakala adalah project deployment open-source yang membantu kode berpindah dari repository menjadi aplikasi yang bisa dibuka, dibagikan, dan dipelajari. Masih dalam pengembangan aktif.",
    homeTitle: "Sakala — Manifesting Code into Reality",
    homeDescription:
      "Sakala membantu project berpindah dari repository Git menjadi aplikasi yang benar-benar hidup. Project open-source yang sedang dibangun secara terbuka.",
    ogAlt: "Logo Sakala dengan tagline Manifesting Code into Reality",
    skipToContent: "Lewati ke konten utama",
  },

  nav: {
    label: "Navigasi utama",
    docs: "Dokumentasi",
    about: "Tentang",
    changelog: "Changelog",
    github: "GitHub",
    console: "Masuk",
    menu: "Menu",
    close: "Tutup",
    languageLabel: "Pilih bahasa",
    docsNoteForEnglish: null as string | null,
  },

  hero: {
    badge: "Dalam pengembangan aktif",
    tagline: "Manifesting Code into Reality",
    title: "Kode bukan akhir dari sebuah karya.",
    lead: "Repository menyimpan kode dengan sangat baik, tetapi tidak otomatis memberinya kehidupan. Sakala dibangun untuk membantu perjalanan berikutnya: dari source menjadi aplikasi yang bisa dibuka, dibagikan, dan dipelajari.",
    ctaPrimary: "Baca Dokumentasi",
    ctaSecondary: "Lihat Repository",
    honesty:
      "Sakala belum tersedia sebagai layanan publik. Yang bisa kamu lakukan sekarang adalah membaca arsitekturnya, mengikuti perkembangannya, dan ikut berkontribusi.",
  },

  status: {
    label: "Status pengembangan",
    designNote: "Status desain",
    engineeringNote: "Status engineering",
    disclaimer:
      "Desain yang selesai belum berarti fiturnya sudah berjalan. Kedua status sengaja dipisah.",
    items: {
      design: {
        name: "Desain alur produk inti",
        state: "selesai",
      },
      foundation: {
        name: "Fondasi console, API, agent",
        state: "sedang dibangun",
      },
      runtime: {
        name: "Runtime deployment",
        state: "sedang diuji",
      },
      service: {
        name: "Layanan publik",
        state: "belum tersedia",
      },
    },
  },

  problem: {
    eyebrow: "Jarak yang sering terjadi",
    title: "Sudah jadi di laptop. Belum bisa dibuka siapa pun.",
    lead: "Sebuah aplikasi mulai terasa nyata ketika ia dapat berjalan, dibuka, dan diuji oleh dunia nyata. Jarak menuju titik itu sering lebih jauh dari yang diperkirakan.",
    items: {
      localhost: {
        title: "Project berhenti di localhost",
        text: "Berjalan baik di perangkat sendiri, tetapi belum punya alamat yang bisa dibagikan.",
      },
      handover: {
        title: "Karya dikumpulkan sebagai arsip",
        text: "Yang dilihat penilai adalah berkas dan tangkapan layar, bukan aplikasi yang benar-benar berjalan.",
      },
      setup: {
        title: "Pembaca harus menyiapkan sendiri",
        text: "Setiap project membawa instruksi install berbeda, dan setiap instruksi punya cara gagal sendiri.",
      },
      tooEarly: {
        title: "Server datang terlalu cepat",
        text: "Belajar mengirim software seharusnya tidak dimulai dari TLS, reverse proxy, dan konfigurasi jaringan.",
      },
    },
  },

  crossing: {
    eyebrow: "Cara kerja",
    title: "Satu penyeberangan, lima tahap yang bisa dijelaskan.",
    lead: "Di balik satu perintah deploy ada Git, builder, container, routing, dan health check. Sakala menanggung kerumitannya, tetapi tetap menjelaskan apa yang terjadi.",
    steps: {
      source: {
        name: "Source",
        text: "Repository Git dan commit yang tepat menjadi titik berangkat.",
      },
      build: {
        name: "Build",
        text: "Stack dikenali, lalu image dibangun. Dockerfile lebih dulu, Railpack sebagai cadangan.",
      },
      deploy: {
        name: "Deploy",
        text: "Container dijalankan dengan batas resource yang jelas.",
      },
      run: {
        name: "Run",
        text: "Health check memastikan aplikasi benar-benar menjawab, bukan sekadar menyala.",
      },
      reach: {
        name: "Reach",
        text: "Route publik diaktifkan, dan aplikasi punya alamat yang bisa dibuka.",
      },
    },
    transparency: {
      title: "Otomasi boleh terjadi, asal bisa dijelaskan.",
      text: "Ketika sesuatu gagal, yang dibutuhkan bukan pesan “something went wrong”, melainkan tahap mana yang gagal dan apa yang perlu diperiksa.",
      sample: {
        caption: "Contoh bentuk penjelasan yang dituju",
        stage: "Tahap: Health Check",
        body: "Aplikasi berhasil dijalankan, tetapi tidak menjawab pada port yang diharapkan.",
        checks: ["alamat bind", "port yang diekspos", "log runtime"],
      },
    },
    diagram: {
      caption:
        "Alur Sakala dari repository sampai aplikasi memiliki alamat publik.",
      alt: "Diagram alur lima tahap. Source mengarah ke Build, Build ke Deploy, Deploy ke Run, dan Run ke Reach yang menghasilkan URL publik.",
    },
    systemDiagram: {
      caption: "Pembagian tanggung jawab antar komponen Sakala.",
      alt: "Diagram sistem. Browser mengakses Console, Console berbicara dengan API sebagai control plane, API menyimpan perintah, Agent mengambil perintah secara outbound lalu menjalankan Docker dan Caddy pada runtime node, dan hasilnya adalah container aplikasi yang dapat diakses publik.",
      note: "API tidak pernah menyentuh Docker socket. Seluruh operasi runtime yang berhak istimewa hanya dilakukan Agent.",
    },
  },

  principles: {
    eyebrow: "Tujuh prinsip",
    title: "Yang kami pegang saat memutuskan.",
    items: {
      wujud: { name: "Wujud", text: "Kode menjadi nyata." },
      purna: { name: "Purna", text: "Perjalanan dibantu sampai tuntas." },
      sederhana: {
        name: "Sederhana",
        text: "Kompleksitas tidak dibebankan ke pengguna.",
      },
      terang: { name: "Terang", text: "Otomasi harus dapat dijelaskan." },
      tumbuh: {
        name: "Tumbuh",
        text: "Mulai kecil, tetap punya ruang berkembang.",
      },
      berbagi: {
        name: "Berbagi",
        text: "Karya dapat dilihat, dipelajari, dan diwariskan.",
      },
      manusia: {
        name: "Manusia",
        text: "Teknologi adalah alat untuk membantu manusia mencipta.",
      },
    },
  },

  afterlife: {
    eyebrow: "Arah produk",
    title: "Deployment adalah jantungnya, bukan seluruh tubuhnya.",
    lead: "Setelah sebuah karya hidup, ia masih perlu dijaga, ditemukan, dan dipelajari. Bagian ini menggambarkan arah yang dituju, bukan fitur yang sudah tersedia.",
    statusLabel: "Status",
    pillars: {
      operate: {
        name: "Operate",
        question: "Setelah hidup, bagaimana aplikasi ini dijaga?",
        items: [
          "variabel dan secret",
          "domain dan TLS",
          "log dan health",
          "metrik dasar",
        ],
      },
      explore: {
        name: "Explore",
        question: "Apa yang bisa lahir dari karya yang sudah hidup?",
        items: [
          "showcase project",
          "template",
          "profil creator",
          "koleksi dan kurasi",
        ],
      },
      learn: {
        name: "Learn",
        question: "Bagaimana orang belajar mengirim software sungguhan?",
        items: [
          "kelas dan workshop",
          "penugasan",
          "alur magang",
          "tinjauan mentor",
        ],
      },
    },
    loop: {
      title: "Karya melahirkan karya",
      text: "Project yang hidup dapat menjadi contoh, contoh dapat menjadi template, dan template dapat menjadi titik awal bagi orang lain.",
      caption:
        "Siklus yang dituju Sakala setelah sebuah project berhasil hidup.",
      alt: "Diagram siklus. Project menuju Deploy, Deploy menuju Showcase, Showcase menuju Template, Template menuju developer baru, dan developer baru memulai project baru sehingga siklusnya kembali ke awal.",
    },
    boundary: {
      title: "Yang sengaja tidak dikejar",
      items: [
        "dashboard cloud generik",
        "UI Kubernetes dengan nama baru",
        "jejaring sosial developer",
        "LMS",
        "pengganti suite observability",
      ],
    },
  },

  audience: {
    eyebrow: "Untuk siapa",
    title: "Dibangun lebih dulu untuk yang paling terhalang.",
    lead: "Prioritas awal Sakala adalah orang yang punya kode bagus tetapi terhalang oleh infrastruktur.",
    items: {
      student: {
        name: "Mahasiswa",
        text: "Mengumpulkan karya sebagai alamat yang bisa dibuka, bukan arsip yang perlu disiapkan ulang.",
      },
      beginner: {
        name: "Developer pemula",
        text: "Membawa project keluar dari localhost sambil memahami kenapa tiap tahap ada.",
      },
      instructor: {
        name: "Pengajar dan mentor",
        text: "Membuka hasil kerja peserta lewat browser tanpa menyiapkan environment satu per satu.",
      },
      creator: {
        name: "Creator open-source",
        text: "Menyediakan demo hidup dan titik awal yang bisa dipakai orang lain.",
      },
      community: {
        name: "Komunitas",
        text: "Menjalankan workshop dengan onboarding seragam dan resource yang terkendali.",
      },
      team: {
        name: "Tim kecil",
        text: "Membagikan prototype dan demo internal tanpa memulai dari konfigurasi server.",
      },
    },
  },

  roadmap: {
    eyebrow: "Roadmap",
    title: "Arah, bukan janji tanggal.",
    lead: "Sakala memakai tiga pandangan yang berjalan paralel dan tidak selalu sinkron satu sama lain.",
    horizonLabel: "Horizon",
    items: {
      a: {
        name: "Manifestasi",
        text: "Identitas, project, analisis repository, build, deploy, log, domain bawaan, dan redeploy.",
        state: "sedang dikerjakan",
      },
      b: {
        name: "Operasi yang andal",
        text: "Custom domain, pemulihan deployment, log runtime, metrik, dan auto-deploy lewat webhook.",
        state: "berikutnya",
      },
      c: {
        name: "Explore dan ekosistem",
        text: "Showcase, profil creator, template, koleksi, dan silsilah project.",
        state: "dieksplorasi desain",
      },
      d: {
        name: "Kolaborasi dan belajar",
        text: "Workspace, anggota, peran, kelas, penugasan, dan alur magang.",
        state: "direncanakan",
      },
      e: {
        name: "Layanan pendukung",
        text: "PostgreSQL terkelola, Redis, object storage, worker, dan observability yang lebih kaya.",
        state: "direncanakan",
      },
      f: {
        name: "Platform",
        text: "CLI, API publik, installer self-host, dan runtime multi-node.",
        state: "direncanakan",
      },
    },
    validation: {
      title: "Kapan sebuah horizon boleh dimulai",
      text: "Desain yang selesai bukan alasan yang cukup. Yang dipertimbangkan adalah kebutuhan pengguna, daya ungkit produk, biaya engineering, biaya operasional, dan kesiapan arsitektur.",
    },
  },

  openSource: {
    eyebrow: "Open source",
    title: "Dibangun terbuka supaya bisa dipelajari dan dikoreksi.",
    lead: "Deployment lebih bermanfaat untuk belajar bila alur, kontrak, dan trade-off teknisnya dapat dibaca serta diperbaiki bersama.",
    licenseLabel: "Lisensi",
    licenseValue: "Apache License 2.0",
    stewardshipLabel: "Stewardship",
    stewardshipValue: "Sakala Maintainers",
    sponsorLabel: "Founding sponsor",
    sponsorValue: "GMEDIA · PT Media Sarana Data",
    sponsorNote:
      "Sponsor mendukung infrastruktur dan fase awal. Sponsor tidak otomatis mengontrol keputusan teknis, prioritas roadmap, perubahan lisensi, atau hak contributor.",
    ecosystemLabel: "Ekosistem repository",
    repositories: {
      console: "Antarmuka pengguna",
      api: "Control plane",
      agent: "Eksekutor runtime",
      infra: "Referensi runtime",
      landing: "Website dan dokumentasi",
    },
    governanceCta: "Baca governance project",
  },

  faq: {
    eyebrow: "Pertanyaan",
    title: "Yang biasanya ditanyakan lebih dulu.",
    contactPrefix: "Ada pertanyaan lain? Mulai dari",
    contactLink: "issue di GitHub",
    items: {
      ready: {
        q: "Apakah Sakala sudah bisa dipakai?",
        a: "Belum sebagai layanan publik. Saat ini fondasi produk dan runtime masih dibangun, dan statusnya sengaja ditampilkan terbuka supaya ekspektasinya tidak keliru.",
      },
      docker: {
        q: "Apakah saya harus paham Docker dan reverse proxy dulu?",
        a: "Tidak di hari pertama. Sakala menanggung kerumitannya, tetapi tetap menampilkan apa yang terjadi supaya bisa dipelajari bertahap ketika kamu ingin tahu lebih dalam.",
      },
      enterprise: {
        q: "Apakah ini pengganti cloud enterprise?",
        a: "Bukan. Sakala dibuat untuk belajar, portfolio, demo, kelas, komunitas, dan tim kecil yang ingin karyanya bisa dibuka orang lain.",
      },
      gmedia: {
        q: "Apa peran GMEDIA?",
        a: "GMEDIA adalah founding sponsor dan infrastructure supporter pada fase awal. Sakala tetap dikembangkan sebagai project open-source dengan roadmap, dokumentasi, dan kontribusi publik.",
      },
      contribute: {
        q: "Bagaimana cara ikut berkontribusi?",
        a: "Mulai dari issue, perbaikan dokumentasi, masukan untuk alur produk, atau pull request. Kontribusi bukan hanya kode; desain, pengujian, dan kerja komunitas ikut membentuk fondasi.",
      },
      selfhost: {
        q: "Apakah nanti bisa di-self-host?",
        a: "Itu arah yang direncanakan lewat installer dan distribusi terpisah, tetapi belum dikerjakan sekarang.",
      },
    },
  },

  cta: {
    eyebrow: "Ikut dari awal",
    title: "Bantu bentuk jalur deploy yang jelas untuk belajar.",
    lead: "Baca arsitekturnya, ikuti perkembangannya, dan sampaikan apa yang kurang. Suara pengguna awal ikut menentukan bentuk akhirnya.",
    primary: "Baca Dokumentasi",
    secondary: "Lihat Repository",
  },

  footer: {
    tagline: "Manifesting Code into Reality",
    blurb:
      "Project deployment open-source yang membantu karya berpindah dari repository menjadi aplikasi yang hidup.",
    navigationLabel: "Navigasi",
    openSourceLabel: "Open source",
    governance: "Governance",
    concepts: "Konsep",
    faqLink: "Pertanyaan umum",
    rss: "RSS Changelog",
    rights: "Sakala Contributors",
    license: "Apache-2.0",
    sponsor: "Founding sponsor: GMEDIA",
  },
  about: {
    metaTitle: "Tentang Sakala — Project Deployment Open-Source",
    metaDescription:
      "Kenali tujuan Sakala, perjalanan produk yang dituju, prinsip open-source, dukungan founding sponsor, dan arah komunitasnya.",
    crumb: "Tentang Sakala",
    eyebrow: "Tentang Sakala",
    title: "Deployment yang bisa dipelajari, bukan sekadar dipakai.",
    lead: "Sakala membantu project berpindah dari repository Git menuju alamat publik melalui alur yang lebih sederhana, tanpa menyembunyikan apa yang sebenarnya terjadi.",
    focus: {
      eyebrow: "Fokus",
      title:
        "Untuk yang terhalang infrastruktur, bukan untuk beban kerja enterprise.",
      p1: "Fokus awalnya sederhana: membantu project keluar dari localhost tanpa harus langsung berhadapan dengan VPS, TLS, reverse proxy, Docker networking, dan konfigurasi server manual.",
      p2: "Sasarannya adalah tugas kuliah, portfolio, demo, kelas, komunitas, dan tim kecil. Sakala tidak diarahkan menjadi pengganti cloud enterprise, dan batasan itu dipegang secara sadar.",
      note: "Foundation produk dan runtime masih disusun. Dokumentasi dan changelog menjelaskan perkembangan nyata tanpa mengklaim layanan siap production.",
    },
    journey: {
      eyebrow: "Perjalanan produk",
      title: "Deployment adalah jantungnya, bukan seluruh tubuhnya.",
      lead: "Sakala ingin membantu sebuah karya melewati seluruh perjalanan, bukan berhenti pada saat image selesai dibangun.",
      caption:
        "Tujuh tahap perjalanan yang dituju Sakala, dari titik awal sampai karya melahirkan karya berikutnya.",
      alt: "Perjalanan produk Sakala berurutan: Create sebagai titik awal, Manifest untuk mewujudkan, Operate untuk menjaga, Explore untuk ditemukan, Collaborate untuk dikerjakan bersama, Learn untuk dipelajari, dan Grow untuk tumbuh. Setelah Grow, siklusnya kembali ke Create bagi orang berikutnya.",
      note: "Hanya Manifest yang sedang dikerjakan. Tahap lain adalah arah, dan ditandai demikian di seluruh situs ini.",
    },
    growth: {
      title: "Tumbuh bertahap, bukan sekaligus",
      lead: "Sakala sengaja tidak membangun semua level sekarang. Visinya luas, tetapi eksekusinya sempit dan berurutan.",
      levels: [
        "Deployment sederhana",
        "Hosting yang andal",
        "Layanan pendukung developer",
        "Explore dan ekosistem",
        "Kolaborasi dan pendidikan",
        "Self-host dan platform terkelola",
        "Infrastruktur developer terdistribusi",
      ],
      states: {
        current: "sedang dikerjakan",
        next: "berikutnya",
        later: "arah",
      },
    },
    boundary: {
      title: "Yang sengaja tidak dikejar",
      lead: "Menjaga identitas lebih penting daripada mengejar kesetaraan fitur.",
      items: [
        "dashboard cloud generik",
        "UI Kubernetes dengan nama baru",
        "jejaring sosial developer",
        "LMS",
        "domain registrar",
        "pengganti suite observability",
        "cloud berlabel AI tanpa nilai inti",
      ],
    },
    openSource: {
      eyebrow: "Open source",
      title: "Terbuka agar bisa dipelajari, diaudit, dan dikembangkan bersama.",
      lead: "Kode, dokumentasi, issue, roadmap, dan proses pengembangan dibuka supaya keputusan teknisnya dapat dibaca dan dikritisi secara publik.",
      caption:
        "Lima repository Sakala, dikelompokkan menurut hak istimewa yang dipegangnya.",
      alt: "Kelompok publik berisi sakala-landing. Kelompok control plane berisi sakala-console dan sakala-api yang memegang kebijakan produk. Kelompok data plane berisi sakala-agent dan sakala-infra, satu-satunya kelompok yang menjalankan operasi runtime berhak istimewa.",
      publicLabel: "Publik",
      controlLabel: "Control plane",
      dataLabel: "Data plane",
      roles: {
        landing: "Website, dokumentasi, dan pintu masuk SEO.",
        console:
          "Antarmuka SvelteKit untuk mengelola project dan mengikuti deployment.",
        api: "Control plane Laravel untuk auth, project, deployment, dan command agent.",
        agent: "Executor Rust yang menjalankan pekerjaan deployment pada node.",
        infra: "Referensi runtime, networking, dan routing.",
      },
    },
    domains: {
      title: "Domain produk",
      purposeHeader: "Tujuan",
      valueHeader: "Domain",
      rows: {
        site: "Website dan dokumentasi",
        console: "Console",
        api: "API dan control plane",
        runtime: "Aplikasi hasil deployment",
      },
    },
    sponsor: {
      eyebrow: "Dukungan awal",
      title: "Didukung GMEDIA sebagai sponsor pendiri.",
      lead: "GMEDIA membantu Sakala mencapai MVP dan pilot awal melalui dukungan infrastruktur, domain, ruang eksperimen, dan dukungan teknis.",
      p1: "Dukungan itu tidak mengubah prinsip dasar Sakala sebagai project open-source. Roadmap, dokumentasi, issue, dan kontribusi tetap dikembangkan secara terbuka.",
      p2: "Sponsor tidak otomatis mengontrol keputusan teknis, prioritas roadmap, perubahan lisensi, atau hak contributor. Sakala tetap menggunakan Apache License 2.0.",
      cta: "Baca governance project",
      cardLabel: "Founding Sponsor & Infrastructure Supporter",
      imageAlt: "GMEDIA - PT Media Sarana Data",
    },
    next: {
      eyebrow: "Langkah berikutnya",
      title: "Pelajari arah teknis Sakala.",
      lead: "Dokumentasi menjelaskan peran console, API, agent, infra, alur deployment, serta istilah domain yang dipakai konsisten.",
      cta: "Baca dokumentasi Sakala",
    },
  },

  governance: {
    metaTitle: "Governance Sakala — Project Open-Source",
    metaDescription:
      "Prinsip governance Sakala, domain keputusan, struktur squad, batas peran sponsor, dan arah komunitas project deployment open-source Sakala.",
    crumb: "Governance",
    eyebrow: "Governance",
    title: "Dibangun terbuka, dengan batas peran yang jelas.",
    lead: "Sakala dikembangkan melalui roadmap, dokumentasi, issue, pull request, dan kontribusi publik. Pada tahap MVP, project ini dikelola maintainer awal dengan dukungan GMEDIA sebagai sponsor pendiri.",
    principles: [
      {
        title: "Roadmap terbuka",
        text: "Arah project dibahas melalui dokumentasi, issue, pull request, dan catatan perubahan yang dapat diikuti publik.",
      },
      {
        title: "Keputusan teknis oleh maintainer",
        text: "Sponsor dapat memberi dukungan dan masukan, tetapi keputusan teknis tetap dijaga oleh maintainer Sakala.",
      },
      {
        title: "Lisensi jelas",
        text: "Sakala menggunakan Apache License 2.0 agar source code tetap dapat dipelajari, digunakan, dan dikontribusi secara terbuka.",
      },
    ],
    sponsor: {
      eyebrow: "Peran sponsor",
      title: "Sponsor mendukung keberlanjutan, bukan mengambil alih project.",
      p1: "Sponsor dapat membantu Sakala melalui infrastruktur, domain, dukungan pengembangan, dokumentasi, program komunitas, atau kebutuhan operasional lain.",
      caption: "Hubungan antara stewardship dan sponsor.",
      alt: "Sakala Maintainers memegang stewardship dan keputusan teknis. GMEDIA berperan sebagai founding sponsor dan infrastructure supporter yang memberi dukungan, tetapi tidak memegang kendali atas keputusan teknis, prioritas roadmap, lisensi, maupun hak contributor. Contributor publik memberi masukan melalui issue dan pull request.",
      cards: {
        stewardship: {
          role: "Stewardship",
          name: "Sakala Maintainers",
          text: "Memegang keputusan teknis, arsitektur, dan lisensi.",
        },
        supporting: {
          role: "Mendukung",
          name: "GMEDIA",
          text: "Founding sponsor dan infrastructure supporter. Tanpa kendali atas roadmap maupun lisensi.",
        },
        contributing: {
          role: "Berkontribusi",
          name: "Contributor publik",
          text: "Issue, pull request, dokumentasi, desain, dan pengujian.",
        },
      },
      quote:
        "Sakala adalah project deployment open-source yang diinisiasi oleh Sakala Maintainers dan didukung oleh GMEDIA sebagai founding sponsor dan infrastructure supporter.",
    },
    decisions: {
      eyebrow: "Domain keputusan",
      title: "Siapa memutuskan apa.",
      lead: "Pembagian ini menjaga agar keputusan tidak bergantung pada satu orang, dan agar jalurnya dapat diikuti dari luar.",
      rows: [
        {
          area: "Produk",
          owner: "Maintainer bersama diskusi product dan design.",
        },
        {
          area: "Arsitektur",
          owner:
            "Dipimpin maintainer. Perubahan boundary besar wajib dicatat sebagai keputusan arsitektur.",
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
          area: "Komunitas dan moderasi",
          owner:
            "Aturan terdokumentasi, dapat diaudit, dengan jalur peninjauan.",
        },
      ],
    },
    squads: {
      eyebrow: "Struktur kerja",
      title: "Squad sebagai titik koordinasi, bukan hierarki.",
      lead: "Pembagian ini menandai siapa yang paling dekat dengan sebuah area, bukan siapa yang berkuasa atasnya.",
      items: [
        {
          name: "maintainers",
          scope: "Stewardship, arsitektur, dan keputusan lisensi",
        },
        {
          name: "design",
          scope: "Product design, alur pengguna, dan sistem visual",
        },
        { name: "frontend", scope: "Console dan permukaan pengguna" },
        { name: "backend", scope: "Control plane, kontrak API, dan data" },
        { name: "runtime", scope: "Agent, eksekusi, dan infrastruktur" },
      ],
      note: "Nama contributor belum dipublikasikan. Pencantuman dilakukan setelah kontribusinya nyata dan orangnya menyetujui.",
    },
    access: {
      title: "Akses repository",
      lead: "Hak akses diberikan seminimal yang diperlukan agar pekerjaan tetap berjalan.",
      rows: [
        { level: "Repository utama", access: "Write bagi squad pemiliknya" },
        {
          level: "Lintas repository",
          access: "Read secara default, Triage bila perlu",
        },
        {
          level: "Maintainer",
          access: "Maintain atau Admin hanya bila diperlukan",
        },
        { level: "Branch main", access: "Selalu dilindungi" },
      ],
      planningTitle: "Perencanaan publik dan internal",
      planning1:
        "Repository bersifat publik. Papan eksekusi harian tetap internal karena berisi blocker mentah, catatan mentoring, kapasitas tim, dan detail runtime yang sensitif.",
      planning2:
        "Transparansi roadmap tidak menuntut membuka seluruh isi ruang kerja. Roadmap publik dapat dipelihara terpisah saat kebutuhannya jelas.",
    },
    next: {
      eyebrow: "Arah berikutnya",
      title: "Governance ikut tumbuh bersama komunitas.",
      lead: "Saat Sakala melewati fase MVP, mendapat pengguna nyata, dan menerima kontribusi eksternal yang lebih luas, project ini dapat bergerak menuju organisasi komunitas yang lebih independen dan model maintainer yang lebih formal.",
    },
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
};

export type Dictionary = typeof id;
