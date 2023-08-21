// Kişilerin bilgilerini içeren dizi
var people = [
    { id: 1, isim: 'Ahmet', arac: [{ model: 'Toyota', year: 2023 }] },
    { id: 2, isim: 'Mehmet', arac: { model: 'Honda' } },
    // Diğer kişiler buraya eklenebilir
];

// ID ile kişi bilgilerini sorgulama ve yazdırma fonksiyonu
function queryPersonById(id) {
    var queriedPerson = people.find(function(person) {
        return person.id === id;
    });
    return queriedPerson || null;
}

// Kullanıcıdan alınan ID ile sorgulama yapma
var queriedId = parseInt(prompt("Bir ID girin:"));
var queriedPerson = queryPersonById(queriedId);


if (queriedPerson) {
    console.log('Kişi Adı:', queriedPerson.isim);
    
    if (Array.isArray(queriedPerson.arac)) {
        queriedPerson.arac.forEach(function(car) {
            console.log('Araba Modeli:', car.model);
            console.log('Üretim Yılı:', car.year || 'Bilgi yok');
        });
    } else {
        console.log('Araba Modeli:', queriedPerson.arac.model);
        console.log('Üretim Yılı:', queriedPerson.arac.year || 'Bilgi yok');
    }
} else {
    console.log('Belirtilen ID ile eşleşen kişi bulunamadı.');
}
