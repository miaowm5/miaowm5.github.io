function RandNumMax(max){
  var num = Math.random()
  var i = 0
  while (num > (i/max)){ i ++ }
  return i - 1
}
function show_hint_text(hint){
  $('#hint_area').stop(true,true)
  $('#hint_area').text(hint)
  $('#hint_area').fadeIn(300)
}
function hide_hint_text(hint){
  $('#hint_area').stop(true,true)
  $('#hint_area').fadeOut(300)
}
function show_loading_bulb(){
  $('#loading_bulb').stop(true,true)
  $('#loading_bulb').fadeIn(300)
}
function hide_loading_bulb(){
  $('#loading_bulb').stop(true,true)
  $('#loading_bulb').fadeOut(300)
}
function show_error_hint(){
  $('#error_area').fadeIn(300)
}
function home_function(){
  $.getJSON("script_list.json",function(data){
    var update_time = '（最终更新 '
    var result = find_newest_script(data,1)
    update_time += result[0].time.substr(0,4) + '.' + (result[0].time.substr(4,2) - 0) + '.'
    update_time += (result[0].time.substr(6) - 0) + '）'
    $('#url_list p').text(update_time)
  })
}
function find_newest_script(data,amount){
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
  return result
}
function game_function(){
  random_game()
  $('#game_ad button').click(random_game)
}

function array_uniq(arr){
  var result = [];
  for(var i = 0,len = arr.length;i < len;i++){
    ! RegExp(arr[i],"g").test(result.join(",")) && (result.push(arr[i]));
  }
  return result
}
function array_index(arr,value){
  for(var i = 0,len = arr.length;i < len;i++){ if(value == arr[i]){ return i } }
  return -1
}
function draw_script(data,position,time_string){
  var text = '<a href="http://rm.66rpg.com/home.php?mod=space&uid=291206&do=blog&id=' + data.url
  text += '" target="_blank">' + data.name + '</a>'
  text += '<h2> (' + time_string + ' ' + data.update_info + ') </h2>'
  $(position).append(text)
}
function draw_update_list(position,amount){
  $.getJSON("script_list.json",function(data,statusTxt){
    var time = [],result = []
    for (var i = 0; i < amount; i++) { result[i] = []}
    $.each(data, function(cate_index,cate){
      $.each(cate, function(script_index,script){ time.push(script.time) })
    })
    time = array_uniq(time); time.sort(); time.reverse()
    if(time.length > amount){ time = time.slice(0, amount) }
    $.each(data, function(cate_index,cate){
      $.each(cate, function(script_index,script){
        if ( script.time < time[amount-1] ) { return false }
        result[array_index(time,script.time)].push(script)
      })
    })
    $.each(time, function(time_index,uptime){
      var time_string = uptime.substr(0,4) + '.' + (uptime.substr(4,2) - 0) + '.' + (uptime.substr(6) - 0)
      $(position).append('<p>'+time_string+'</p>')
      $.each(result[ time_index ], function(script_index,script){
        draw_script(script,position,time_string)
      })
    })
    set_scroll_bar( $("#update_list").height(), $("#update_list div").height() )
  })
}
function update_function(){
  draw_update_list('#update_list div',8)
}
function set_scroll_bar(area_height,content_height){
  $('#scroll_bar > div:first-child + div').mousedown(function(e){
    $('#scroll_bar').attr("move",0)
    $('#scroll_bar').attr("mouse_position", e.pageY)
    $('#scroll_bar').attr("scroll_position", $('#scroll_bar > div:first-child + div').offset().top)
  })
  $('#scroll_bar > div:first-child').mousedown(function(e){
    $('#scroll_bar').attr("move",20)
    update_scroll_position(e.pageY - $('#scroll_bar > div:first-child + div').height() / 2)
    $('#scroll_bar').attr("move",-1)
  })
  $(document).mousemove(function(e){
    var mouse_offset = e.pageY - ( $('#scroll_bar').attr("mouse_position") - 0 )
    var y = $('#scroll_bar').attr("scroll_position") - 0 + mouse_offset
    update_scroll_position(y)
  })
  $(document).mouseup(function(){
    $('#scroll_bar').attr("move",-1)
  })
  var height = $('#scroll_bar > div:first-child').height() - 26
  if( content_height > area_height){
    var temp = Math.ceil( content_height / area_height )
    if ( temp > 10 ){ temp = 10 }
    height = (height / temp )
  }
  $('#scroll_bar > div:first-child + div').height(height - 1)
}

function update_scroll_position(y){
  if( !$('#scroll_bar').attr("move") || $('#scroll_bar').attr("move") < 0 ){ return }
  var top = $('#scroll_bar > div:first-child').offset().top
  var bottom = top + $('#scroll_bar > div:first-child').height()
  top += 13
  bottom -= 13 + $('#scroll_bar > div:first-child + div').height()
  if (y < top ) { y = top }
  else if (y > bottom ) { y = bottom }
  var target = $('#scroll_bar > div:first-child + div')
  if ($('#scroll_bar').attr("move") == 0){ target.stop(true,true) }
  target.animate({ top : y - $('#scroll_bar > div:first-child').offset().top },$('#scroll_bar').attr("move"))
  y -= top
  bottom -= top
  update_content_position(y,bottom,$('#scroll_bar').attr("move"))
}
function update_content_position(y,bottom,time){
  var pos = ( $( content_area() ).height() - $( scroll_area() ).height()*9/10 ) * ( y / bottom )
  if (time == 0){ $( scroll_area() ).stop(true,true) }
  $( scroll_area() ).animate({ scrollTop : pos },time)
}
function load_page(url,fun){
  show_loading_bulb()
  $('#error_area').fadeOut(300)
  $('#content_area').fadeOut(300,function(){
    load_page_main(url,fun)
  })
}
function load_page_main(url,fun){
  $('#content_area').load( url, function(responseTxt,statusTxt,xhr){
    if(statusTxt=="success")
      fun()
      $('#content_area').fadeIn(300, function(){ hide_loading_bulb() })
    if(statusTxt=="error")
      show_error_hint()
      hide_loading_bulb()
  })
}

$(document).ready(function(){

  $("body").on("mouseenter", '.hint', function(){ show_hint_text( this.getAttribute('hint_text') ) })
  $("body").on("mouseleave", '.hint', function(){ hide_hint_text() })

  // $("#content").css("background-image","url(img/back/7.jpg)")
  $("#content").css("background-image","url(img/back/" + RandNumMax(8) + ".jpg)")

  $('#home_button').click( function(){ load_page("6r_home.html", function(){ home_function() } ) })
  $('#game_button').click( function(){ load_page("6r_game.html", function(){ game_function() } ) })
  $('#list_button').click( function(){ load_page("6r_update.html", function(){ update_function() } ) })
  $('#hire_button').click( function(){ load_page("6r_hire.html", function(){} ) })

  load_page("6r_home.html", function(){ home_function() } )

})
$(window).load(function(){
  $('#loading').fadeOut(300, function(){ $('#viewport').fadeIn(300) })
})
