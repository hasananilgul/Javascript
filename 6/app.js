function krediKart() {
  var input = prompt("Lütfen kredi kartı numaranızı giriniz (16 hane):");
  var dizi = input.split("");
  var dizi1 = [];

  for (var i = 0; i < dizi.length; i++) {
    var eleman = parseInt(dizi[i]);

    if (i % 2 == 0) {
      eleman = eleman * 2;
      if (eleman > 9) {
        eleman = eleman - 9;
      }
    }
    dizi1.push(eleman);
  }

  var sum = 0;
  for (var i = 0; i < dizi1.length; i++) {
    sum = sum + dizi1[i];
  }

  if (sum % 10 == 0) {
    alert("Geçerli.");
  } else {
    alert("Geçersiz.");
  }
}
