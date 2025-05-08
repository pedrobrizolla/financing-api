export const calcFinancing = (
  valorTotal: number,
  jurosAoMes: number,
  quantidadeParcelas: number
): number => {
  if (quantidadeParcelas === 0) return 0;

  if (valorTotal === 0) return 0;

  const i = jurosAoMes / 100;
  const n = quantidadeParcelas;

  const pmt = valorTotal * (i / (1 - Math.pow(1 + i, -n)));

  return Number(pmt.toFixed(2));
};
