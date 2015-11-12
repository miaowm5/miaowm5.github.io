// ==UserScript==
// @name         红旅动漫广告移除
// @namespace    http://miaowm5.github.io/
// @version      0.1
// @description  自动点击屏蔽广告，当访问首页时生效
// @author       Miaowm5
// @match        http://www.hltm.cc/
// @grant        none
// ==/UserScript==

$(function(){
    set_shield_ad()
    $('.bdselect_share_box').remove()
    $('#cs_right_bottom').remove()
})
