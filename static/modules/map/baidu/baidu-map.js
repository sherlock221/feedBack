define(function (require, exports, modules) {
    var $ = require("$");

    var sc = document.createElement("script");
    sc.src = "http://api.map.baidu.com/api?type=quick&ak=CUS6Wmlpd5rOHmVyklkpEtY2&v=1.0&callback=baiduMapInit";
    document.head.appendChild(sc);

    var BAIDU_MAP =  function(){
       // 百度地图API功能
        var map = new BMap.Map("allmap");            // 创建Map实例
        this.map = map;
    }

    //地理定位
    BAIDU_MAP.prototype.geolocation = function (callBack) {
        var handleSuccess = function (b) {
            var c = b.coords;
            var latitude = c.latitude;
            var longitude = c.longitude;
            callBack({latitude: latitude, longitude: longitude});
        };
        var handleError = function (b) {
            var message;
            switch (b.code) {
                case b.TIMEOUT:
                    message = "获取超时!请稍后重试!";
                    break;
                case b.POSITION_UNAVAILABLE:
                    message = "无法获取当前位置!";
                    break;
                case b.PERMISSION_DENIED:
                    message = "您已拒绝共享地理位置!";
                    break;
                case b.UNKNOWN_ERROR:
                    message = "无法获取当前位置!"
                    alert(message);
            };
        }

        if(window.navigator.geolocation){
            window.navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
        }
        else{
            alert("sorry！您的设备不支持定位功能");
        }
    };

//    BAIDU_MAP.prototype.pointLoadMap  =  function(){
//        this.geolocation(function(obj){
//            var point = new BMap.Point(obj.longitude,obj.latitude);
//            // 初始化地图,设置中心点
//            map.centerAndZoom(point,15);
//            map.addControl(new BMap.ZoomControl());      //添加地图缩放控件
//        });
//    }

    //地址解析坐标
    BAIDU_MAP.prototype.addressToMap = function(address,city){
        // 创建地址解析器实例
        var _this = this;
        var myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上,并调整地图视野
        myGeo.getPoint(address,function(point){
            if (point) {
                _this.map.centerAndZoom(point, 16);
                _this.map.addOverlay(new BMap.Marker(point));
                _this.map.addControl(new BMap.ZoomControl());      //添加地图缩放控件
            }
            else{
                alert("解析地址失败！");
            }
        }, city);
    }

    //坐标解析地址
    BAIDU_MAP.prototype.pointToMap = function(point){
        // 创建地址解析器实例
        var _this = this;
        var point = new BMap.Point(point.latitude,point.longitude);
        _this.map.centerAndZoom(point,12);
        _this.map.addControl(new BMap.ZoomControl());
    }


    modules.exports = BAIDU_MAP;
 });