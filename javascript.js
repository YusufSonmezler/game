<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Snake</title>
    <style>
        body {
            overflow: hidden;
        }

        .box {
            height: 32px;
            width: 32px;
            background-color: red;
            position: absolute;
            top: 0px;
        }

        #snake {
            height: 32px;
            width: 32px;
            background-color: black;
            position: absolute;
            top: 0px;
            z-index: 2;
        }

        #forage {
            height: 32px;
            width: 32px;
            background-color: green;
            z-index: 3;
            position: absolute;
        }
    </style>
</head>
<body>
    <div id="snake"></div>

    <script>
        var snake = document.getElementById('snake'); // bu yukarıda html alanında oluşturduğumuz elementi seçmektedir.
        var snakeLeft = 0; // ilk başta yılanın soldan doğması
        var snakeTop = 0; // ilk başta yılanın üstte doğması
        var direction = 'right'; // yılanın ilk başta sağa doğru gitmesi ayarlanıyor.
        var oldPosition = { top: snakeTop + 'px', left: snakeLeft + 'px' }; // arka arkaya kutuların hareket etmesi ve eklenmesi için bir önceki konumları buraya saklanmaktadır.
        var sayac = 0;

        var addForage = function () { // bu fonksiyon yem oluşturur
            var oldForage = document.getElementById('forage'); // burada yem elementi seçildi.

            if (oldForage) { // if içerisinde her zaman true veya false döndürür. Burada kontrol ettiği şey daha önceden yem var mı yok mu diye
                oldForage.remove(); // eğer ki daha önceden site içerisinde yem var ise remove ile bir önceki yem siteden silinir.
            }

            var forageLeft = Math.floor(Math.random() * 10) * 36; // Math.random() 0 ile 1 arasında rasgele sayı üretir. 10 ile çarpıp 0 ile 10 arasında üretmesini sağlarız. Math.floor() ile . dan sonraki rakamlar temizlenir. Böylelikle bize sabit rakamlar elde edilir Örneğin 80 100 400 tarzındadır. 
            var forageTop = Math.floor(Math.random() * 10) * 36; // Üstteki açıklama geçerlidir.
            var forage = document.createElement('div'); // createElement fonksiyonu web sitesinde bir element oluşturmamızı sağlıyor. İçine ise hangi elementi oluşturacağıımız belirtiyoruz.
            forage.style.left = forageLeft + 'px'; // burada üstte oluşturduğum kutunun soldan boşluğunu ayarlamak için css özelliği tanımlatıldı
            forage.style.top = forageTop + 'px'; // üstteki açıklama ile aynıdır sadece üstten boşluk için yazılmıştır.
            forage.id = 'forage'; // oluşturduğum kutunun içerisine id özelliğini tanımlıyorum.
            forage.className = 'test'; // oluşturduğum kutunun içerisine class özelliğini tanımlıyorum.

            document.body.appendChild(forage); // burada yemin body içerisine kutunun eklenmesini sağlıyoruz. appendChild bir önceki belirtilen elementin içerisine yerleştirilmesini belirtir.
        }

        var addBox = function () { // bu yılana eklenecek kutunun fonksiyonudur.
            var box = document.createElement('div'); // web sitesinde bi div oluşturuluyor.
            box.setAttribute('class', 'box'); // üstte oluşturduğumuz elemente class özelliği olarak box eklenmesi söyleniyor.

            document.body.appendChild(box); // üstte oluşturduğumuz kutuyu body ekliyor.

            sayac++;
            
            var oldSayac = document.getElementById('sayac');

            if (oldSayac) {
                oldSayac.remove();
            }

            var sayacBox = document.createElement('div');
            sayacBox.innerHTML = sayac;
            sayacBox.id = 'sayac'

            document.body.appendChild(sayacBox);
        }

        addForage(); // yukarıda yemin oluşturulması için fonksiyonumu çağırıyorum.

        setInterval(function () { // belirtilen süre bazında kodun tekrar tekrar çalışması setIntervaldir.
            var move = 0; // move 0 olarak tanımlandı.
            var forage = document.getElementById('forage'); // yem seçildi.
            var mappedDirection = mapDirection(direction); // yönlerin ayarları yapıldı ve mapDirection fonksiyonu çağırıldı.

            oldPosition = { top: snakeTop + 'px', left: snakeLeft + 'px' };

            if (mappedDirection.direction == 'left') { // left olarak gelirse buradaki if'in içine girecektir
                snakeLeft += 36 * mappedDirection.multiplier; // burada multiplier -1 ve 1 değeri alır buradaki -1 yılanın sol yönde gittiğini 1 ise sağ yönde gittiğini belirtmek için 36 ile çarğılır ve yılanın left boyutuna eklenir
            } else {
                snakeTop += 36 * mappedDirection.multiplier; // yukarıdaki durumun aynısı top için geçerlidir.
            }

            if (mappedDirection.direction === 'left') {
                if (snakeLeft > window.innerWidth) { // yılanın left boyutu ile ekranın gelişliğini kontrol ediyor eğerki yılanın leftten boşluğu ekranın boyutundan büyükse bu if içerisine giriyor.
                    snakeLeft = 0; // otomatik yılanı sola yapıştırıyor
                } else if (snakeLeft < -16) { // burada ise soldan - yöne doğru gittiğinde yani ekranın soluna doğru gittiğinde
                    snakeLeft = window.innerWidth; // ekranın geliştiğine eşitliyor böylelikle en sağdan başlıyor.
                }

                move = snakeLeft;
            } else if (mappedDirection.direction === 'top') {
                if (snakeTop > window.innerHeight) { // yukarıdaki ile aynıdır tek fark yüksekliği göstermektedir. Yılanın yukarıdan boşluğu ekranın yüksekliğinden fazla ise
                    snakeTop = 0; // yılanı otomatik olarak yukarıya gönderiyor
                } else if (snakeTop < -16) { // eğer ki yükseklikten - yöne doğru gidiyorsa
                    snakeTop = window.innerHeight; // yılanı alttan başlatması için innherHeight ile ekranın boyutu belirlenip ona göre aşağıdan başlaması sağlanır.
                }

                move = snakeTop;
            }

            snake.style[mappedDirection.direction] = move + 'px';
            var snakeCurrentLeft = Number(snake.style.left.replace('px', '')); // yılanın soldan gerçek boyutu alınır. Replace ile px kelimesini silmek için '' boş string içerisine değişmesini söylüyoruz.
            var snakeCurrentTop = Number(snake.style.top.replace('px', '')); // yılanın yukarıdan gerçek boyutunu alır.
            var forageCurrentLeft = Number(forage.style.left.replace('px', '')); // yemin soldan gerçek boyutnu alır.
            var forageCurrentTop = Number(forage.style.top.replace('px', '')); // yemin üstten gerçek boyutunu alır.

            if (snakeCurrentLeft === forageCurrentLeft && snakeCurrentTop === forageCurrentTop) { // burada yemin ile yılanın tam 4 4lük eşleşmesi sağlandıysa içeri girmektedir
                // burada tekrardan bir kutu oluştururlur yukarıdaki fonksiyonda yılanın peşine bırakılır. 
                addBox();
                addForage();
                // sonrasında yem oluşturulur.
            }

            if (snakeCurrentLeft > (window.innerWidth - 100)) {
               // alert('yandın');
            }

            var boxes = document.getElementsByClassName('box'); // classında box kelimesi geçen bütün kutuları boxes değişkenine tanımladım.
            
            for (var i = 0; i < boxes.length; i++) { // bir for tanımlandı ve kuyruğun sayısı kadar bu forun dönmesi istenildi.
                boxPosition = oldPosition; // yılanın eski pozisyonu boxPosition içerisinde saklandı.
                oldPosition = {
                    top: boxes[i].style.top, // burada ise oluşturduğumuz oldPosition kutunun içindeki top kısmını güncelledik
                    left: boxes[i].style.left // üstteki ile aynıdır left özelliğini günceller
                };
                boxes[i].style.top = boxPosition.top; // yeni kutunun top yeri belirlenir.
                boxes[i].style.left = boxPosition.left; // yeni kutunun left yeri belirlenir.
            }
        }, 150);

        var mapDirection = function (direction) {
            var multiplier = -1;
            var mappedDirections = { 'right': 'left', 'bottom': 'top' };
            var positiveDirection = ['bottom', 'right'];

            if (positiveDirection.indexOf(direction) > -1) {  // ilk belirtilen bir array listesidir. direction yönümüzü anlamaktadır. indexOf ile de arrayin içerisinde var mı yok mu diye kontrol eder var ise sonuç olarak 1 döndürür yok ise -1 döndürür.
                multiplier = 1;
            }

            return {
                multiplier: multiplier,
                direction: mappedDirections[direction] || direction
            }
        };

        var setDirection = function (event) { // keyup olduğu için onun özelliklerini getirmektedir.
            if (event.code == "ArrowUp") { // code dediği duşun ingilizce adını saklamaktadır.
                direction = 'top'; // böylelikle top olarak direction güncelliyor ve kodun en başında direction right yazdığımızdan burada top olarak güncelleyip ona göre çalışmasını belirtiyoruz.
            } else if (event.code == "ArrowDown") {
                direction = 'bottom';
            } else if (event.code == "ArrowLeft") {
                direction = 'left';
            } else if (event.code == "ArrowRight") {
                direction = 'right';
            }
        };

        document.addEventListener('keyup', setDirection); // eventListiner ile web sitesinde herhangi bir işlem (tıklama veya klavye tuşuna basma) yapılırsa setDirection fonksiyonunu çağırmayı belirtiyor.
    </script>
</body>
</html>
