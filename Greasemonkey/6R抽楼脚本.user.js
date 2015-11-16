// ==UserScript==
// @name         6R抽楼脚本
// @namespace    http://miaowm5.github.io/
// @version      0.1
// @description  自动抽楼
// @author       Miaowm5
// @match        http://rm.66rpg.com/thread-*
// @grant        none
// @run-at       document-body
// ==/UserScript==

jQuery(function(){
  jQuery(".authi:even").each(function(){
    var jq = jQuery
    var userName = jq(this).children('a').text()
    if (userName == '喵呜喵5') jq(this).parents('table').hide()
  })
})
