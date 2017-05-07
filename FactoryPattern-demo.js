/**
 * Javascript设计模式之工厂模式.
 * 工厂模式设计目标是：根据不同的需求创建实例化对象。
 * 
 * 示例：
 *      一个需求是，做一个音乐播放器，这个播放器有四个按钮，
 *      分别是上一首、下一首、播放暂停、静音。
 */

/**
 * 针对上面的需求，我们先按照最简单的工厂模式写一个方法。
 * 缺点：
 *      并没有用到面向对象的理念；
 * @param action
 */
function wangyiMusicAction(action) {
    var o = new Object;
    o.vender = '网易云音乐';
    o.playingMusic = 'See You Again';
    switch (action) {
        case 'last': 
            o.info = { currentMusic: '小幸福', status: '200', msg: '上一曲'};
            break;
        case 'next':
            o.info = { currentMusic: '小幸福', status: '200', msg: '下一曲'};
            break;
        case 'play':
            o.info = { currentMusic: '小幸福', status: '200', msg: '播放'};
            break;
        case 'mute':
            o.info = { currentMusic: '小幸福', status: '200', msg: '静音'};
            break;
    }
    return o;
}

var music = new wangyiMusicAction('next');




/**
 * 面向对象理念
 * @constructor
 */
var WangyiMusicAction = function () {
    this.vender = '网易云音乐';
    this.playMusic = 'See You Again';
}
WangyiMusicAction.prototype = {
    last: function () {
        this.info = { currentMusic: '小幸福', status: '200', msg: '上一曲'}
    },
    next: function () {
        this.info = { currentMusic: '小幸福', status: '200', msg: '下一曲'}
    },
    play: function () {
        this.info = { currentMusic: '小幸福', status: '200', msg: '播放'}
    },
    mute: function () {
        this.info = { currentMusic: '小幸福', status: '200', msg: '静音'}
    }
}

var music = new WangyiMusicAction();



/**
 * 上面的工厂模式中，只能生成WangyiMusicAction的对象，
 * 如果我还要生成一个QQMusic和BaiduMusic，XiamiMusic，
 * 只有每个music都得写一遍方法，这是不值得推荐的。
 * 
 * 解决方法：
 *      我们发现WangyiMusic和QQMusic的prototype属性可以封装成一个对象，
 *      用作父类继承。
 */

// 父类的构造方法
var BaseMusic = function () {
    this.playMusic = 'This is My Music';
}

BaseMusic.prototype = {
    last: function () {
        this.info = { currentMusic: '小幸福', status: '200', msg: '上一曲'}
    },
    next: function () {
        this.info = { currentMusic: '小幸福', status: '200', msg: '下一曲'}
    },
    play: function () {
        this.info = { currentMusic: '小幸福', status: '200', msg: '播放'}
    },
    mute: function () {
        this.info = { currentMusic: '小幸福', status: '200', msg: '静音'}
    }
}

var WangyiMusicAction = function (action) {
    this.vender = '网易云音乐';
}
WangyiMusicAction.prototype = new BaseMusic();

var BaiduMusicAction = function (action) {
    this.vender = '百度云音乐';
}
BaiduMusicAction.prototype = new BaiduMusicAction();

// 音乐工厂
var MusicFactory = function (type) {
    switch (type) {
        case 'wangyi':
            return new WangyiMusicAction();
        case 'baidu':
            return new BaiduMusicAction();
    }
};

var music = new MusicFactory('baidu');
