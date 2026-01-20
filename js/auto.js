export class Auto {
   constructor(id, brand, model, year, price, fuel = "", mileage = "", discount = false) {
    this.id = id;
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.price = price;
    this.fuel = fuel;
    this.mileage = mileage;
    this.discount = discount;
  }
 // konečná cena jako číslo (pro průměr v autobazaru)
  cenaKonecnaCislo() {
    if (this.discount) return Math.round(this.price * 0.9);
    return this.price;
  }

  popis() {
    return `${this.brand} ${this.model} (${this.year})`;
  }

  // konečná cena jako text (pro zobrazení)
  cenaKonecnaText() {
    return `${this.cenaKonecnaCislo().toLocaleString("cs-CZ")} Kč`;
  }

  cenaText() {
    return `${this.price.toLocaleString("cs-CZ")} Kč`;
  }
}