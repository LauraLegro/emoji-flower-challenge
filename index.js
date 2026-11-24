/*
  The garden bed fetches live emoji data from emojihub, then keeps only
  bugs and flowers — everything else (mammals, trees, leaves) stays out.
  Survivors are sorted into their row and labeled with their real name
  and unicode catalog code.
*/

const api =
  "https://apis.scrimba.com/emojihub/api/all/category/animals-and-nature";

const bugsRow = document.querySelector("#bugs-row");
const flowersRow = document.querySelector("#flowers-row");
const status = document.querySelector("#status");
const sealYear = document.querySelector("#seal-year");

sealYear.textContent = new Date().getFullYear();

function clearTheGarden(arr) {
  return arr.filter(
    (emoji) => emoji.group === "animal bug" || emoji.group === "plant flower",
  );
}

function titleCase(name) {
  return name.replace(/\b\w/g, (char) => char.toUpperCase());
}

function markerFor(emoji, index) {
  const marker = document.createElement("li");
  marker.className = "marker";
  marker.style.setProperty("--i", index);

  const tag = document.createElement("div");
  tag.className = "marker-tag";
  tag.innerHTML = `
    <span class="marker-emoji">${emoji.htmlCode.join("")}</span>
    <span class="marker-name">${titleCase(emoji.name)}</span>
    <span class="marker-code">${emoji.unicode.join(" ")}</span>
  `;

  const stake = document.createElement("span");
  stake.className = "marker-stake";
  stake.setAttribute("aria-hidden", "true");

  marker.append(tag, stake);
  return marker;
}

fetch(api)
  .then((response) => response.json())
  .then((data) => clearTheGarden(data))
  .then((data) => {
    console.log(data);

    const bugs = data.filter((emoji) => emoji.group === "animal bug");
    const flowers = data.filter((emoji) => emoji.group === "plant flower");

    bugs.forEach((emoji, i) => bugsRow.appendChild(markerFor(emoji, i)));
    flowers.forEach((emoji, i) => flowersRow.appendChild(markerFor(emoji, i)));

    status.textContent = `${data.length} specimens catalogued — ${bugs.length} bugs, ${flowers.length} flowers.`;
  })
  .catch((err) => {
    console.log(err);
    status.textContent =
      "The bed didn't take root. Refresh to try planting again.";
    status.classList.add("is-error");
  });
