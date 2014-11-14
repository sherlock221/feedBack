/**
 *  反馈业务
 */
define(function(require,exports,module){
    //无限滚动
    require("infline");
    //模板引擎
    require("tmp");

    var UI = {
        inflineScroll : $(".timeline")
    }

    var  Event = {

        init : function(){

            //无限滚动加载
            $(".cbp_tmtimeline").infinitescroll({
                //导航的选择器 成功后自动隐藏
                navSelector: "#navigation",
                //包含下一页链接选择器
                nextSelector: "#navigation a",
                //内容块
                itemSelector: ".cbp_tmtimeline",
                animate: false,
                //最大页数
                maxPage: 3,
                debug : true,
                extraScrollPx : 50,
                localMode: true, //是否允许载入具有相同函数的页面，默认为false
                dataType  : "json",
                template  : function(data){
                    //data表示服务端返回的json格式数据，这里需要把data转换成瀑布流块的html格式，然后返回给回到函数
                    console.log(data);

                    var temp = $("#listTempalte").html() + $("#listTempalte").html();
                    return temp;
                },

                loading: {
                    msgText: "加载中...",
                    finishedMsg: '',
                    img  : "../static/img/loading.gif",
                    selector: '.loading' // 显示loading信息的div
                },
                errorCallback : function(error){
                    if(error == "done"){
                        $(".loading").append("数据加载完成!");
                    }
                },
                error : function(error){
                    $(".loading").html(error);
                }

            },function(result){
                //程序执行完的回调函数
                console.log("完成！");
            });

        }

    };

    $(function(){
        Event.init();
    });


});