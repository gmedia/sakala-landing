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

const items = document.querySelectorAll<HTMLElement>(".becoming");
const sequences = document.querySelectorAll<HTMLElement>("[data-sequence]");

if (!motionOn || !supported) {
  items.forEach(present);
  sequences.forEach((seq) =>
    seq.querySelectorAll(".sequence-step").forEach(present),
  );
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
   * Deployment adalah proses yang bergerak melewati tahap yang sudah bernama,
   * jadi tahapnya dinyalakan berurutan, bukan serentak. Ini satu-satunya
   * urutan bertahap di halaman.
   */
  const step = 240;
  const progress = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const steps = entry.target.querySelectorAll(".sequence-step");
        steps.forEach((el, index) => {
          window.setTimeout(() => present(el), index * step);
        });
        progress.unobserve(entry.target);
      }
    },
    { threshold: 0.3 },
  );
  sequences.forEach((el) => progress.observe(el));
}
