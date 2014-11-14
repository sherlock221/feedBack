/**
 * Created with IntelliJ IDEA.
 * User: aobo
 * Date: 14-1-8
 * Time: 上午10:59
 * seajs 的配置文件
 */

seajs.config({

    //顶级标识
    base: "/feedBack/static",

    //设置别名
    alias: {
        "$": "modules/core/jquery/1.9.1/jquery.min.js",
        "tmp": "modules/template/artTemplate/template-native.js",
        "_": "modules/util/underscore/1.6.0/underscore-min.js",
        "bootstrap3": "modules/core/bootstrap3/bootstrap.js",
        "lock": "modules/util/lock/lock.js",
        "audio_base": "modules/media/audio/audio-base/audio-base.js",
        "coffee": "modules/core/zepto/zepto_coffee.js",
        "jd_scroll": "modules/scroll/jd/jd_scroll.js",
        "loop_world": "modules/ui/loop_world/loopWorld.js",
        "down-anything": "modules/ui/down-anything/down-anything.js",
        "lottery": "modules/ui/lottery/lottery.js",
        "anFrame": "modules/util/aniamtionFrame/requestAnimationFrame.js",
        "textani": "modules/ui/text/jquery.textillate.js",
        "infline" : "modules/scroll/load/jquery.infinitescroll.js"

    },

    //设置目录
    paths: {

    },
    //更新时间戳
    'map': [
//        [ /^(.*\.(?:css|js))(.*)$/i, '$1?20110801' ]
    ],
    // 变量配置
    vars: {
        'locale': 'zh-cn'
    },

    //预先加载
    preload: ["$"],

    // 调试模式
    debug: false,

    // 文件编码
    charset: 'utf-8'
});

