/* ---------------------------------------------------------------
   Posters

   Add a listing by appending an object. Nothing else changes.
   Credits and button label are composed from these fields.
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

/* Titles are ours, not user input — this exists so an ampersand or
   apostrophe in a film title can't break the markup. */
const escape = (value) =>
  String(value).replace(/[&<>"]/g, (character) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[character]);

const buyLink = ({ url, slug }) =>
  `${url}${url.includes("?") ? "&" : "?"}${UTM}&utm_content=${slug}`;

const cardHTML = ({ title, year, director, distributor, image, ...rest }) => `
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
          © ${year} ${escape(title)} / ${escape(director)}<br>${escape(distributor)}
        </p>
      </div>
      <a class="card__buy"
         href="${escape(buyLink(rest))}"
         target="_blank"
         rel="noopener">Buy ${escape(title)} Poster</a>
    </div>
  </li>`;

document.getElementById("grid").innerHTML = posters.map(cardHTML).join("");
