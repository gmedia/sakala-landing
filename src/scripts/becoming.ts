/**
 * Menyalakan satu hal pada satu waktu ketika ia masuk viewport.
 *
 * Penyembunyian awal digerbangi `data-motion="on"` yang dipasang skrip inline
 * di head. Bila JavaScript mati, atribut itu tidak pernah ada dan seluruh
 * konten tampil apa adanya, sehingga cerita tetap utuh tanpa skrip ini.
 */
const motionOn = document.documentElement.dataset.motion === "on";
const supported = "IntersectionObserver" in window;

function present(el: Element): void {
  el.classList.add("is-present");
}

function inViewport(el: Element): boolean {
  const box = el.getBoundingClientRect();
  return box.top < window.innerHeight && box.bottom > 0;
}

const items = document.querySelectorAll<HTMLElement>(".becoming");
const sequences = document.querySelectorAll<HTMLElement>("[data-sequence]");

function presentSteps(sequence: Element, stepDelay = 0): void {
  sequence.querySelectorAll(".sequence-step").forEach((el, index) => {
    if (stepDelay === 0) present(el);
    else window.setTimeout(() => present(el), index * stepDelay);
  });
}

if (!motionOn || !supported) {
  items.forEach(present);
  sequences.forEach((seq) => presentSteps(seq));
} else {
  const reveal = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        present(entry.target);
        reveal.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
  );
  items.forEach((el) => reveal.observe(el));

  /**
   * Deployment dan penyeberangan adalah proses yang melewati tahap bernama,
   * jadi tahapnya dinyalakan berurutan, bukan serentak.
   */
  const step = 240;
  const progress = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        presentSteps(entry.target, step);
        progress.unobserve(entry.target);
      }
    },
    { threshold: 0.3 },
  );
  sequences.forEach((el) => progress.observe(el));

  /**
   * Metrik font web baru berlaku setelah `load`, dan pergeseran layout yang
   * menyertainya bisa meninggalkan elemen yang sudah terlihat tanpa pernah
   * tercatat masuk viewport. Satu pemeriksaan ulang menutup celah itu, karena
   * kegagalannya berupa konten yang hilang, bukan sekadar animasi yang lewat.
   */
  window.addEventListener(
    "load",
    () => {
      for (const el of items) {
        if (el.classList.contains("is-present") || !inViewport(el)) continue;
        present(el);
        reveal.unobserve(el);
      }
      for (const seq of sequences) {
        const steps = seq.querySelectorAll(".sequence-step");
        const stranded = [...steps].some(
          (el) => !el.classList.contains("is-present"),
        );
        if (!stranded || !inViewport(seq)) continue;
        presentSteps(seq, step);
        progress.unobserve(seq);
      }
    },
    { once: true },
  );
}
