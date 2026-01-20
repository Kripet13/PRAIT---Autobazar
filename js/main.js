import { Auto } from "./auto.js";
import { Autobazar } from "./autobazar.js";

const bazar = new Autobazar();

const form = document.getElementById("carForm");
const errorBox = document.getElementById("errorBox");
const listEl = document.getElementById("carList");
const summaryEl = document.getElementById("summary");
const resetBtn = document.getElementById("resetBtn");

const brandEl = document.getElementById("brand");
const modelEl = document.getElementById("model");
const yearEl = document.getElementById("year");
const priceEl = document.getElementById("price");
const fuelEl = document.getElementById("fuel");
const mileageEl = document.getElementById("mileage");

function nastavChybu(text) {
  errorBox.textContent = text;
}

function validuj(brand, model, year, price) {
  const currentYear = new Date().getFullYear();

  if (brand.trim() === "") return "Značka nesmí být prázdná.";
  if (model.trim() === "") return "Model nesmí být prázdný.";

  if (isNaN(year)) return "Rok výroby musí být číslo.";
  if (year < 1980 || year > currentYear) return `Rok výroby musí být 1980–${currentYear}.`;

  if (isNaN(price)) return "Cena musí být číslo.";
  if (price <= 0) return "Cena musí být kladné číslo.";

  return "";
}

function render() {
  listEl.innerHTML = "";

  for (const auto of bazar.auta) {
    const li = document.createElement("li");
    li.className = "item";

    const left = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = `${auto.brand} ${auto.model} (${auto.year})`;

    const meta = document.createElement("div");
    meta.className = "meta";

    let extra = "";
    if (auto.fuel) extra += ` | palivo: ${auto.fuel}`;
    if (auto.mileage !== "") extra += ` | nájezd: ${Number(auto.mileage).toLocaleString("cs-CZ")} km`;

    meta.textContent = `${auto.cenaText()}${extra}`;

    left.appendChild(title);
    left.appendChild(meta);

    const btn = document.createElement("button");
    btn.textContent = "Smazat";
    btn.className = "secondary";
    btn.addEventListener("click", () => {
      bazar.smazat(auto.id);
      render();
    });

    li.appendChild(left);
    li.appendChild(btn);
    listEl.appendChild(li);
  }

  const prumer = bazar.prumernaCena();
  summaryEl.textContent =
    `Počet aut: ${bazar.pocet()} | Průměrná cena: ${prumer.toLocaleString("cs-CZ")} Kč`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  nastavChybu("");

  const brand = brandEl.value;
  const model = modelEl.value;
  const year = Number(yearEl.value);
  const price = Number(priceEl.value);
  const fuel = fuelEl.value;
  const mileage = mileageEl.value.trim();

  const chyba = validuj(brand, model, year, price);
  if (chyba) {
    nastavChybu(chyba);
    return;
  }

  if (mileage !== "" && (isNaN(Number(mileage)) || Number(mileage) < 0)) {
    nastavChybu("Nájezd musí být nezáporné číslo (nebo nevyplněno).");
    return;
  }

  // jednoduché ID přes bazar
  const temp = bazar.pridat(brand.trim(), model.trim(), year, price, fuel, mileage);

  // vytvoříme instanci Auto
  const auto = new Auto(temp.id, temp.brand, temp.model, temp.year, temp.price, temp.fuel, temp.mileage);

  bazar.ulozAuto(auto);

  form.reset();
  render();
});

resetBtn.addEventListener("click", () => {
  form.reset();
  nastavChybu("");
});

render();
