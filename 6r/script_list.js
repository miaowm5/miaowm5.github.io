$(document).ready(function(){
  $.getJSON("script_list.json",function(data){
    $.each(['base','message','map','system','battle','menu','others'], function(index,cate){
      for (var i = 0; i < data[cate].length; i++) { draw_script( data[cate][i], "." + cate ) }
      $("h2:eq("+index+")").bind('click',function(e){ $("." + cate).slideToggle() })
      $("h2:eq("+index+")").hover(
        function(e){ $("h2:eq("+index+")").css("background-color","rgb(238,234,238)"); },
        function(e){ $("h2:eq("+index+")").css("background-color","rgb(221,215,221)"); }
      )
    })
    find_newest_script(data)
    $("#list a").hover(
      function(e){ $(this).css("text-shadow","0px 0px 5px rgb(200,200,200)"); },
      function(e){ $(this).css("text-shadow","none"); }
    )
  })
})
function draw_script(data,position){
  var text = '<a href="http://rm.66rpg.com/home.php?mod=space&uid=291206&do=blog&id=' + data.url + '" target="_blank">'
  text += data.name + '</a>'
  text += '<span class="update_info"> (' + data.time.substr(0,4) + '.'
  text += ( data.time.substr(4,2) - 0 ) + '.' + ( data.time.substr(6) - 0 )
  text += ' ' + data.update_info + ') </span>'
  $(position).append('<li>' + text + '</li>')
}
function find_newest_script(data){
  var time = 0
  var result = []
  $.each(data, function(cate_index,cate){
    $.each(cate, function(script_index,script){
      if (script.time < time) { return false}
      else if (script.time > time){
        time = script.time
        result = []
      }
      result.push(script)
    })
  })
  $("h3").append( result[0].time.substr(0,4) + '.' + ( result[0].time.substr(4,2) - 0 ) )
  $("h3").append( '.' + ( result[0].time.substr(6) - 0 ) )
  $.each(result, function(i,data){ draw_script(data,'.update') })
  if ( $.cookie("last_visit") ) {
    if ( result[0].time > $.cookie("last_visit") ){ show_update_hint() }
  }
  $.cookie("last_visit",result[0].time,{ expires: 365, path :'/6r' })
}
function show_update_hint(){
  document.title = '【更新】喵呜喵5原创脚本列表'
  setTimeout("hide_update_hint()",600)
}
function hide_update_hint(){
  document.title = '【　　】喵呜喵5原创脚本列表'
  setTimeout("show_update_hint()",600)
}