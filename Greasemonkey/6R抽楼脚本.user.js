// ==UserScript==
// @name         6R抽楼脚本
// @namespace    http://miaowm5.github.io/
// @version      0.1
// @description  自动抽楼
// @author       Miaowm5
// @match        http://rm.66rpg.com/thread-*
// @match        http://rm.66rpg.com/forum.php?mod=viewthread&*
// @grant        none
// ==/UserScript==

jQuery(function(){
  var blackList = " 喵呜喵5 "
  var $ = jQuery
  $(".authi:even").each(function(){
    var userName = $(this).children('a').text()
    if (blackList.indexOf(userName) >= 0) $(this).parents('table').hide()
  })
  $("div.pstl.xs1").each(function(){
    var userName = $(this).find('a').text()
    if (blackList.indexOf(userName) >= 0) $(this).hide()
  })
})
