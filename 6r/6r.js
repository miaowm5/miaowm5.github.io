document.onreadystatechange = function(){
  if ( document.getElementById("load_finish") ){ return }
  var hd_text = '<div id="load_finish"></div><div id="nv"><ul>'+
  '<li><a style="color:black !important" href="home.php?mod=space&amp;uid=291206&amp;do=blog&amp;view=me&amp;from=space">日志列表</a></li>'+
  '<li><a style="color:black !important" href="home.php?mod=space&amp;uid=291206&amp;do=wall">留言板</a></li>'+
  '<li><a style="color:black !important" href="http://mw-m5.lofter.com/">LOFTER</a></li>'+
  '<li><a style="color:black !important" href="http://weibo.com/mwm5">新浪微博</a></li>'+
  '<li><a style="color:black !important" href="http://lightnovel.lofter.com/">喵轻国</a></li>'+
  '<li><a style="color:black !important" href="https://github.com/miaowm5/RGSS3">Github</a></li>'
  if ( document.getElementById("magicreceivegift") && ( Math.random() > 0.8 ) ){
    hd_text += '<li><a style="color:black !important" ' +
    'onclick="showWindow(\'magicgift\', this.href, \'get\', 0)" ' +
    'href="home.php?mod=spacecp&ac=magic&op=receivegift&uid=291206" ' +
    'title="领取喵呜喵5挥泪派发的红包！">空间红包</a></li>'
  }
  document.getElementById("diypage").innerHTML = '<iframe src="http://miaowm5.gitcafe.io/6r/6r_index.html"'+
  'style="width:960px;height:550px;" frameborder="0" scrolling="no"></iframe>'
  document.getElementById("hd").innerHTML = hd_text + '</ul></div>'
}