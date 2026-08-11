/* ---------------------------------------------------------------
   Posters

   Add a listing by appending an object. Nothing else changes.
   Credits read "Director · Country · Year" over the distributor;
   the button label is composed from the title.
   --------------------------------------------------------------- */

const posters = [
  {
    slug: "fallen-angels",
    title: "Fallen Angels",
    director: "Wong Kar Wai",
    country: "Hong Kong",
    year: 1995,
    distributor: "Block 2 Distribution",
    image: "https://pub-01259ba9a4fe4eccabe8b5baf85baa7a.r2.dev/fallen-angels.jpg",
    url: "https://wwwonderlan.etsy.com/uk/listing/4310610506/fallen-angels-movie-poster-print-wong",
  },
  {
    slug: "taipei-story",
    title: "Taipei Story",
    director: "Edward Yang",
    country: "Taiwan",
    year: 1985,
    distributor: "Evergreen Film Company",
    image: "https://pub-01259ba9a4fe4eccabe8b5baf85baa7a.r2.dev/taipei-story.jpg",
    url: "https://wwwonderlan.etsy.com/uk/listing/4331048372/taipei-story-movie-poster-print-edward",
  },
  {
    slug: "millennium-mambo",
    title: "Millennium Mambo",
    director: "Hou Hsiao-hsien",
    country: "Taiwan",
    year: 2001,
    distributor: "3H Productions",
    image: "https://pub-01259ba9a4fe4eccabe8b5baf85baa7a.r2.dev/millennium-mambo.jpg",
    url: "https://wwwonderlan.etsy.com/uk/listing/4337108727/millennium-mambo-movie-poster-print-hou",
  },
];

/* ---------------------------------------------------------------
   Render
   --------------------------------------------------------------- */

const UTM = "utm_source=wwwonderlan&utm_medium=site&utm_campaign=poster-grid";

/* Intrinsic size of the source files. Reserves the right space
   during load without constraining the rendered ratio. */
const POSTER_WIDTH = 2000;
const POSTER_HEIGHT = 3000;

/* Titles are ours, not user input — this exists so an ampersand or
   apostrophe in a film title can't break the markup. */
const escape = (value) =>
  String(value).replace(/[&<>"]/g, (character) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[character]);

const buyLink = ({ url, slug }) =>
  `${url}${url.includes("?") ? "&" : "?"}${UTM}&utm_content=${slug}`;

const cardHTML = ({ title, director, country, year, distributor, image, ...rest }) => `
  <li class="card">
    <img class="card__poster"
         src="${escape(image)}"
         alt="${escape(title)} poster print"
         width="${POSTER_WIDTH}"
         height="${POSTER_HEIGHT}"
         decoding="async">
    <div class="card__details">
      <div class="card__text">
        <h2 class="card__title">${escape(title)}</h2>
        <p class="card__credits">
          ${escape(director)} · ${escape(country)} · ${year}<br>${escape(distributor)}
        </p>
      </div>
      <a class="card__buy"
         href="${escape(buyLink(rest))}"
         target="_blank"
         rel="noopener">Buy ${escape(title)} Poster →</a>
    </div>
  </li>`;

document.getElementById("grid").innerHTML = posters.map(cardHTML).join("");

/* ---------------------------------------------------------------
   Theme
   --------------------------------------------------------------- */

const THEME_KEY = "wwwonderlan-theme";

/* Must match --bg, so the browser's own chrome matches the page. */
const THEME_BACKGROUNDS = { light: "#FFFFFF", dark: "#000000" };

const themeButtons = document.querySelectorAll("[data-set-theme]");

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.getElementById("theme-color").setAttribute("content", THEME_BACKGROUNDS[theme]);

  // Pressed marks the theme in use; the other dims to muted.
  themeButtons.forEach((button) =>
    button.setAttribute("aria-pressed", String(button.dataset.setTheme === theme)));

  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* Storage disabled: the theme holds for this session, unremembered. */
  }
}

applyTheme(document.documentElement.dataset.theme);

themeButtons.forEach((button) =>
  button.addEventListener("click", () => applyTheme(button.dataset.setTheme)));

/* ---------------------------------------------------------------
   Scroll progress and back to top
   --------------------------------------------------------------- */

const progress = document.getElementById("scroll-progress");
const progressFill = document.getElementById("scroll-progress-fill");

let queued = false;

function render() {
  queued = false;

  const scrollable = document.documentElement.scrollHeight - innerHeight;
  const ratio = scrollable > 0 ? Math.min(1, Math.max(0, scrollY / scrollable)) : 0;

  progressFill.style.transform = `scaleX(${ratio})`;
  progress.setAttribute("aria-valuenow", String(Math.round(ratio * 100)));
}

/* Scroll fires far more often than the screen refreshes; coalescing into
   one frame keeps this off the critical path. */
function queueRender() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(render);
}

addEventListener("scroll", queueRender, { passive: true });
addEventListener("resize", queueRender, { passive: true });

/* The page changes height as posters load. */
new ResizeObserver(queueRender).observe(document.body);

render();

document.getElementById("scroll-top").addEventListener("click", () => {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
});
