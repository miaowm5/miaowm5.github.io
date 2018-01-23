function set_change_pic(flag){
  $('.pichange').each( function(){
    $(this).hover(
      function(){ $(this).attr('src', "img/" + $(this).attr('hpic') ) },
      function(){ $(this).attr('src', "img/" + $(this).attr('npic') ) }
    )
  })
  $('.piclink').each( function(){
    if ($(this).attr('picfile')){
      $(this).css("background-image","url(img/" + $(this).attr('picfile') + "_command.png)")
    }
    var func = function(target,y){
      target.css('background-position','0px '+ y + 'px')
    }
    func( $(this), - ( $(this).attr('npic') - 0 ) * $(this).height() )
    $(this).hover(
      function(){ func( $(this), - ( $(this).attr('hpic') - 0 ) * $(this).height() ) },
      function(){ func( $(this), - ( $(this).attr('npic') - 0 ) * $(this).height() ) }
    )
  })
}
function set_hint_action(){
  $(".content_area").click(function() {
    $(this).children('.click:eq(0)').removeClass("click").addClass("click_over")
    $(this).children('.wait_click:eq(0)').removeClass("wait_click").addClass("click")
  })
}

function loadding(){
  add_frame('#main_area')
  $('#foot').load("foot.html")
  $('#head').load("head.html",function(responseTxt,statusTxt,xhr){
    set_change_pic()
    load_over()
  })
}

function load_over(){
  $('#loadding').hide()
  $('#load_over').show()
}

function add_frame(id){
  var string = '<table border="0" cellpadding="0" cellspacing="0">'
  string += '<tr><td style="background-image:url(img/frame1.png);background-position:0px 0px;width:33px;height:33px"></td>'
  string += '<td style="background-image:url(img/frame2.png);background-position:0px 0px"></td>'
  string += '<td style="background-image:url(img/frame1.png);background-position:33px 0px;width:33px;height:33px"></td></tr>'
  string += '<tr><td style="background-image:url(img/frame3.png);background-position:0px 0px"></td>'
  string += '<td><div id="main">' + $(id).html() + '</div></td>'
  string += '<td style="background-image:url(img/frame3.png);background-position:33px 0px"></td></tr>'
  string += '<tr><td style="background-image:url(img/frame1.png);background-position:0px 33px;width:33px;height:33px"></td>'
  string += '<td style="background-image:url(img/frame2.png);background-position:0px 33px"></td>'
  string += '<td style="background-image:url(img/frame1.png);background-position:33px 33px;width:33px;height:33px"></td></tr>'
  string += '</table>'
  $(id).html(string)
}

function scroll_right(pos){ $( "#right_area" ).animate( { scrollTop : $( ".content_area:eq(0)" ).height() * pos } ) }