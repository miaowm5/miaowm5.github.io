function m5_run_code(){
  var text = ""
  if( /.*html.*/.test(window.location.href) ){
    text = '<div style="position:fixed;background-color:white">';
    var data = [];
    m5_jq('.box').each( function(i) { data[Math.floor(i / 5)] += (m5_jq(this).html()); })
    m5_jq.each( data, function(i){
      var name = 'm5_data'+ i
      text += '<a href="#'+ i +'" onclick="'
      text += 'window.scrollTo(0,0);$(\'#content\').html($(\'body\').attr(\'' + name + '\'))'
      text += '">PAGE'+ i +'</a>'
      m5_jq('body').attr( name , data[i] )
    })
    m5_jq('body').html(text+"</div><div id='content'></div>");
  }
  else{
    m5_jq('.post').each( function(i) { text += m5_jq(this).html() })
    m5_jq('body').html(text);
  }
}
m5_run_code()