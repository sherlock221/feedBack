/**
 * 文字解说 滚动
 */
define(function(require,exports,modules){

 var  jQuery = require("$");

(function($) {

    var  loopIndex = 0;

    function addCssStyle(cssString) {
        var doc = document;
        var style = doc.createElement("style");
        style.setAttribute("type", "text/css");
        style.id = "loopWorld";

        if (style.styleSheet) {// IE
            style.styleSheet.cssText = cssString;
        } else {// w3c
            var cssText = doc.createTextNode(cssString);
            style.appendChild(cssText);
        }

        var heads = doc.getElementsByTagName("head");
        if (heads.length)
            heads[0].appendChild(style);
        else
            doc.documentElement.appendChild(style);
    }

    var  cssStr = ".loop_world {text-align: center;font-size: 12px; height: 18px;line-height: 18px;overflow: hidden;}";
    cssStr += " .loop_world_list { margin: 0;padding:0; position: relative;}";

    //初始化
    addCssStyle(cssStr);

        $.fn.loopWorld = function() {

        var privateFn = {
            init : function(options) {

                console.log(options);

                if(options){
                    options.time  =  options.time == undefined ? "9s" : options.time;

                }


                var  $this  = $(this);
                var  $list = $this.find(".loop_world_list");
                var  length = $list.find("li").length;
                var  jk = 100 /(length*2-1);
                var  height = 18;
                var  keyframes = "@-webkit-keyframes "+"loop-"+loopIndex+" {";

                var tempHeight = 0;
                var j = 1;
                for(var i=0;i<length*2;i++){
                    var temp = jk * i;
                    keyframes+= temp+"% {"
                             +"-webkit-transform: translate3d(0, -"+tempHeight+"px, 0);"
                             +"transform: translate3d(0, -"+tempHeight+"px, 0);"
                             +"}";

                    if(j  == 2){
                        tempHeight += height;
                        j = 1;
                    }
                    else{
                        j++;
                    }
                }
                keyframes+= " }";
                var  animation = ".loop-"+loopIndex+"{ -webkit-animation: "+"loop-"+loopIndex+" "+options.time+" ease infinite both;  }";
                console.log(keyframes);
                $("#loopWorld").append(keyframes).append(animation);
                $list.addClass("loop-"+loopIndex);

                loopIndex++;
            }
        };
        // 判断是 构造函数 || 调用方法
        var method = arguments[0];

        var array;
        if (publicFn[method]) {
            method = publicFn[method];
            array = Array.prototype.slice.call(arguments, 1);
        } else if (typeof (method) == 'object' || !method) {
            method = privateFn.init;
            array  = Array.prototype.slice.call(arguments, 0);
        } else {
            $.error('Method ' + method
                + ' does not exist on af.xxx');
            return this;
        }

        // 处理多个对象
        return this.each(function() {
            method.apply(this, array);
        });
    };
    // 暴露方法
    var publicFn = {
        getOptions : function() {
            console.log($.fn.loopWorld.options);
        }
    };

})(jQuery);

});