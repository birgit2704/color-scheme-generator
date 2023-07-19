import schemes from "./schemes.js";

renderSchemeNamesInOptions();

function renderSchemeNamesInOptions() {
  const schemeHtml = schemes
    .map((scheme) => `<option value="${scheme}">${scheme}</option>`)
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
  document.getElementById("seed-color-hex").textContent = seedColor;
  return `https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${scheme}&count=5`;
}

function renderColorScheme(data) {
  const colorArray = data.colors.map((el) => el.hex.value);
  const colorHtml = colorArray
    .map(
      (color) => `
                <div class="color-container">
                    <div class="color" style="background-color: ${color}"></div>
                    <div class="hex-code">${color}</div>
                </div>
                `
    )
    .join("");
  document.getElementById("color-container").innerHTML = colorHtml;
}

// <!-- https://www.thecolorapi.com/docs#schemes -->

// - click hex values/colors to copy to clipboard -->
// responsive
// uppercase first letter
