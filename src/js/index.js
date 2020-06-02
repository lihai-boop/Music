!function ($, render) {
    function LoadMusic() {
        this.init = function () {
            this.initData();
            this.getDate("../mock/data.json");
        }
    }
    LoadMusic.prototype.initData = function () {
        this.dataList = [];//存放数据 
        this.i = 0;//数据索引
        this.isPlay = false;
        this.foot = document.querySelectorAll("footer i");
    }
    /**
     * ajax获取数据 
     */
    LoadMusic.prototype.getDate = function (url) {
        var self = this;
        $.ajax({
            url: url,
            method: "get",
            success: function (res) {
                self.dataList = res;
                self.loadStat(self.dataList, self.i);
                self.hander();
            },
            error: function () {
                console.log("数据加载错误");
            }
        })
    }

    /**
     * 渲染界面
     */
    LoadMusic.prototype.loadStat = function (res, i) {
        var self = this;
        render.audio(res[i]);
        render.music.init(res[i].audio);
        render.progressBar.init(res[i], function () {
            return render.music.curTime();
        });

        this.isPlay ? render.music.play(this.isPlay) : render.music.pause(this.isPlay);//保持当前播放状态
        render.music.songEnd(function () {//歌曲播放完
            self.switchSong("next");
        });
    }

    LoadMusic.prototype.hander = function () {
        var self = this;
        this.foot[2].addEventListener("touchend", function () {
            if (!self.isPlay) {
                self.isPlay = true;
                render.music.play(self.isPlay);
                render.progressBar.controlTime(true)
                return;
            }
            self.isPlay = false;
            render.music.pause(self.isPlay);
            render.progressBar.controlTime(false);
        })

        /**
         * 监听切换歌曲功能
         */
        this.foot[1].addEventListener("touchend", function () {
            self.switchSong("pre")
        })
        this.foot[3].addEventListener("touchend", function () {
            self.switchSong("next")
        })
        this.foot[4].addEventListener("touchend", function () {
            render.list.render(self.dataList, self.i, function (num) {
                self.i = num;
                self.loadStat(self.dataList, self.i);
            });
            render.list.up();
        })

    }

    /**
     * 切换歌曲功能
     */
    LoadMusic.prototype.switchSong = function (des) {
        var len = this.dataList.length - 1;
        if (des === "pre") {
            this.i <= 0 ? (this.i = len) : this.i--;
        } else {
            this.i == len ? (this.i = 0) : this.i++;
        }
        this.loadStat(this.dataList, this.i);
    }

    render.loadMusic = new LoadMusic();
    render.loadMusic.init();
}(window.Zepto, window.play)





































