// ==UserScript==
// @name         ErogeTrailers下载简易化
// @namespace    http://miaowm5.github.io/
// @version      0.1
// @description  ErogeTrailers下载简易化，只显示视频源地址和视频名称
// @author       Miaowm5
// @include      /^http://erogetrailers.com/video/(\d+)$/
// @grant        none
// 
// ==/UserScript==

function check_ready(times){
    if ($('.et4player_source').text() != '-'){
        var text = '<br/><input style="font-size:3em;width:1000px" value="' + $('h2').text() + '.mp4"'
        text += 'onmouseover="this.focus();" onfocus="this.select();"/><br/><br/><br/>'
        text += '<input style="font-size:2em;width:800px" value="' + $('.et4player_source>a').attr('href')
        text += '" onmouseover="this.focus();" onfocus="this.select();"/><br/><br/>'
        text += '<a target="_black" href="http://en.savefrom.net/">解析</a>'
        $('body').html(text)
    }
    else if ( times > 60){ console.log('time_out') }
    else{ 
        console.log("check_again")        
        setTimeout(function(){check_ready(times+1)} ,1000)
    }
}
$(function(){    
    $('#video_area').remove()
    check_ready(0)
})

