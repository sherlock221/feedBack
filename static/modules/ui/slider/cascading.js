define(function (require, exports,module) {
    var d =  require("$");
    !function () {
        var a = function (a) {
            var b = this;
            this.$target = a.addClass("m-cascadingTeletext"), this.$_currentItem = this.$target.find("li").first().addClass("z-current"), d(window).on("resize",function () {
                b.$target.height(window.innerHeight)
            }).trigger("resize"), this.$target.find(".imgText").each(function (a, b) {
                0 == d.trim(b.innerText).length && d(b).remove()
            }), this.$target.on(d.isPC ? "click" : "swipeLeft swipeRight",function (a) {
                b.$_currentItem.addClass("swipeLeft" == a.type ? "z-hideToLeft" : "z-hideToRight")
            }).delegate("li", "webkitAnimationEnd", function () {
                b.$target.append(b.$_currentItem), b.$_currentItem.removeClass("z-current z-hideToLeft z-hideToRight"), b.$_currentItem = b.$target.find("li").first().addClass("z-current")
            })
        };
        a.show = function () {
            this.$target.addClass("z-show")
        }, d.fn.cascadingTeletext = function () {
            var b = "init";
            switch (arguments.length > 0 && "string" == typeof arguments[0] && (b = arguments[0]), b) {
                case "init":
                    this.each(function (b, c) {
                        var e = d(c), f = new a(e);
                        e.data("plugin_cascadingTeletext", f)
                    });
                    break;
                case "getPluginObject":
                    return $item.data("plugin_cascadingTeletext")
            }
            return this
        }
    }(), module.exports = d
})