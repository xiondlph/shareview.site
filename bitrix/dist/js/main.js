(function () {

    window.onload = function () {
        var canvas = document.getElementById('main-canvas'),
            context = canvas.getContext('2d');

        canvas.width  = 500;
        canvas.height = 300;

        var x = 0, y = 0,
            y = half = canvas.height / 2,
            amp = 50,
            pi = Math.PI,
            n = 90;

        function draw() {
            context.beginPath();
            context.strokeStyle = "red";
            context.lineWidth = 4;
            context.moveTo(x, y);
            x++;
            y = Math.sin(x * pi / n)*amp + half;
            context.lineTo(x, y);
            context.stroke();

            setTimeout(draw, 10);
        }

        draw();
    };

})();