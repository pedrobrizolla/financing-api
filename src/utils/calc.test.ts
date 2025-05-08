import { calcFinancing } from "./calc";

describe("calcFinancing", () => {
  it("deve calcular a parcela corretamente usando a fórmula Price", () => {
    const valorTotal = 5000;
    const jurosAoMes = 1.5;
    const quantidadeParcelas = 12;

    const resultado = calcFinancing(valorTotal, jurosAoMes, quantidadeParcelas);
    expect(resultado).toBeCloseTo(458.4, 2);
  });

  it("deve retornar parcela 0 se valor total for 0", () => {
    const resultado = calcFinancing(0, 1.5, 20);
    expect(resultado).toBe(0);
  });

  it("deve retornar parcela 0 se número de parcelas for 0", () => {
    const resultado = calcFinancing(5000, 1.5, 0);
    expect(resultado).toBe(0);
  });
});
