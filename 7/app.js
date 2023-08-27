let data=
{
    arac:
    [
        {
            marka: "audi",
            renk: ["Siyah","Kırmızı","Gri"],
            stok: true,
            model:["R8","RS7"],
            fiyat:["7.850.00TL"]
        }
    ]
}
var araclar = document.getElementsByClassName("arac")[0];
for (let getir in data) 
{
for(deger of data[getir])
{
console.log(deger);
}
}