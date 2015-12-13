(function(){

  var globalData = {}
  getLastUpdate()

  if (!Array.prototype.shuffle) {
    Array.prototype.shuffle = function() {
      for(var j, x, i = this.length; i; j){
        j = parseInt(Math.random() * i)
        x = this[--i]
        this[i] = this[j]
        this[j] = x
      }
      return this
    }
  }

  function randNumMax(max){
    for (var i = 1, num = Math.random(); num > (i / max) ; i++){}
    return i - 1
  }

  function getLastUpdate(){
    globalData.updateTime = 0
    globalData.updateStr = null
    var getTime = function(data){
      $.each(data, function(i,cate){ $.each(cate, function(j,script){
        if (script.time > globalData.updateTime){ globalData.updateTime = script.time }
        return false
      }) })
      var time = globalData.updateTime
      globalData.updateStr = [time.substr(0,4), time.substr(4,2) - 0, time.substr(6) - 0].join('.')
    }
    $.ajax({
      url: "http://miaowm5.gitcafe.io/script-blog/list.json",
      type: "get",
      dataType: "jsonp",
      jsonp: "callback",
      jsonpCallback:"callback",
      success: getTime
    });
  }

  function homeFunction(){
    if (globalData.updateStr == null) return
    $('#url_list p').text('（最终更新 ' + globalData.updateStr + '）')
  }

  function gameFunction(){
    randomGame()
    $('#game_ad button').click(randomGame)
  }
  function randomGame(){
    if ( $("#game_ad").attr("showing") == 1 ) { return }
    $("#game_ad").attr("showing",1)
    var now_show = $("#game_ad").attr("now_show")
    var show_new_game = function(){
      var length = $("#game_ad .game_content").length
      for (var index = randNumMax(length); index == now_show; index = randNumMax(length)){}
      $("#game_ad").attr("now_show",index)
      $("#game_ad .game_content:eq("+index+")").fadeIn(300,function(){
        $("#game_ad").attr("showing",0)
      })
    }
    if( now_show > -1 ){
      $("#game_ad .game_content:eq("+now_show+")").fadeOut(300,function(){
        show_new_game(now_show)
      })
    }
    else{ show_new_game(now_show) }
  }

  function loadPage(url,fun){
    $('#loading_bulb').stop(true,true)
    $('#loading_bulb').fadeIn(300)
    $('#loading_bulb').addClass("loading_bulb")
    var over_fun = function (){
      $('#loading_bulb').stop(true,true)
      $('#loading_bulb').fadeOut(300,function(){$('#loading_bulb').removeClass("loading_bulb");})
    }
    $('#error_area').fadeOut(300)
    $('#content_area').fadeOut(300,function(){
      $('#content_area').html("")
      $('#content_area').load( url, function(r, status){
        if(status=="success"){
          if (fun) fun()
          $('#content_area').fadeIn(300, function(){ over_fun() })
        }
        else {
          $('#error_area').fadeIn(300)
          over_fun()
        }
      })
    })
  }

  function playBgm(list){
    var text = ['<embed src="',
    'http://www.xiami.com/widget/43732468_',
    list,
    ',_235_346_FF8719_494949_',
    '1',
    '/multiPlayer.swf',
    '"type="application/x-shockwave-flash" width="1" height="1" wmode="opaque"></embed>'
    ]
    $('#music').html(text.join(''))
    $('#music_button').attr('link',[text[1],text[2],text[3],0,text[5]].join(''))
  }

  function randPlayList(max){
    var list = [1769462115,1769462114,1769462099,1771224491,1773593854,1770332040,
      1770390432,1769701053,1769605543,1771526122,1770554727,1769605529,1770728495,
      1769701059,1772515105,1769318884,1770099651,1770159571,1769960913,1773777868,
      1773777874,1770332045,1773807909,1771901281,1769414886,1771227550,1768994518,
      1769822191,1769746962,1770351225,1774433467,1772073225,1770970151,
      1772918948].shuffle()
      return list.slice(0,max).join(',')
  }

  $(window).load(function(){
    $('#loading').fadeOut(300, function(){ $('#viewport').fadeIn(300) })
  })

  $("body").on("mouseenter", '.hint', function(){
    $('#hint_area').stop(true,true)
    $('#hint_area').text(this.getAttribute('hint_text'))
    $('#hint_area').fadeIn(300)
  })
  $("body").on("mouseleave", '.hint', function(){
    $('#hint_area').stop(true,true)
    $('#hint_area').fadeOut(300)
  })

  $("#content").css("background-image","url(img/back/" + randNumMax(8) + ".jpg)")

  $('#home_button').click( function(){ loadPage("6r_home.html", homeFunction ) })
  $('#game_button').click( function(){ loadPage("6r_game.html", gameFunction ) })
  $('#hire_button').click( function(){ loadPage("6r_hire.html") })
  $('#music_button').click( function(){ window.open($(this).attr('link'))})

  loadPage("6r_home.html", homeFunction )
  playBgm(randPlayList(15))

})()
