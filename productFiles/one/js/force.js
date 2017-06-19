/**
 * Created by Administrator on 2016/5/4.
 */
window.onload = function () {
    var scr = document.getElementById('container');
    var ctx = scr.getContext('2d');
    var btn = document.getElementById("start");

    var position = new Object();
    position.x = 10;
    position.y = 10;

    var vel = new Object();
    vel.x = 0;
    vel.y = 0;

    var gravityAccel = new Object();
    gravityAccel.x = 0;
    gravityAccel.y = 6;

    var ball = {
        pos: position,
        radius: 8,
        velocity: vel,
        erase: function () {
            var top, left;
            top = this.pos.y - this.radius-1;
            left = this.pos.x - this.radius-1;
            ctx.clearRect(left, top, this.radius * 2 + 2, this.radius * 2 + 2);
        },
        draw: function () {
            ctx.fillStyle="red";
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2*Math.PI);
            ctx.closePath();
            ctx.fill();
        },
        checkEdge: function () {
            if (this.pos.y > scr.height) {
                this.pos.y = scr.height - this.radius;
                this.velocity.y *= -1;
            }
            if (this.pos.y < 0) {
                this.pos.y = this.radius;
                this.velocity.y *= -1;
            }
        },
        addForce: function (accel) {
            this.velocity.x += accel.x;
            this.velocity.y += accel.y;
        },
        move: function () {
            this.pos.x += this.velocity.x;
            this.pos.y += this.velocity.y;
        }
    };

    function update() {
        ball.erase();
        ball.addForce(gravityAccel);
        ball.move();
        ball.checkEdge();
        ball.draw();
        timer = setTimeout(update, 100);
    }

    ball.draw();
    btn.onclick = function () {
        update();
    }

}