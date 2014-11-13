define(function(require, exports, modules) {
    var  d = require("$");
    var  e = d(".piece-wrap");

    modules.exports = {init: function($dom) {
        d("body");
        e.each(function(a, b) {
            console.log("index init");
            for (var c, e, f, g, h, i = d(b), j = i.find(".piece"), k = 6, l = 24, m = 12, n = "", o = j.data("piece"), a = 0; k > a; a++)
                c = (640 * Math.random()).toFixed(2), e = (-20 + -10 * Math.random()).toFixed(2), g = (5 + 2 * Math.random()).toFixed(), h = (1 + 2 * Math.random()).toFixed(), f = Math.round(1 + 2 * Math.random()), n += '<i class="fullzi style' + f + '" style="left:' + c + "px; top:" + e + "px; background-image: url(" + o.fullzi + "); -webkit-animation: meteor " + g + "s linear " + h + 's infinite;"></i>';
            for (var a = 0; l > a; a++)
                c = (640 * Math.random() - 280).toFixed(2), e = (-20 + -10 * Math.random()).toFixed(2), g = (8 + 2.5 * Math.random()).toFixed(), h = (2 + 4 * Math.random()).toFixed(), f = Math.round(1 + 2 * Math.random()), n += '<i class="meteor style' + f + '" style="left:' + c + "px; top:" + e + "px;background-image: url(" + o.blue + "); -webkit-animation: meteor " + g + "s linear " + h + 's infinite;"></i>';
            for (var a = 0; m > a; a++)
                c = (940 * Math.random() - 280).toFixed(2), e = (-20 + -30 * Math.random()).toFixed(2), g = (5 + 2.5 * Math.random()).toFixed(), h = (1.2 + 4 * Math.random()).toFixed(), f = Math.round(1 + 2 * Math.random()), n += '<i class="blue style' + f + '" style="left:' + c + "px; top:" + e + "px; background-image: url(" + o.meteor + "); -webkit-animation: meteor " + g + "s linear " + h + 's infinite;"></i>';
            j.append(n), i.on("active", function() {
                console.log("index active")
            }).on("current", function() {
                console.log("index current"), d(this).find(".deviceor").trigger("deviceor")
            })
        })
    }}
})