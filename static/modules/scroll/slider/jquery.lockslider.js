/**
 * 基于css3 开发的轮播组件
 * 支持webkit内核浏览器
 * 需要触摸库 hummer.js
 * lock  14 10:28下午 3点
 * 11 : 1 支持 左右轮播滑动
 */
define(function(require,exports,modules){
    var  jQuery = require("$");
    (function($) {
        $.fn.lockslider = function() {
            var  $this  = $(this);
            var  $ul  = $this.find(".slider-list");
            var privateFn = {
                init : function(options) {
                  //参数合并
                  var  params = $.extend({},$.fn.lockslider.defaults,options);
                  publicFn.setOpt(params);
                  console.log(params);
                  privateFn._initUI();
                },

                _initUI : function(){

                    var $lis = $ul.find(">li");
                    var width  = $this.width();
                    var height  = $this.height();
                    var options = publicFn.getOpt();

                    $ul.css({
                        "-webkit-transition" : " -webkit-transform 0.6s ease",
                        "transition": "transform 0.6s ease",
                        "white-space" : "nowrap",
                        "font-size"  : "0",
                        "-webkit-transform" : "translate3d(0px, 0px, 0px)",
                        "width"  : $lis.length * width + "px",
                        "height" : height+"px"

                    });

                    $lis.css({
                        "width"  : width+"px",
                        "height"  : height+"px",
                        "overflow" : "hidden"
                    });

                    //垂直
                    if(options.dir == "v"){
                        options.distance = height;

                        $lis.css({
                            "display;"  : "block"
                        });
                    }
                    else{
                        options.distance = width;
                        $lis.css({
                            "display"  : "inline-block",
                            "vertical-align"  : "top"
                        });
                    }

                    options.currentIndex =  1 ;
                    options.totalIndex =  $lis.length;
                    privateFn._initEvent(options);

                },
                _initEvent : function(options){
                    //滑动绑定
                    var  $hummer = $this.hammer();
                    //swipe 系列
                    $hummer.bind("swipeleft",function(){
                        privateFn.swipe("left");

                    });
                    $hummer.bind("swiperight",function(){
                        privateFn.swipe("right");
                    });

//                    $hummer.bind("swipeup",function(){
//                        privateFn.swipe("up");
//                        alert("up");
//                    });
//
//                    $hummer.bind("swipedown",function(){
//                        privateFn.swipe("down");
//                        alert("down");
//                    });
                },
                swipe : function(cos){
                    var options = publicFn.getOpt();
                      if(cos == "right" ||  cos == "down"){
                          --options.currentIndex;
                      }
                      else if(cos == "left" || cos == "up"){
                          ++options.currentIndex;
                      }

                    options = privateFn.checkRange(options);
                    var  distance = (options.currentIndex -1) * options.distance;

                    //上下滑动
                    if(cos == "down" || cos =="up"){
                        $ul.css({"-webkit-transform" : "translate3d(0px, -"+distance+"0px, 0px)"});
                    }
                    //左右滑动
                    else{
                        $ul.css({"-webkit-transform" : "translate3d(-"+distance+"px, 0px, 0px)"});
                    }

                    publicFn.setOpt(options);
                },

                checkRange  : function(options){
                    if(options.currentIndex >  options.totalIndex){
                        options.currentIndex  = options.totalIndex;
                    }
                    else if( options.currentIndex < 1){
                        options.currentIndex = 1;
                    }
                    return options;
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


        $.fn.lockslider.defaults = {
            //动画类型
            animate   :  "slide",
            //动画方向
            dir  : "h"
        };
    })(jQuery);

});