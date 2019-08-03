export function ConvertFromKelvin(kelvin) {
  const celsius = kelvin - 273.15;
  const fahrenheit = celsius * 1.8 + 32;

  return Math.round(fahrenheit);
}
