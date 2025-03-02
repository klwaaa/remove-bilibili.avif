// ==UserScript==
// @name        bilibili动态页面图片去掉 .avif
// @namespace    none
// @version      0.2
// @description  try to change the world!
// @author       klw
// @include      https://www.bilibili.com/opus/*
// @match        https://www.bilibili.com/opus/*
// @grant        none
// @license      GNU GPL-3.0
// @downloadURL https://update.greasyfork.org/scripts/525594/bilbili%E5%8A%A8%E6%80%81%E9%A1%B5%E9%9D%A2%E5%9B%BE%E7%89%87%E5%8E%BB%E6%8E%89%20avif.user.js
// @updateURL https://update.greasyfork.org/scripts/525594/bilbili%E5%8A%A8%E6%80%81%E9%A1%B5%E9%9D%A2%E5%9B%BE%E7%89%87%E5%8E%BB%E6%8E%89%20avif.meta.js
// ==/UserScript==

(function () {
    'use strict';

    // Your code here...
// 读取图片目标
    const source = document.querySelectorAll(".bili-album__preview__picture source[type=\"image/avif\"]");
    const allMinImgDiv = document.querySelector(".opus-module-content .bili-album__preview");
    const bigImg = document.querySelector(".bili-album__watch .bili-album__watch__content img");
    const cvImg = document.querySelectorAll(".opus-para-pic .b-img__inner source[type=\"image/avif\"]");
// 确定正则表达式
    const pattern = /@.*/,
        str = '';
// 读取缩略图,并替换图片路径
    for (let i = 0; i < source.length; i++) {
        source[i].srcset = source[i].srcset.replace(pattern, str);
    }
// 读取并替换专栏图片
    for (let i = 0; i < cvImg.length; i++) {
        cvImg[i].srcset = cvImg[i].srcset.replace(pattern, str);
    }

// 替换大图路径函数
    function refresh() {
        setTimeout(function () {
            bigImg.src = bigImg.src.replace(pattern, str);
        }, 300);
    }

    // bigImg.src = "dadadas";
    console.log(bigImg.src);
// 判断是否点击图片
    allMinImgDiv.addEventListener('click', function (e) {
        if (e.target.tagName === "IMG") {
            refresh();
            // 判读是否有上一张，如果有执行替换函数
            const prev = document.querySelector(".bili-album__watch .bili-album__watch__content .bili-album__watch__content__prev");
            if (prev) {
                prev.addEventListener('click', function (e) {
                    refresh();
                    const next = document.querySelector(".bili-album__watch .bili-album__watch__content .bili-album__watch__content__next");
                    next.addEventListener('click', function (e) {
                        refresh();
                    });
                });
            }
            // 判读是否有下一张，如果有执行替换函数
            const next = document.querySelector(".bili-album__watch .bili-album__watch__content .bili-album__watch__content__next");
            if (next) {
                next.addEventListener('click', function (e) {
                    refresh();
                    const prev = document.querySelector(".bili-album__watch .bili-album__watch__content .bili-album__watch__content__prev");
                    prev.addEventListener('click', function (e) {
                        refresh();
                    });
                });
            }
        }
    });

})();