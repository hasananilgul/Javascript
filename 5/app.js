/* //* map kullanarak 2500 üstü maaş alanlara 
//* %5 2500 altı maaş alanlara %10 zam yapılacak */

var maaslar = [ 2750, 3250, 2400, 2200, 2600, 4000, 2100 ];

document.getElementById("Maaslar").innerHTML = "Maaşlar: <br>"+maaslar;
var yeniMaaslar = maaslar.map(function(deger){
    if(deger >= 2500)
        return deger * 1.05 ;
    else
        return deger * 1.10 ;
});
function Yazdir() {
    var yeniMaas = "";
    yeniMaaslar.forEach((maas) => { 
        yeniMaas += "Yeni Zamlı Maaşlar:<br>" + maas + "<br>";
    });
    document.getElementById("kutu").innerHTML = yeniMaas; 
}
var btnYaz=document.getElementById("btn");
    btnYaz.onclick=Yazdir;