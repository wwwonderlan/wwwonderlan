/* ---------------------------------------------------------------
   Posters

   Add a listing by appending an object. Nothing else changes.
   Credits read "Director · Country · Year" over the distributor;
   the button label is composed from the title.

   One coupling to know about: the first three image URLs are also
   preloaded in index.html, because the parser cannot see images that a
   script writes. Change one of those URLs and change it there too, or
   the preload fetches nothing and the poster arrives late.
   --------------------------------------------------------------- */

const posters = [
  {
    slug: "fallen-angels",
    title: "Fallen Angels",
    director: "Wong Kar-Wai",
    country: "Hong Kong",
    year: 1995,
    distributor: "Block 2 Distribution",
    image: "https://cdn.wwwonderlan.com/posters/fallen-angels-1280.png",
    url: "https://wwwonderlan.etsy.com/uk/listing/4310610506/fallen-angels-movie-poster-print-wong",
  },
  {
    slug: "taipei-story",
    title: "Taipei Story",
    director: "Edward Yang",
    country: "Taiwan",
    year: 1985,
    distributor: "Evergreen Film Company",
    image: "https://cdn.wwwonderlan.com/posters/taipei-story-1280.png",
    url: "https://wwwonderlan.etsy.com/uk/listing/4331048372/taipei-story-movie-poster-print-edward",
  },
  {
    slug: "millennium-mambo",
    title: "Millennium Mambo",
    director: "Hou Hsiao-Hsien",
    country: "Taiwan",
    year: 2001,
    distributor: "3H Productions",
    image: "https://cdn.wwwonderlan.com/posters/millennium-mambo-1280.png",
    url: "https://wwwonderlan.etsy.com/uk/listing/4337108727/millennium-mambo-movie-poster-print-hou",
  },
  {
    slug: "blue-velvet",
    title: "Blue Velvet",
    director: "David Lynch",
    country: "United States",
    year: 1986,
    distributor: "De Laurentiis Entertainment Group",
    image: "https://cdn.wwwonderlan.com/posters/blue-velvet-1280.png",
    url: "https://wwwonderlan.etsy.com/uk/listing/4357152684/blue-velvet-movie-poster-print-david",
  },
  {
    slug: "a-clockwork-orange",
    title: "A Clockwork Orange",
    director: "Stanley Kubrick",
    country: "United States",
    year: 1971,
    distributor: "Warner Bros.",
    image: "https://cdn.wwwonderlan.com/posters/a-clockwork-orange-1280.png",
    url: "https://wwwonderlan.etsy.com/uk/listing/4388658509/a-clockwork-orange-movie-poster-print",
  },
  {
    slug: "rosemarys-baby",
    title: "Rosemary's Baby",
    director: "Roman Polanski",
    country: "United States",
    year: 1968,
    distributor: "Paramount Pictures",
    image: "https://cdn.wwwonderlan.com/posters/rosemarys-baby-1280.png",
    url: "https://wwwonderlan.etsy.com/uk/listing/4404257444/rosemarys-baby-movie-poster-print-roman",
  },
  {
    slug: "audition",
    title: "Audition",
    director: "Takashi Miike",
    country: "Japan",
    year: 1999,
    distributor: "Omega Project",
    image: "https://cdn.wwwonderlan.com/posters/audition-1280.png",
    url: "https://wwwonderlan.etsy.com/uk/listing/4435662082/audition-movie-poster-print-takashi",
  },
  {
    slug: "chungking-express",
    title: "Chungking Express",
    director: "Wong Kar-Wai",
    country: "Hong Kong",
    year: 1994,
    distributor: "Jet Tone Production Co.",
    image: "https://cdn.wwwonderlan.com/posters/chungking-express-1280.png",
    url: "https://wwwonderlan.etsy.com/uk/listing/4463074853/chungking-express-1994-movie-poster",
  },
  {
    slug: "heat",
    title: "Heat",
    director: "Michael Mann",
    country: "United States",
    year: 1995,
    distributor: "Warner Bros.",
    image: "https://cdn.wwwonderlan.com/posters/heat-1280.png",
    url: "https://wwwonderlan.etsy.com/uk/listing/4480799792/heat-movie-poster-print-michael-mann",
  },
];

/* ---------------------------------------------------------------
   Render
   --------------------------------------------------------------- */

const UTM = "utm_source=wwwonderlan&utm_medium=site&utm_campaign=poster-grid";

/* Intrinsic size of the source files. Reserves the right space during
   load without constraining the rendered ratio. */
const POSTER_WIDTH = 1280;
const POSTER_HEIGHT = 1920;

/* The widest the grid ever goes. Everything past it is below the fold on
   any screen, so it loads lazily and is not preloaded. */
const FIRST_ROW = 3;

/* Titles are ours, not user input — this exists so an ampersand or
   apostrophe in a film title can't break the markup. */
const escapeHTML = (value) =>
  String(value).replace(/[&<>"]/g, (character) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[character]);

const buyLink = ({ url, slug }) =>
  `${url}${url.includes("?") ? "&" : "?"}${UTM}&utm_content=${slug}`;

const cardHTML = ({ title, director, country, year, distributor, image, ...rest }, index) => `
  <li class="card">
    <img class="card__poster"
         src="${escapeHTML(image)}"
         alt="${escapeHTML(title)} poster print"
         width="${POSTER_WIDTH}"
         height="${POSTER_HEIGHT}"
         loading="${index < FIRST_ROW ? "eager" : "lazy"}"
         decoding="async">
    <div class="card__details">
      <div class="card__text">
        <h2 class="card__title">${escapeHTML(title)}</h2>
        <p class="card__credits">
          ${escapeHTML(director)} · ${escapeHTML(country)} · ${escapeHTML(year)}<br>${escapeHTML(distributor)}
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

   A panel over the page rather than a route. Visibility rather than the
   hidden attribute, so it can transition and still leave the tab order
   and the accessibility tree when closed.
   --------------------------------------------------------------- */

const details = document.getElementById("details");
const detailsToggle = document.getElementById("details-toggle");
const page = document.querySelector("main");

let restoreScroll = 0;

function openDetails() {
  // The panel opens below the header, so the header has to be in view.
  restoreScroll = scrollY;
  scrollTo({ top: 0, behavior: "auto" });

  details.classList.add("is-open");
  detailsToggle.setAttribute("aria-expanded", "true");
  document.documentElement.classList.add("is-locked");
  page.inert = true;                       // keeps tabbing out of the posters

  document.getElementById("details-close").focus();
}

function closeDetails() {
  details.classList.remove("is-open");
  detailsToggle.setAttribute("aria-expanded", "false");
  document.documentElement.classList.remove("is-locked");
  page.inert = false;

  scrollTo({ top: restoreScroll, behavior: "auto" });
  detailsToggle.focus();
}

detailsToggle.addEventListener("click", () =>
  details.classList.contains("is-open") ? closeDetails() : openDetails());

document.getElementById("details-close").addEventListener("click", closeDetails);

addEventListener("keydown", (event) => {
  if (event.key === "Escape" && details.classList.contains("is-open")) closeDetails();
});
