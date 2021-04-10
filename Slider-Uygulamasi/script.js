var models = [
    {
        name: 'Bmw 418d',
        image: 'img/bmw.jpg',
        link: 'https://www.arabam.com/'
    },
    {
        name: 'Mazda CX-3',
        image: 'img/mazda.jpg',
        link: 'https://www.arabam.com/'
    },
    {
        name: 'Volvo S60',
        image: 'img/volvo.jpg',
        link: '#'
    },
    {
        name: 'Skoda SuperB',
        image: 'img/skoda.jpg',
        link: '#'
    },
    {
        name: 'Honda Civic',
        image: 'img/honda.jpg',
        link: '#'
    }
];



var index = 0;
var slaytCount = models.length; //uzunluğu kadar gitsin diyoruz.
var interval;

var settings = {
    duration: '2000', //varsayılanı 2 saniye olarak ayarlıyoruz.
    random: true //rastgele bir sayı üretsin. bu sayı sliderin hangisine denk gelirse ekranda onu göstersin.
}

//showSlide(index);
init(settings);


document.querySelector('.fa-arrow-circle-left').addEventListener('click', function () {
    index--; //geriye basınca azalması gerekiyor.
    showSlide(index); //değeri azaldığında azalan değeri tekrar gösteriyoruz.
    console.log(index);
}); // Click olayı veriyoruz yani tıklanma.


document.querySelector('.fa-arrow-circle-right').addEventListener('click', function () {
    index++; //ileriye basınca artması gerekiyor.
    showSlide(index); //değeri arttığında artan değeri tekrar gösteriyoruz.
    console.log(index);
}); // Click olayı veriyoruz yani tıklanma.


document.querySelectorAll('.arrow').forEach(function(item){

    item.addEventListener('mouseenter', function(){  //oklardan hangisine tıklarsak tıklayalım otomatik geçişi ve random sayı üretimini durdurmamız lazım.
        clearInterval(interval);
    });
});

document.querySelectorAll('.arrow').forEach(function(item){

    item.addEventListener('mouseleave', function(){  //okların üzerinden mouseyi çekersek otomatik geçişi ve random sayı üretimine devam eder.
        init(settings);
    });
});


function init(setting) {

    //setTimeout; Burada belli bir süre sonra başlatılacak fonksiyonu belirtiyoruz. o süre sonra başlıyor bir kere işletiliyor ve duruyor.

    var ayniMi;

    interval = setInterval(function () {  // setInterval; clearInterval ile durdurmadığımız sürece sürekli devam eder.

        if (settings.random) { //random true ise.

            do {

                //random index
                index = Math.floor(Math.random() * slaytCount); // 0 ile slaytCount kadar sayı üretir.

            } while (index == ayniMi)
            ayniMi = index;

        } else {  //random false ise.
            //artan index
            if (slaytCount == index+1) { //son slayta geldiğimizde ve eşitlik söz konusuysa 

                index = 0; //başa alıyoruz.
            }

            showSlide(index);
            console.log(index);
            index++; //diğer durumlarda index'i 1 arttıralım.

        }
        

        showSlide(index);

    }, settings.duration);

}

function showSlide(i) {

    index = i;

    //ifler dögü oluşturuyor.
    if (i < 0) {
        index = slaytCount - 1; //geriye bastığımızda eksi olmaması için ve 0'dan sonrası için tekrar ileriden başlamak için.
    }

    if (i > slaytCount) {
        index = 0; //ileride sayıyı aşması durumunda slider'ı 0'dan başlatıyoruz. 
    }


    document.querySelector('.card-title').textContent = models[index].name; // Adını çekiyoruz.

    //burdan verileri alıp index.html'e değerleri yazfırıyoruz. verileri böyle çekiyoruz. Resimleri çekiyoruz.
    document.querySelector('.card-img-top').setAttribute('src', models[index].image);

    document.querySelector('.card-link').setAttribute('href', models[index].link); //linkini çekiyoruz.
}


