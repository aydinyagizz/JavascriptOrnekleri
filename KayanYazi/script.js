kayanYazi=function(nesne, zaman) {
    var yaziNesne=nesne;
    setInterval(function() {
        var yazi = yaziNesne.innerHTML;
        var harf = yazi.substring(0,1);
        var kalan = yazi.substring(1,yazi.length);
        kalan = kalan + harf;
        yaziNesne.innerHTML = kalan;
    }, zaman);

}

var nesne = document.getElementById("yazi");
kayanYazi(nesne, 750);