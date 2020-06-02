!function (list) {
    function List() {
        this.listDom = document.querySelector(".list");
        this.dl = this.listDom.querySelector("dl");
        this.btn = this.listDom.querySelector("button");
    }

    List.prototype = {
        up: function () {
            this.listDom.style.transform = "translateY(0%)";
        },
        down: function () {
            this.listDom.style.transform = "translateY(100%)";
        },
        hander: function (j, fn) {
            var self = this;
            var dd = this.dl.querySelectorAll("dd");
            var len = dd.length;
            var that = dd[j];
            this.btn.addEventListener("touchend", function () {
                self.down();
            })
            // console.log(that, j);
            that.className = "action";
            for (var i = 0; i < len; i++) {
                !function (ii) {
                    dd[ii].addEventListener("touchend", function () {
                        that.className = "";
                        this.className = "action";
                        that = this;
                        self.down();
                        fn(ii);
                    })
                }(i)
            }
        },
        render: function (data, j, fn) {
            var str = "<dt>播放列表</dt>"
            for (var i = 0; i < data.length; i++) {
                str += "<dd>" + data[i].song + "</dd>"
            }
            this.dl.innerHTML = str;
            this.hander(j, fn);
        }
    }
    list.list = new List();
}(window.play || (window.play = {}))