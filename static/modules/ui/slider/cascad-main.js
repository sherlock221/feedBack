define(function(require, exports, module) {
    var d = require("$");
    d =  require("./cascading");
    var e = d(".page-teletext");
    module.exports = {init: function() {
        e.each(function(a, b) {
            console.log("teletext init"), $page = d(b);
            var c = $page.find(".m-cascadingTeletext").cascadingTeletext();
            $page.on("active", function() {
                console.log("teletext active"), c.removeClass("z-viewArea").find("li.z-current").removeClass("z-current")
            }).on("current", function() {
                    console.log("teletext current"), c.addClass("z-viewArea"), setTimeout(function() {
                        c.find("li:first").addClass("z-current")
                    }, 1800)
                })
        })
    }}
})