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
        listTemplate: $("#listTempalte"),
        totalCount   : $(".totalCount"),
        alertDom     : $("#alertDom")
    }


    //分页
    var  pageIndex = 1;
    //每页显示数量
    var  pageSize = 1;


    var  isFirst = true;

    var Event = {


        init: function () {

            var  pcWidth = $(document).width();
            console.log(pcWidth);
            if(pcWidth <=1024){
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
            }



            tp.helper('$ctDate', function (time) {




                var date  =  new Date(time);
                var year=date.getFullYear();
                var month=date.getMonth()+1;
                var day=date.getDate();
                var hours=date.getHours();
                var minutes=date.getMinutes();

                return year+"/"+month+"/"+day;
            });

            tp.helper('$cttime', function (time) {

                var date  =  new Date(time);
                var hours=date.getHours();
                var minutes=date.getMinutes();
                return hours+":"+minutes;
            });


            var refreshList = function (data, append) {
                //data表示服务端返回的json格式数据，这里需要把data转换成瀑布流块的html格式，然后返回给回到函数
                console.log(data);
                // 预编译模板
                var tm = tp.compile(UI.listTemplate.html());
                // 匹配json内容
                var html = tm(data);
                return html;
            }


            var   infinitescroll = function(totalPage){
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
                    maxPage: totalPage,
                    debug: false,
                    extraScrollPx: 50,
                    localMode: true, //是否允许载入具有相同函数的页面，默认为false
                    dataType: "json",
                    template: function (result) {

                        var data  = result.bizData;
                        //data表示服务端返回的json格式数据，这里需要把data转换成瀑布流块的html格式，然后返回给回到函数
                        var tmp = refreshList(data);
                        pageIndex++;
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


            }


            var firstList = function (callBack) {
                var url = $("#navigation a").attr("href");
                 var  param = calcParam();
                $.get(url, param, function (result) {
                    var data  = result.bizData;

                    if(isFirst == true){
                        console.log("第一次");
                        //计算分页
                        var ct = data.count;
                        var totalPage = calcCount(ct);
                        infinitescroll(totalPage);
                        UI.totalCount.html('累计('+ct+')');

                        isFirst = false;
                    }

                    var html = refreshList(data);
                    UI.inflineScroll.find(".cbp_tmtimeline").html(html);
//                    pageIndex++;
                });
            }


            //计算分页
            var  calcCount = function(total){
                var totalPage = 0;
                if(total % pageSize == 0)
                    totalPage = total/pageSize;
                else
                    totalPage = parseInt(total/pageSize) +1;

                return totalPage;
            }


            var  calcParam  = function(){
                var  index = (pageIndex - 1) * pageSize;
                return {
                    "index" : index,
                    "size" : pageSize
                }
            }

            firstList();

            //返回顶部
            $.scrollUp();

//            var scrollTop = document.body.scrollTop;
//            //自动滚动
//           setInterval(function(){
//               $('body').animate({scrollTop:scrollTop}, 800);
//               scrollTop+=100
//           },1800);


            var scrollurl = $("#navigation a").attr("href");
            var  timeNewDate = 1000 * 60 * 5;


            var  hasNewDate = function(){
                $.get(scrollurl, {index :0,size : pageSize}, function (result) {
                    var data  = result.bizData;
                    var currentTime = new Date().getTime();
                    var  dataTime = data.feedbackList[0].time;
                    if(dataTime > currentTime){
                        UI.alertDom.css("opacity","1");
                    }
                    else{
                        UI.alertDom.css("opacity","0");
                    }
                });
            }

            setInterval(hasNewDate,timeNewDate);

            //首发
            hasNewDate();
        }

    };

    $(function () {
        Event.init();
    });


});