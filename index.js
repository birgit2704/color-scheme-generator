import schemes from "./schemes.js";

const colorsContainerEl = document.getElementById("colors-container");
const seedColorEl = document.getElementById("seed-color-hex");

colorsContainerEl.addEventListener("click", function (e) {
  copyTextToClipboard(e);
});
seedColorEl.addEventListener("click", function (e) {
  copyTextToClipboard(e);
});

document.getElementById("btn").addEventListener("click", () => {
  getQueryUrl();

  fetch(`${getQueryUrl()}`)
    .then((res) => res.json())
    .then((data) => renderColorScheme(data));
});

function getQueryUrl() {
  const seedColor = document.querySelector("input").value.slice(1);
  const scheme = document.querySelector("select").value;
  const numColors = document.querySelector('input[type="radio"]:checked').id;
  seedColorEl.textContent = "#" + seedColor.toUpperCase();
  return `https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${scheme}&count=${numColors}`;
}

function renderColorScheme(data) {
  const colorArray = data.colors.map((el) => el.hex.value);
  const colorHtml = colorArray
    .map(
      (color) => `
                <div class="color-container">
                    <div id="${color}" class="color" style="background-color: ${color}"></div>
                    <div class="hex-code">${color}</div>
                </div>
                `
    )
    .join("");
  colorsContainerEl.innerHTML = colorHtml;
}

function copyTextToClipboard(e) {
  let copyText = "";
  if (e.target.classList.value === "hex-code") {
    copyText = e.target.innerHTML;
  }
  if (e.target.classList.value.includes("color")) {
    copyText = e.target.id;
  }
  if (e.target.id === "seed-color-hex") {
    copyText = e.target.textContent;
  }
  navigator.clipboard.writeText(copyText);
  alert("Copied the text: " + copyText);
}

renderSchemeNamesInOptions();

function renderSchemeNamesInOptions() {
  const schemeHtml = schemes
    .map(
      (scheme) =>
        `<option value="${scheme}">${
          scheme.charAt(0).toUpperCase() + scheme.slice(1)
        }</option>`
    )
    .join("");
  document.getElementById("select").innerHTML = schemeHtml;
}
