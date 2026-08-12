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
const escapeHTML = (value) =>
  String(value).replace(/[&<>"]/g, (character) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[character]);

const buyLink = ({ url, slug }) =>
  `${url}${url.includes("?") ? "&" : "?"}${UTM}&utm_content=${slug}`;

const cardHTML = ({ title, director, country, year, distributor, image, ...rest }) => `
  <li class="card">
    <img class="card__poster"
         src="${escapeHTML(image)}"
         alt="${escapeHTML(title)} poster print"
         width="${POSTER_WIDTH}"
         height="${POSTER_HEIGHT}"
         decoding="async">
    <div class="card__details">
      <div class="card__text">
        <h2 class="card__title">${escapeHTML(title)}</h2>
        <p class="card__credits">
          ${escapeHTML(director)} · ${escapeHTML(country)} · ${year}<br>${escapeHTML(distributor)}
        </p>
      </div>
      <a class="card__buy"
         href="${escapeHTML(buyLink(rest))}"
         target="_blank"
         rel="noopener">Buy ${escapeHTML(title)} Poster →</a>
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

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

const progressFill = document.getElementById("scroll-progress-fill");

let queued = false;

function render() {
  queued = false;

  const scrollable = document.documentElement.scrollHeight - innerHeight;
  const ratio = scrollable > 0 ? Math.min(1, Math.max(0, scrollY / scrollable)) : 0;

  progressFill.style.transform = `scaleX(${ratio})`;
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

document.getElementById("scroll-top").addEventListener("click", () =>
  scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" }));

/* ---------------------------------------------------------------
   Logo handoff

   The mark lives in the header at rest and in the dock once the header
   has scrolled away. Observing the header itself rather than watching
   scroll offsets keeps this correct at any header height.
   --------------------------------------------------------------- */

const header = document.getElementById("header");
const dock = document.getElementById("dock");

new IntersectionObserver(([entry]) => {
  header.classList.toggle("is-handed-off", !entry.isIntersecting);
  dock.classList.toggle("is-collapsed", entry.isIntersecting);
}).observe(header);

/* ---------------------------------------------------------------
   Details

   A blur over the page rather than a route. `hidden` is removed a frame
   before the open class is added: an element revealed and transitioned in
   the same frame has no previous state to transition from, and would
   simply appear.
   --------------------------------------------------------------- */

const details = document.getElementById("details");
const detailsToggle = document.getElementById("details-toggle");
const page = document.querySelector("main");

function openDetails() {
  details.hidden = false;
  requestAnimationFrame(() => details.classList.add("is-open"));

  detailsToggle.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
  page.inert = true;                       // keeps tabbing out of the posters

  document.getElementById("details-close").focus();
}

function closeDetails() {
  details.classList.remove("is-open");
  detailsToggle.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
  page.inert = false;

  detailsToggle.focus();

  // Withheld until the blur has cleared, or the panel would vanish outright.
  details.addEventListener("transitionend", () => {
    if (!details.classList.contains("is-open")) details.hidden = true;
  }, { once: true });
}

detailsToggle.addEventListener("click", () =>
  details.classList.contains("is-open") ? closeDetails() : openDetails());

document.getElementById("details-close").addEventListener("click", closeDetails);

// Clicking the blur itself dismisses; clicking the text does not.
details.addEventListener("click", (event) => {
  if (event.target === details) closeDetails();
});

addEventListener("keydown", (event) => {
  if (event.key === "Escape" && details.classList.contains("is-open")) closeDetails();
});
