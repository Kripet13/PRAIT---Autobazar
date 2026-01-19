export class Autobazar {
  constructor() {
    this.auta = [];
    this.nextId = 1;
  }

  pridat(brand, model, year, price, fuel, mileage) {
    const id = this.nextId++;
    // Auto vytvoříme až tady – ať je logika „v bazaru“
    return { id, brand, model, year, price, fuel, mileage };
  }

  ulozAuto(auto) {
    this.auta.push(auto);
  }

  smazat(id) {
    this.auta = this.auta.filter(a => a.id !== id);
  }

  prumernaCena() {
    if (this.auta.length === 0) return 0;
    let sum = 0;
    for (const a of this.auta) sum += a.price;
    return Math.round(sum / this.auta.length);
  }

  pocet() {
    return this.auta.length;
  }
}
