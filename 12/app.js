var _sayilar = document.getElementsByTagName("button"),
    _sayiUzunluk = _sayilar.length,
    i = 0,
    _sonuc = document.getElementById("sonuc:"),
    _deleteButton = document.getElementById("delete");

    for (i = 0; i < _sayiUzunluk; i++) {
    _sayilar[i].onclick = hesapla;
  }

  _deleteButton.onclick = function() {
    _sonuc.value = "";
  }
  
  function hesapla() {
    var _deger = this.innerHTML;

    if (_deger == "=") {
      try {
        _sonuc.value = eval(_sonuc.value);
      } catch (e) {
        _sonuc.value = "0";
      }
      return;
    }

    _sonuc.value += _deger;
  }