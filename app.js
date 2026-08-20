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
  {
    slug: "christiane-f",
    title: "Christiane F. Wir Kinder vom Bahnhof Zoo",
    director: "Ulrich Edel",
    country: "Germany",
    year: 1981,
    distributor: "Solaris Film / Maran Film",
    image: "https://cdn.wwwonderlan.com/posters/christiane-f-1280.png",
    url: "https://wwwonderlan.etsy.com/uk/listing/4499788239/christiane-f-1981-movie-poster-print-wir",
  },
  {
    slug: "the-red-shoes",
    title: "The Red Shoes",
    director: "Powell and Pressburger",
    country: "United Kingdom",
    year: 1948,
    distributor: "General Film Distributors",
    image: "https://cdn.wwwonderlan.com/posters/the-red-shoes-1280.png",
    url: "https://wwwonderlan.etsy.com/uk/listing/4522310080/the-red-shoes-1948-movie-poster-print",
  },
  {
    slug: "fire-walk-with-me",
    title: "Twin Peaks: Fire Walk With Me",
    director: "David Lynch",
    country: "United States",
    year: 1992,
    distributor: "New Line Cinema Corporation",
    image: "https://cdn.wwwonderlan.com/posters/fire-walk-with-me-1280.png",
    url: "https://wwwonderlan.etsy.com/uk/listing/4541437995/twin-peaks-fire-walk-with-me-1992-movie",
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

/* The poster and the details block are shared by the grid and the
   enlarged view, so the two can never drift apart. Only the wrapper
   differs: the grid makes the poster a button, the enlarged view does
   not — it is already inside the thing that button opens. */
const posterHTML = ({ title, image }, index) => `
  <img class="card__poster"
       src="${escapeHTML(image)}"
       alt="${escapeHTML(title)} poster print"
       width="${POSTER_WIDTH}"
       height="${POSTER_HEIGHT}"
       loading="${index < FIRST_ROW ? "eager" : "lazy"}"
       decoding="async">`;

const detailsHTML = ({ title, director, country, year, distributor, ...rest }) => `
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
  </div>`;

const cardHTML = (poster, index) => `
  <li class="card">
    <button class="card__open" type="button" data-index="${index}"
            aria-label="View ${escapeHTML(poster.title)} enlarged">
      ${posterHTML(poster, index)}
    </button>
    ${detailsHTML(poster)}
  </li>`;

const slideHTML = (poster, index) => `
  <li class="lightbox-slide">
    <div class="card">
      ${posterHTML(poster, index)}
      ${detailsHTML(poster)}
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
const prefersLight = matchMedia("(prefers-color-scheme: light)");

const storedTheme = () => {
  try { return localStorage.getItem(THEME_KEY); } catch { return null; }
};

/* Persisting only on an explicit choice is what keeps the device setting
   live: writing on every load would leave a stored value behind after the
   first visit, and the device would never be consulted again. */
function applyTheme(theme, persist) {
  document.documentElement.dataset.theme = theme;
  document.getElementById("theme-color").setAttribute("content", THEME_BACKGROUNDS[theme]);

  // Pressed marks the theme in use; the other dims to muted.
  themeButtons.forEach((button) =>
    button.setAttribute("aria-pressed", String(button.dataset.setTheme === theme)));

  if (!persist) return;

  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* Storage disabled: the theme holds for this session, unremembered. */
  }
}

applyTheme(document.documentElement.dataset.theme, false);

themeButtons.forEach((button) =>
  button.addEventListener("click", () => applyTheme(button.dataset.setTheme, true)));

// Follows the device while the page is open, unless a choice was made here.
prefersLight.addEventListener("change", (event) => {
  if (storedTheme()) return;
  applyTheme(event.matches ? "light" : "dark", false);
});

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

/* ---------------------------------------------------------------
   Enlarged view

   The grid blurs behind a horizontal track of the same cards, one per
   screen. Scroll snapping does the swiping: it gives native momentum on
   touch and trackpad for none of the cost of tracking pointers, and the
   arrows exist for anyone on a mouse.

   Nothing above .lightbox animates, and the entrance runs on its own
   backdrop-filter rather than on a parent, for the reason recorded in
   the dock's stylesheet: an animated ancestor becomes a backdrop root
   and the glass would blur nothing.
   --------------------------------------------------------------- */

const lightbox = document.getElementById("lightbox");
const track = document.getElementById("lightbox-track");

let trackBuilt = false;

const slideIndex = () => Math.round(track.scrollLeft / track.clientWidth);

function goToSlide(index, smooth) {
  track.scrollTo({
    left: index * track.clientWidth,
    behavior: smooth && !reducedMotion.matches ? "smooth" : "auto",
  });
}

function openLightbox(index) {
  // Built on first use only: nobody who never opens it pays for the markup.
  if (!trackBuilt) {
    track.innerHTML = posters.map(slideHTML).join("");
    trackBuilt = true;
  }

  lightbox.classList.add("is-open");
  document.documentElement.classList.add("is-locked");
  page.inert = true;

  goToSlide(index, false);
  document.getElementById("lightbox-close").focus();
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  document.documentElement.classList.remove("is-locked");
  page.inert = false;

  // Back to the poster that opened it, rather than the top of the grid.
  document.querySelector(`.card__open[data-index="${slideIndex()}"]`)?.focus();
}

const isOpen = () => lightbox.classList.contains("is-open");

document.getElementById("grid").addEventListener("click", (event) => {
  const opener = event.target.closest(".card__open");
  if (opener) openLightbox(Number(opener.dataset.index));
});

document.getElementById("lightbox-close").addEventListener("click", closeLightbox);

document.getElementById("lightbox-prev").addEventListener("click", () =>
  goToSlide(Math.max(0, slideIndex() - 1), true));

document.getElementById("lightbox-next").addEventListener("click", () =>
  goToSlide(Math.min(posters.length - 1, slideIndex() + 1), true));

// Clicking the glass around a card dismisses; clicking the card does not.
lightbox.addEventListener("click", (event) => {
  if (event.target.classList.contains("lightbox-slide")) closeLightbox();
});

addEventListener("keydown", (event) => {
  if (!isOpen()) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") goToSlide(Math.max(0, slideIndex() - 1), true);
  if (event.key === "ArrowRight") goToSlide(Math.min(posters.length - 1, slideIndex() + 1), true);
});

/* Slide width is a share of the viewport, so a rotation would leave the
   track parked between two cards. */
addEventListener("resize", () => isOpen() && goToSlide(slideIndex(), false), { passive: true });
