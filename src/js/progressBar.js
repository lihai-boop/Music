!function (root) {
    function ProgressBar() {
        this.init = function (data, fn) {
            this.initData(data);
            // this.move(fn);
            this.fn = fn;
            this.drag();
        }
    }
    /**
     * 初始化数据 
     */
    ProgressBar.prototype.initData = function (data) {
        this.data = data;
        this.time = null;
        this.bar = document.querySelector(".progressBar");
        this.curTime = 0;
        this.render(data.duration, this.bar.querySelector(".endTime"));
        this.curTimeDom = this.bar.querySelector(".statTime");
        this.width = this.bar.querySelector(".line").offsetWidth;//获取宽度 
        this.bag = this.bar.querySelector(".bag");
        this.dot = this.bar.querySelector(".dot");
        this.proportion()
    }

    /**
     * 元素拖拽
     */
    ProgressBar.prototype.drag = function () {
        var x = 0,
            min = this.dot.getClientRects()[0].left,
            proWidth = 0;

        var self = this;
        this.dot.addEventListener("touchstart", function (e) {
            var touches = e.touches[0];
            x = touches.clientX - this.offsetLeft;
        })
        this.dot.addEventListener("touchmove", function (e) {
            cancelAnimationFrame(self.time);
            var touches = e.touches[0];
            var xx = touches.clientX - x;
            xx = xx > self.width ? self.width : xx;
            xx = xx < 0 ? 0 : xx;
            proWidth = xx;
            this.style.left = xx + "px";
            self.bag.style.width = xx + "px";
        })
        this.dot.addEventListener("touchend", function (e) {
            var time = self.getPro(proWidth)
            root.music.setCurTime(time);
            self.render(time, self.curTimeDom);
            root.loadMusic.isPlay ? self.move() : "";
        })
    }

    /**
     * 拖拽后用拖拽元素的位置来处理获取音乐时间
     */
    ProgressBar.prototype.getPro = function (dragWidth) {
        var dragCurTime = dragWidth / this.width * this.data.duration;
        return dragCurTime;
    }

    /**
     * 播放后的进度 
     */
    ProgressBar.prototype.proportion = function (curTime) {
        var widthPro = 100;//百分率
        var pro = widthPro / parseInt(this.data.duration);//比例值
        this.bag.style.width = pro * curTime + "%";
        this.dot.style.left = pro * curTime + "%";
    }

    /**
     * 歌曲时间处理
     */
    ProgressBar.prototype.render = function (time, dom) {
        var sec = Math.trunc(time / 60);
        var ss = Math.trunc(time - sec * 60);
        sec = sec < 10 ? "0" + sec : sec;
        ss = ss < 10 ? "0" + ss : ss;
        dom.innerHTML = sec + ":" + ss;
    }

    /**
     * 更新已播放的时间
     */
    ProgressBar.prototype.move = function () {
        var stat = Date.now();
        var self = this;
        cancelAnimationFrame(this.time);
        function moveTime() {
            var end = Date.now()
            if (end - stat >= 1000) {
                var curtime = self.fn();
                self.render(curtime, self.curTimeDom);
                self.proportion(curtime);
                stat = end;
            }
            self.time = requestAnimationFrame(moveTime);
        }
        moveTime()
    }

    /**
     * 播放音乐，开启动画，否则取消动画
     */
    ProgressBar.prototype.controlTime = function (isStop) {
        isStop ? this.move(this.fn) : cancelAnimationFrame(this.time);
    }

    root.progressBar = new ProgressBar();
}(window.play || (window.play = {}))