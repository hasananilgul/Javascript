var ogeler = ["Ali", "Ayşe", "Batuhan", "Emre", "Zeynep"];
var ogelerObjesi = {};

var a_ile_baslayanlar = ogeler.filter(function(ogel) {
  return ogel.startsWith("A");
});

console.log("A ile Başlayanlar:");
console.log(a_ile_baslayanlar);

var aDegisZ = a_ile_baslayanlar.map(function(ogel) {
  return ogel.replace(/^A/, "Z");
}).sort();
  
console.log("A ile Başlayanları Z ile Değiştirildi:");
console.log(aDegisZ);

var sonuc = ogeler.map(function(ogel) {
  return ogel.startsWith("A") ? ogel.replace(/^A/, "Z") : ogel;
}).sort();

console.log("Alfabetik Sıralı:");
console.log(sonuc);

for (var i = 0; i < ogeler.length; i++) {
  var ogel = ogeler[i];
  var key = ogel;
  
  if (ogel.startsWith("A")) {
    key = ogel.replace(/^A/, "Z");
  } 
  
  ogelerObjesi[key] = ogel;
}

console.log("Dizi Objeye Çevrildi:");
console.log(ogelerObjesi);
