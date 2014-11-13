define(function (require, exports, module) {
    var $ = require("$");
    var coffee = require("coffee");


    audio = function (domStr,isAllowManually) {
        this._$globalAudio = $(domStr);
        this._$tip = $("<span></span>");
        this.audio = this._$globalAudio.find("audio")[0];

        this.isAllowManually = !1;

        this.isAllowManually =  isAllowManually == undefined ? !0 : isAllowManually;

        this.playState = "ready";

        var b = this;
        this._$globalAudio.append(this._$tip);
        this._$globalAudio.coffee({
            steams: ['<img src="/LightApp/resources/audio-base/img/musicalNotes.png"/>',
                '<img src="/LightApp/resources/audio-base/img/musicalNotes.png"/>',
                '<img src="/LightApp/resources/audio-base/img/musicalNotes.png"/>',
                '<img src="/LightApp/resources/audio-base/img/musicalNotes.png"/>',
                '<img src="/LightApp/resources/audio-base/img/musicalNotes.png"/>',
                '<img src="/LightApp/resources/audio-base/img/musicalNotes.png"/>'],
            steamHeight: 100, steamWidth: 50}),

//        $(document).on("load", function () {
//            b.isAllowManually = !0
//        });

        this._$globalAudio.on("tap", function (e) {
             e.preventDefault();
             b.isAllowManually && (b._$globalAudio.is(".z-play") ? b.pause() : b.play());
        });

        //适配android 部分机型问题 滑动播放音乐
        $(document).one("touchstart", function () {
            b.audio.play()
        });

    };


    audio.prototype.play = function () {
            //this._$globalAudio.is(".z-play")

            this.audio.play();
            this._$globalAudio.removeClass("z-pause").addClass("z-play");
            this._showTip("开启");
            this.playState = "playing";
            this._$globalAudio.coffee.start();
    };

    audio.prototype.pause = function () {
//            this._$globalAudio.is(".z-pause");
            this.audio.pause();
            this._$globalAudio.removeClass("z-play").addClass("z-pause");
            this._showTip("关闭");
            this.playState = "pause";
            this._$globalAudio.coffee.stop();
        };

    audio.prototype._showTip = function (a) {
            var b = this;
            this._$tip.text(a), this._$tip.addClass("z-show"), setTimeout(function () {
                b._$tip.removeClass("z-show")
            }, 1e3)
        };

    //自动播放
    audio.prototype.go = function () {
        this._$globalAudio.trigger("tap");
    };

    module.exports = audio;
});