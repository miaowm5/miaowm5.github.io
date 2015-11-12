document.onreadystatechange = function(){
  if ( document.getElementById("load_finish") ){ return }
  document.getElementById("diypage").innerHTML = '<iframe src="http://miaowm5.gitcafe.io/6r/6r_index.html"'+
    'style="width:960px;height:550px;" frameborder="0" scrolling="no"></iframe>'
  document.getElementById("hd").innerHTML = '<div id="load_finish"></div><div id="nv"><ul>'+
  '<li><a style="color:black !important" href="http://rm.66rpg.com/home.php?mod=space&amp;uid=291206&amp;do=blog&amp;view=me&amp;from=space">日志列表</a></li>'+
  '<li><a style="color:black !important" href="http://rm.66rpg.com/home.php?mod=space&amp;uid=291206&amp;do=wall">留言板</a></li>'+
  '<li><a style="color:black !important" href="http://mw-m5.lofter.com/">LOFTER</a></li>'+
  '<li><a style="color:black !important" href="http://weibo.com/mwm5">新浪微博</a></li>'+
  '<li><a style="color:black !important" href="http://lightnovel.lofter.com/">喵轻国</a></li>'+
  '<li><a style="color:black !important" href="https://github.com/miaowm5/RGSS3">Github</a></li>'+
  '</ul></div>'
}
