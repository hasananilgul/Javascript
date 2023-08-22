var maaslar = [ 2750, 3250, 2400, 2200, 2600, 4000, 2100 ];
var yeniMaaslar = maaslar.map(function(deger){
    if(deger >= 2500)
        return deger * 1.05 ;
    else
        return deger * 1.10 ;
});
function Yazdir() {
    var yeniMaaslarHTML = "";
    yeniMaaslar.forEach(function(maas) {
        yeniMaaslarHTML += "Yeni Maaşlar:<br>"+ maas + "<br>";
    });
    document.getElementById("kutu").innerHTML = yeniMaaslarHTML;
}
        
        var btnYaz=document.getElementById("btn");
        btnYaz.onclick=Yazdir;