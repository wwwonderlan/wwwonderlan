/* ---------------------------------------------------------------
   Posters

   Add a listing by appending an object here. Nothing else changes.
   `slug` is only used for click tracking on the Etsy link.
   The first credits line is composed from year, title and director.
   --------------------------------------------------------------- */

const posters = [
  {
    slug: "fallen-angels",
    title: "Fallen Angels",
    year: 1995,
    director: "Wong Kar Wai",
    distributor: "Block 2 Distribution",
    image: "https://pub-01259ba9a4fe4eccabe8b5baf85baa7a.r2.dev/fallen-angels.jpg",
    url: "https://wwwonderlan.etsy.com/uk/listing/4310610506/fallen-angels-movie-poster-print-wong",
  },
  {
    slug: "taipei-story",
    title: "Taipei Story",
    year: 1985,
    director: "Edward Yang",
    distributor: "Evergreen Film Company",
    image: "https://pub-01259ba9a4fe4eccabe8b5baf85baa7a.r2.dev/taipei-story.jpg",
    url: "https://wwwonderlan.etsy.com/uk/listing/4331048372/taipei-story-movie-poster-print-edward",
  },
  {
    slug: "millennium-mambo",
    title: "Millennium Mambo",
    year: 2001,
    director: "Hou Hsiao-hsien",
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

function buyLink({ url, slug }) {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}${UTM}&utm_content=${slug}`;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function cardHTML(poster, index) {
  const title = escapeHTML(poster.title);
  const credit = escapeHTML(`© ${poster.year} ${poster.title} / ${poster.director}`);
  const distributor = escapeHTML(poster.distributor);

  return `
    <li class="card">
      <img
        class="card__poster"
        src="${escapeHTML(poster.image)}"
        alt="${title} poster print"
        width="${POSTER_WIDTH}"
        height="${POSTER_HEIGHT}"
        loading="${index < 3 ? "eager" : "lazy"}"
        decoding="async">
      <div class="card__details">
        <h2 class="card__title">${title}</h2>
        <p class="card__credits">${credit}<br>${distributor}</p>
        <a class="card__buy"
           href="${escapeHTML(buyLink(poster))}"
           target="_blank"
           rel="noopener noreferrer">Buy<span class="visually-hidden"> ${title} on Etsy</span></a>
      </div>
    </li>
  `;
}

document.getElementById("grid").innerHTML = posters.map(cardHTML).join("");
