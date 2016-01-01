 // This script is used for list.html

(function (){

  function loadJson(){
    var mainFunction = function(data){
      var list = ['base','message','map','event','system','battle','menu','others']
      for(var i = 0; i < list.length; i++){
        var cate = list[i]
        var dom = $('#list .' + cate + ' .show_area>ul') // $('#list .base .show_area>ul')
        for (var j = 0; j < data[cate].length; drawScript(data[cate][j], dom), j++){}
      }
      drawUpdateList(data,6)
      $('#list .script-list').show()
      $('#list .script-load').hide()
    }
    $.ajax({
      url: "list.json",
      type: "get",
      dataType: "jsonp",
      jsonp: "callback",
      jsonpCallback:"callback",
      success: mainFunction
    });
  }
  function drawScript(data, dom){
    var text = [
      '<a href="http://rm.66rpg.com/home.php?mod=space&uid=291206&do=blog&id=',
      data.url + '" target="_blank">',
      data.name + '</a>',
      '<span class="update_info"> (',
      data.time.substr(0,4) + '.',
      (data.time.substr(4,2) - 0) + '.',
      (data.time.substr(6) - 0) + ' ',
      data.update_info + ') </span>',
    ].join('')
    dom.append('<li>' + text + '</li>')
  }
  function drawUpdateList(data,amount){
    var time = [],result = []
    for (var i = 0; i < amount; i++) { result[i] = []}
    $.each(data, function(cate_index,cate){
      $.each(cate, function(script_index,script){ time.push(script.time) })
    })
    time = time.uniq(); time.sort(); time.reverse()
    if(time.length > amount){ time = time.slice(0, amount) }
    $.each(data, function(cate_index,cate){
      $.each(cate, function(script_index,script){
        if ( script.time < time[amount-1] ) { return false }
        result[time.index(script.time)].push(script)
      })
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
        $(".update_time").append(time_string)
      }
      listArea.find(".show_area").append('<h3>' + time_string + '</h3><ul></ul>')
      var dom = listArea.find(".show_area ul:eq(" + time_index + ")")
      $.each(result[time_index], function(script_index, script){ drawScript(script, dom) })
    })
  }
  function setShowArea(){
    $(".show_area").hide()
    $("#list h2").bind('click',function(){
      $(this).toggleClass('showing')
      $(this).parent().find(".show_area").slideToggle()
    })
  }
  function setCommentBox(){
    $('.ds-thread').attr('data-thread-key', siteGlobal.articleID)
    var ds = document.createElement('script');
    ds.type = 'text/javascript';ds.async = true;
    ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
    ds.charset = 'UTF-8';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ds);
  }

  loadJson()
  setShowArea()
  siteGlobal.loadPublicPage()
  setCommentBox()

})()
