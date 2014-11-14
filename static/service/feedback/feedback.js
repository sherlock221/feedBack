/**
 *  反馈业务
 */
define(function (require, exports, module) {
    //无限滚动
    require("infline");
    //模板引擎
    require("tmp");
    //返回顶部
    require("scrollup");
    //header操作
    require("headroom");


    var tp = require("tmp");

    var UI = {
        inflineScroll: $(".timeline"),
        listTemplate: $("#listTempalte")
    }

    var Event = {

        init: function () {

            var header = new Headroom(document.querySelector("header"), {
                tolerance: 5,
                offset : 205,
                classes: {
                    initial: "animated",
                    pinned: "slideDown",
                    unpinned: "slideUp"
                }
            });

            header.init();


            var refreshList = function (data, append) {
                //data表示服务端返回的json格式数据，这里需要把data转换成瀑布流块的html格式，然后返回给回到函数
                console.log(data);
                // 预编译模板
                var tm = tp.compile(UI.listTemplate.html());
                // 匹配json内容
                var html = tm(data);
                return html;
            }


            //无限滚动加载
            $(".cbp_tmtimeline").infinitescroll({
                //导航的选择器 成功后自动隐藏
                navSelector: "#navigation",
                //包含下一页链接选择器
                nextSelector: "#navigation a",
                //内容块
                itemSelector: ".cbp_tmtimeline",
                animate: true,
                //最大页数
                maxPage: 3,
                debug: false,
                extraScrollPx: 50,
                localMode: true, //是否允许载入具有相同函数的页面，默认为false
                dataType: "json",
                template: function (data) {
                    //data表示服务端返回的json格式数据，这里需要把data转换成瀑布流块的html格式，然后返回给回到函数
                    var tmp = refreshList(data);
                    return tmp;
                },

                loading: {
                    msgText: "加载中...",
                    finishedMsg: '',
                    img: "../static/img/loading.gif",
                    selector: '.loading' // 显示loading信息的div
                },
                errorCallback: function (error) {
                    if (error == "done") {
                        $(".loading").append("数据加载完成!");
                    }
                },
                error: function (error) {
                    $(".loading").html(error);
                }

            }, function (result) {
                //程序执行完的回调函数
                console.log("完成！");
            });


            var firstList = function () {
                var url = $("#navigation a").attr("href");
                $.get(url, {}, function (result) {
                    var html = refreshList(result);
                    UI.inflineScroll.find(".cbp_tmtimeline").html(html);
                });
            }


            firstList();


            //返回顶部
            $.scrollUp();

        }

    };

    $(function () {
        Event.init();
    });


});