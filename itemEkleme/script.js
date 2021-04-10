/*


// şimdiki tarihin gün, ay, ve yıl bilgisini yazdır.

var dt = new Date();

console.log(dt.getDate()); //gün
console.log(dt.getMonth() + 1); //ay
console.log(dt.getFullYear()); //yıl


// tarih ve saat bilgisini içeren bir Date objesi oluştur.

var dtA = new Date('8/12/2020 21:43:50');
var dtB = new Date(2020, 12, 8, 21, 43, 50);
console.log(dtA);
console.log(dtB);

// 1/1/1990 tarihinin bir gün öncesini göster

var dtC = new Date('1/1/1990');

var dayOfMonth = dtC.getDate();
dtC.setDate(dayOfMonth - 1);

console.log(dtC);

// iki tarih arasında geçen süre 

var start = new Date('1/1/1990');
var end = new Date('1/1/1991');

var milisecond = end - start; //farkı milisaniye olarak alınır.

var saniye = milisecond / 1000;
var dakika = saniye / 60;
var saat = dakika / 60;
var gun = saat / 24;

console.log(milisecond);
console.log(saniye);
console.log(dakika);
console.log(saat);
console.log(gun);

// yaş hesaplama nasıl yapılır?

var birthday = new Date('12/12/1996');
var yasFarkiMilisn = Date.now() - birthday.getTime();

var yasDate = new Date(yasFarkiMilisn);


console.log(yasDate.getFullYear() - 1970);

//******************************************************************** 


*/

//UI vars 
const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items ;


//load items (itemler yüklenirken).
loadItems();

// kayıtlı event'ları metot aracılığı ile çağırıyoruz.
eventListeners();

function eventListeners() {
    // buton event
    form.addEventListener('submit', addNewItem);

    // delete an item
    taskList.addEventListener('click', deleteItem);

    // delete all items (bütün elemanları silme)
    btnDeleteAll.addEventListener('click', deleteAllItems);

}

function loadItems() {

    items = getItemsFromLS();

    items.forEach(function (item) {
        createItem(item);
    });
}


//get items from Local Storage
function getItemsFromLS() {
    if (localStorage.getItem('items')===null) {
        items = [];
    }else {
        items = JSON.parse(localStorage.getItem('items'));
    }

    return items;
}


// set item to Local Storage (bilgi ekleme)
function setItemToLS(text) {
    items = getItemsFromLS();
    items.push(text); //liste üzerine eleman eklensin
    localStorage.setItem('items',JSON.stringify(items));
}


function deleteItemFromLS(text) {
    items =getItemsFromLS(text);
    items.forEach(function(item,index){
        if (item === text) {
            items.splice(index,1);
        }
    });

    // liste içerisinden elemanı sildikten sonra localStorage'ye de kaydetmemiz lazım
    localStorage.setItem('items',JSON.stringify(items));
}


function createItem(text) {

    //li ekleme
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    //li ye text ekleme
    li.appendChild(document.createTextNode(text));

    //a ekleme
    const a = document.createElement('a');
    a.classList = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>';

    // li'ye a'yı ekleme işlemi 
    li.appendChild(a);

    //li'yi ul'ye ekleme işlemi
    taskList.appendChild(li);

}

// item ekleme işlemi
function addNewItem(e) {

    //console.log(input.value); // inputa girilen değeri yazdırır.

    if (input.value === '') {
        alert('add new item');
    }

    //create item
    createItem(input.value);

    // save to LS
    setItemToLS(input.value);

    // ekledikten sonra inputun içini temizleme işlemi
    input.value = '';


    e.preventDefault(); //sayfanın yenilenip scrollbar ın üste çıkmasını engelliyoruz.

}

// delete an item
function deleteItem(e) {


    if (e.target.className === 'fas fa-times') {
        if (confirm('silmek istiyor musunuz?')) {
            e.target.parentElement.parentElement.remove();  // parentElement ile üst elemente ulaşıyoruz. burda iste çarpı ikinondan li'ye ulaşıp onu siliyoruz.

            //delete item from LS (localStorage'den de siliyoruz.)
            deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }
    }


    e.preventDefault();
}

// delete all items 
function deleteAllItems(e) {

    
     taskList.innerHTML = ''; 

     //bu da silme işlemi yapar.
    /*if (confirm('silmek istiyor musunuz?')) {

        taskList.childNodes.forEach(function (item) {
            if (item.nodeType === 1) {
                item.remove();
            }

        });

    }*/

    localStorage.clear();




    e.preventDefault();

}
