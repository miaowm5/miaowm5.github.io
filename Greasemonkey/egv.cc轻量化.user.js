// ==UserScript==
// @name         egv.cc轻量化
// @namespace    http://miaowm5.github.io/
// @version      0.1
// @description  Remove AD
// @author       Miaowm5
// @match        http://egv.cc/*
// @grant        none
// @run-at       document-body
// ==/UserScript==

$(function(){
    var m = window.location.href.match(/^http:\/\/egv.cc.*\/(\d+)(#\d+)*$/)
    var m = "#more-" + m[1] + ">ul>li"
    var text = ""
    text = '<div style="z-index:999;position:fixed;background-color:white">';
    var data = [];
    $(m).each( function(i) {
        if ($(this).attr('class') != "boo") {
            if (!data[Math.floor(i / 5)]) data[Math.floor(i / 5)] = ""
            data[Math.floor(i / 5)] += ($(this).html()+'<br/>')
        }
    })
    $.each(data, function(i){
        var name = 'm5_data'+ i
        text += '<a href="#'+ i +'" onclick="'
        text += 'window.scrollTo(0,0);$(\'#content\').html($(\'body\').attr(\'' + name + '\'))'
        text += '">PAGE'+ i +'</a>'
        $('body').attr( name , data[i] )
    })
    $('body').html(text+"</div><div id='content'></div>");

  }
)
