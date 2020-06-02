!function (root) {
    function Music() {
        this.init = function (src) {
            this.initData();
            this.load(src)
        }
    }
    Music.prototype.initData = function () {
        // this.isPlay = false;//是否播放
        this.audio = document.querySelector("audio");
        this.foot = document.querySelectorAll("footer i");
        this.record = document.querySelector(".record img")//旋转图片
    }
    /**
     * 音频加载
     */
    Music.prototype.load = function (src) {
        this.audio.src = src;
    }

    /**
     * 播放
     */
    Music.prototype.play = function (isPlay) {
        this.audio.play();
        this.iconPlay(isPlay);
    }
    /**
     * 暂停
     */
    Music.prototype.pause = function (isPlay) {
        this.audio.pause();
        this.iconPlay(isPlay);
    }
    /**
     * 返回当前时间
     */
    Music.prototype.curTime = function () {
        return this.audio.currentTime;
    }

    Music.prototype.songEnd = function (fn) {
        this.audio.onended = fn
    }

    /**
     * 设置当前的音频播放时间
     */
    Music.prototype.setCurTime = function(time){
        this.audio.currentTime = time;
    }

    /**
     * 切换播放图形
     */
    Music.prototype.iconPlay = function (isPlay) {
        this.foot[2].className = isPlay ? "action" : "";
        this.record.className = isPlay ? "rotating" : "";
    }

    root.music = new Music();
}(window.play || (window.play = {}))