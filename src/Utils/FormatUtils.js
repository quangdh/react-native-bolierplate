import numeral from "numeral";

function formatPrice(number, prefix = "") {
  if (!number) return `${prefix}0`;
  let string = numeral(number).format("0,0.[00000000]");
  return `${prefix}${string}`;
}

export default {
    formatPrice
}
