/**
 * Created by Jiangxtx on 2016/10/9.
 * 功能：
 *      检测当前浏览器是否支持 webp 格式的图片
 * 用法：
 *      isWebpSupported 作为一个全局变量global var，供其它脚本引用;
 *      possible value: true or false.
 */

var isWebpSupported = function() {
    var image = new Image();
    image.onerror = function(){
        console.info('>>>isWebpSupported--onerror--浏览器不支持webp');
        isWebpSupported = false;
        return isWebpSupported;
    }
    image.onload = function(){
        if (image.width == 1) {
            console.info('isWebpSupported--onload--浏览器支持webp');
            isWebpSupported = true;
            return isWebpSupported;
        } else {
            console.info('>>>isWebpSupported--onload--浏览器不支持webp');
            isWebpSupported = false;
            return isWebpSupported;
        }
    }
    image.src = "data:image/webp;base64,UklGRiwAAABXRUJQVlA4ICAAAAAUAgCdASoBAAEAL/3+/3+CAB/AAAFzrNsAAP5QAAAAAA==";
};
isWebpSupported();
console.info('local webp', isWebpSupported(), isWebpSupported)
export default isWebpSupported;