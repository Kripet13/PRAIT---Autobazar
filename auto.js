export class Auto {
  constructor(id, brand, model, year, price, fuel = "", mileage = "") {
    this.id = id;
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.price = price;
    this.fuel = fuel;
    this.mileage = mileage;
  }

  popis() {
    return `${this.brand} ${this.model} (${this.year}) za ${this.cenaText()}.`;
  }

  cenaText() {
    return `${this.price.toLocaleString("cs-CZ")} Kč`;
  }
}