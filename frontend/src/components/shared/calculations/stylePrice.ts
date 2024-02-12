export default function stylePrice(price: number): string {
  return "$" + (price * 2528.44).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}