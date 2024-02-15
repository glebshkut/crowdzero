export default function stylePrice(price: number, isUSD?: boolean, noDecimal?: boolean): string {
  return "$" + (price * (isUSD ? 1 : 2528.44)).toFixed(noDecimal ? 0 : 2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}