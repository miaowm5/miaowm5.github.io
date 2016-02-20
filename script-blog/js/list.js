 // This script is used for list.html

(function (){

  function timeString(time){
    return [time.substr(0,4), time.substr(4,2) - 0, time.substr(6) - 0].join('.')
  }
  function loadJson(){
    siteGlobal.showUpdate = true
    var mainFunction = function(data){
      var list = ['base','message','map','system','battle','menu','event','others']
      $.each(list, function(i,cate){
        var dom = $('#list .' + cate + ' .show_area>ul')
        $.each(data[cate], function(_, script){ drawScript(script, dom, i) })
      })
      if (siteGlobal.showUpdate){ drawUpdateList(data,6) }
      setShowArea()
      useSetting()
      siteGlobal.loadState += 1
    }
    var ajaxConfig = {
      url: "http://miaowm5.gitcafe.io/script-blog/list.json",
      scriptCharset:'UTF-8',
      dataType: "jsonp",
      jsonp: "callback",
      jsonpCallback:"callback",
      timeout: 4000,
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
    cate = ['','Message/','Map/','Systems/','Battle/','Menu/','Events/','Others/'][cate]
    var aDom = $('<a target="_blank" class="normal-link">' + data.name + '</a>')
    aDom.attr({
      'data-rm6r': data.url, 'data-github': siteGlobal.encode(cate + data.name + '.rb')
    })
    var liDom = $('<li></li>')
    liDom.append(aDom)
    liDom.append($([
      '<span class="update_info">(',
      timeString(data.time),' ',
      data.update_info + ')</span>'
    ].join('')))
    if(data.base) { liDom.addClass('base-script') }
    if(typeof(data.github)=="undefined") { liDom.addClass('no-github') }
    dom.append(liDom)
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
  function setting(setID, state, cookie){
    var dom = $('#setting .switch_button[data-setting='+ setID +']')
    if (typeof(state) == "undefined") { return }
    switch(setID){
    case 1:
      if(state){ siteGlobal.setting.linkType = 1 }
      else{ siteGlobal.setting.linkType = 0; setting(3, false) }
      break
    case 2:
      if(state){ $('#list').addClass('filter-base') }
      else     { $('#list').removeClass('filter-base') }
      break
    case 3:
      if(state){ siteGlobal.setting.directGithub = true; setting(1, true) }
      else { siteGlobal.setting.directGithub = false }
      break
    }
    if(state){ dom.addClass('open') }
    else     { dom.removeClass('open') }
  }
  function useSetting(){
    siteGlobal.setting = {}
    var saveSetting = function(setID, value){
      if(value){ $.cookie("setting" + setID, '1', { expires: 365 }) }
      else{ $.cookie("setting" + setID, '0', { expires: 365 }) }
    }
    var refreshLink = function(){
      var changeTo6R = function(){
        $('#list').removeClass('github')
        $('#list').addClass('rm6r')
        $('#list .show_area li a').each(function(){
          $(this).attr('href',
            'http://rm.66rpg.com/home.php?mod=space&uid=291206&do=blog&id=' +
            $(this).attr('data-rm6r')
          )
        })
      }
      var changeToGithub = function(){
        $('#list').removeClass('rm6r')
        $('#list').addClass('github')
        $('#list .show_area li').each(function(){
          if ($(this).hasClass('no-github')){ return true }
          var aDom = $(this).children('a')
          if (siteGlobal.setting.directGithub){
            var url = 'https://github.com/miaowm5/RGSS3/blob/master/' +
              siteGlobal.decode(aDom.attr('data-github'))
          }
          else{
            var url = 'script.html?github=' + aDom.attr('data-github') + '&rm6r=' + aDom.attr('data-rm6r')
            if ($(this).hasClass('base-script')){ url += '&base=1' }
          }
          aDom.attr('href',url)
        })
      }
      if (siteGlobal.setting.linkType){ changeToGithub() }
      else{ changeTo6R() }
    }
    $('#setting .switch_button').click(function(){
      var setID = $(this).attr('data-setting') - 0
      var value = !$(this).hasClass('open')
      setting(setID, value)
      saveSetting(setID, value)
      refreshLink()
    })
    var settingList = [1,2,3]
    if ( $.cookie("setting0") && ($.cookie("setting0") - 0) ){
      $.each(settingList,function(_, id){
        if (!$.cookie("setting" + id)){ return true }
        setting(id, ($.cookie("setting" + id) - 0), true)
      })
      $('#setting .switch_button[data-setting=0]').addClass('open')
    }
    else{
      $.each(settingList, function(_, id){ $.cookie("setting" + id, null) })
      $("#setting .show_area").show()
    }
    refreshLink()
  }

  loadJson()
  siteGlobal.loadPublicPage()
  siteGlobal.articleID = 1
  siteGlobal.setCommentBox()
  siteGlobal.checkLoad(2)

})()
