
const container = document.querySelector('.container');
const count = document.getElementById('count'); //count id'sini alıyoruz. 
const amount = document.getElementById('amount'); //amount id'sini alıyoruz.
const select = document.getElementById('movie'); //select kutusunu alıyoruz.
const seats = document.querySelectorAll('.seat:not(reserved)');

getFromLocalStorage(); // uygulama yüklendiğinde Local Storage'ye kayıtlı bilgiler yüklenir.
calculateTotal(); // uygulama yüklendiğinde hesapşamalar yüklenir.



container.addEventListener('click', function (e) {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reversed')) { //seat calslarına tıklarsak kodlar çalışsın anlamında. çünkü üstte container'i seçtiğimiz için nereye tıklarsak orayı alıyordu. !e.target.classList.contains('reversed'); seçili yani beyaz koltukları içirmiyorsa demek.

        e.target.classList.toggle('selected'); //toggle; class varsa siler, yoksa ekler.

        calculateTotal(); //hesaplamalar.

    }
});

select.addEventListener('change', function (e) { //select'i seçtiğimiz zaman çalışacak kodlar. yani fiyat bilgisini filme göre verecez.

    calculateTotal(); //hesaplamalar.

});

function calculateTotal() { //hesaplamalar.

    const selectedSeats = container.querySelectorAll('.seat.selected');

    const selectedSeatsArr = [];
    const seatsArr = [];

    selectedSeats.forEach(function (seat) {
        selectedSeatsArr.push(seat);
    });

    seats.forEach(function (seat) {
        seatsArr.push(seat);
    });

    //seçilen eleman kaçıncı index numarsına sahip onu öğreniyoruz. [1,3,5...]
    let selectedSeatIndexs = selectedSeatsArr.map(function (seat) { //map; seçilen elemanların listesini verecek
        return seatsArr.indexOf(seat);
    });

    console.log(selectedSeatIndexs);

    let selectedSeatCount = selectedSeats.length //seçili koltuk sayısı. kaç tane seçili koltuk var onu alıyoruz.

    count.innerText = selectedSeatCount; //adet bilgisini yazdırıyoruz.
    amount.innerText = selectedSeatCount * select.value; //fiyat bilgisini yazdırıyoruz.


    saveToLocalStorage(selectedSeatIndexs); //Local Storage'ye kaydeder. bilgiler kayıtlı kalır.

}

function getFromLocalStorage() { //Local Storage'deki kayıtlı bilgilerin uygulama üzerine getirilmesi.
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function(seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }




    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex; //seçili olan select'in sayfa yüklendiğinde kayıtlı olarak yüklenmesini sağlar. filmi seçme işlemi
    }
}

function saveToLocalStorage(indexs) { //bilgileri Local Storage'ye kaydeder.
    localStorage.setItem('selectedSeats', JSON.stringify(indexs)); // index numaralarını Local Storage'ye kaydeder.
    localStorage.setItem('selectedMovieIndex', select.selectedIndex); //select'i seçtiğimiz zaman  yani filmide local storage'ye kaydediyoruz.
}
