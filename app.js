/* ---------------------------------------------------------------
   Posters

   Add a listing by appending an object here. Nothing else changes.
   `slug` is only used for click tracking on the Etsy link.
   --------------------------------------------------------------- */

const posters = [
  {
    slug: "fallen-angels",
    title: "Fallen Angels",
    director: "Wong Kar-Wai",
    image: "https://pub-01259ba9a4fe4eccabe8b5baf85baa7a.r2.dev/fallen-angels.jpg",
    url: "https://wwwonderlan.etsy.com/uk/listing/4310610506/fallen-angels-movie-poster-print-wong",
  },
  {
    slug: "taipei-story",
    title: "Taipei Story",
    director: "Edward Yang",
    image: "https://pub-01259ba9a4fe4eccabe8b5baf85baa7a.r2.dev/taipei-story.jpg",
    url: "https://wwwonderlan.etsy.com/uk/listing/4331048372/taipei-story-movie-poster-print-edward",
  },
  {
    slug: "millennium-mambo",
    title: "Millennium Mambo",
    director: "Hou Hsiao-Hsien",
    image: "https://pub-01259ba9a4fe4eccabe8b5baf85baa7a.r2.dev/millennium-mambo.jpg",
    url: "https://wwwonderlan.etsy.com/uk/listing/4337108727/millennium-mambo-movie-poster-print-hou",
  },
];

/* ---------------------------------------------------------------
   Render
   --------------------------------------------------------------- */

const UTM = "utm_source=wwwonderlan&utm_medium=site&utm_campaign=poster-grid";

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
  const director = escapeHTML(poster.director);

  return `
    <li class="card">
      <img
        class="card__poster"
        src="${escapeHTML(poster.image)}"
        alt="${title} poster print"
        width="400"
        height="600"
        loading="${index < 3 ? "eager" : "lazy"}"
        decoding="async">
      <div class="card__details">
        <h2 class="card__title">${title}</h2>
        <p class="card__director">${director}</p>
        <a class="card__buy"
           href="${escapeHTML(buyLink(poster))}"
           target="_blank"
           rel="noopener noreferrer">Buy<span class="visually-hidden"> ${title} on Etsy</span></a>
      </div>
    </li>
  `;
}

document.getElementById("grid").innerHTML = posters.map(cardHTML).join("");
