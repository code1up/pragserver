var Firebase = require("firebase");
var Cylon = require("cylon");

function colorTrack(my) {
    var ref = new Firebase("https://ragstatus.firebaseio.com/");

    ref.child("/color").on("value", function (snapshot) {
        var color = snapshot.val();

        console.dir(color);        
        
        my.sphero.color(color);
    });
}

function colorTick(my) {
    var RED = 0xFF0000;
    var AMBER = 0xFFFF00;
    var GREEN = 0x00FF00;

    var colors = {
        red: RED,
        amber: AMBER,
        green: GREEN
    };

    var color = 0;

    setInterval(function () {
        color = (color + 1) % colors.length;

        console.log(color);
        console.log(colors[color]);

        my.sphero.color(colors[color]);
    }, 1000);
}

Cylon.robot({
    connections: {
        sphero: {
            adaptor: "sphero",
            port: "/dev/tty.Sphero-RGO-AMP-SPP"
        }
    },

    devices: {
        sphero: {
            driver: "sphero"
        }
    },

    work: colorTrack
}).start();
