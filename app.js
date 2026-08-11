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
   Dock labels

   Names whichever control is under the pointer, like the macOS dock.
   Three ways in: mouse hover, keyboard focus, and — on touch — a long
   press that can be dragged across the dock to read each control.
   --------------------------------------------------------------- */

const LONG_PRESS_MS = 250;

const dock = document.querySelector(".dock");
const label = document.getElementById("dock-label");

let active = null;
let pressTimer = null;
let longPressed = false;   // suppresses the click that would follow

const controlFrom = (node) => (node?.closest ? node.closest("[data-label]") : null);

/* Centre on the control, then keep the label inside the dock so it
   never runs off screen at either end. */
function place(control) {
  const dockBox = dock.getBoundingClientRect();
  const box = control.getBoundingClientRect();
  const half = label.offsetWidth / 2;
  const centre = box.left + box.width / 2 - dockBox.left;

  label.style.left = `${Math.max(half, Math.min(dockBox.width - half, centre))}px`;
}

function show(control) {
  if (!control) return;
  active = control;
  label.textContent = control.dataset.label;
  place(control);                     // measure and position first
  label.classList.add("is-visible");  // then reveal, so it never slides in from the wrong place
}

function hide() {
  active = null;
  label.classList.remove("is-visible");
}

/* The theme toggle renames itself, possibly while its label is showing. */
function refresh(control) {
  if (active !== control) return;
  label.textContent = control.dataset.label;
  place(control);
}

/* Mouse only; touch is handled below, and letting both run would flash
   the label on every tap. */
dock.addEventListener("pointerover", (event) => {
  if (event.pointerType === "mouse") show(controlFrom(event.target));
});

dock.addEventListener("pointerout", (event) => {
  if (event.pointerType !== "mouse") return;
  const control = controlFrom(event.target);
  // Ignore moves between a control and its own child SVG.
  if (control && !control.contains(event.relatedTarget)) hide();
});

dock.addEventListener("focusin", (event) => show(controlFrom(event.target)));
dock.addEventListener("focusout", hide);

/* Touch: long press, then slide between controls. */
dock.addEventListener("touchstart", (event) => {
  const control = controlFrom(event.target);
  if (!control) return;

  longPressed = false;
  clearTimeout(pressTimer);
  pressTimer = setTimeout(() => {
    longPressed = true;
    show(control);
  }, LONG_PRESS_MS);
}, { passive: true });

dock.addEventListener("touchmove", (event) => {
  if (!longPressed) {
    // Moving before the press registers means a scroll, not a hold.
    clearTimeout(pressTimer);
    return;
  }

  event.preventDefault();   // hold the page still while reading

  const touch = event.touches[0];
  const control = controlFrom(document.elementFromPoint(touch.clientX, touch.clientY));

  if (control !== active) control ? show(control) : hide();
}, { passive: false });

function endTouch() {
  clearTimeout(pressTimer);
  if (longPressed) hide();
}

dock.addEventListener("touchend", endTouch);
dock.addEventListener("touchcancel", endTouch);

/* A long press is a read, not a tap — swallow the click it would
   otherwise produce, so holding Shop doesn't open it. */
dock.addEventListener("click", (event) => {
  if (!longPressed) return;
  event.preventDefault();
  event.stopPropagation();
  longPressed = false;
}, true);

// Anything that moves the dock invalidates the label's position.
addEventListener("resize", () => active && place(active), { passive: true });
addEventListener("scroll", () => active && place(active), { passive: true });

/* ---------------------------------------------------------------
   Theme
   --------------------------------------------------------------- */

const THEME_KEY = "wwwonderlan-theme";

/* Must match --bg, so the browser's own chrome matches the page. */
const THEME_BACKGROUNDS = { light: "#FFFFFF", dark: "#000000" };

const THEME_ICONS = {
  light: `<svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>`,
  dark: `<svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>`,
};

const themeToggle = document.getElementById("theme-toggle");

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;

  themeToggle.innerHTML = THEME_ICONS[theme];
  themeToggle.dataset.label = theme === "dark" ? "Light Mode" : "Dark Mode";
  themeToggle.setAttribute("aria-label",
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  refresh(themeToggle);

  document.getElementById("theme-color").setAttribute("content", THEME_BACKGROUNDS[theme]);

  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* Storage disabled: the theme holds for this session, unremembered. */
  }
}

applyTheme(document.documentElement.dataset.theme);

themeToggle.addEventListener("click", () =>
  applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));

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
