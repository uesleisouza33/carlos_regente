export class Pizza {
  constructor(diametro, espessura) {
    this.raio = diametro;
    this.altura = espessura;
    this.densidade = 0.85;
  }

  calcularAreaBase() {
    let area = Math.PI * this.raio * this.raio;
    return area;
  }

  calcularVolume() {
    let volume = this.calcularArea() * this.altura;
    return volume;
  }
  getPesoUnitario() {
    return this.calcularVolume() * this.densidade;
  }
}
