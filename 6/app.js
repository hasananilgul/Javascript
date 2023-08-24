function krediKart() {
    var input = prompt("Lütfen kredi kartı numaranızı giriniz (16 hane):");
    var dizi = input.split("");
    var yeniDizi = [];
  
    for (var i = 0; i < dizi.length; i++) {
      var eleman = parseInt(dizi[i]);
  
      if (i % 2 === 0) {
        eleman *= 2;
        if (eleman > 9) {
          eleman -= 9;
        }
      }
      yeniDizi.push(eleman);
    }
    sorgu(yeniDizi);
  }
  
  function sorgu(yeniDizi) { 
    var sum = 0;
    for (var i = 0; i < yeniDizi.length; i++) {
      sum += yeniDizi[i];
    }
  
    if (sum % 10 === 0) {
      alert("Kart Bilgileri Geçerli.");
    } else {
      alert("Kart Bilgileri Geçersiz.");
    }
  }
  
  while (true) {
    krediKart();
  }
  