const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const repassword = document.getElementById('repassword');

function error(input, message) {
    input.className = 'form-control is-invalid' // is-invalid; çerçeveyi kırmayı yazıp hata ikonu çıkartıyor. Bootstrap özelliği

    const div = input.nextElementSibling; //inputtan sonraki ilk elemente ulaşıyoruz. Yani boş dive ulaşıp oraya hataları yazdıracağız.
    div.innerText = message;
    div.className = 'invalid-feedback';

}

function success(input) {
    input.className = 'form-control is-valid' // is-valid; çerçeveyi yeşil yazıp tik ikonu çıkartıyor. Bootstrap özelliği
}

function validateEmail(input) {  //Mailin düzgün yazılıp yazılmadığının doğruluğunu kontrol eden fonksiyon.
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //return re.test(String(input).toLowerCase());

    if (re.test(input.value)) {
        success(input);
    } else {
        error(input, 'Hatalı Mail Adresi.')
    }

}
function checkRequired(inputs) { // Gerekli alanların kontrolü için fomnsiyon tanımı. if-else'ler yerine bu fonksiyonu çağıracaz.

    inputs.forEach(function(input){

        if (input.value === '') {
            error(input, `${input.id} Gerekli Alan`)
        } else {
            success(input);
        }

    });

}


function checkLength(input, min, max) { //uzunluk kontrollerini yapan fonksiyon.

    if (input.value.length < min) {
        error(input, `${input.id} en az ${min} karakterli olmalıdır.`);
    } else if (input.value.length > max) {
        error(input, `${input.id} en fazla ${max} karakterli olmalıdır.`);
    } else {
        success(input);
    }

}


function checkPasswords(input1, input2) { //şifrelerin eşitliği için fonksiyon
    if (input1.value !== input2.value) {
        error(input2, 'Parolalar Eşleşmiyor.');
    }
}


function checkPhone(input) {
    var exp = /^\d{10}$/; //telefon kuralları. 10 karakterli, boşluk içermemeli vb.
    if (!exp.test(input.value)) {
        error(input, 'Telefon 10 karakterli olmalıdır.')
    }
}


form.addEventListener('submit', function (e) {
    e.preventDefault(); //submit olayını devre dışı bırakıyoruz. Burada amaç submit etmek değil kullanıcı bilgilerinin doğruluğunu kontrol etmek.


    checkRequired([username, email, password, repassword, phone]);
    validateEmail(email);
    checkLength(username,7,15); //max min kontrolleri
    checkLength(username,6,12);
    checkPasswords(password,repassword);
    checkPhone(phone);



    /*
    if (username.value === '') { //boş bırakıldığında hata verdirtiyoruz.
        error(username, 'Kullanıcı Adı Gerekli.');
    } else {
        success(username);
    }

    if (email.value === '') {
        error(email, 'E-Mail Gerekli.');
    } else if (!validateEmail(email.value)) { //mail düzgün yazılmamışsa hata verdirtiyoruz.
        error(email, 'Düzgün bir mail adresi giriniz.')
    } else {
        success(email);
    }

    if (password.value === '') {
        error(password, 'Şifre Gerekli.');
    } else {
        success(password);
    }

    if (repassword.value === '') {
        error(repassword, 'Şifre Gerekli.');
    } else {
        success(repassword);
    }
    */

});