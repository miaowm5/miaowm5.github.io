/* This JS File Use In Comment Page*/

function setWAPComment(){
  var sid = $.getUrlParam('sid')
  if (sid == null) return
  $('#SOHUCS').attr('sid', sid)
  $('#error').hide()
  setLinks(sid, 'pc')
  window.document.write([
    '<script id="changyan_mobile_js" charset="utf-8" type="text/javascript" ',
    'src="http://changyan.sohu.com/upload/mobile/wap-js/changyan_mobile.js?',
    'client_id=', siteGlobal.commentAppid, '&',
    'conf=', siteGlobal.commentConf,
    '"><\/script>'].join('')
  )
}
function setPCComment(){
  var sid = $.getUrlParam('sid')
  if (sid == null) return
  $('#SOHUCS').attr('sid', sid)
  $('#error').hide()
  setLinks(sid, 'wap')
  var appid = siteGlobal.commentAppid
  var conf = siteGlobal.commentConf
  var readyFunction = function(){ window.changyan.api.config({ appid: appid, conf: conf }) }
  var ele = document.createElement("script")
  ele.setAttribute("type","text/javascript")
  ele.setAttribute("charset","UTF-8")
  ele.setAttribute("src","http://changyan.sohu.com/upload/changyan.js")
  if(window.attachEvent){
    ele.onreadystatechange = function(){
      var state = b.readyState;
      if(state === "loaded" || state === "complete"){
        b.onreadystatechange = null;
        readyFunction()
      }
    }
  }
  else ele.onload = readyFunction
  $('head')[0].appendChild(ele)
}
function setLinks(articleID, target){
  $('#switch').attr('href', target + '_comment.html?sid=' + articleID)
  $('#back').attr('onClick', '')
  $('#back').attr('href', 'list.html')
}