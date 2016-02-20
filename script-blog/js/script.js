 // This script is used for script.html

(function (){

  function setClipboard(){
    var clipboard = new Clipboard('.copy-code .button')
    var clearHint = function(){ $('.copy-code .hint p').hide() }
    clipboard.on('success', function(e) {
      clearHint()
      $(e.trigger).next().children('.success').show()
      e.clearSelection()
    })
    clipboard.on('error', function(e) {
      clearHint()
      $(e.trigger).next().children('.error').show()
    })
  }

  function setCommentBox(){
    var id = $.getUrlParam('rm6r')
    if (!id){
      $('#comment').hide()
      return
    }
    siteGlobal.articleID = id
    siteGlobal.setCommentBox()
  }
  function loadScript(){
    var id = $.getUrlParam('github')
    if (!id){ return }
    var url = 'https://api.github.com/repos/miaowm5/RGSS3/contents/' + siteGlobal.decode(id)
    $.getJSON(url, function(data){ drawScript(data) }).fail(function(){
      document.title = '数据获取失败_(:з」∠)_'
    })
  }
  function drawScript(data){
    var dom = $('#main')
    dom.children('.big-title').append('<h1>' + data.name + '</h1>')
    if ($.getUrlParam('base')){
      dom.children('.big-title').append(
        '<p class="title-hint">这个脚本需要搭配我的基础脚本共同使用。</p>'
      )
    }
    var code = siteGlobal.decode(data.content.replace('\n','') )
    code = code.replace('<','&lt').replace('>','&gt')
    dom.children('.card').append(
      siteGlobal.createContent.code({ 'id' : 1, 'code' : code, 'url' : data.download_url })
    )
    setClipboard()
    document.title = data.name
    siteGlobal.loadState += 1
  }

  siteGlobal.loadPublicPage()
  loadScript()
  setCommentBox()
  siteGlobal.checkLoad(2)

})()