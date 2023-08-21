const dizi1 = [1, 2, 3, 4, 5];
const dizi2 = [3, 4, 5, 6, 7];

const ayniOgeler = dizi2.filter(item => dizi1.includes(item));
const birlesikDizi = dizi1.concat(dizi2);

console.log("Aynı Öğeler: ", ayniOgeler);
console.log("Birleştirilmiş Dizi: ", birlesikDizi);
