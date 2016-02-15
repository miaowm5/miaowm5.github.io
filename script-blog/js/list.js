 // This script is used for list.html

(function (){

  function timeString(time){
    return [time.substr(0,4), time.substr(4,2) - 0, time.substr(6) - 0].join('.')
  }
  function loadJson(){
    siteGlobal.showUpdate = true
    var mainFunction = function(data){
      var list = ['base','message','map','event','system','battle','menu','others']
      $.each(list, function(i,cate){
        var dom = $('#list .' + cate + ' .show_area>ul')
        $.each(data[cate], function(_, script){ drawScript(script, dom, i) })
      })
      if (siteGlobal.showUpdate){ drawUpdateList(data,6) }
      $('#list .show_area li a').each(function(){
        $(this).attr('href',
          'http://rm.66rpg.com/home.php?mod=space&uid=291206&do=blog&id=' +
          $(this).attr('rm6r_url')
        )
      })
      siteGlobal.loadState += 1
    }
    var ajaxConfig = {
      url: "http://miaowm5.gitcafe.io/script-blog/list.json",
      scriptCharset:'UTF-8',
      dataType: "jsonp",
      jsonp: "callback",
      jsonpCallback:"callback",
      timeout: 2000,
      success: mainFunction,
    }
    $.ajax(ajaxConfig).fail(function(p1,p2,p3){
      $('html').addClass('no-update')
      siteGlobal.showUpdate = false
      ajaxConfig.url = "http://miaowm5.github.io/script-blog/list.json"
      $.ajax(ajaxConfig)
    })
  }
  function drawScript(data, dom, cate){
    cate = ['','Message/','Map/','Events/','Systems/','Battle/','Menu/','Others/'][cate]
    var aDom = $(document.createElement('a'))
    aDom.addClass('normal-link')
    if(data.base)   { aDom.addClass('base-script') }
    if(typeof(data.github)=="undefined") { aDom.addClass('no-github') }
    aDom.attr({
      'rm6r_url': data.url,
      'github_url': cate + data.name + '.rb',
      'target': '_blank'
    })
    aDom.html(data.name)
    dom.append([
      '<li>', aDom.prop('outerHTML'),
        '<span class="update_info">(',
        timeString(data.time),' ',
        data.update_info + ')</span>',
      '</li>'
    ].join(''))
  }
  function drawUpdateList(data,amount){
    var time = [],result = []
    for (var i = 0; i < amount; i++) { result[i] = []}
    $.each(data, function(_,cate){
      $.each(cate, function(_,script){ time.push(script.time) })
    })
    time = time.uniq(); time.sort(); time.reverse()
    if(time.length > amount){ time = time.slice(0, amount) }
    var i = 0
    $.each(data, function(_, cate){
      $.each(cate, function(_,script){
        if ( script.time < time[amount-1] ) { return false }
        result[time.index(script.time)].push([script, i])
      })
      i += 1
    })
    $.each(time, function(time_index,uptime){
      var listArea = $("#list .last_update")
      var time_string = [uptime.substr(0,4), uptime.substr(4,2) - 0, uptime.substr(6) - 0].join('.')
      if(time_index == 0) {
        if ( $.cookie("last_visit") ) {
          if ( uptime > $.cookie("last_visit") ){
            $("#list .update_hint").show()
            document.title = "【更新】喵呜喵5的原创脚本列表"
            siteGlobal.favicon.badge(result[time_index].length)
          }
        }else{ $.cookie("last_visit",uptime,{ expires: 365 }) }
        $("#list .update_hint").click(function(){
          document.title = "喵呜喵5的原创脚本列表"
          siteGlobal.favicon.reset()
          $.cookie("last_visit",uptime,{ expires: 365 })
          $("#list .update_hint").hide()
        })
        $("#list .update_time").append(time_string)
      }
      listArea.find(".show_area").append('<h3 class="card-inline-title">' + time_string + '</h3><ul></ul>')
      var dom = listArea.find(".show_area ul:eq(" + time_index + ")")
      $.each(result[time_index], function(_, script){
        drawScript(script[0], dom, script[1])
      })
    })
  }
  function setShowArea(){
    $(".show_area").hide()
    $("#list h2").bind('click',function(){
      $(this).toggleClass('showing')
      $(this).parent().find(".show_area").slideToggle()
    })
  }

  loadJson()
  setShowArea()
  siteGlobal.loadPublicPage()
  siteGlobal.setCommentBox()

})()
