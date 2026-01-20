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

    const text = document.createElement("span");
    text.textContent = auto.popis();

    const btn = document.createElement("button");
    btn.textContent = "Smazat";
    btn.className = "secondary";
    btn.onclick = () => {
      bazar.smazat(auto.id);
      render();
    };

    li.appendChild(text);
    li.appendChild(btn);
    listEl.appendChild(li);
  }

  summaryEl.textContent =
    `Počet aut: ${bazar.pocet()} | Průměrná cena: ${bazar.prumernaCena().toLocaleString("cs-CZ")} Kč`;
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
