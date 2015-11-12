

function m5_run_code(){
  if( /.*r=up.*/.test(window.location.href) ){
    alert('list')
  }
  else{
    m5_jq("body").html( m5_jq("#video_right .triple:first").html() + '<br><br>' + document.title )
  }

}
m5_run_code()
