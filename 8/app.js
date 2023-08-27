window.onload = showData;
// Verileri göndermeden önce girişleri kontrol eder.
function validateForm(){
    var isim =document.getElementById("isim").value;
    var yas =document.getElementById("yas").value;
    var adres =document.getElementById("adres").value;
    var email =document.getElementById("email").value;

if (isim == ""){
    alert ("Lütfen İsim Giriniz");
    return false;
}
if(yas == ""){
    alert("lütfen yaşınızı giriniz.");
    return false;
}
if(adres == ""){
    alert("lütfen adresinizi giriniz.");
    return false;
}else if(yas < 0){
    alert("yaş değeri sıfırdan küçük olamaz!");
    return false;
}
if(email == ""){
    alert("lütfen e-mail adresinizi giriniz.");
    return false;
}else if(!email.includes("@")){
    alert("e-mail adresi doğru biçime sahip olmalıdır.")
    return false;
}
return true;
}
// Verileri gösteren fonksiyon
function showData(){
    var kisiListesi;
    if(localStorage.getItem("kisiListesi") == null){
        kisiListesi=[];
    }else{
        kisiListesi=JSON.parse(localStorage.getItem("kisiListesi"));
    }
    var html ="";
    kisiListesi.forEach(function (element, index){
        html+="<tr>";
        html+= "<td>" + element["isim"] + "</td>";
        html += "<td>" + element["yas"] + "</td>";
        html += "<td>" + element["adres"] + "</td>";
        html += "<td>" + element["email"] + "</td>";
        html += 
        '<td><button onclick="deleteData(' +
                    index +
                    ')" class="btn btn-danger">Sil</button><button onclick="updateData(' +
                    index +
                    ')" class="btn btn-warning m-2">Düzenle</button></td>';
                html += "</tr>";
            });
    document.querySelector("#crudTable tbody").innerHTML=
    html;
}
// Sayfa yüklendiğinde tüm verileri yükler.
document.onload=showData();
// Veri Ekleme Fonksiyonu
function AddData() { 
    if(validateForm()== true){
        var isim = document.getElementById("isim").value;
        var yas = document.getElementById("yas").value;
        var adres = document.getElementById("adres").value;
        var email = document.getElementById("email").value;
        var kisiListesi;
    if(localStorage.getItem("kisiListesi") == null){
        kisiListesi=[];
    }else{
        kisiListesi=JSON.parse(localStorage.getItem("kisiListesi"));
    }
    kisiListesi.push({
        isim : isim,
        yas : yas,
        adres : adres,
        email : email
    });
    localStorage.setItem("kisiListesi", JSON.stringify
    (kisiListesi));
    showData();
    document.getElementById("isim").value="";
    document.getElementById("yas").value="";
    document.getElementById("adres").value="";
    document.getElementById("email").value="";
}
}
// Veri Silme Fonksiyonu
function deleteData(index){
    var kisiListesi;
    if(localStorage.getItem("kisiListesi") == null){
        kisiListesi=[];
        }else{
            kisiListesi=JSON.parse(localStorage.getItem("kisiListesi"));
            }
            kisiListesi.splice(index, 1);
            localStorage.setItem("kisiListesi", JSON.stringify
            (kisiListesi));
            showData();

}
// Veri Güncelleme Fonksiyonu
function updateData(index) {
    var kisiListesi;
    if (localStorage.getItem("kisiListesi") == null) {
        kisiListesi = [];
    } else {
        kisiListesi = JSON.parse(localStorage.getItem("kisiListesi"));
    }
    document.getElementById("isim").value = kisiListesi[index].isim;
    document.getElementById("yas").value = kisiListesi[index].yas;
    document.getElementById("adres").value = kisiListesi[index].adres;
    document.getElementById("email").value = kisiListesi[index].email;
    
    // Güncelleme düğmesinin işlevi burada tanımlanıyor
    document.getElementById("Update").style.display = "block";
    document.getElementById("Submit").style.display = "none";

    document.getElementById("Update").onclick = function () {
        if (validateForm() == true) {
            kisiListesi[index].isim = document.getElementById("isim").value;
            kisiListesi[index].yas = document.getElementById("yas").value;
            kisiListesi[index].adres = document.getElementById("adres").value;
            kisiListesi[index].email = document.getElementById("email").value;
            localStorage.setItem("kisiListesi", JSON.stringify(kisiListesi));
            showData();
            document.getElementById("isim").value = "";
            document.getElementById("yas").value = "";
            document.getElementById("adres").value = "";
            document.getElementById("email").value = "";
            document.getElementById("Update").style.display = "none";
            document.getElementById("Submit").style.display = "block";
        }
    }
}