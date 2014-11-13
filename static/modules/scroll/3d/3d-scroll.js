/**
 * hummer 3d背景轮播组件
 * 支持webkit内核浏览器
 * 需要触摸库 hummer.js
 * lock  14 10:28下午 3点
 * 11 : 1 支持 左右轮播滑动
 */
define(function(require,exports,modules){
    //$
    var  jQuery = require("$");
       //需要ham
    require("core/hammer/jquery.hammer.js");

    (function($) {
        $.fn.scroll3D = function() {
            var  $this  = $(this);
            var  $ul    = $this.find("ul");

            var privateFn = {
                init : function(options) {
                    //参数合并
                    var  params = $.extend({},$.fn.scroll3D.defaults,options);
                    publicFn.setOpt(params);
                    console.log(params);
                    privateFn._initUI();
                },

                _initUI : function(){
                    var $lis = $ul.find(">li");

                    var width  = $this.width();
                    var height  = $this.height();
                    var options = publicFn.getOpt();

                    options.currentIndex =  0 ;
                    options.totalIndex =  $lis.length;
                    privateFn._initEvent(options);

                },
                _initEvent : function(options){
                    //滑动绑定
                    var  $d3 = $this.hammer();
                    $d3.data("hammer").get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });

                    $d3.bind("swipeup",function(){
                        privateFn.swipe("up");
                    });
                    $d3.bind("swipedown",function(){
                        privateFn.swipe("down");
                    });
                },
                swipe : function(cos){
                    var options = publicFn.getOpt();
                    var  currentIndex = options.currentIndex;
                    var currentDom = document.querySelector("#screen0"+currentIndex);

                    if(cos == "up"){
                        if(currentIndex == 0){
                            return;
                        }
                        currentIndex--;
                        var nextDom   = document.querySelector("#screen0"+currentIndex);
                        currentDom.style.webkitTransform = "rotateX(90deg)";
                        nextDom.style.webkitTransform = "rotateX(0deg)";
                    }
                    else if(cos == "down"){
                        if(currentIndex == options.totalIndex-1){
                            return;
                        }
                        currentIndex++;
                        var nextDom   = document.querySelector("#screen0"+currentIndex);
                        currentDom.style.webkitTransform = "rotateX(-90deg)";
                        nextDom.style.webkitTransform = "rotateX(0deg)";
                    }

                    options.currentIndex = currentIndex;
                    publicFn.setOpt(options);
                }

            };

            // 暴露方法
            var publicFn = {
                getOpt : function() {
                    return $this.data("slider");
                },
                setOpt : function(options){
                    $this.data("slider",options);
                },
                swipe : function (dir) {
                    privateFn.swipe(dir);
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


        $.fn.scroll3D.defaults = {

        };
    })(jQuery);

});