// ==UserScript==
// @name         Moeimg页面轻量化
// @namespace    http://miaowm5.github.io/
// @version      0.1
// @description  Moeimg页面轻量化
// @author       Miaowm5
// @match        http://moeimg.net/*
// @grant        none
// @run-at       document-body
// ==/UserScript==

$(function(){
    var text = ""
    if( /.*html.*/.test(window.location.href) ){
        text = '<div style="position:fixed;background-color:white">';
        var data = [];
        $('.box').each( function(i) { data[Math.floor(i / 5)] += ($(this).html()); })
        $.each(data, function(i){
            var name = 'm5_data'+ i
            text += '<a href="#'+ i +'" onclick="'
            text += 'window.scrollTo(0,0);$(\'#content\').html($(\'body\').attr(\'' + name + '\'))'
            text += '">PAGE'+ i +'</a>'
            $('body').attr( name , data[i] )
        })
        $('body').html(text+"</div><div id='content'></div>");
    }
    else{
        $('.post').each( function(i) { text += $(this).html() })
        $('body').html(text);
    }
}

 )
