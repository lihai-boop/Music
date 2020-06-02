!function (render) {
    var mark = document.querySelector(".mark");
    var img = document.querySelector(".record img");
    var i = document.querySelectorAll(".songFoot i")[0];
    var foot = document.querySelector(".title").children;
    /**
     * 更换高斯模糊图片路径
     */
    function chargImg(src) {
        mark.src = src;
        img.src = src;
    }

    /**
     * 更换音乐信息
     * @param {*} data
     */
    function chargTitle(data) {
        foot[0].innerHTML = data.song;
        foot[1].innerHTML = data.singer;
        foot[2].innerHTML = data.album;
    }

    /**
     * 
     * @param {*} islike 
     */
    function isLike(like) {
        i.className = like ? "action" : "";
    }

    function audio(data) {
        chargImg(data.image);
        chargTitle(data);
        isLike(data.isLike)
    }
    render.audio = audio;
}(window.play || (window.play = {}))

