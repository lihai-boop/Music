//处理文件
const { src, dest, series } = require("gulp");
const gulp = require("gulp");
const { watch } = require("gulp");//文件监控
const uglify = require("gulp-uglify");//js压缩插件
//const rename = require("gulp-rename");//重命名插件
const clean = require("gulp-htmlclean");//压缩html文件插件
const less = require("gulp-less");//转换less文件成css
const css = require("gulp-clean-css");//压缩css文件
const imag = require("gulp-imagemin");//压缩图片
const im = require("gulp-js-import");//支持ES6模块化

const connect = require("gulp-connect");//服务器

// watch(["src/js/*.js"], function (cd) {
// console.log("文件修改了");

// cd();
// })

function dealWithHtml() {
    return src("src/html/*.html")
        .pipe(clean())
        .pipe(dest("dist/html"))
        .pipe(connect.reload());//实现热更新，服务器插件自带
}

function dealWithJs(cd) {
    return src("src/js/*.js")//目标文件
        .pipe(uglify())
        .pipe(dest("dist/js"))//最终文件会自动生成
        .pipe(connect.reload());//实现热更新，服务器插件自带

}

function dealWithCss(cd) {
    return src("src/css/*.less")//目标文件
        .pipe(less())
        .pipe(css())
        .pipe(dest("dist/css"))//最终文件会自动生成
        .pipe(connect.reload());//实现热更新，服务器插件自带
}

function server(cd) {
    //但是修改了文件后并不会自动刷新，这个要配合wacth才能有用
    connect.server({
        port: "3000",
        livereload: true,//自动刷新 
    })
    cd();
}

watch("src/html/*", function (cd) {
    dealWithHtml();
    cd();
})
watch("src/css/*", function (cd) {
    dealWithCss();
    cd();
})
watch("src/js/*", function (cd) {
    dealWithJs();
    cd();
})

//压缩图片
function images() {
    return src("src/images/*")
        .pipe(imag())
        .pipe(dest("dist/images"))
}


exports.default = series(dealWithHtml, dealWithJs, dealWithCss, images, server);






/**
 * gulp-uglify 压缩插件
 *
 * gulp-rename  将后缀名变为：.min.js
 *
 * gulp-htmlclean  压缩html文件插件
 *
 * gulp-clean-css  压缩css文件
 *
 * gulp-less  less文件转换成css文件
 *
 * gulp-strip-debug  去除调试语句,例如debug
 *
 * gulp-imagemin    图片压缩插件，将图片体积缩小将近一半
 *
 * gulp-connect    开启服务器
 */