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
        var snake = document.getElementById('snake');
        var snakeLeft = 0;
        var snakeTop = 0;
        var direction = 'right';
        var oldPosition = { top: snakeTop + 'px', left: snakeLeft + 'px' };
        var sayac = 0;

        var addForage = function () {
            var oldForage = document.getElementById('forage');

            if (oldForage) {
                oldForage.remove();
            }

            var forageLeft = Math.floor(Math.random() * 10) * 36; 
            var forageTop = Math.floor(Math.random() * 10) * 36;
            var forage = document.createElement('div');
            forage.style.left = forageLeft + 'px';
            forage.style.top = forageTop + 'px';
            forage.id = 'forage';
            forage.className = 'test';

            document.body.appendChild(forage);
        }

        var addBox = function () {
            var box = document.createElement('div');
            box.setAttribute('class', 'box');

            document.body.appendChild(box);

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

        addForage();

        setInterval(function () {
            var move = 0;
            var forage = document.getElementById('forage');
            var mappedDirection = mapDirection(direction);

            oldPosition = { top: snakeTop + 'px', left: snakeLeft + 'px' };

            if (mappedDirection.direction == 'left') {
                snakeLeft += 36 * mappedDirection.multiplier;
            } else {
                snakeTop += 36 * mappedDirection.multiplier;
            }

            if (mappedDirection.direction === 'left') {
                if (snakeLeft > window.innerWidth) {
                    snakeLeft = 0;
                } else if (snakeLeft < -16) {
                    snakeLeft = window.innerWidth;
                }
                move = snakeLeft;
            } else if (mappedDirection.direction === 'top') {
                if (snakeTop > window.innerHeight) {
                    snakeTop = 0;
                } else if (snakeTop < -16) {
                    snakeTop = window.innerHeight;
                }
                move = snakeTop;
            }

            snake.style[mappedDirection.direction] = move + 'px';
            var snakeCurrentLeft = Number(snake.style.left.replace('px', ''));
            var snakeCurrentTop = Number(snake.style.top.replace('px', ''));
            var forageCurrentLeft = Number(forage.style.left.replace('px', ''));
            var forageCurrentTop = Number(forage.style.top.replace('px', ''));

            if (snakeCurrentLeft === forageCurrentLeft && snakeCurrentTop === forageCurrentTop) {
                addBox();
                addForage();
            }

            if (snakeCurrentLeft > (window.innerWidth - 100)) {
               alert('yandın');
            }

            var boxes = document.getElementsByClassName('box');
            
            for (var i = 0; i < boxes.length; i++) {
                boxPosition = oldPosition;
                oldPosition = {
                    top: boxes[i].style.top,
                    left: boxes[i].style.left
                };
                boxes[i].style.top = boxPosition.top;
                boxes[i].style.left = boxPosition.left;
            }
        }, 150);

        var mapDirection = function (direction) {
            var multiplier = -1;
            var mappedDirections = { 'right': 'left', 'bottom': 'top' };
            var positiveDirection = ['bottom', 'right'];

            if (positiveDirection.indexOf(direction) > -1) {
                multiplier = 1;
            }
            return {
                multiplier: multiplier,
                direction: mappedDirections[direction] || direction
            }
        };

        var setDirection = function (event) {
            if (event.code == "ArrowUp") {
                direction = 'top';
            } else if (event.code == "ArrowDown") {
                direction = 'bottom';
            } else if (event.code == "ArrowLeft") {
                direction = 'left';
            } else if (event.code == "ArrowRight") {
                direction = 'right';
            }
        };
        document.addEventListener('keyup', setDirection);
    </script>
</body>
</html>
