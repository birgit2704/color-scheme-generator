import schemes from "./schemes.js";

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
  document.getElementById("seed-color-hex").textContent = seedColor;
  return `https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${scheme}&count=${numColors}`;
}

function renderColorScheme(data) {
  const colorArray = data.colors.map((el) => el.hex.value);
  const colorHtml = colorArray
    .map(
      (color) => `
                <div class="color-container">
                    <div class="color" title="click to copy" style="background-color: ${color}"></div>
                    <div class="hex-code" title="click to copy">${color}</div>
                </div>
                `
    )
    .join("");
  document.getElementById("color-container").innerHTML = colorHtml;
}

// <!-- https://www.thecolorapi.com/docs#schemes -->

// - click hex values/colors to copy to clipboard -->
// responsive
